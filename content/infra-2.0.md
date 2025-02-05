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
    git clone   https://github.com/insper-embarcados/pico-base-project
    ```

!!! exercise
    Abra o respositório no vscode

    ```bash
    code pcio-base-project
    ```

    ==Clique em "yes" na sugestão abaixo!==
    ![](/site/imgs/vscode-extension-pico-import.png)

    Espere até que o ambiente seja configurado.



!!! exercise

    Após o ambiente ser configurado, aparecerá um tela parecida com essa:

    ==Clique no símbolo da extensão da Raspberry Pi Pico==
    ![](/site/imgs/infra-2.0-ambiente-configurado.png)

!!! exercise

    Após o ambiente ser configurado, aparecerá um tela parecida com essa:

    ![](/site/imgs/infra-2.0-depurando.png)   

    1. Clique em "Debug Project"
    2. Clique em Pico Debug (Cortex-Debug)


!!! exercise

    Espere até que a seguinte tela apareça e clique no botão "Play". 

    ![](/site/imgs/infra-2.0-rodando.png) 


!!! exercise

    Conforme imagem abaixo:

    ![](/site/imgs/infra-2.0-serial-monitor.png) 

    1. Clique em Serial Monitor
    2. Clique em Start Monitoring

!!! exercise

    Observe se o output é "Hello, world!"

    ![](/site/imgs/infra-2.0-serial-output.png) 



    


