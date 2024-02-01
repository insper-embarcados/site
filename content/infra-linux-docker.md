# Infra Linux Docker

## Pré-configuração para VM

Para máquinas virtuais, é recomendado o uso do `Oracle VM Virtual Box`.

Antes de iniciar a máquina virtual é necessário fazer a seguinte configuração para garantir que a Raspberry Pico seja indentificada dentro da VM:

![embarcadosvirtualbox](https://github.com/insper-embarcados/site/assets/82840303/2f7f82e0-9d30-4af0-b4f3-365bbda418fc)


1.    Abra as Configurações -> USB
2.    Verifique se o controlador USB está habilitado.
3.    Clique no símbolo do "USB +" para adicionar a Raspberry Pi Pico.



> Tutorial para Ubuntu 22.04, da para facilmente adaptar para outro linux (por conta do aluno)

!!! task "docker"

    Siga as instrucões em:
    
    - https://docs.docker.com/engine/install/ubuntu/#installation-methods

    Teste com:
    
    ```bash
    sudo docker run hello-world
    ```
    
    > Este comando baixa uma imagem de teste e a executa em um contêiner. Quando o contêiner é executado, ele imprime uma mensagem de confirmação e encerra.

!!! task "Configurando permissão"
    Siga os passos no site a seguir, para podermos executar o docker sem permissão de super usuário:
    
    - https://docs.docker.com/engine/install/linux-postinstall/

    Teste com:
    
    ```bash
    docker run hello-world
    ```

!!! task "vscode"
    Instale o vscode:
    
    - https://linuxhint.com/install-visual-studio-code-ubuntu22-04/
    
    Teste com:
    
    ``` bash
    $ code 
    ```
!!! task "Wokwi-cli"

    1. Instale o wokwi-cli (simulador de sistemas embarcados)

    ```bash
    sudo snap install curl
    curl -L https://wokwi.com/ci/install.sh | sh
    ```
    
    2. Crie uma conta no site:
    
    - https://wokwi.com/

    3. Entre em: CI Tokens: https://wokwi.com/dashboard/ci
    
    ![](imgs/wokwi-token.png)
    
    4. Gere um token e copie o código
    
    5. Cole na última linha do arquivo `.bashrc`
    
    ```bash
    gedit ~/.bashrc
    ```
    
!!! task
    Configurando permissão:
    
    ```bash
    sudo usermod -a -G "$(stat -c "%G" /dev/ttyUSB0)" $USER
    sudo reboot
    ```
    

## Testando tudo

Agora que já temos toda a infra instalada, vamos testar!

!!! task "infra-test"

    1. Clone o repositório com códigos de teste
    
    ```bash
    git clone https://github.com/insper-embarcados/infra-test.git
    ```

    2. Abra o respositório no vscode
    
    ```bash
    code infra-test/
    ```
    
    ==Instale todas as extensões sugeridas!==

    3. Abrir no dev-container
    
    Após tudo instaldo, vamos abrir a pasta no docker criado para a disciplina! 
    
    - **ctrl** + **shift** + **p**
    - **Dev. Containers: Open Folder in Container..**
    
    >> isso deve demorar um pouco!

    4. Vamos compilar o projeto!
    
    Clique em build na barra inferior:
    
    ![](imgs/vscode-build.png)
    
    5. Escolha o compilador `arm-none-eabi`
    
    ![](imgs/vscode-arm.png)

    Você deve obter:
    
    ![](imgs/vscode-build-done.png)

!!! task
    Programando e depurando
    
    1. Conecte o debug-probe e a rasp 
    
    2. Selecione o programa que iremos depurar
    
    ![](imgs/config-debug.png)

    3. Abra o serial monitor (terminal)
    
    ![](imgs/config-serial.png)

    4. Inicialize o software
    
    ![](imgs/config-run.png)

    ==Você deve obter o Hello world== no serial
