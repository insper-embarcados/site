# Infra

A disciplina vai ser executada em Linux, preferência para Ubuntu 22.04, o mesmo que será usado na disciplina de sistemas hardware software, mas os softwares que iremos usar são diferentes!

## Parte 1 - gcc, sdk and examples 

Crie uma pasta chamada `pico` na raiz do seu usuário, vamos instalar todos os softwares nesse local!

```bash
$ mkdir pico
$ cd pico
```

1. Toolchain

``` bash
$ sudo apt install cmake gcc-arm-none-eabi libnewlib-arm-none-eabi libstdc++-arm-none-eabi-newlib
```

2. SDK

```bash
$ git clone https://github.com/raspberrypi/pico-sdk.git
$ git -C pico-sdk submodule update --init
```

Adicione o caminho recém clonado ao `.bashrc`

```bash
$ echo export PICO_SDK_PATH=$HOME/pico/pico-sdk > ~/.bashrc
$ source ~/.bashrc
```

3. Clone o pico examples

```bash
$ git clone https://github.com/raspberrypi/pico-examples
```

### Testando

Agora devemos ser capazes de compilar o repositório de exemplos:

```bash
$ cd pico-examples
$ mkdir build
$ cd build
$ cmake ..
$ make blink
```

Você deve obter algo como:

[![asciicast](https://asciinema.org/a/5PjMJmsDpfMx1oFwKsppp7w8F.svg)](https://asciinema.org/a/5PjMJmsDpfMx1oFwKsppp7w8F)

!!! warning
    Não seguir se não funcionar!
    
## Parte 2 - debug-probe

Vamos instalar o OpenOCD necessário para usarmos o `pico-probe`.

1. Volte para a pasta das ferramentas:

```bash
cd ~/pico
```

1. Instale as dependências: 

```bash
$ sudo apt install automake autoconf build-essential texinfo libtool libftdi-dev libusb-1.0-0-dev pkg-config
```

2. Compilnando e instalando o PicoProbe

```bash
$ git clone https://github.com/raspberrypi/openocd.git --branch rp2040-v0.12.0 --depth=1 --no-single-branch
$ cd openocd
$ ./bootstrap
$ ./configure
$ make -j4
$ sudo make install
```

4. Configure a permissão do usb:

```bash
$ sudo echo ATTRS{product}=="*CMSIS-DAP*", MODE="664", GROUP="users" > /etc/udev/rules.d/99-debug-probe.rules
```

```bash
sudo udevadm control --reload-rules && sudo udevadm trigger
```

3. Instale o `gdb` crosscompile:

```
$ sudo apt install gdb-multiarch
```

### Testando

!!! TODO
    Inserir imagem debug-probe
    
Plugue o debug-probe no computador e execute:
 
```bash
openocd -f interface/cmsis-dap.cfg -f target/rp2040.cfg -c "adapter speed 5000"
```

=== "Correto"
    ![](imgs/openocd-ok.png)
=== "Fail"
    ![](imgs/openocd-fail.png)

## Parte 3 - Wokwi-cli

Wokwi é um simulador de microcontroladores, iremos usar em algumas atividades de laboratório.

1. Instale o software:

```bash
curl -L https://wokwi.com/ci/install.sh | sh
```

## Parte 4 - VSCODE

Instale o vscode no Linux:

```bash
sudo snap install --classic code 
```

### Testando

Abra o vscode! 

```bash
code .
```

## Parte 5 - Configurando vscode e testando


