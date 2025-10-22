# Expert - DSP - Inteligência Artificial

Neste laboratório iremos utilizar a MPU6050 IMU (aquele mesmo mesmo módulo utilizado no laboratório [6 - i2c](https://insper-embarcados.github.io/site/labs/i2c-pra-lab/)) para classificar movimentos de um acelerômetro no espaço. Com o módulo I2C conectado à Raspberry Pico, utilizaremos o software Edge Impulse para treinar e classificar movimentos, tais como *idle* (parado), *updown* (cima-baixo) e *wave* (acenando). No final do laboratório teremos o nosso dispositivo na borda processando todos os dados, sem a necessidade de internet.

!!! tip
    Vocês devem utilizar como código base dos repositórios a seguir, utilize o  `lab-exp-dsp-ia-mpu-forwarder` para fazer a captura dos dados da imu para nuvem, e quando finalizar o laboratório e tiver gerado o modelo utilize o `lab-exp-dsp-ia` para deploy do seu modelo e teste, mais informações sobre como fazer isso a seguir.
    
    - https://github.com/insper-embarcados/lab-exp-dsp-ia-mpu-forwarder

    - https://github.com/insper-embarcados/lab-exp-dsp-ia

### Definições

**Edge Computing** é uma arquitetura de TI onde dados são processados na borda, ou seja, o mais próximo possível da origem dos dados. No caso da utilização do microcontrolador para Edge Computing, os dados de sensores, câmeras e outros são processados nele, o que traz algumas vantagens, tais como: serviços mais rápidos e confiáveis, diminuição de custos com máquinas na nuvem.

"Para exemplificar o uso da edge computing para processar dados em tempo real, podemos pensar em uma fábrica moderna. No chão da fábrica, os sensores de Internet das Coisas (IoT) geram um fluxo contínuo de dados que pode ser usado para evitar interrupções e melhorar as operações. Estima-se que uma fábrica moderna com 2.000 equipamentos possa gerar 2.200 terabytes de dados por mês. Portanto, é mais rápido e econômico processar esse volume de dados quando ele está mais próximo do equipamento, em vez de transmiti-lo para um centro de processamento de dados remoto primeiro. No entanto, é recomendável que o equipamento esteja conectado por meio de uma plataforma de dados centralizada. Assim, o equipamento pode, por exemplo, receber atualizações de software padronizadas e compartilhar dados filtrados que ajudam a melhorar as operações em outros locais da fábrica." - [RedHat](https://www.redhat.com/pt-br/topics/edge-computing/what-is-edge-computing)

- Leitura opcional: [O que é Edge Computing?](https://www.redhat.com/pt-br/topics/edge-computing/what-is-edge-computing)

**Edge Impulse** é uma empresa que trabalha em meios para ajudar desenvolvedores de aplicações de machine learning para embarcados a criarem e otimizarem soluções desta área.

**Edge Impulse CLI** (Edge Impulse Command Line Interface) é a aplicação que é necessária para controlar e configurar um dispositivo para um projeto do Edge Impulse, que no nosso caso é um microcontrolador.

- Leitura obrigatória: [Edge Impulse CLI](https://docs.edgeimpulse.com/docs/tools/edge-impulse-cli)

### Instalação do Edge Impulse no Linux

Antes de começar temos que realizar alguns procedimentos para utilizarmos o Edge Impulse.

1. Crie uma conta no [Edge Impulse](https://edgeimpulse.com/).

2. Verifique se possui **Python 3** instalado no computador.

3. Instale Node.js v20 ou superior no computador.

``` bash
curl -sL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v
```

Verifique o diretório de instalação do Node.

``` bash
npm config get prefix
```


Se retornar ``` /usr/local/```  , rode os seguintes comandos para mudar o diretório padrão do npm.

``` bash
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.profile
```

4. Instale o edge-impulse-cli.

``` bash
npm install -g edge-impulse-cli
reboot
``` 

## Lab

Trabalhar com IA em sistemas embarcados não é uma tarefa tão fácil, pensando nisso a Edge Impulse desenvolveu uma solução que ajuda desenvolvedores de sistemas embarcados a desenvolverem seus modelos e dar o deploy desses modelos em computadores de um modo intuitivo e eficiente. 

Com o MPU6050 podemos medir a temperatura, a aceleração e o giroscópio, com essas informações, em relação ao tempo, podemos classificar padrões que se repetem e podemos assim predizer diversas coisas baseadas nesses dados. Podemos por exemplo fixar o módulo no corpo de uma pessoa, coletar dados dela realizando movimentos específicos (como andar) e por meio destes dados podemos classificar quando alguém está andando ou quando alguém está parado, seja com finalidade de monitorar a atividade física da pessoa, como velocidade, número de passos, etc.

Para analisar os dados "crus" do acelerômetro do MPU6050 podemos utilizar o recurso de machine learning do Edge Impulse, treinar, e classificar novos movimentos baseado no dataset que criamos previamente.


No link abaixo, há um exemplo do próprio Edge Impulse que demonstra uma aplicação que identifica 4 situações, a primeira em que o sujeito está **idle/sentado**, a segunda **snake** em que o mesmo move um acelerômetro sobre a mesa, a terceira **wave** em que o usuário movimenta o acelerômetro da esquerda para direita e a última **updown** em que o usuário movimenta o dispositivo para cima e para baixo.

Tome como base o seguinte projeto:

- [Continuous Motion Recognition]( https://docs.edgeimpulse.com/docs/tutorials/end-to-end-tutorials/continuous-motion-recognition)

Abaixo, na figura 1, há a representação do fluxo de dados e interconexão entre dispositivos e servidor no cenário de utilização dos serviços do Edge Impulse. 

Figura 1 - Edge Impulse Workflow

![edge impulse workflow](./imgs-dsp/ia-edgeflux.png)

Abaixo há um vídeo demonstrando a classificação do modelo gerado no Edge Impulse com a Raspberry Pico + MPU6050 para classificar **idle, updown e wave**.

!!! video
    ![](https://youtu.be/Yk3hq3IcJR4)


### Outras observações

Atente para os seguintes detalhes:

- Neste laboratório utilizaremos o comando **edge-impulse-data-forwarder** para enviarmos os dados dos sensores da nossa raspberry Pico para o edge Impulse.

- Leia sobre [cli-data-forwarder](https://docs.edgeimpulse.com/docs/tools/edge-impulse-cli/cli-data-forwarder) para saber como manipular os dados corretamente e envia-los para o Edge Impulse a partir da raspberry Pico. Atente-se ao formato do protocolo. **Durante a etapa de aquisição de dados / treinamento seŕa necessário rodar o código da mpu-data-forwarder, do mesmo repositório, para captar os dados da Raspberry Pico W.**

- Quando for a fase de deploy no Edge Impulse, será necessário configurar o deploy para buildar uma biblioteca de C++, a qual utilizaremos no nosso repositório classroom.



## Entrega

Para entrega você deve ter um modelo treinado por você rodando localmente (através da cópia dos arquivos gerados no Edge Impulse) na Raspberry Pico que manipulará um LED RGB para demonstrar quando a pessoa deixa o MPU parado, quando ela move ele da esquerda para a direita (Wave) e quando ela move o dispositivo de cima para baixo (updown). Utilize a frequência de 62.5 Hz para coleta de dados.

Dicas:

- Primeiro de tudo, leia as leituras sugeridas nos links aqui do laboratório, são essenciais para o entendimento da integração da raspberry pico com o edge impulse.
- Comece criando uma conta do Edge Impulse.
- Dê preferência pela documentação oficial do Edge impulse.
- Tome como base o seguinte projeto: [Continuous Motion Recognition]( https://docs.edgeimpulse.com/docs/tutorials/end-to-end-tutorials/continuous-motion-recognition)
- Realize a aquisição de dados com três labels, idle, updown e wave.
- Configure o Impulse Design tomando como base o projeto [Continuous Motion Recognition]( https://docs.edgeimpulse.com/docs/tutorials/end-to-end-tutorials/continuous-motion-recognition)
- Por padrão as saídas que serão utilizadas para identificar os movimentos são: GP15, GP16 e GP17, não importa qual a cor do RGB cada um controlará.
- Os arquivos gerados no Edge Impulse que deverão ser incluídos no teu projeto são **tflite-model, model-parameters e o edge-impulse-sdk**, não inclua o restante para não desconfigurar o projeto.
- Verifique no código onde está conectado os pinos SDA e SCL do módulo I2C.

É necessário substituir esses arquivos do teu projeto que vieram por padrão pelo gerado na etapa de **Deploy** no site do **Edge Impulse**, esses arquivos juntos compõem o Output do seu modelo treinado, sendo eles essenciais para que sua aplicação funcione. Conforme a Figura 2 você precisará extrair os arquivos na pasta do teu projeto, substuindo os que estão lá.

Figura 2 - Substituindo bibliotecas do Edge Impulse

![edge impulse workflow](./imgs-dsp/ia-deploy.png)




## Referências:

https://edgeimpulse.com/about

https://www.redhat.com/pt-br/topics/edge-computing/what-is-edge-computing
