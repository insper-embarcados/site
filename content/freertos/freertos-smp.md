
# Symmetric Multiprocessing (SMP)

Existem diversos jeitos de usarmos um RTOS com microprocessador multicore. Dois métodos populares são o Asymmetric Multiprocessing (`AMP`) e o Symmetric Multiprocessing (`SMP`), como indicado a seguir:

![](imgs/amp-smp.png)

A primeira alternativa (`AMP`) consiste em executar dois `FreeRTOS` independentes em cada um dos processadores do microcontrolador, onde cada RTOS pode possuir suas próprias tasks. A comunicação entre as `tasks` de diferentes cores pode ser complicada; uma solução é o uso do recurso que o RP2040 fornece para comunicação entre os COREs, utilizando uma FIFO:

![](imgs/rp2040-SIO.png){width=600}

==Até agora nós temos utilizado um único CORE da CPU, ignorando o outro completamente.==

## SMP

!!! video
    ![](https://www.youtube.com/watch?v=sSjSquKBNkw)

A segunda solução é executar um único `FreeRTOS` entre os dois COREs, o que simplifica bastante, já que toda a parte de baixo nível fica sob a responsabilidade do `FreeRTOS`. Assim, o scheduler do `FreeRTOS` vai alocar uma tarefa por CORE. O `FreeRTOS` recentemente fez merge na branch principal de uma atualização que adiciona suporte ao symmetric multiprocessing (`SMP`), permitindo o agendamento e distribuição de tarefas entre processadores idênticos de um microcontrolador multicore.

No SMP, existem quatro chamadas de função do `FreeRTOS` que deverão ser tratadas:

- `vTaskCoreAffinitySet(handle, mask)`: Fixa uma tarefa em um core específico. Na máscara, usar:
    - Core `0` com a máscara `1 << 0` e Core `1` com a máscara `1 << 1`.
- `vTaskCoreAffinityGet(handle)`: Retorna a qual CORE a tarefa foi atribuída.

!!! tip
    Você não precisa necessariamente associar uma task a um core; você pode deixar o escalonador decidir isso.

Para mais informações, consulte o site do FreeRTOS sobre o SMP:

- [FreeRTOS SMP Introduction](https://www.freertos.org/symmetric-multiprocessing-introduction.html)

### `FreeRTOSConfig.h`

!!! info
    Esta configuração só funciona com a nova versão da biblioteca `pico-base-rtos` lançada em 10 de maio de 2024. Portanto, o `SMP` não funcionará em laboratórios e projetos anteriores.

    - [pico-base-rtos GitHub](https://github.com/insper-embarcados/pico-base-rtos)

Para ativarmos o `SMP` em nossos projetos, precisamos editar o arquivo `freertos/FreeRTOSConfig.h` modificando as seguintes linhas:

```diff
#if FREE_RTOS_KERNEL_SMP // set by the RP2040 SMP port of FreeRTOS
/* SMP port only */
+#define configNUMBER_OF_CORES 2
#define configUSE_PASSIVE_IDLE_HOOK 0
#define configTICK_CORE 0
#define configRUN_MULTIPLE_PRIORITIES 1
+#define configUSE_CORE_AFFINITY 1
#endif
```

Essas configuracoes fazem o seguinte: `configNUMBER_OF_CORES 2` define para o FreeRTOS quantos cores irão ser utilizados, se o valor for maior que `1` o `SMP` será ativado. já o `configUSE_PASSIVE_IDLE_HOOK 0` indica que não queremos ter uma funcão de `callback` que será ativada sempre que não existir uma `task` a ser executada, o `configTICK_CORE` define qual `CORE` irá lidar com o `ticks` que o RTOS necessita para chamar o `scheduler`. o

Se `configRUN_MULTIPLE_PRIORITIES` for configurado como `0`, então apenas tarefas de prioridades iguais vão executar simultaneamente. Ou seja, se apenas uma tarefa de alta prioridade precisar executar, um dos COREs ficará ocioso.  E por último o `configUSE_CORE_AFFINITY 1` diz que podemos atribuir manualmente uma `task` a um CORE específico!
