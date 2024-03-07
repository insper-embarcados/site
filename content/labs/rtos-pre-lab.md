# Timer - Preparatório

| Lab 4 - RTOS - Preparatório                            |
|---------------------------------------------------------|
| **Deadline**: {{lab_rtos_pre_deadline}}                |
| **Atividade:** [classroom]({{lab_rtos_pre_classroom}}) |
| 💰 30% nota de lab                                      |


!!! exercise "Leitura prévia"

    Para realizar este laboratório você deve estudar antes.
   
    - Sobre RTOS: [📕 ==FreeRTOS/ RTOS==](/site/freertos/freertos-basic)
    - Tasks: [📘 ==FreeRTOS/Tasks==](/site/freertos/freertos-tasks)
    - vTaskDelay: [📘 ==FreeRTOS/vTaskDelay==](/site/freertos/freertos-vtaskDelay)
    - Semaphore: [📘 ==FreeRTOS/Semaphore==](/site/freertos/freertos-semaphore)
    - Queue: [📘 ==FreeRTOS/Queue==](/site/freertos/freertos-queue)

## Atividade

Lembre-se de sempre executar no Linux e dentro do dev. container! Valide enviando o código para o GitHub! A qualidade de código está ativada, então se o seu código falhar, verifique em qual etapa foi, pode ser por conta de qualidade de código!

!!! exercise "exe 1"
    - Arquivo: `exe1/main.c`
    - Teste: Verifica os pinos dos LEDs

    > Objetivo: Criar tasks

    O código fornecido cria uma `task` para o LED R e faz ele piscar usando `vTaskDelay`, faça algo similar agora para o LED G. **Você deve criar uma nova `task` para controlar o LED G**.

!!! exercise "exe 2"
    - Arquivo: `exe2/main.c`
    - Teste: Verifica os pinos dos LEDs

    > Objetivo: Trabalhar com semáforos entre `tasks`

    O código fornecido possui duas `tasks`, uma para acender e apagar o LED R e outra que fica fazendo a leitura do BTN R, sempre que a `btn_1_task` identifica que o botão foi apertado e solto, ela libera a `led_1_task` via o semáforo `xSemaphore_r` para executar.

    Faça algo similar para o BTN G e LED G, ao final você deve ter duas novas `tasks`: `btn_2_task`, `led_2_task` e um novo semáforo.

!!! exercise "exe 3"
    - Arquivo: `exe3/main.c`
    - Teste: Verifica os pinos dos LEDs

    > Objetivo: Trabalhar com filas entre `tasks`

    O código fornecido possui duas `tasks`, uma para acender e apagar o LED R e outra que fica fazendo a leitura do BTN R, sempre que a `btn_1_task` identifica que o botão foi apertado e solto é enviado um valor `delay` da `btn_1_task` para a `led_1_task` via a fila `xQueueButId`, que usa esse valor para definir a frequência que o LED R vai piscar (via o uso de um semáforo).

    Faça algo similar para o BTN G e LED G, ao final você deve ter duas novas `tasks`: `btn_2_task` e `led_2_task` e uma nova fila.

!!! exercise "exe 4"
    - Arquivo: `exe4/main.c`
    - Teste: Verifica os pinos dos LEDs

    > Objetivo: Trabalhar com filas entre IRQ e `tasks`

    blablablabla

    Repita o mesmo que o código já faz, só que agora para o LED G. Note o uso da fila no callback do botão! Você terá que usar `xQueueSendFromISR`.
