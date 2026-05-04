---
tags:
  - dispositivos
  - encoder
description: Leitura de posição e direção com encoder rotativo na Raspberry Pi Pico 2
---

# Encoder Rotativo

Você já deve ter visto um encoder em botões de volume, menus de equipamentos ou painéis de controle. Ele é um dispositivo muito útil quando queremos transformar uma rotação em comandos digitais, por exemplo:

- aumentar ou diminuir um valor
- navegar entre opções de menu
- controlar a posição de um servo
- ajustar parâmetros em uma interface com display

Neste material, vamos estudar o encoder incremental mecânico usando a **Raspberry Pi Pico 2** como base.

---

## 1. O que o encoder resolve?

Um potenciômetro informa uma posição absoluta por meio de uma tensão analógica. Já o encoder trabalha de outro jeito: ele informa apenas que houve movimento, e em qual direção esse movimento aconteceu.

Ou seja:

- girou para a direita → soma
- girou para a esquerda → subtrai

Esse comportamento é ótimo para interfaces em que o usuário quer fazer ajustes passo a passo.

::: tip
Em aplicações de menu, o encoder costuma ser mais confortável que um botão comum, porque permite girar indefinidamente e selecionar rapidamente opções.
:::

---

## 2. Modelo mental

Antes de falar de sinais elétricos, vale guardar esta ideia:

> Encoder = botão que gira e gera passos digitais

Ele não entrega a posição como um potenciômetro.  
Ele entrega **variação de posição**.

Isso significa que o microcontrolador precisa manter uma variável interna para contar os passos:

```text
posição = 0
girou horário   -> posição++
girou anti-horário -> posição--
```

---

## 3. Por que usamos dois sinais?

Se o encoder tivesse apenas um sinal, saberíamos que houve movimento, mas não conseguiríamos descobrir o sentido da rotação.

A solução é usar dois canais:

- **Canal A**
- **Canal B**

Esses canais saem defasados entre si. Essa técnica é chamada de **quadratura**.

---

## 4. Sinais em quadratura

A lógica do encoder é baseada na ordem das transições.

### Sentido horário

```text
Tempo →

A: _|‾|_|‾|_
B: __|‾|_|‾|

A muda primeiro → sentido horário
```

### Sentido anti-horário

```text
Tempo →

A: __|‾|_|‾|
B: _|‾|_|‾|_

B muda primeiro → sentido anti-horário
```

::: tip
A regra prática é simples: **quem muda primeiro ajuda a indicar a direção**.
:::

---

## 5. Gráfico em caracteres da quadratura

Uma forma de enxergar melhor o encoder é observar a sequência de estados.

### Giro no sentido horário

```text
Estado:   00 -> 10 -> 11 -> 01 -> 00
Canal A:   _|‾‾‾|___|‾‾‾|___
Canal B:   ___|‾‾‾|___|‾‾‾|_
```

### Giro no sentido anti-horário

```text
Estado:   00 -> 01 -> 11 -> 10 -> 00
Canal A:   ___|‾‾‾|___|‾‾‾|_
Canal B:   _|‾‾‾|___|‾‾‾|___
```

Esse desenho ajuda o aluno a perceber que o encoder não depende apenas de “um pulso”, mas da **sequência** dos pulsos.

---

## 6. Tipos de encoder

### 6.1 Encoder incremental

É o tipo mais comum em laboratório e em interfaces simples.

Características:

- mede variação de posição
- não conserva a posição após desligar
- é simples de usar
- gera sinais A e B em quadratura

### 6.2 Encoder absoluto

É mais usado em aplicações industriais.

Características:

- cada posição tem um código único
- mantém a informação da posição
- é mais complexo e mais caro

Neste material, vamos trabalhar com o encoder **incremental mecânico**.

---

## 7. Estrutura física

Um encoder rotativo típico possui:

- **A** → canal de saída 1
- **B** → canal de saída 2
- **GND** → terra
- **SW** ou **BTN** → botão embutido, quando existir

