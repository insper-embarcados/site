---
tags:
  - rtos
  - timer
description: Como criar uma função que é chamada periodicamente por uma task.
---

# Software Timer 

Relógios de software são funções de `callbacks` que são executadas pelo RTOS. Os `callbacks` podem ser executados de forma recorrente ou uma única vez (quando o tempo tiver passado).

- API: https://www.freertos.org/FreeRTOS-Software-Timer-API-Functions.html 

Para usarmos um timer de software é necessário:

1. Criar a variável global que representará o timer
    - `TimerHandle_t xTimer`
1. Criar a função de `callback`:
    `void vTimerCallback(TimerHandle_t xTimer) { ... }`
1. Na task, criar o timer:
    - `xTimer = xTimerCreate("Timer", 100, pdTRUE, 0, vTimerCallback);`
1. E então ativar o timer:
    - `xTimerStart(xTimer, 0);`
    
A função possui os seguintes argumentos: `xTimerCreate(pcTimerName, xTimerPeriod, uxAutoReload, pvTimerID, pxCallbackFunction)`. 

- `pcTimerName`: É um nome único para o Timer (string).
- `xTimerPeriod`: É o período em ticks que o timer vai executar. Ex: `100` executa a aproximadamente 100ms
- `uxAutoReload`: `pdTRUE` se o timer for recorrente e `pdFALSE` se for executar uma única vez
- `pvTimerID`: Não faço ideia... =)
- `pxCallbackFunction`: Função que será chamada quando o timer estourar.

Código exemplo:

``` c
TimerHandle_t xTimer;

void vTimerCallback(TimerHandle_t xTimer) {
    printf("estourou \n");
}

static void task_foo(void *pvParameters) {
    xTimer = xTimerCreate("Timer", 100, pdTRUE, 0, vTimerCallback);
    
    while(1) {
        vTaskDelay(1000);
    }
}
```


