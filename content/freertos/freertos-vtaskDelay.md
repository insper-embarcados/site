# `vTaskDelay`

A função [vTaskDelay()](https://www.freertos.org/a00127.html) faz com que a tarefa fique em estado de **blocked** (permitindo que outras tarefas utilizem a CPU) por um determinado número de **ticks**. Essa função é diferente da `delay_ms()` que bloqueia a CPU para sua execução. Deve-se evitar o uso de funções de delay baseadas em "queimar" clocks na tarefas de um RTOS, já que elas agem como um trecho de código a ser executada.


```c
/* suspende por delay ms */
vTaskDelay(pdMS_TO_TICKS(delay));
```

O Tick de um RTOS define quantas vezes por segundo o escalonador irá executar o algoritmo de mudança de tarefas, no ARM o tick é implementado utilizando um timer do próprio CORE da ARM chamado de `system clock` ou [`systick`](http://infocenter.arm.com/help/index.jsp?topic=/com.arm.doc.dai0179b/ar01s02s08.html), criado para essa função.

Por exemplo, um RTOS que opera com um tick de 10ms irá decidir pelo chaveamento de suas tarefas 100 vezes por segundo, já um tick configurado para 1ms irá executar o escalonador a uma taxa de 1000 vezes por segundo. Trechos de código que necessitam executar a uma taxa maior que 1000 vezes por segundo (tick = 1ms) não devem ser implementados em tasks do RTOS mas sim via interrupção de timer.


!!! note
    - O impacto do tick na função `vTaskDelay` é que a mesma só pode ser chamada com múltiplos inteiros referente ao tick.
    - Não temos uma resolução tão boa quanto o Timer.
    - Quanto maior a frequência de chaveamento mais vezes/segundo o OS necessita salvar e recuperar o contexto, diminuindo assim sua eficiência.
    - Frequência máxima recomendada para o freertos em uma ARM e a de 1000 Hz

!!! info "Estados de uma task"
    A máquina de estados a seguir ilustra os possíveis estados de uma
    task assim como as transições. Para saber mais a respeito acesse:

    - https://www.freertos.org/RTOS-task-states.html

    ![](https://www.freertos.org/fr-content-src/uploads/2018/07/tskstate.gif)

## Snippets

Suspende uma tarefa por 100ms

```c
vTaskDelay(pdMS_TO_TICKS(100));
```
