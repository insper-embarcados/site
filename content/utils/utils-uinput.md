# UINPUT

!!! info
    Material original desenvolvido por [Fernando Alzueta](https://github.com/devfernandoa). 

Este código Python é projetado para emular um gamepad usando um microcontrolador conectado via serial (USB ou Bluetooth). Ele usa a biblioteca serial para comunicação serial e a biblioteca uinput para criar um dispositivo virtual do gamepad.

O código realiza as seguintes operações principais:

- Configuração do Dispositivo Serial: Configura a comunicação serial com a raspberry pico.
- Configuração do Dispositivo de Emulação: Cria um dispositivo virtual de gamepad usando a biblioteca uinput.
- Recepção e Interpretação de Dados: Recebe dados do dispositivo conectado via serial, interpreta esses dados e os emula como entrada de gamepad.

## Adicionando ou Removendo Botões

Para adicionar ou remover botões do gamepad emulado, você precisa ajustar algumas partes específicas do código:

### Lista de Botões

As listas buttons e axes definem os botões e eixos disponíveis e seus respectivos códigos. Você pode adicionar ou remover botões e eixos desta lista, conforme necessário.

Por exemplo, para adicionar um novo botão `BTN_C`, você pode incluir `uinput.BTN_C` na lista. Da mesma forma, para remover um botão existente, basta remover o correspondente `uinput.BTN_X`, por exemplo.
(A lista completa de botões do uinput está [aqui](https://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git/tree/include/uapi/linux/input-event-codes.h?h=v4.7))

### Quantidade de Botões

A variável `button_quantity` representa a quantidade total de botões no seu controlador, excluindo os movimentos do joystick. Certifique-se de ajustar essa variável para refletir corretamente o número de botões no seu controlador, após adicionar ou remover botões.

### RP2050 

Dentro do seu código em C você deve lidar com cada botão e eixo na ordem que está na lista no python, por exemplo, se tenho 4 botões na lista ```buttons = [uinput.BTN_A, uinput.BTN_B, uinput.BTN_X, uinput.BTN_Y]```, eu devo acessá-la utilizando o axis como 0, 1, 2 e 3 para os botões A, B, X e Y do controle, respectivamente. Portanto se você adicionar um botão, você deve contar sempre a posição do novo botão na lista no python e utilizar esse valor no axis do envio.

### Exemplo de Adição de Botão

!!! info
    Lista com todos os possíveis sinais que o uinput pode emular:
    
    - https://github.com/torvalds/linux/blob/master/include/uapi/linux/input-event-codes.h

Suponha que você deseje adicionar um novo botão chamado BTN_Z ao seu gamepad. Você precisaria seguir estas etapas:

1. Adicione `uinput.BTN_Z` à lista de botões.
1. Ajuste `button_quantity` para refletir a nova quantidade total de botões no seu controlador.

Código modificado:

```c
typedef struct adc {
    char axis;
    int val;
} adc_t;

void write_package(adc_t data) {
    int val = data.val;
    int msb = val >> 8;
    int lsb = val & 0xFF;

    uart_putc_raw(HC06_UART_ID, data.axis);
    uart_putc_raw(HC06_UART_ID, msb);
    uart_putc_raw(HC06_UART_ID, lsb);
    uart_putc_raw(HC06_UART_ID, -1);
}
```

## Code

Código em python que emula um joystick

```py
import serial
import uinput

ser = serial.Serial('/dev/ttyACM0', 9600) # Mude a porta para rfcomm0 se estiver usando bluetooth no linux
# Caso você esteja usando windows você deveria definir uma porta fixa para seu dispositivo (para facilitar sua vida mesmo)
# Siga esse tutorial https://community.element14.com/technologies/internet-of-things/b/blog/posts/standard-serial-over-bluetooth-on-windows-10 e mude o código acima para algo como: ser = serial.Serial('COMX', 9600) (onde X é o número desejado)

# (Mais códigos aqui https://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git/tree/include/uapi/linux/input-event-codes.h?h=v4.7)
buttons = [uinput.BTN_A, # 0
    uinput.BTN_B, # 1
    uinput.BTN_X, # 2
    uinput.BTN_Y, # 3
    uinput.BTN_TL, # 4
    uinput.BTN_TR, # 5
    uinput.BTN_TL2, # 6
    uinput.BTN_TR2, # 7
    uinput.BTN_SELECT, # 8
    uinput.BTN_START, # 9
    uinput.BTN_THUMBL, # 10
    uinput.BTN_THUMBR, # 11
    uinput.BTN_DPAD_UP, # 12
    uinput.BTN_DPAD_DOWN, # 13
    # uinput.BTN_DPAD_LEFT,
    # uinput.BTN_DPAD_RIGHT,
          ]
axes = [uinput.ABS_X, uinput.ABS_Y]
button_quantity = 14 # Quantidade de botões no controlador (sem contar com o joystick)

# Criando gamepad emulado
device = uinput.Device(buttons + axes)


# Função para analisar os dados recebidos do dispositivo externo
def parse_data(data):
    """
    Esta função analisa os dados recebidos do dispositivo externo e retorna o botão e o valor correspondentes.

    Argumentos:
    data (bytes): Os dados recebidos do dispositivo externo.

    Retorna:
    int, int: O número do botão e o valor do botão.
    """
    button = data[0]  # Axis no C, o botão apertado
    value = int.from_bytes(data[1:3], byteorder='little', signed=True) # Valor do botão (Apertado, não apertado ou algum outro estado)
    print(f"Received data: {data}")
    print(f"button: {button}, value: {value}")
    return button, value

def emulate_controller(button, value):
    """
    Esta função emula a entrada do controlador no sistema com base no botão e valor recebidos.

    Argumentos:
    button (int): O número do botão a ser emulado.
    value (int): O valor do botão.

    Retorna:
    None
    """
    if button < button_quantity:  # Se o botão estiver entre os botões declarados
        device.emit(buttons[button], value)
    else:  # Se não, ele é um eixo
        device.emit(axes[button - button_quantity], value)

try:
    # Pacote de sync
    while True:
        print('Waiting for sync package...')
        while True:
            data = ser.read(1)
            if data == b'\xff':
                break

        # Lendo 4 bytes da uart
        data = ser.read(3)
        button, value = parse_data(data)
        emulate_controller(button, value)

except KeyboardInterrupt:
    print("Program terminated by user")
except Exception as e:
    print(f"An error occurred: {e}")
finally:
    ser.close()
```
