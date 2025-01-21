# Linux / Windows / macOS


=== "Linux"
    1. Instale os pacotes, uma linha de comando por vez.

    ```bash
    sudo apt-get install -y cmake gcc-arm-none-eabi libnewlib-arm-none-eabi libstdc++-arm-none-eabi-newlib gdb-multiarch git udev python3
    ```

    ```bash
    sudo apt-get install -y automake autoconf build-essential texinfo libtool libftdi-dev libusb-1.0-0-dev pkg-config libftdi1-2 libhidapi-hidraw0 make python3-pytest
    ```

    ```bash
    sudo apt install openocd
    ```

    2. Instale o VSCode de acordo com o seguinte link:
    [Instalar VSCode](https://linuxhint.com/install-visual-studio-code-ubuntu22-04/)

    3. Instalar a extensão "Raspberry Pi Pico" no VsCode, conforme imagem abaixo:
    ![](/site/imgs/vscode-extension-pico.png)

=== "Windows"
    Fazer o desenvolvimento usando uma VM Ubuntu:
    
    1. Baixar e instalar VSCode (.zip) de acordo com a arquitetura do seu computador (caso não saiba, peça ajuda ao técnico):
    https://code.visualstudio.com/download

=== "macOS"
    Instalar requisitos no mac:
    
    1. Instalar open-ocd

    ```bash
    brew install open-ocd
    ```

    2. Baixar e instalar VSCode (.zip) de acordo com a arquitetura do seu computador (caso não saiba, peça ajuda ao técnico):
    https://code.visualstudio.com/download
    3. Instalar a extensão "Raspberry Pi Pico" no VsCode, conforme imagem abaixo:
    ![](/site/imgs/vscode-extension-pico.png)
    


!!! exercise
    Conecte o debug-probe e a rasp. Para isso você vai precisar de:
    
    - Dois cabos USB
    - Debug-Probe
    - Raspberry pi pico
    - Protoboard
    
    === "Diagrama"
        ![](/site/pico/imgs/pico-probe.png)
    === "Real"
        ![](/site/pico/imgs/pico-probe-real.jpeg)
        

## Testando tudo - vscode

Agora que já temos toda a infra instalada, vamos testar!

!!! exercise
    Clone o repositório com códigos de teste

    ```bash
    git clone https://github.com/insper-embarcados/infra-test.git
    ```

!!! exercise
    Abra o respositório no vscode

    ```bash
    code infra-test/
    ```

    ==Clique em "yes" na sugestão abaixo!==
    ![](/site/imgs/vscode-extension-pico-import.png)


!!! exercise 
    Após tudo carregado, vamos compilar o projeto!

    Clique em build na barra inferior:

    ![](imgs/vscode-build.png)

    Escolha o compilador `arm-none-eabi`

    ![](imgs/vscode-arm.png)

    Você deve obter:

    ![](imgs/vscode-build-done.png)

### Programando e depurando
    
Agora vamos programar a placa!
    
!!! exercise
    Selecione o programa que iremos depurar

    ![](imgs/config-debug.png)

!!! exercise
    Inicialize o software

    ![](imgs/config-run.png)

    ==Você deve obter o Hello world== no serial

!!! exercise
    Abra o serial monitor (terminal)

    ![](imgs/config-serial.png)
  