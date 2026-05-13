# HC-06

::: info Código exemplo
    Usar o código exemplo em:
    
    https://github.com/insper-embarcados/pico-rtos-hc06-rx-tx
:::

O  [HC-06](https://www.olimex.com/Products/Components/RF/BLUETOOTH-SERIAL-HC-06/resources/hc06.pdf) é um módulo bluetooth popular (R$ 40) que pode funcionar como `device` , neste exemplo usaremos como device (conectando-se ao computador). O Computador (Windows ou Linux) virá enxergar o módulo HC-06 como um dispositivo bluetooth, e uma vez pareado o Windows irá criar uma porta COM (Serial --> Outgoing / Saída) associado a conexão, nessa porta faremos a recepção e envio dos dados via bluetooth.

O modulo será conectado ao microcontrolador através de uma comunicação UART (muito similar ao que vocês implementaram na disciplina Camada Física), o microcontrolador pode enviar dados para o computador por esta porta (TX) ou receber dados do computador (RX), conforme diagrama a seguir:

``` 
    +----------+           		+-------+             +----------+
    |    +-----|            	|       |   <---->    |    +-----|
    |    |USART| tx -------> RX |       |             |    | COM <---> Python ---> (Aplicação)
    |    +-----| rx <------- TX |       |  BLUETOOTH  |    +-----|
    | uc       |           		| HC-06 |             | PC       |
    +----------+            	+-------+             +----------+
```

No microcontrolador, iremos usar um **periférico** da pico chamado UART para realizar a serialização e desserialização do dado no protocolo UART. A comunicação com o módulo HC-06 segue um protocolo chamado de [AT Command](http://wiki.sunfounder.cc/images/7/7b/HC-06_AT_Commands_Reference.pdf).

Já no computador iremos usar um programa em **python** que acessará a porta COM criada pelo sistema operacional para enviar e receber dados do microcontrolador via protocolo Bluetooth. Note que estamos lidando com o Bluetooth de forma "transparente", apenas como "usuários", toda a mágica acontece dentro do HC-06.

::: tip HC-05
Exsite um outro dispositivo similar chamado de HC-05, esse módulo é mais completo e pode funcionar como `device` ou `host`.
:::

## Montagem do Exemplo

Conecte o hardware como indicado a seguir:

![](imgs-dispositivos/hc06/diagrama.png)

O exemplo faz uso dos pinos:

- **HC-VCC:** 5V (alimentação)
- **HC-GND**: GND (alimentação)
- **HC-TX:** Ligado na **UART 1 - RX** (recebimento de dados)
- **HC-RX:** Ligado na **UART 1 - TX** (transmissão de dados)
- **HC-EN:** Ligado no **GP6** (configurar modo de funcionamento)

::: tip
O pino `STATE` indica o estado do bluetooth, se ele está conectado ou pronto para parear. Por exemplo, se você precisar indicar para o usuário se o controle (bluetooth) está ou não conectado, você pode utilizar esse pino para isso.
:::


# Firmware do Exemplo

O firmware utiliza FreeRTOS com quatro tarefas independentes e duas filas de comunicação (`xQueueRX` e `xQueueTX`).

<!--![Diagrama de blocos do firmware](imgs-dispositivos/hc06/firmware.png) -->

A `init_task` configura os pinos via `gpio_set_function`, a UART e chama `hc06_config(name, pin)` para definir o nome e PIN do dispositivo Bluetooth — depois se auto-destrói. A recepção é orientada por IRQ: a interrupção notifica a `rx_task` via *task notification*, que lê os bytes e os enfileira. A `tx_task` consome a fila de envio e escreve na UART. A `serial_task` faz a ponte entre o terminal USB e o Bluetooth.

Ao inicializar, a UART de debug exibe o progresso da configuração do HC-06, testando primeiro 9600 baud e, se necessário, 115200 baud:

```
Tentando baud = 9600...
Conectado!

Alterando baud rate para 115200...
Baud rate OK

Configurando nome...
Nome OK

Configurando PIN...
PIN OK

HC-06 configurado!
```

::: warning
No caso ilustrado acima, a configuração ocorreu sem erros ou retries: o módulo respondeu logo na primeira tentativa. Se o módulo estiver em outro baud rate, o firmware exibirá mensagens adicionais indicando novas tentativas até que a comunicação seja estabelecida.
:::


A sequência de inicialização e configuração automática é realizada pela função `hc06_config`, chamada pela `init_task` durante o boot do sistema:

Essa rotina:
- Coloca o HC-06 em modo AT
- Tenta comunicar em 9600 e, se necessário, em 115200 baud, exibindo mensagens de progresso e erro
- Ajusta o baudrate do módulo para 115200 se ele estiver em 9600
- Configura o nome e PIN, repetindo em caso de falhas
- Restaura o modo normal após terminar


# Testando

Para testar a conexão rode o terminal.py e configure as portas COM conforme for necessário, assim você pode enviar comando da serial da pico para o bluetooth e do bluetooh para a pico e monitorar.

Agora será necessário conectar o computador no HC-06, para isso temos que seguir tutoriais específicos de cada sistema operacional:

- [Linux](https://marcqueiroz.wordpress.com/aventuras-com-arduino/configurando-hc-06-bluetooth-module-device-no-ubuntu-12-04/)
- [Windows](https://embeddedprogrammer.blogspot.com/2012/07/windows-communicating-with-hc-06.html)

Após conectado é só selecionar a porta criado por cada um dos sistemas operacionais.
