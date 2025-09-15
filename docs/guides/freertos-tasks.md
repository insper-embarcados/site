---
tags:
  - rtos
  - tasks
description: Criando e gerenciando tasks
---

# Tasks

Tasks são pequenos programas executados pelo sistema operacional. Cada tarefa possui uma `stack` reservada para ela e é gerenciada pelo sistema operacional. Note que toda task é uma função que não retorna e possui laço infinito (`while (1)`). **Tasks em um RTOS não devem retornar**; elas executam como se tivessem exclusividade da CPU (assim como um código bare-metal que não deve retornar da função `main`). A seguir, um exemplo de duas tarefas.

```c
void led_1_task(void *p) {
    gpio_init(LED_PIN_R);
    gpio_set_dir(LED_PIN_R, GPIO_OUT);

    int delay = 250;
    while (true) {
        gpio_put(LED_PIN_R, 1);
        vTaskDelay(pdMS_TO_TICKS(delay));
        gpio_put(LED_PIN_R, 0);
        vTaskDelay(pdMS_TO_TICKS(delay));
    }
}

void led_2_task(void *p) {
    gpio_init(LED_PIN_G);
    gpio_set_dir(LED_PIN_G, GPIO_OUT);

    int delay = 500;
    while (true) {
        gpio_put(LED_PIN_G, 1);
        vTaskDelay(pdMS_TO_TICKS(delay));
        gpio_put(LED_PIN_G, 0);
        vTaskDelay(pdMS_TO_TICKS(delay));
    }
}
```

::: info "vTaskDelay"
A função `vTaskDelay()` faz com que o RTOS libere processamento para outras tarefas durante o tempo especificado em sua chamada. Esse valor é determinado em `ticks`. Podemos traduzir ticks para `ms`, usando o define `portTICK_PERIOD_MS` como no exemplo anterior.
:::

### Criando uma task

Criar uma tarefa é similar ao de inicializar um programa em um sistema operacional, mas no caso devemos indicar para o RTOS quais "funções" irão se comportar como pequenos programas (tarefas). Para isso devemos chamar a função `xTaskCreate` que possui a seguinte estrutura:

::: info "Leitura necessária"
Acesse e leia a documentação do FreeRTOS sobre criação de tasks:
    
- https://www.freertos.org/a00125.html
:::

`xTaskCreate` pode ser utilizada para criar tarefas que têm acesso irrestrito a todo o mapa de memória do microcontrolador. Em sistemas que suportam MPU (Unidade de Proteção de Memória), tarefas com restrições de MPU podem ser criadas usando-se `xTaskCreateRestricted` como alternativa.

A criação das tasks `led_1_task` e `led_2_task` são feitas da seguinte maneira (na função `main`):

```c
int main() {
    stdio_init_all();
    printf("Start RTOS \n");
    xTaskCreate(led_1_task, "LED_Task 1", 256, NULL, 1, NULL);
    xTaskCreate(led_2_task, "LED_Task 2", 256, NULL, 1, NULL);
    vTaskStartScheduler();
    
    // Programa nunca deve chegar aqui! 
    // vTaskStartScheduler() passa o comando do core para o FreeRTOS!
    while (true)
        ;
}
```

A função `xTaskCreate` possui os seguintes argumentos:

- **TaskFunction_t pvTaskCode**: Este é um ponteiro para a função que será executada pela tarefa. Essa função deve aderir a um protótipo específico e não retornar (ou seja, deve ser um loop infinito).
- **const char* const pcName**: Uma string que representa o nome da tarefa. Esse nome é útil para fins de depuração.
- **uint16_t usStackDepth**: O tamanho da pilha (stack) atribuída à tarefa, especificado em palavras. Isso depende do microcontrolador e da complexidade da tarefa.
- **void* pvParameters**: Um ponteiro para os parâmetros que a tarefa deve receber. Se a tarefa não necessitar de parâmetros, NULL pode ser passado.
- **UBaseType_t uxPriority**: A prioridade da tarefa. Tarefas com prioridades mais altas são executadas preferencialmente em relação às tarefas com prioridades mais baixas.
- **TaskHandle_t* pvCreatedTask**: Um ponteiro para uma variável do tipo `TaskHandle_t` que será preenchida com o identificador da tarefa criada. Esse identificador pode ser utilizado para se referenciar à tarefa após sua criação.

### Snippets

A seguir um código bem simples de como criar duas tarefas.

```c
#include "pico/stdlib.h"
#include <FreeRTOS.h>
#include <stdio.h>
#include <task.h>

const int LED_PIN_R = 4;
const int LED_PIN_G = 5;

void led_1_task(void *p) {
    gpio_init(LED_PIN_R);
    gpio_set_dir(LED_PIN_R, GPIO_OUT);

    int delay = 250;
    while (true) {
        gpio_put(LED_PIN_R, 1);
        vTaskDelay(pdMS_TO_TICKS(delay));
        gpio_put(LED_PIN_R, 0);
        vTaskDelay(pdMS_TO_TICKS(delay));
    }
}

void led_2_task(void *p) {
    gpio_init(LED_PIN_G);
    gpio_set_dir(LED_PIN_G, GPIO_OUT);

    int delay = 250;
    while (true) {
        gpio_put(LED_PIN_G, 1);
        vTaskDelay(pdMS_TO_TICKS(delay));
        gpio_put(LED_PIN_G, 0);
        vTaskDelay(pdMS_TO_TICKS(delay));
    }
}

int main() {
    stdio_init_all();
    printf("Start RTOS \n");
    xTaskCreate(led_1_task, "LED_Task 1", 256, NULL, 1, NULL);
    xTaskCreate(led_2_task, "LED_Task 2", 256, NULL, 1, NULL);
    vTaskStartScheduler();

    while (true)
        ;
}
```
