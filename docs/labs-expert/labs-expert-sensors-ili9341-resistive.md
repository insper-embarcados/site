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

---

### LCD TFT ili9341

O display TFT LCD ili9341 é um módulo gráfico amplamente utilizado em sistemas embarcados. Ele possui resolução típica de 320x240 pixels e suporte a milhares de cores, permitindo a construção de interfaces visuais mais elaboradas.

O controlador ili9341 é responsável por gerenciar a memória de vídeo e o mapeamento de pixels, recebendo comandos e dados por meio do protocolo **SPI (Serial Peripheral Interface)**. Essa interface permite comunicação rápida entre a Raspberry Pi Pico e o display.

A utilização de uma biblioteca gráfica, como a `gfx_ili9341`, simplifica o desenvolvimento ao abstrair os comandos de baixo nível do controlador.

---

### Touch Resistivo

O módulo de touch resistivo funciona de forma independente do display, sendo responsável por detectar a posição do toque na superfície da tela.

Ele opera medindo variações de tensão nos eixos X e Y. Quando o usuário pressiona a tela, ocorre um contato entre camadas condutivas internas, permitindo calcular as coordenadas do ponto tocado.

Como o touch não acompanha automaticamente a rotação aplicada ao display, é necessário realizar uma transformação das coordenadas para que o ponto detectado corresponda corretamente à interface gráfica exibida.

---

## LAB

Neste laboratório iremos desenvolver três aplicações progressivas utilizando o display LCD ili9341 e o touch resistivo.

Utilizaremos como base o exemplo disponível no repositório:

https://github.com/insper-embarcados/pico-dock_examples/tree/main/PicoDock_TFT_Resistive_Example

A partir dele, iremos implementar:

### 1 - Escrita de Texto

Primeiramente, iremos exibir uma mensagem simples na tela utilizando a biblioteca gráfica:

- Exibir o texto `"Hello World"` na tela;
- Definir a posição do texto com `gfx_setCursor()`;
- Ajustar tamanho e cor com `gfx_setTextSize()` e `gfx_setTextColor()`.

Essa etapa tem como objetivo compreender o funcionamento básico da biblioteca gráfica.

---

### 2 - Criação de Formas Geométricas

Na segunda parte, iremos utilizar funções de desenho para criar elementos gráficos na tela:

- `gfx_drawRect()` para desenhar retângulos;
- `gfx_drawCircle()` para desenhar círculos;
- Explorar posicionamento e dimensões.

O objetivo é compreender como desenhar primitivas gráficas e organizar elementos visuais na interface.

---

### 3 - Criação de um Botão com Bitmap

Na terceira etapa, utilizaremos a ferramenta online:

https://lopaka.app/sandbox

Com ela, iremos:

- Criar um formato personalizado (ícone ou botão);
- Exportar o bitmap gerado;
- Integrar esse bitmap ao projeto;
- Definir essa imagem como um botão interativo na tela.

Nessa etapa, o botão deverá:

- Ser exibido na tela utilizando `gfx_drawBitmap()`;
- Detectar toque na sua área;
- Executar uma ação quando pressionado.

Ao final do laboratório, você terá construído uma interface gráfica simples e interativa utilizando o display LCD e o touch resistivo.

---

## Entrega

Para a entrega deste laboratório, você deverá desenvolver uma aplicação gráfica interativa utilizando o display LCD ili9341 e o touch resistivo.

### Objetivo

Criar um botão gráfico personalizado utilizando a ferramenta:

https://lopaka.app/sandbox

O botão deverá ser exportado como bitmap e integrado ao projeto.

---

### Requisitos da Entrega

1 - Criar um botão no Lopaka  
- Desenvolver um formato visual personalizado;
- Exportar o bitmap gerado;
- Integrar o bitmap ao projeto como `GFX_Bitmap`.

2 - Implementar o botão na tela  
- Exibir o botão utilizando `gfx_drawBitmap()`;
- Detectar toque na área correspondente;
- Utilizar `gfx_touchTransform()` para mapear corretamente as coordenadas.

3 - Alterar a aparência ao pressionar  
- Quando o botão for pressionado:
  - A cor do bitmap deverá ser alterada (por exemplo, inverter cor ou mudar para vermelho);
  - O botão deverá retornar à cor original quando não estiver pressionado.

4 - Controle de LED físico  
- Um LED da placa deverá representar o estado do botão;
- Quando o botão na tela estiver pressionado, o LED deve estar aceso;
- Quando o botão não estiver pressionado, o LED deve estar apagado.

---

### Critérios de Avaliação

- Funcionamento correto do botão;
- Alteração visual ao pressionar;
- LED sincronizado com o estado do botão;
- Organização e clareza do código;
- Uso correto da biblioteca `gfx_ili9341`.

Ao final, sua aplicação deverá demonstrar integração entre:

- Interface gráfica;
- Touch resistivo;
- Controle de hardware externo (LED).