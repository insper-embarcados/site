# Pyautogui


O pyautogui é uma biblioteca que permite emularmos um teclado ou mouse no Windows (até funciona para alguns Linux, mas precisa estar rodando o gerenciador de janelas no X11 e a maioria das ditros modernas utiliza Wayland, que não é compatível).

!!! tip
    Se o pyautogui não funcionar no seu jogo, substitua o pyautogui por pydirectinput.
    !!! video
           ![](https://www.youtube.com/watch?v=LFDGgFRqVIs)

Para mais informações consulte a documentacão oficial:

- pyautogui: https://pyautogui.readthedocs.io/en/latest/

### Simulando um controle

Use:

- https://github.com/iosonofabio/virtual_gamepad/blob/master/virtual_gamepad.py

Você pode usar os seguintes eventos:

```
 ABS_X
 ABS_Y
 ABS_RX
 ABS_RY
 ABS_Z
 ABS_RZ
 ABS_HAT0X
 ABS_HAT0Y
```


### Manter tecla pressionada

Por padrão a lib não permite manter uma tecla pressionada (e ficar repetitivamente enviando o mesmo valor), para desativar basta remover o delay:

```py
    def __init__(self, port, baudrate):
        pyautogui.PAUSE = 0  ## remove delay
```

Agora uma tecla "pressionada" ira ser enviada repetitivamente

### keyboard

- https://pyautogui.readthedocs.io/en/latest/keyboard.html#

O pyautogui disponibiliza duas formas diferentes de apertarmos uma tecla: 

- `press` que é uma ação de apertar e soltar uma tecla
- `keyDown` e `keyUp` que são aćoes distintas de apertar e soltar

```py
pyautogui.keyDown('shift')  # hold down the shift key
pyautogui.press('left')     # press the left arrow key
pyautogui.press('left')     # press the left arrow key
pyautogui.press('left')     # press the left arrow key
pyautogui.keyUp('shift')    # release the shift key
```

Para uma lista das teclas suportas acesse:

- https://pyautogui.readthedocs.io/en/latest/keyboard.html#keyboard-keys

Se precisar fazer um combo (hotkeys) de teclas como o: `ctrl` + `alt` + `f4`, use o `hotkeys`:

```py
pyautogui.hotkey('ctrl', 'shift', 'f4')
```

### Emulando mouse

A documentacão oficial é muito boa:

- https://pyautogui.readthedocs.io/en/latest/mouse.html


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
