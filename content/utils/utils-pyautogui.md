# Pyautogui

O pyautogui é uma biblioteca que permite emularmos um teclado ou mouse no Windows (até funciona para alguns Linux, mas precisa estar rodando o gerenciador de janelas no X11 e a maioria das ditros modernas utiliza Wayland, que não é compatível).

Para mais informações consulte a documentacão oficial:

- pyautogui: https://pyautogui.readthedocs.io/en/latest/

## Code

Código em python a seguir emula um mouse usando o pyautogui (compatível com os Labs 5 e 6)

!!! info
    Note que no Windows a porta serial chama COM e possui um número atrelada a ela. Para verificar o seu ID utilize o `device management`.

Notem que a única coisa que alterna é o nome da porta serial:

```py
ser = serial.Serial('COM3', 115200)
```

E a função `mouve_mouse`

```py
def move_mouse(axis, value):
    if axis == 0:    # X-axis
        pyautogui.move(0, value)
    elif axis == 1:  # Y-axis
        pyautogui.move(value, 0)
```

Código completo:

```py
import serial
import pyautogui

ser = serial.Serial('COM3', 115200)

def parse_data(data):
    axis = data[0]  # 0 for X, 1 for Y
    value = int.from_bytes(data[1:3], byteorder='little', signed=True)
    print(f"Received data: {data}")
    print(f"axis: {axis}, value: {value}")
    return axis, value


def move_mouse(axis, value):
    if axis == 0:    # X-axis
        pyautogui.move(0, value)
    elif axis == 1:  # Y-axis
        pyautogui.move(value, 0)

try:
    # sync package
    while True:
        print('Waiting for sync package...')
        while True:
            data = ser.read(1)
            if data == b'\xff':
                break
            else:
                print(f"Received error: {data}")

        # Read 4 bytes from UART
        data = ser.read(3)
        axis, value = parse_data(data)
        move_mouse(axis, value)

except KeyboardInterrupt:
    print("Program terminated by user")
except Exception as e:
    print(f"An error occurred: {e}")
finally:
    ser.close()

```
