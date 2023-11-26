# rp2040 - code snippets

## Basic

- Hello world
- [wokwi](https://wokwi.com/projects/382410970782920705)

```c
#include "pico/stdlib.h"
#include <stdio.h>

int main() {
  stdio_init_all();

  while (true) {
      printf("Ola numero: %d", ++i);
      sleep_ms(200);
  }
}

```

## GPIO

- Lê um botão e aciona LED de acordo.
    - ==Necessário definir os pinos `LED_PIN` e `BTN_PIN`==
- [wokwi](https://wokwi.com/projects/382410862049780737)


```c
#include <stdio.h>
#include "pico/stdlib.h"
#include "hardware/gpio.h"

#define LED_PIN XX // TBD
#define BTN_PIN YY // TBD

int main() {
  stdio_init_all();

  gpio_init(BTN_PIN);
  gpio_set_dir(BTN_PIN, GPIO_IN);
  gpio_pull_up(BTN_PIN);
  
  gpio_init(LED_PIN);
  gpio_set_dir(LED_PIN, GPIO_OUT);

  while (true) {
    int status = !gpio_get(BTN_PIN);
    gpio_put(LED_PIN, status);
  }
}
```

## GPIO - IRQ

- Muda o valor do LED toda vez que o botão for apertado.
    - ==Necessário definir os pinos `LED_PIN` e `BTN_PIN`==
- [wokwi](https://wokwi.com/projects/382410733969358849)

```c
#include <stdio.h>
#include "pico/stdlib.h"
#include "hardware/gpio.h"

#define LED_PIN XX // TBD
#define BTN_PIN YY // TBD

volatile int g_status = 0;

void btn_callback(uint gpio, uint32_t events) {
    if (events == 0x4) {         // fall edge
        g_status = !g_status;
    } else if (events == 0x8) {  // rise edge
        
    }
}

int main() {
  stdio_init_all();

  gpio_init(BTN_PIN);
  gpio_set_dir(BTN_PIN, GPIO_IN);
  gpio_pull_up(BTN_PIN);
  gpio_set_irq_enabled_with_callback(BTN_PIN,
                                     GPIO_IRQ_EDGE_RISE | GPIO_IRQ_EDGE_FALL,
                                     true,
                                     &btn_callback);
    
  gpio_init(LED_PIN);
  gpio_set_dir(LED_PIN, GPIO_OUT);

  while (true) {
    gpio_put(LED_PIN, g_status);
  }
}
```
