---
linksTitle: "Entrega"
links:
  - title:
    text: "Classroom"
    url: "{{lab_expert_2}}"
    box: "box-blue"
  - title: 
    text: "PrairieLearn"
    url: "{{prairielearn}}"
    box: "box-yellow"
  - title: "30% da nota de lab"
    box: "box-green"
---


# Expert - firmware - RTOS

Nesse laboratório iremos trabalhar com:

1. Métricas para sistemas de tempo real
1. Uso do `Symmetric Multiprocessing` (SMP) com FreeRTOS (multicore)

Antes de começar o lab será necessário estudar os materiais a seguir:

::::: center
:::: third Leitura 1
::: card [Métricas RTOS](/guides/freertos-metrics)
:::
::::
:::: third  Leitura 2
::: card [SMP RTOS](/guides/freertos-smp)
::::
:::: third
::::
:::::

A ideia deste laboratório é que vocês **reutilizem um laboratório já implementado anteriormente** (I²C) como base para as medições.
Primeiro, devem realizar todas as medições de métricas executando o sistema **em um único core**, exatamente como foi feito no laboratório original. Em seguida, devem habilitar o modo SMP e distribuir as tasks entre os dois cores da CPU, explorando o paralelismo disponível.

Após essa modificação, todas as métricas devem ser **medidas novamente**, permitindo comparar os resultados antes e depois do uso dos dois cores.
O objetivo é **quantificar o ganho real de desempenho** obtido com o uso de SMP, com base em medições experimentais.

A entrega deve ser uma documentação das métricas no **README** do repositório com:

Tabela — Single Core:

| Métrica \ Task     | mpu_task | fusion_task | uart_task | pwm_task |
| ------------------ | -------- | ----------- | --------- | -------- |
| WCET               |          |             |           |          |
| Jitter             |          |             |           |          |
| Deadline Miss Rate |          |             |           |          |
| Stack Usage        |          |             |           |          |

Tabela — SMP (2 cores):

| Métrica \ Task     | mpu_task | fusion_task | uart_task | pwm_task |
| ------------------ | -------- | ----------- | --------- | -------- |
| WCET               |          |             |           |          |
| Jitter             |          |             |           |          |
| Deadline Miss Rate |          |             |           |          |
| Stack Usage        |          |             |           |          |

### Parte 1 — Medindo *Single Core*

Instrumentalizando tempo:

1. Instrumentalize cada uma das *tasks* (use um pino diferente para cada task).
2. Conecte ao osciloscópio e realize as medições.
3. Realize os cálculos

Instrumentalizando *stack size*:

3. Agora instrumentalize o *stack size*.

> Sempre que for medir o tempo, desative a instrumentalização do *stack size*, pois o `printf` pode consumir tempo e afetar sua medição.

### Parte 2 — SMP no FreeRTOS

Ative o modo SMP no FreeRTOS e defina a afinidade de cada *task*.

### Parte 3 — Medindo em SMP

Refaça as medições com o SMP ativado.
