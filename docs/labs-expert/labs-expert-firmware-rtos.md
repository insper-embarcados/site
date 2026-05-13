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
---


# Expert - Firmware - RTOS

Neste laboratório vamos trabalhar com:

1. Métricas para sistemas de tempo real
2. Uso de `Symmetric Multiprocessing` (SMP) com FreeRTOS (multicore)

Antes de começar o lab, será necessário estudar os materiais a seguir:

::::: center
:::: third Leitura 1
::: card [Métricas RTOS](/guides/freertos-metrics)
:::
::::
:::: third Leitura 2
::: card [SMP RTOS](/guides/freertos-smp)
::::
:::: third
::::
:::::

A ideia deste laboratório é que vocês **reutilizem um laboratório já implementado anteriormente** (I²C) como base para as medições.
Primeiro, devem realizar todas as medições de métricas executando o sistema **em um único core**, exatamente como foi feito no laboratório original. Em seguida, devem habilitar o modo SMP e distribuir as tasks entre os dois cores da CPU, explorando o paralelismo disponível e tentando otimizar, o melhor possível, a alocação de recursos.

Após essa modificação, todas as métricas devem ser **medidas novamente**, permitindo comparar os resultados antes e depois do uso dos dois cores.
O objetivo é **quantificar o ganho real de desempenho** obtido com o uso de SMP, com base em medições experimentais.

A entrega deve ser uma documentação das métricas no **README** do repositório, com:

Tabela — Single Core:

| Métrica / Task     | mpu_task | fusion_task | uart_task | pwm_task |
| ------------------ | -------- | ----------- | --------- | -------- |
| WCET               |          |             |           |          |
| Jitter             |          |             |           |          |
| Deadline Miss Rate |          |             |           |          |
| Stack Usage        |          |             |           |          |

Tabela — SMP (2 cores):

| Métrica / Task     | mpu_task | fusion_task | uart_task | pwm_task |
| ------------------ | -------- | ----------- | --------- | -------- |
| WCET               |          |             |           |          |
| Jitter             |          |             |           |          |
| Deadline Miss Rate |          |             |           |          |
| Stack Usage        |          |             |           |          |

::: tip
Você pode usar outros equipamentos para realizar as medições:

- saleae 
- analog discovery
:::

### Parte 1 — Medindo em *Single Core*

Instrumentalizando o tempo:

1. Instrumentalize cada uma das *tasks* (use um pino diferente para cada task).
2. Conecte ao osciloscópio e realize as medições.
3. Realize os cálculos.

Instrumentalizando o *stack size*:

1. Agora instrumentalize o *stack size*.

> Sempre que for medir o tempo, desative a instrumentalização do *stack size*, pois o `printf` pode consumir tempo e afetar a sua medição.

::: info
Tire fotos das medições; vamos querer ver como você as adquiriu.
:::

### Parte 2 — SMP no FreeRTOS

Agora vamos otimizar o software com base no que vocês estão medindo.

1. Ative o modo SMP no FreeRTOS e defina a afinidade de cada *task*. Usando os dados da tabela "Single Core", defina a melhor distribuição.
2. Ajuste as prioridades (se achar necessário).
3. Ajuste o stack para respeitar a regra dos 80%.
4. Ajuste as frequências das tasks.

### Parte 3 — Medindo em SMP

Refaça as medições. Está tudo certo agora?

### Perguntas extras

Perguntas a serem respondidas na validação:

1. Qual é a frequência máxima que a task `fusion` pode executar?
2. Nós configuramos o `fusion` para funcionar a 100 Hz. Isso estava correto?
```c
#define SAMPLE_PERIOD (0.1f)  // replace this with actual sample period
```
3. Como otimizar a task da `uart` para que ela não ocupe tanto processamento?
4. Por que o valor do jitter é baixo/alto nessa aplicação?
8. O jitter aumentou ou diminuiu com SMP? O que mais contribuiu para isso (interrupções, afinidade, prioridades, locks)?
9. Houve *deadline miss* em alguma task? Em qual condição (Single Core vs SMP) e como você mitigou?
10. Como você mediu o jitter (qual sinal, qual definição: período entre ativações vs variação do início/fim)?
12. Qual foi o efeito de mudar prioridades vs mudar afinidade? Qual teve mais impacto e por quê?
14. O tamanho de stack de cada task ficou dentro da regra dos 80%? Mostre os valores e o racional de ajuste.
