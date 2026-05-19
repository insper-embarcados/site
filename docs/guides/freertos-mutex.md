---
tags:
  - rtos
  - mutex
description: Mecanismo de exclusão mútua (mutex)
---

# Mutex / `mutex`

::: tip
Para mais informações, leia o site do FreeRTOS sobre mutex:

- https://www.freertos.org/Real-time-embedded-RTOS-mutexes.html
:::

Um mutex (do inglês *mutual exclusion*) é um mecanismo de sincronização utilizado para proteger recursos compartilhados contra acesso simultâneo por múltiplas tarefas. Diferente do semáforo binário, o mutex possui o conceito de **propriedade**: somente a tarefa que adquiriu o mutex pode liberá-lo. Isso previne situações em que uma tarefa libera um recurso que outra estava controlando.

O mutex também implementa **herança de prioridade**: se uma tarefa de alta prioridade estiver esperando por um mutex mantido por uma tarefa de baixa prioridade, a tarefa de baixa prioridade herda temporariamente a prioridade mais alta para liberar o mutex o mais rápido possível, evitando o problema de *priority inversion*.

![](https://www.freertos.org/media/2018/mutexes.gif)

## Para que serve?

O mutex é utilizado para garantir **exclusão mútua** no acesso a um recurso compartilhado, como um periférico (display, SPI, I2C), uma variável global ou um buffer. Sem mutex, duas tarefas podem acessar o mesmo recurso ao mesmo tempo, causando corrupção de dados ou comportamento imprevisível.

Exemplo sem mutex — problema de acesso concorrente:

```c
// Duas tarefas escrevendo no mesmo display sem proteção
void task_a(void *p) {
    while (true) {
        ssd1306_draw_string("Task A");  // pode ser interrompida no meio
        vTaskDelay(pdMS_TO_TICKS(100));
    }
}

void task_b(void *p) {
    while (true) {
        ssd1306_draw_string("Task B");  // acesso simultâneo: comportamento indefinido
        vTaskDelay(pdMS_TO_TICKS(150));
    }
}
```

Com mutex:

```c
SemaphoreHandle_t xMutex;

void task_a(void *p) {
    while (true) {
        if (xSemaphoreTake(xMutex, pdMS_TO_TICKS(100)) == pdTRUE) {
            ssd1306_draw_string("Task A");  // acesso exclusivo garantido
            xSemaphoreGive(xMutex);
            vTaskDelay(pdMS_TO_TICKS(100));
        }
    }
}

void task_b(void *p) {
    while (true) {
        if (xSemaphoreTake(xMutex, pdMS_TO_TICKS(100)) == pdTRUE) {
            ssd1306_draw_string("Task B");
            xSemaphoreGive(xMutex);
            vTaskDelay(pdMS_TO_TICKS(150));
        }
    }
}
```

::: info Timeout
O segundo argumento de `xSemaphoreTake` é o tempo máximo que a tarefa irá aguardar para adquirir o mutex (a task fica bloqueada enquanto espera). Use `portMAX_DELAY` para esperar indefinidamente.
:::

## Diferença entre Mutex e Semáforo Binário

| Característica        | Semáforo Binário            | Mutex                             |
|-----------------------|-----------------------------|-----------------------------------|
| Propriedade           | Nenhuma                     | Somente quem tomou pode liberar   |
| Herança de prioridade | Não                         | Sim                               |
| Uso típico            | Sincronização / sinalização | Proteção de recurso compartilhado |
| Pode usar em ISR      | Sim                         | **Não**                           |

::: warning ISR
Mutex **não deve ser usado em ISR**. Se precisar sinalizar uma tarefa a partir de uma interrupção, use semáforo binário com `xSemaphoreGiveFromISR`.

Mutexes não podem ser usados em ISR por alguns motivos fundamentais:

1. Herança de prioridade requer contexto de tarefa

O mecanismo de herança de prioridade do mutex precisa identificar qual tarefa detém o mutex para elevar sua prioridade temporariamente. ISRs não são tarefas — elas não têm TaskHandle_t, não pertencem ao scheduler e não têm prioridade no sentido do FreeRTOS. O mecanismo simplesmente não funciona nesse contexto.

2. Bloqueio é impossível em ISR

Se o mutex estiver tomado por outra tarefa, xSemaphoreTake bloquearia o chamador até o mutex ser liberado. ISRs não podem bloquear — elas precisam executar e retornar imediatamente. Bloquear dentro de uma ISR corrompe o estado do sistema.
:::

## Dicas de uso

::: tip "Regra de ouro"
Use mutex para proteger o acesso a recursos compartilhados entre tarefas. Use semáforo binário para sinalização/sincronização (especialmente com ISR).
:::

Para criar e usar um mutex:

1. Criar a variável global que representará o mutex
    - `SemaphoreHandle_t xMutex;`
1. Criar o mutex (na função `main`, antes de iniciar o scheduler)
    - [`xSemaphoreCreateMutex();`](https://www.freertos.org/CreateMutex.html)
1. Adquirir o mutex antes de acessar o recurso
    - [`xSemaphoreTake(xMutex, timeout)`](https://www.freertos.org/a00122.html)
1. Liberar o mutex após usar o recurso
    - [`xSemaphoreGive(xMutex);`](https://www.freertos.org/a00123.html)

## Snippets

### Protegendo um recurso compartilhado entre duas tasks

```c
#include "FreeRTOS.h"
#include "semphr.h"

SemaphoreHandle_t xMutex;

// Recurso compartilhado: buffer global
char shared_buffer[64];

void task_writer(void *p) {
    while (true) {
        if (xSemaphoreTake(xMutex, pdMS_TO_TICKS(200)) == pdTRUE) {
            // Seção crítica: acesso exclusivo ao buffer
            snprintf(shared_buffer, sizeof(shared_buffer), "escrito por writer: %lu", xTaskGetTickCount());
            xSemaphoreGive(xMutex);
            vTaskDelay(pdMS_TO_TICKS(500));
        }
    }
}

void task_reader(void *p) {
    while (true) {
        if (xSemaphoreTake(xMutex, pdMS_TO_TICKS(200)) == pdTRUE) {
            // Seção crítica: leitura segura do buffer
            printf("%s\n", shared_buffer);
            xSemaphoreGive(xMutex);
            vTaskDelay(pdMS_TO_TICKS(300));
        }
    }
}

int main(void) {
    /* ... inicializações ... */

    xMutex = xSemaphoreCreateMutex();

    if (xMutex == NULL)
        printf("falha ao criar o mutex\n");

    xTaskCreate(task_writer, "Writer", 256, NULL, 1, NULL);
    xTaskCreate(task_reader, "Reader", 256, NULL, 1, NULL);

    vTaskStartScheduler();
    while (true);
}
```

### Protegendo um periférico compartilhado (ex: SPI/display)

```c
SemaphoreHandle_t xMutexSPI;

void task_display(void *p) {
    while (true) {
        if (xSemaphoreTake(xMutexSPI, portMAX_DELAY) == pdTRUE) {
            // acesso exclusivo ao barramento SPI
            ssd1306_clear();
            ssd1306_draw_string("Hello!");
            ssd1306_show();
            xSemaphoreGive(xMutexSPI);
        }
        vTaskDelay(pdMS_TO_TICKS(1000));
    }
}

void task_sensor(void *p) {
    while (true) {
        if (xSemaphoreTake(xMutexSPI, portMAX_DELAY) == pdTRUE) {
            // leitura de sensor via SPI
            int valor = spi_read_sensor();
            xSemaphoreGive(xMutexSPI);
            printf("Sensor: %d\n", valor);
        }
        vTaskDelay(pdMS_TO_TICKS(200));
    }
}

int main(void) {
    /* ... inicializações ... */

    xMutexSPI = xSemaphoreCreateMutex();

    if (xMutexSPI == NULL)
        printf("falha ao criar o mutex SPI\n");

    xTaskCreate(task_display, "Display", 512, NULL, 1, NULL);
    xTaskCreate(task_sensor,  "Sensor",  256, NULL, 1, NULL);

    vTaskStartScheduler();
    while (true);
}
```

::: tip
1. O mutex deve ser sempre criado (`xSemaphoreCreateMutex()`) antes de qualquer tarefa que o utilize ser iniciada.
1. Sempre libere o mutex (`xSemaphoreGive`) após o uso do recurso, inclusive em caminhos de erro, para evitar deadlock.
1. Evite manter o mutex por longos períodos; mantenha a seção crítica o mais curta possível.
:::
