# Métricas bare-metal multicore

Em um sistema *bare-metal*, não existe um escalonador para informar quanto tempo cada tarefa utilizou da CPU. Por isso, o firmware deve ser instrumentalizado para que seu comportamento temporal possa ser observado.

Em sistemas multicore, as métricas devem ser calculadas separadamente para cada núcleo. Isso permite verificar não apenas se o sistema atende aos requisitos temporais, mas também se o trabalho está bem distribuído entre os cores.

Neste guia serão utilizadas três métricas:

- utilização por core
- *Worst Case Execution Time* (WCET)
- desbalanceamento de carga

## Instrumentação com GPIO

Uma forma simples de realizar as medições é reservar um GPIO para cada core:

1. Coloque o GPIO em nível lógico `1` antes de iniciar o trabalho que será medido.
2. Coloque o GPIO em nível lógico `0` ao finalizar esse trabalho.
3. Observe o sinal com um osciloscópio ou analisador lógico.

```c
gpio_put(METRIC_PIN, 1);

// Trecho de código que será medido

gpio_put(METRIC_PIN, 0);
```

A largura de cada pulso representa o tempo de uma execução. A proporção de tempo em nível alto representa a utilização do core durante o intervalo observado.

::: warning
Antes de medir, defina claramente o que será considerado trabalho útil. Esperas por comandos, pelo próximo período ou por novos dados devem manter o GPIO em nível baixo. Utilize o mesmo critério e o mesmo intervalo de observação para os dois cores.
:::

## Utilização por core

A **utilização por core** indica qual fração do tempo cada núcleo permaneceu executando o trabalho definido para ele.

Considere:

- $T_{ocupado}$: soma dos intervalos em que o core realizou trabalho útil
- $T_{observacao}$: duração total da medição

A utilização de um core é calculada por:

$U = \frac{T_{ocupado}}{T_{observacao}} \times 100\%$

### Exemplo

Durante uma observação de **100 ms**, o GPIO de instrumentação do core 0 permaneceu em nível alto por um total de **35 ms**:

$U_0 = \frac{35}{100} \times 100\% = 35\%$

No mesmo intervalo, o GPIO do core 1 permaneceu em nível alto por **60 ms**:

$U_1 = \frac{60}{100} \times 100\% = 60\%$

Uma utilização elevada não representa necessariamente um erro. Entretanto, quanto mais próximo de 100%, menor é a margem disponível para lidar com variações no tempo de execução ou adicionar novas funcionalidades.

## Worst Case Execution Time (WCET)

O **WCET** representa o maior tempo que um trecho de código leva para executar. Em uma medição empírica, ele corresponde à maior duração observada entre todos os pulsos do GPIO de instrumentação.

$WCET_{observado} = \max(t_1, t_2, \ldots, t_n)$

### Exemplo

Considere os tempos medidos para uma operação executada pelo core 1:

| Execução | Tempo medido |
| -------- | ------------ |
| 1        | 5,8 ms       |
| 2        | 6,1 ms       |
| 3        | 5,9 ms       |
| 4        | 6,7 ms       |
| 5        | 6,0 ms       |

O maior valor observado foi:

$WCET_{observado} = 6,7\ \text{ms}$

Para que o resultado seja representativo, realize muitas execuções e teste condições diferentes, incluindo entradas válidas, erros, *timeouts* e diferentes frequências de operação.

::: warning
Uma medição experimental encontra o pior tempo **observado durante os testes**, mas não prova que esse seja o pior tempo possível do sistema.
:::

## Desbalanceamento de carga

O **desbalanceamento de carga** compara a utilização dos cores. Para um sistema com dois núcleos, ele pode ser calculado pela diferença absoluta entre as utilizações:

$D = |U_0 - U_1|$

### Exemplo

Utilizando os valores do exemplo anterior:

- utilização do core 0: $U_0 = 35\%$
- utilização do core 1: $U_1 = 60\%$

$D = |35 - 60| = 25\ \text{pontos percentuais}$

Quanto maior o valor, maior é a diferença de carga entre os cores. Um desbalanceamento alto pode indicar que um núcleo está próximo do seu limite enquanto o outro possui capacidade disponível.

O objetivo não é obrigatoriamente obter utilizações iguais. Alguns sistemas distribuem responsabilidades naturalmente diferentes entre os cores. A métrica deve ser analisada junto com o WCET e os requisitos temporais de cada operação.

## Resumo

| Métrica | Como obter | O que observar |
| ------- | ---------- | -------------- |
| Utilização por core | Percentual de tempo em nível alto | Margem disponível em cada core |
| WCET observado | Maior largura de pulso | Pior tempo encontrado nos testes |
| Desbalanceamento | $|U_0 - U_1|$ | Diferença de carga entre os núcleos |
