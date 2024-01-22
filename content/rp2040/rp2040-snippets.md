# rp2040 - code snippets

## Basic

Hello world

- [wokwi](https://wokwi.com/projects/382410970782920705)
- [pico sdk](https://github.com/raspberrypi/pico-examples/blob/master/hello_world/serial/hello_serial.c): `hellow_world/serial` 


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

## Delay 

A rasp pico possui algumas funções de delays de software, as principais sendo do tipo `sleep` (que coloca o core para dormir por uma quantidade de tempo) e a `busy_wait` que apenas "gasta" clocks para dar o tempo necessário.

- [pico sdk](https://www.raspberrypi.com/documentation/pico-sdk/hardware.html#hardware_timer)

```c
// Sleep functions for delaying execution in a lower power state. 
// These functions allow the calling core to sleep.
// This is a lower powered sleep; waking and re-checking
// time on every processor event (WFE)
// These functions should not be called from an IRQ handler.
sleep_us (30); // 30 us de sleep
sleep_ms (40); // 40 ms de sleep
```

Ou gastar clocks da cpu:

```c
busy_wait_us(30); // 30 us de clocks gastos
busy_wait_ms(40); // 40 ms de clocks gastos
```

## GPIO

Lê um botão e aciona LED de acordo.
  - ==Necessário definir os pinos `LED_PIN` e `BTN_PIN`==
  
- [wokwi](https://wokwi.com/projects/382410862049780737)
- [pico examples](https://github.com/raspberrypi/pico-examples/tree/master/gpio/hello_7segment): `gpio/hello_7segment`

```c
#include <stdio.h>
#include "pico/stdlib.h"
#include "hardware/gpio.h"

#define LED_PIN 2;
#define BTN_PIN 3; 

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

Muda o valor do LED toda vez que o botão for apertado.
  - ==Necessário definir os pinos `LED_PIN` e `BTN_PIN`==

- [wokwi](https://wokwi.com/projects/382410733969358849)
- [pico examples](https://github.com/raspberrypi/pico-examples/blob/master/gpio/hello_gpio_irq/hello_gpio_irq.c): `gpio/hello_gpio_irq`

```c
#include <stdio.h>
#include "pico/stdlib.h"
#include "hardware/gpio.h"

const int LED_PIN 2;
const int BTN_PIN 3;

volatile int g_status = 0;

void btn_callback(uint gpio, uint32_t events) {
    if (events == 0x4) {         // fall edge
        g_status = 1;
    } else if (events == 0x8) {  // rise edge
        g_status = 0;
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

## GPIO - IRQ - Múltiplos callbacks

Só podemos configurar um único callback para os GPIOS da pico, devemos usar a informação do argumento `gpio` para sabermos qual pino estamos lidando dentro do callback.

```c

volatile int g_flag_0 = 0;
volatile int g_flag_1 = 0;

void btn_callback(uint gpio, uint32_t events) {
    if (gpio == BTN_0) {     
        g_flag_0 = 1;
    } else if (gpio == BTN_1) {
        g_flag_1 = 1;
    }
}

int main() {
  stdio_init_all();

  gpio_init(BTN_0);
  gpio_set_dir(BTN_0, GPIO_IN);
  gpio_pull_up(BTN_0);
  gpio_set_irq_enabled_with_callback(BTN_0,
                                     GPIO_IRQ_EDGE_FALL,
                                     true,
                                     &btn_callback);

  // Segunda IRQ usa callback já configurado.
  gpio_init(BTN_1);
  gpio_set_dir(BTN_1, GPIO_IN);
  gpio_pull_up(BTN_1);
  gpio_set_irq_enabled_(BTN_1,
                        GPIO_IRQ_EDGE_FALL,
                        true);
    

  while (true) {
    if(g_flag_0 || g_flag_1) {
      printf("IRQ 0: %d | IRQ 1: %d\n", g_flag_0, g_flga_1);

      g_flag_0 = 0;
      g_flag_1 = 0;
    }
  }
}
```

