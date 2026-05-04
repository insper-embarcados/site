---
tags:
  - dispositivos
  - encoder
description: Leitura de posição e direção com encoder rotativo na Raspberry Pi Pico 2
---

# Encoder Rotativo

Você já deve ter visto um encoder em botões de volume, menus de equipamentos ou painéis de controle. Ele permite transformar rotação em comandos digitais.



## O que o encoder resolve?

Um potenciômetro informa posição absoluta.  
O encoder informa **movimento incremental**:

- girou para um lado → incrementa
- girou para o outro → decrementa



## Funcionamento

> Encoder = botão que gira e gera passos digitais

O microcontrolador mantém uma variável interna:

```text
posição = 0
horário   -> posição++
anti-horário -> posição--
```



## Por que usamos dois sinais?

Com apenas um sinal não conseguimos detectar direção.  
Por isso usamos dois canais:

- Canal A  
- Canal B  

Esses sinais são defasados (quadratura).



## Sinais em quadratura

### Sentido horário

```text
Tempo →

A: _|‾|_|‾|_
B: __|‾|_|‾|

A muda primeiro → horário
```

### Sentido anti-horário

```text
Tempo →

A: __|‾|_|‾|
B: _|‾|_|‾|_

B muda primeiro → anti-horário
```

### Sequência de estados

```text
Horário:       00 -> 10 -> 11 -> 01 -> 00
Anti-horário:  00 -> 01 -> 11 -> 10 -> 00
```

👉 Regra prática:
> Quem muda primeiro define a direção



## Ligação com a Pico

- A → GPIO
- B → GPIO
- BTN → GPIO com pull-up
- GND → GND




## Snippets

Códigos de exemplo para o uso do LCD.

### Demo

```c
#include <stdio.h>
#include "pico/stdlib.h"
#include "hardware/gpio.h"

const int ENCODER_A_PIN = 21;
const int ENCODER_B_PIN = 20;
const int ENCODER_BTN_PIN = 19;

volatile int g_direction = 0;
volatile int g_position = 0;

void callback(uint gpio, uint32_t events) {

    if (gpio == ENCODER_A_PIN) {

        if (events == 0x4) {
            if (gpio_get(ENCODER_B_PIN) == 0) {
                g_direction = 1;
                g_position++;
            } else {
                g_direction = -1;
                g_position--;
            }
        }
        else if (events == 0x8) {
            if (gpio_get(ENCODER_B_PIN) == 1) {
                g_direction = 1;
                g_position++;
            } else {
                g_direction = -1;
                g_position--;
            }
        }
    }
}

int main() {
    stdio_init_all();

    gpio_init(ENCODER_A_PIN);
    gpio_set_dir(ENCODER_A_PIN, GPIO_IN);
    gpio_pull_up(ENCODER_A_PIN);
    gpio_set_irq_enabled_with_callback(
        ENCODER_A_PIN,
        GPIO_IRQ_EDGE_RISE | GPIO_IRQ_EDGE_FALL,
        true,
        &callback
    );

    gpio_init(ENCODER_B_PIN);
    gpio_set_dir(ENCODER_B_PIN, GPIO_IN);
    gpio_pull_up(ENCODER_B_PIN);

    while (true) {
        printf("Posicao: %d | Direcao: %s\n",
               g_position,
               (g_direction == 1) ? "horario" : "anti-horario");
        sleep_ms(100);
    }
}
```


## 7. Resumo

- encoder mede movimento incremental
- usa dois sinais em quadratura
- direção depende da ordem das transições
- interrupções são a melhor abordagem
