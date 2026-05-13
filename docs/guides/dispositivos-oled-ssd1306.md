# OLED SSD1306

::: info Código exemplo
Usar o código exemplo disponível em:

- https://github.com/insper-embarcados/pico-oled-ssd1306
:::

O display OLED baseado no controlador **SSD1306** é um periférico bastante comum em sistemas embarcados. Neste projeto, ele é utilizado para exibir informações simples de forma direta, sem placa auxiliar, com ligação física feita apenas por jumpers entre o display e a Raspberry Pi Pico.

A comunicação é feita por **I2C**, usando o periférico **I2C1** da Pico. Essa escolha simplifica a montagem e reduz a quantidade de fios necessários.

## Montagem Exemplo

Conecte o hardware como indicado a seguir:

| Conexão Pico | Conexão OLED |
| --- | --- |
| GPIO 2 | SDA |
| GPIO 3 | SCL |
| GND | GND |
| VCC | VCC |

::: tip
Os pinos GPIO 2 e GPIO 3 são configurados como interface **I2C** no firmware. Os resistores de pull-up do barramento são habilitados via software.
:::

Essa montagem utiliza apenas **4 jumpers**, sem uso de placa adaptadora ou módulo intermediário.

## Display

O display utilizado neste projeto possui as seguintes características:

- Controlador: **SSD1306**
- Resolução: **128 x 32 pixels**
- Interface: **I2C**

O display não processa textos ou gráficos por conta própria. Toda a renderização é feita no microcontrolador, que atualiza a imagem exibida no OLED.

## Firmware Exemplo

A inicialização do sistema é feita diretamente no `main()`.

O fluxo principal é o seguinte:

- configura os GPIOs de entrada
- inicializa o barramento I2C
- inicializa o display OLED
- limpa a tela
- escreve uma mensagem inicial
- entra em um laço contínuo atualizando o conteúdo do display

A configuração do OLED é realizada pela função `oled_init()`, que faz:

- `i2c_init(i2c1, 400000)`
- configuração dos pinos GPIO 2 e GPIO 3 como função I2C
- ativação dos pull-ups internos
- inicialização do `ssd1306`
- limpeza da tela
- atualização inicial do display

A leitura das entradas é feita por uma função separada (`gpio_config()`), que coloca os pinos abaixo como entrada com pull-up:

| GPIO | Função |
| --- | --- |
| GPIO 14 | Entrada 1 |
| GPIO 15 | Entrada 2 |
| GPIO 16 | Entrada 3 |
| GPIO 17 | Entrada 4 |

## Funcionamento

A aplicação opera de forma contínua:

1. lê o estado lógico das entradas digitais
2. limpa o framebuffer do display
3. escreve os textos correspondentes no OLED
4. envia o framebuffer atualizado para o display com `ssd1306_show()`

Exemplo de saída exibida na tela:

- `GP14=TRUE` ou `GP14=FALSE`
- `GP15=TRUE` ou `GP15=FALSE`
- `GP16=TRUE` ou `GP16=FALSE`
- `GP17=TRUE` ou `GP17=FALSE`

Esse comportamento permite acompanhar o estado das entradas em tempo real.

## Driver

O driver `ssd1306` é responsável pela comunicação de baixo nível com o display.

Ele fornece funções para:

- inicializar o painel OLED
- limpar a tela
- desenhar strings
- enviar o conteúdo do framebuffer para o display

A biblioteca gráfica trabalha em cima desse driver para tornar a renderização mais simples e organizada.

## Camada Gráfica

A renderização do conteúdo é feita em um **framebuffer** local na memória da Pico.

A estrutura geral do sistema é a seguinte:

```text
Aplicação -> Biblioteca Gráfica -> Driver SSD1306 -> I2C -> Display
```

Com esse modelo:

- a aplicação decide o que deve ser mostrado
- a camada gráfica organiza o conteúdo na memória
- o driver envia os dados ao OLED

Esse fluxo evita atualizações desnecessárias diretamente no hardware e facilita a manutenção do código.

::: tip
No código atual, o display é limpo e reescrito a cada ciclo do laço principal, o que simplifica a lógica de atualização.
:::

## Testando

Para validar o funcionamento do OLED, compile e grave o firmware na Raspberry Pi Pico.

Ao iniciar, o display deve apresentar a mensagem de boot e, em seguida, atualizar continuamente o estado das entradas conectadas aos GPIOs 14, 15, 16 e 17.

### Verificando a montagem

Se a tela permanecer em branco, confira os pontos abaixo:

- alimentação **VCC** e **GND**
- ligações corretas de **SDA** e **SCL**
- uso dos GPIOs corretos no firmware
- endereço I2C do display configurado como **0x3C**

### Comportamento esperado

Quando as entradas mudarem de estado, o conteúdo exibido no OLED também deve mudar imediatamente após a próxima atualização do laço principal.