### Conexão com a Pico 2

- A → GPIO de entrada
- B → GPIO de entrada
- BTN → GPIO de entrada com pull-up
- GND → GND da placa

::: warning
O encoder mecânico costuma gerar ruído e rebote. Isso será importante mais à frente.
:::

---

## 8. Primeiro contato: polling

A forma mais simples de começar é ler os sinais em loop.

```c
int a = gpio_get(PIN_A);
int b = gpio_get(PIN_B);
```

O polling é útil para entender a ideia, mas tem limitações:

- gasta CPU o tempo todo
- pode perder pulsos rápidos
- não é o método mais robusto

::: info
O polling funciona como uma leitura repetida: o programa fica perguntando o tempo todo se o pino mudou.
:::

---

## 9. Quando o polling deixa de ser suficiente

Se o encoder girar rápido, ou se o programa estiver fazendo outras tarefas, o polling pode perder transições.

Isso é um problema porque:

- a contagem fica errada
- a direção pode ser interpretada de forma incorreta
- o sistema fica menos responsivo

Por isso, a próxima evolução é usar **interrupções**.

---

## 10. Interrupções

Com interrupções, o microcontrolador reage somente quando acontece uma mudança no pino.

Em vez de ficar perguntando o tempo todo, ele espera o evento acontecer.

Isso é especialmente útil para:

- canais A e B do encoder
- botão integrado
- outras entradas digitais com transição rápida

---

## 11. Exemplo completo em C para Pico 2

O código abaixo usa interrupções nos canais A, B e no botão.  
A direção é inferida a partir da borda detectada no canal A e do nível lógico do canal B.

```c
#include <stdio.h>
#include "pico/stdlib.h"
#include "hardware/gpio.h"

const int ENCODER_A_PIN = 21;
const int ENCODER_B_PIN = 20;
const int ENCODER_BTN_PIN = 19;

volatile int g_flag_a = 0;
volatile int g_flag_b = 0;
volatile int g_flag_btn_press = 0;
volatile int g_flag_btn_release = 0;

volatile int g_direction = 0; // 1 = horario, -1 = anti-horario
volatile int g_position = 0;

void btn_callback(uint gpio, uint32_t events) {

    if (gpio == ENCODER_A_PIN) {
        g_flag_a = 1;

        if (events == 0x4) { // fall edge
            if (gpio_get(ENCODER_B_PIN) == 0) {
                g_direction = 1;
                g_position++;
            } else {
                g_direction = -1;
                g_position--;
            }
        }
        else if (events == 0x8) { // rise edge
            if (gpio_get(ENCODER_B_PIN) == 1) {
                g_direction = 1;
                g_position++;
            } else {
                g_direction = -1;
                g_position--;
            }
        }
    }
    else if (gpio == ENCODER_B_PIN) {
        g_flag_b = 1;
    }
    else if (gpio == ENCODER_BTN_PIN) {
        if (events == 0x4) { // fall edge
            g_flag_btn_press = 1;
        }
        else if (events == 0x8) { // rise edge
            g_flag_btn_release = 1;
        }
    }
}

int main() {
    stdio_init_all();

    gpio_init(ENCODER_A_PIN);
    gpio_set_dir(ENCODER_A_PIN, GPIO_IN);
    gpio_pull_up(ENCODER_A_PIN);
    gpio_set_irq_enabled_with_callback(ENCODER_A_PIN,
                                       GPIO_IRQ_EDGE_RISE |
                                       GPIO_IRQ_EDGE_FALL,
                                       true,
                                       &btn_callback);

    gpio_init(ENCODER_B_PIN);
    gpio_set_dir(ENCODER_B_PIN, GPIO_IN);
    gpio_pull_up(ENCODER_B_PIN);
    gpio_set_irq_enabled(ENCODER_B_PIN,
                         GPIO_IRQ_EDGE_RISE |
                         GPIO_IRQ_EDGE_FALL,
                         true);

    gpio_init(ENCODER_BTN_PIN);
    gpio_set_dir(ENCODER_BTN_PIN, GPIO_IN);
    gpio_pull_up(ENCODER_BTN_PIN);
    gpio_set_irq_enabled(ENCODER_BTN_PIN,
                         GPIO_IRQ_EDGE_RISE |
                         GPIO_IRQ_EDGE_FALL,
                         true);

    while (true) {

        if (g_flag_a || g_flag_b) {
            printf("IRQ A: %d | IRQ B: %d | Direcao: %s | Posicao: %d\n",
                   g_flag_a,
                   g_flag_b,
                   (g_direction == 1) ? "horario" : "anti-horario",
                   g_position);

            g_flag_a = 0;
            g_flag_b = 0;
        }

        if (g_flag_btn_press) {
            printf("Botao pressionado\n");
            g_flag_btn_press = 0;
        }

        if (g_flag_btn_release) {
            printf("Botao solto\n");
            g_flag_btn_release = 0;
        }
    }
}
```

