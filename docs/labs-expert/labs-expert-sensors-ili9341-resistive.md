# Expert - ili9341 com Touch Resistivo

::::: center
:::: third 
::: box-blue 1. Classroom
[:memo: Prática](https://classroom.github.com/a/5Xy3fY7o)
:::
::::
:::: third
::: box-yellow 2. Entrega final
[Enviar no PrairieLearn](https://us.prairielearn.com/pl/course_instance/210559)
:::
::::
:::: third
::: box Nota
70% da nota do laboratório
:::
::::
:::: third
::::
:::::

Neste laboratório, iremos aprender a utilizar funções do display LCD com driver ili9341 em conjunto com o módulo de touch resistivo.

::: warning Placa Adaptadora para o LCD
Desenvolvemos duas placas (PicoDock / TFT LCD Dock) que facilitam as conexões da Raspberry Pi Pico com o LCD ili9341:

![](imgs-ili9341-resistive/pico_tft_lcd_dock.jpeg){width=800px}
:::


::: box-red LEITURA

Antes de seguir no laboratório será necessário ler o material:

- [Sobre LCD](/guides/lcd-ili-gfx)
:::


## Definições

Neste laboratório iremos trabalhar com o display LCD TFT ili9341 e com o módulo de **Touch Resistivo**, permitindo que a aplicação possua saída gráfica e também interação com o usuário.

Com o LCD podemos:

- Exibir mensagens e informações na tela;
- Escrever textos em diferentes posições e tamanhos;
- Desenhar formas geométricas (retângulos, círculos e linhas);
- Renderizar imagens (bitmaps);
- Criar interfaces gráficas simples.

Com o **touch resistivo**, podemos:

- Detectar a posição do toque na tela;
- Criar áreas interativas, como botões;
- Desenvolver menus e interfaces gráficas;
- Implementar aplicações com interação direta do usuário.

### LCD TFT ili9341

O display TFT LCD ili9341 é um módulo gráfico amplamente utilizado em sistemas embarcados. Ele possui resolução típica de 320x240 pixels e suporte a milhares de cores, permitindo a construção de interfaces visuais mais elaboradas.

O controlador ili9341 é responsável por gerenciar a memória de vídeo e o mapeamento de pixels, recebendo comandos e dados por meio do protocolo **SPI (Serial Peripheral Interface)**. Essa interface permite comunicação rápida entre a Raspberry Pi Pico e o display.

A utilização de uma biblioteca gráfica, como a `gfx_ili9341`, simplifica o desenvolvimento ao abstrair os comandos de baixo nível do controlador.

## Laboratório


