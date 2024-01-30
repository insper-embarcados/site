# Infra Linux Docker

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

    Instale o wokwi-cli (simulador de sistemas embarcados)

    ```bash
    sudo snap install curl
    curl -L https://wokwi.com/ci/install.sh | sh
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