---

## 12. Como ler o código

A ideia central é esta:

1. o canal A gera uma interrupção
2. o código verifica o estado do canal B
3. a combinação entre borda de A e valor de B define a direção
4. a variável `g_position` guarda a posição acumulada
5. o botão é tratado separadamente

### Variáveis `volatile`

As variáveis `volatile` são importantes porque:

- elas podem ser alteradas dentro da interrupção
- o compilador não deve assumir que o valor ficou estável
- o loop principal precisa enxergar as mudanças imediatamente

---

## 13. Botão integrado

Muitos encoders possuem um botão no eixo.  
Na prática, esse botão funciona como uma chave digital comum.

- pressionado → nível lógico baixo
- solto → nível lógico alto

No exemplo:

- `g_flag_btn_press` marca a borda de descida
- `g_flag_btn_release` marca a borda de subida

---

## 14. Problemas comuns

### 14.1 Bounce mecânico

O encoder mecânico não muda de estado de forma “limpa”.  
Em vez de uma única transição, podem aparecer vários pulsos rápidos.

Isso pode gerar:

- contagem duplicada
- direção errada
- leitura instável

Soluções:

- debounce por software
- filtro de tempo
- máquina de estados mais robusta

### 14.2 Perda de pulso

Se o encoder girar muito rápido, ou se a ISR ficar pesada demais, o sistema pode perder transições.

Soluções:

- manter a ISR curta
- evitar processamento pesado dentro da interrupção
- usar lógica mais organizada quando necessário

::: warning
Nunca coloque tarefas demoradas dentro da interrupção. Ela deve ser curta e direta.
:::

---

## 15. Aplicações

O encoder é muito usado em:

- controle de volume
- navegação em menus
- ajuste de parâmetros
- seleção de itens em display OLED
- controle de posição em servomotores
- sistemas de medição incremental

Ele combina muito bem com a Pico 2 em projetos de interface.

---

## 16. Ligação com outros materiais do curso

O encoder conversa bem com outros dispositivos estudados no curso:

- com o **potenciômetro** e outros sensores analógicos, porque ambos representam formas de entrada do usuário
- com o **OLED**, porque o encoder pode navegar menus ou alterar parâmetros na tela
- com o **servo**, porque o valor lido pode ser convertido em posição
- com o **buzzer**, porque ambos exigem atenção ao tempo e à forma de gerar o sinal
- com o **CD4051**, porque ambos ajudam a pensar em leitura de sinais e seleção de canais

---

## 17. Resumo

O encoder rotativo é um dispositivo incremental que gera dois sinais em quadratura.  
A ordem das transições define o sentido da rotação.

Para usar bem o encoder:

- entenda primeiro o modelo mental
- observe a quadratura
- comece com polling para aprender
- migre para interrupções para ter uma solução melhor
- trate o bounce mecânico
- use o botão integrado separadamente

Em resumo, o encoder é uma solução elegante para criar interfaces físicas simples, rápidas e agradáveis de usar.