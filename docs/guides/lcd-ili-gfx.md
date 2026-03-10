---
tags:
  - lcd
  - gxf
description: Uso de LCD
---

# LCD

O LCD que iremos usar nas próximas atividades da disciplina é fabricado pela adafruit com o nome de: [`2.8" TFT LCD with Touchscreen Breakout Board w/MicroSD Socket - ILI9341`](https://www.adafruit.com/product/1770) ele possui um LCD de `240x320` pixels operando em RGB e com uma sensor touch resistivo. O LCD é controlado por um controlador chamado de [**ILI9341**](https://cdn-shop.adafruit.com/datasheets/ILI9341.pdf) ele é responsável por atualizar e exibir as informações na tela. 

![](https://cdn-shop.adafruit.com/970x728/1770-01.jpg){width=500}

## ILI9341

O LCD utiliza o circuito integrado [ILI9341](https://cdn-shop.adafruit.com/datasheets/ILI9341.pdf) como controlador do display, este CI é responsável por toda parte de baixo nível de acesso ao LCD, este chip possui duas formas de interface com o uC: Paralelo e SPI. Iremos utilizar ele operando via SPI como ilustrado a seguir:

```
  x---------x           x---------x
  |         |           |         |
  | uc      |           | LCD     |
  |   ------|    spi    |-------  |
  |   | spi | <---/---> | ili  |  |
  x---------x           x---------x
```


::: box "ILI9341"
**a-Si TFT LCD Single Chip Driver 240RGBx320 Resolution and 262K color**

LI9341 is a 262,144-color single-chip SOC driver for a-TFT liquid crystal display with resolution of 240RGBx320 dots,  comprising  a  720-channel  source  driver,  a  320-channel  gate  driver,  172,800 bytes  GRAM  for  graphic display data of 240RGBx320 dots, and power supply circuit.

ILI9341  supports  parallel  8-/9-/16-/18-bit  data  bus  MCU  interface,  6-/16-/18-bit  data  bus  RGB  interface  and 3-/4-line serial peripheral interface (SPI). The moving picture area can be specified in internal GRAM by window address  function.  The  specified  window  area  can  be updated  selectively,  so  that  moving  picture  can  be displayed simultaneously independent of still picture area. 

ILI9341  can  operate  with  1.65V  ~  3.3V  I/O  interface  voltage  and  an  incorporated  voltage  follower  circuit  to generate voltage levels for driving an LCD. ILI9341 supports full color, 8-color display mode and sleep mode for precise power control by software and these features make the ILI9341 an ideal LCD driver for medium or small size portable products such as digital cellular phones, smart phone, MP3 and PMP where long battery life is a major concern.  

> Extraído do manual.
:::

## Touch

O LCD possui um "película" de [touchscreen resistivo](https://en.wikipedia.org/wiki/Resistive_touchscreen) que possibilita detectarmos toques na tela, conforme ilustrado a seguir:

![](imgs/resistive.png){width=300} 
![](imgs/resistive2.png){width=300}

> Fonte das figuras: https://www.ti.com/lit/an/slyt209a/slyt209a.pdf

A película fornece dois valores de resistência: X e Y e via duas leituras analógicas conseguimos estimar onde aconteceu o toque na tela, e inclusive a pressão do toque.  O módulo de touch resistivo funciona de forma independente do display, sendo responsável por detectar a posição do toque na superfície da tela.

A Conexão do touch resistivo com o uC acontece via duas leituras analógicas conforme diagrama a seguir:

```
  x---------x          x----------- x
  |     dx  | -------> |  t  | LCD |
  | uc  dy  | -------> |  o  |     |
  |    AFEC | <------- |  u  |     |
  |    AFEC | <------- |  c  |     |
  x---------x          x-----------x
```

::: box
Como o touch não acompanha automaticamente a rotação aplicada ao display, é necessário realizar uma transformação das coordenadas para que o ponto detectado corresponda corretamente à interface gráfica exibida.
:::

# Bibliotecas gráficas

> Também conhecido por: GFX "Graphics" or "Graphic Effects"

O LCD é apenas responsável por exibir um `px` no display, normalmente ele é utilizado em conjunto com uma 
bibliotecas gráfica que estará sendo executada no microcontrolador e será responsavel por desenhar a tela e então se comunicar com o LCD para que os `pixels` sejam atualizados.

::: box-green framebufer
A maioria das bibliotecas gráficas trabalham com o conceito de [framebuffer](https://en.wikipedia.org/wiki/Framebuffer) que é uma região contínua de memória usada para armazenar a imagem que será exibida na tela, essa tecnologia é usado em vários lugares, inclusive no [linux](https://en.wikipedia.org/wiki/Linux_framebuffer). Em alguns casos é necessário dois framebuffers operando no modo [ping pong buffer](https://embedded.fm/blog/2017/3/21/ping-pong-buffers)
:::

Existem diversas bibliotecas gráficas que podem ser utilziadas para desenvolvimento de aplicacões embarcadas, caso queiram utilizar uma diferente da que será utilziada no curso, indicamos darem uma olhada no [lvgl](https://lvgl.io/) [^1].


[^1]: Essa lib foi utilizada em versões anteriores do curso, caso precise de ajuda a equipe possui domínio sobre ela.

# gfx

Nos exemplos do curso vocês irão trabalhar com uma `gfx` criada pelo Marco. Ela é uma lib bem simples, porém permitirá que vocês criem bastante coisas. A lib possui atualmente as seguintes funcoes, e funciona apenas com o controlador de display `ILI9341`.

- `gfx_init()` para inicializar o display e o subsistema gráfico
- `gfx_clear()` para limpar completamente a tela
- `gfx_fillRect()` para desenhar retângulos preenchidos
- `gfx_drawRect()` para desenhar retângulos apenas com contorno
- `gfx_drawCircle()` para desenhar círculos com espessura configurável
- `gfx_drawBitmap()` para desenhar bitmaps monocromáticos
- Definir a posição do texto com `gfx_setCursor()`
- Ajustar tamanho do texto com `gfx_setTextSize()`
- Ajustar cor do texto com `gfx_setTextColor()`
- Imprimir texto a partir do cursor com `gfx_print()`
- Desenhar texto em posição específica com `gfx_drawText()`
- Obter a largura em pixels de um texto com `gfx_getTextWidth()`
- Converter coordenadas brutas do touch com `gfx_touchTransform()`
- Desenhar botão retangular com `gfx_But_drawRect()`
- Verificar se botão retangular foi pressionado com `gfx_But_isPressed()`
- Desenhar botão com imagem usando `gfx_But_drawBitmap()`
- Verificar se botão com imagem foi pressionado com `gfx_But_isPressedBitmap()`

## Snippets

Códigos de exemplo para o uso do LCD.

### Hello world

```c
#include <stdio.h>
#include "pico/stdlib.h"
#include "hardware/gpio.h"
#include "hardware/adc.h"

// Bibliotecas para o display ILI9341
#include "tft_lcd_ili9341/ili9341/ili9341.h"
#include "tft_lcd_ili9341/gfx/gfx.h"
#include "tft_lcd_ili9341/touch_resistive/touch_resistive.h"

// === Definições para ILI9341 ===
const uint LITE = 15;         // Pino de controle da luz de fundo (backlight)
#define SCREEN_WIDTH 240      // Largura da tela em pixels

int main(void) {
    stdio_init_all();         // Inicializa entrada/saída padrão (USB serial)

    // Inicialização do display LCD e sistema gráfico
    LCD_initDisplay();        // Inicializa o controlador do display
    LCD_setRotation(0);       // Define a rotação da tela (0 = retrato padrão)
    GFX_createFramebuf();     // Cria um framebuffer em memória para renderização

    configure_touch();        // Inicializa o sistema de leitura do touch resistivo

    // Configura o pino de backlight como saída e ativa a luz de fundo
    gpio_init(LITE);
    gpio_set_dir(LITE, GPIO_OUT);
    gpio_put(LITE, 1);        // Liga o backlight (nível alto)

    int px, py;               // Variáveis para armazenar coordenadas do toque

    while (true) {
        // === Parte de atualização gráfica da tela ===
        GFX_clearScreen();              // Limpa o framebuffer
        GFX_setCursor(0, 10);           // Define posição do texto
        GFX_printf("Touch Demo\n");     // Mostra título/demonstração

        // Verifica se há toque na tela e lê as coordenadas
        if (readPoint(&px, &py)) {
            px = SCREEN_WIDTH - px;    // Inverte eixo X, para exibir o valor correto
            GFX_printf("X:%03d Y:%03d\n", px, py);  // Exibe coordenadas do toque
        } else {
            GFX_printf("Sem toque\n"); // Mensagem quando não há toque detectado
        }

        GFX_flush();       // Atualiza o display com o conteúdo do framebuffer
        sleep_ms(1);       // Pequeno atraso para evitar uso excessivo da CPU
    }
}
```



