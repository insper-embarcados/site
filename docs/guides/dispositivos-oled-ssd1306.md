# OLED SSD1306

::: info Código exemplo
Usar o código exemplo disponível em:

- https://github.com/insper-embarcados/pico-oled-ssd1306
:::

O display [OLED SSD1306](https://www.electronicaembajadores.com/datos/pdf1/lc/lcgr/lcgrol3.pdf) é um periférico compacto e amplamente utilizado em sistemas embarcados. Ele é baseado no controlador **SSD1306**, da Solomon Systech, que integra toda a lógica de controle do painel OLED em um único chip. O controlador é encontrado em módulos de diferentes resoluções — sendo as mais comuns **128×32** e **128×64** pixels — e suporta interfaces de comunicação **I2C**, **SPI** e paralela 8-bit. Neste exemplo, utilizamos a versão **128×32** com comunicação **I2C**.

Ao contrário de displays LCD, os painéis OLED emitem luz própria: cada pixel é um LED orgânico que acende individualmente, dispensando backlight. Isso resulta em contraste elevado, pretos verdadeiros e baixo consumo quando a maior parte da tela está apagada.

O diagrama a seguir ilustra o fluxo de dados entre o microcontrolador e o display:

```
    +----------+                       +----------+
    |    +-----|                       |          |
    |    | I2C | SDA/SCL ---------->  | SSD1306  |
    |    +-----|                       |   OLED   |
    | Pico     |                       |          |
    +----------+                       +----------+
```

No microcontrolador, toda a renderização é feita em software: a aplicação escreve em um **framebuffer** local na memória da Pico e, ao final de cada ciclo, o driver transfere esse conteúdo para a memória interna do SSD1306 via I2C. O controlador, então, lê continuamente sua própria GDDRAM e acende os pixels correspondentes — o microcontrolador não precisa fazer nada além de atualizar o framebuffer quando necessário.

::: tip Variantes do SSD1306
O controlador SSD1306 é encontrado em displays de diferentes resoluções, sendo as mais comuns **128×32** e **128×64** pixels. A biblioteca `ssd1306` suporta ambas as variantes — basta ajustar o parâmetro `height` na chamada de `ssd1306_init()`. A pinagem e o endereço I2C são idênticos entre as variantes. Neste exemplo utilizamos a versão **128×32**.
:::

## Protocolo I2C

O **I2C** (Inter-Integrated Circuit) é um protocolo de comunicação serial síncrono criado pela Philips (hoje NXP) que utiliza apenas **dois fios**:

- **SDA** (Serial Data): linha bidirecional por onde os dados trafegam
- **SCL** (Serial Clock): sinal de clock gerado pelo controller para sincronizar a comunicação

O barramento I2C segue um modelo **controller-target**: o microcontrolador (controller) inicia todas as transações, e os periféricos (targets) respondem quando endereçados. Cada target possui um **endereço de 7 bits** único no barramento, o que permite conectar múltiplos dispositivos nos mesmos dois fios simultaneamente — desde que não compartilhem o mesmo endereço.

```
Pico (controller)
    |
    +--- SDA ---+--- SSD1306 (0x3C) ---+--- outro sensor (0x48) ---...
    |           |
    +--- SCL ---+
```

As linhas SDA e SCL são do tipo **open-drain**: os dispositivos apenas puxam a linha para baixo (nível 0); para nível alto, dependem de **resistores de pull-up** conectados ao VCC. Na Pico, esses pull-ups podem ser habilitados via software, dispensando resistores externos para velocidades padrão.

O I2C opera em diferentes velocidades:

| Modo | Velocidade |
|------|-----------|
| Standard | 100 kHz |
| Fast | 400 kHz |
| Fast-plus | 1 MHz |

Neste exemplo, o barramento é configurado a **400 kHz** (modo Fast), que é o máximo suportado pelo SSD1306.

Uma transação I2C para escrita segue a seguinte sequência:

1. Controller envia condição de **START**
2. Controller envia o **endereço do target** (7 bits) + bit de escrita (0)
3. Target responde com **ACK**
4. Controller envia bytes de dados; target confirma cada um com ACK
5. Controller envia condição de **STOP**

::: tip
No SSD1306, cada byte enviado após o endereço é precedido por um **byte de controle** que indica se o dado é um comando (configuração do display) ou dado gráfico (conteúdo do framebuffer). O driver `ssd1306` cuida desses detalhes automaticamente.
:::

## Controlador SSD1306

O SSD1306 possui internamente uma memória chamada **GDDRAM** (Graphic Display Data RAM) com 128×64 bits, organizada em 8 páginas de 128 bytes cada. Cada bit corresponde a um pixel. O controlador lê essa memória continuamente e controla o painel OLED de acordo.

A comunicação com o SSD1306 via I2C distingue dois tipos de conteúdo pelo byte de controle:

- **0x00** → o próximo byte é um **comando** (configura contraste, orientação, modo de endereçamento, liga/desliga display, etc.)
- **0x40** → os bytes seguintes são **dados gráficos** a serem escritos na GDDRAM

O SSD1306 suporta três modos de endereçamento da GDDRAM: por página, horizontal e vertical. O driver utiliza o **modo de endereçamento horizontal**, que permite transferir o framebuffer inteiro em uma única transação I2C, percorrendo automaticamente todas as colunas e páginas.

## Montagem Exemplo

Conecte o hardware como indicado a seguir:

| Pico   | OLED SSD1306 |
|--------|--------------|
| GPIO 2 | SDA          |
| GPIO 3 | SCL          |
| 3.3V   | VCC          |
| GND    | GND          |

O exemplo faz uso dos pinos:

- **OLED-VCC:** 3.3V (alimentação)
- **OLED-GND:** GND (alimentação)
- **OLED-SDA:** Ligado ao **I2C1 - SDA** (GPIO 2)
- **OLED-SCL:** Ligado ao **I2C1 - SCL** (GPIO 3)

## Firmware Exemplo

> Marco adicionar imagem imgs-dispositivos/oled-ssd1306/firmware.png

O firmware opera sem FreeRTOS, com um laço principal (`while(true)`) que atualiza o display a cada 10 ms.

A inicialização é feita diretamente no `main()`: `gpio_config()` configura os GPIOs 14 a 17 como entrada com pull-up, e `oled_init()` prepara o barramento I2C e o display. Em seguida, exibe a mensagem `"Iniciando..."` por 1 segundo e limpa a tela antes de entrar no laço principal.

A função `oled_init()` executa a seguinte sequência:

- `i2c_init(i2c1, 400000)` — inicializa o barramento I2C1 a 400 kHz
- Configura GPIO 2 e GPIO 3 como função I2C
- Ativa os pull-ups internos nos pinos SDA e SCL
- Chama `ssd1306_init(&disp, 128, 32, 0x3C, i2c1)` para inicializar o display 128×32
- Limpa a tela e envia o framebuffer inicial com `ssd1306_show()`

No laço principal, a cada ciclo o framebuffer é limpo, os quatro GPIOs são lidos e seus estados escritos no display em duas colunas, e `ssd1306_show()` transfere o conteúdo ao display:

| Posição | Conteúdo |
|---------|----------|
| Coluna esquerda, linha 0 | `GP14=TRUE` ou `GP14=FALSE` |
| Coluna direita, linha 0 | `GP17=TRUE` ou `GP17=FALSE` |
| Coluna esquerda, linha 24 | `GP15=TRUE` ou `GP15=FALSE` |
| Coluna direita, linha 24 | `GP16=TRUE` ou `GP16=FALSE` |

A leitura das entradas é feita por `gpio_config()`, que configura os pinos abaixo como entrada com pull-up:

| GPIO | Função |
|------|--------|
| GPIO 14 | Entrada 1 |
| GPIO 15 | Entrada 2 |
| GPIO 16 | Entrada 3 |
| GPIO 17 | Entrada 4 |

## Camada Gráfica

A renderização do conteúdo é feita em um **framebuffer** local na memória da Pico — um array de bytes que representa a tela pixel a pixel. A estrutura do sistema segue o modelo de camadas abaixo:

```
Aplicação -> Biblioteca Gráfica -> Driver SSD1306 -> I2C -> Display
```

- A **aplicação** decide o que deve ser mostrado
- A **biblioteca gráfica** organiza o conteúdo no framebuffer em memória
- O **driver SSD1306** traduz o framebuffer em comandos e dados I2C, transferindo-o para a GDDRAM do controlador

Esse modelo evita atualizações desnecessárias diretamente no hardware: a tela só muda quando `ssd1306_show()` é chamado. O driver fornece funções para inicializar o painel, limpar a tela, desenhar strings e enviar o framebuffer.

::: tip Framebuffer x GDDRAM
O **framebuffer** vive na RAM da Pico e pode ser modificado livremente a qualquer momento, sem custo de comunicação. A **GDDRAM** é a memória interna do SSD1306 que de fato controla os pixels. A chamada `ssd1306_show()` é o momento em que os dois são sincronizados via I2C.
:::

::: warning
No código atual, o display é limpo e reescrito a cada ciclo do laço principal. Em aplicações mais complexas, considere atualizar o display apenas quando o estado mudar para reduzir o tráfego no barramento I2C e liberar tempo de CPU.
:::

## Testando

Para validar o funcionamento do OLED, compile e grave o firmware na Raspberry Pi Pico. Ao iniciar, o display deve exibir `"Iniciando..."` por 1 segundo e, em seguida, começar a exibir o estado das entradas em tempo real.

### Verificando a montagem

Se a tela permanecer em branco, verifique os pontos abaixo:

- Alimentação **VCC** (3.3V) e **GND** conectados corretamente
- Ligações de **SDA** (GPIO 2) e **SCL** (GPIO 3) sem inversão
- GPIOs corretos configurados no firmware
- Endereço I2C do display definido como **0x3C** no código

### Comportamento esperado

O display exibe o estado dos quatro GPIOs em duas colunas. Quando as entradas mudarem de estado, o conteúdo é atualizado no próximo ciclo do laço principal:

- `GP14=TRUE` ou `GP14=FALSE`
- `GP15=TRUE` ou `GP15=FALSE`
- `GP16=TRUE` ou `GP16=FALSE`
- `GP17=TRUE` ou `GP17=FALSE`
