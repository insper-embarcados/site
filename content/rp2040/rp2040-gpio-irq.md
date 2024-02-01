# Document Title


## Snippets

Snippets relacionados a interrupcão do GPIO.

### GPIO - IRQ

Muda o valor do LED toda vez que o botão for apertado.
  - ==Necessário definir os pinos `LED_PIN` e `BTN_PIN`==

- [wokwi](https://wokwi.com/projects/382410733969358849)
- [pico examples](https://github.com/raspberrypi/pico-examples/blob/master/gpio/hello_gpio_irq/hello_gpio_irq.c): `gpio/hello_gpio_irq`

```c
#include <stdio.h>
#include "pico/stdlib.h"
#include "hardware/gpio.h"

const int BTN_0_PIN = 2;

volatile int g_flag_0 = 0;

void btn_callback(uint gpio, uint32_t events) {
    if (events == 0x4) {         // fall edge
        g_flag_0 = 1;
    } else if (events == 0x8) {  // rise edge
        g_flag_0 = 0;
    }
}

int main() {
  stdio_init_all();

  gpio_init(BTN_0_PIN);
  gpio_set_dir(BTN_0_PIN, GPIO_IN);
  gpio_pull_up(BTN_0_PIN);
  gpio_set_irq_enabled_with_callback(BTN_0_PIN,
                                     GPIO_IRQ_EDGE_RISE | GPIO_IRQ_EDGE_FALL,
                                     true,
                                     &btn_callback);
    
  gpio_init(LED_PIN);
  gpio_set_dir(LED_PIN, GPIO_OUT);

  while (true) {
      printf("IRQ 0: %d", g_flag_0);
  }
}
```

### GPIO - IRQ - Múltiplos callbacks

Só podemos configurar um único callback para os GPIOS da pico, devemos usar a informação do argumento `gpio` para sabermos qual pino estamos lidando dentro do callback.

```c
#include <stdio.h>
#include "pico/stdlib.h"
#include "hardware/gpio.h"

const int BTN_1_PIN = 2;
const int BTN_0_PIN = 3;

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
  
  // BTN_0_PIN
  gpio_init(BTN_0);
  gpio_set_dir(BTN_0, GPIO_IN);
  gpio_pull_up(BTN_0);
  gpio_set_irq_enabled_with_callback(BTN_0,
                                     GPIO_IRQ_EDGE_FALL,
                                     true,
                                     &btn_callback);

  // BTN_1_PIN
  gpio_init(BTN_1);
  gpio_set_dir(BTN_1, GPIO_IN);
  gpio_pull_up(BTN_1);
  // Segunda IRQ usa callback já configurado.
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

