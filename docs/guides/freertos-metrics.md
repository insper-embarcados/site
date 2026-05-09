# Métricas RTOS

Trabalhar com sistemas de tempo real envolve não só sabermos como projetar esses sistemas, mas também medirmos para verificar se estamos respeitando os requisitos de projeto, e então podermos afirmar que o sistema realmente funciona dentro das restrições temporais.

Existem diversas métricas que podem ser utilizadas. Aqui iremos detalhar algumas das mais importantes para este laboratório. Outras podem ser encontradas em literaturas específicas:

- Artigo [Building timing predictable embedded systems](https://dl.acm.org/doi/10.1145/2560033)
- Livro [A Practical Introduction to Real-Time Systems (UW)](https://ece.uwaterloo.ca/~dwharder/icsrts/Lecture_materials/A_practical_introduction_to_real-time_systems_for_undergraduate_engineering.pdf?utm_source=chatgpt.com)

## Worst Case Execution Time (WCET)

O WCET mede o pior tempo que uma tarefa (no nosso caso, uma task do RTOS) leva para ser executada. Esse valor pode ser obtido de duas formas:

- Analítica: utilizando técnicas formais da teoria da computação e análise estática de código.
- Empírica (exploratória): executando o firmware sob diferentes estímulos e medindo o pior tempo observado.

Embora a task seja configurada para executar com um determinado período (ex: a cada 10 ms), o período real pode variar devido a:

- interferência de outras tasks
- tempo gasto em ISR
- contenção de recursos
- uso de recursos externos (LCD, printf)

### Exemplo

Considere uma task configurada para executar a cada **10 ms**. 

| Execução | Tempo medido da task |
| -------- | -------------------- |
| 1        | 6.8 ms               |
| 2        | 7.1 ms               |
| 3        | 6.5 ms               |
| 4        | 7.6 ms               |
| 5        | 7.3 ms               |
| 6        | 7.9 ms               |

O maior valor observado foi:

$WCET = 7.9\ \text{ms}$

Como o período da task é **10 ms**, ainda existe uma margem de: $10 - 7.9 = 2.1\ \text{ms}$. Isso indica que, nas condições testadas, a task consegue cumprir seu deadline. Caso o WCET observado fosse superior a 10 ms, o sistema apresentaria *deadline misses*.

### Como medir?

A forma mais confiável de medir é **instrumentalizar a task** usando um GPIO:

1. Configurar um pino do microcontrolador como saída.
2. No **início** da task, colocar o pino em nível lógico `1`.
3. No **final** da task, colocar o pino em nível lógico `0`.
4. Conectar o pino a um osciloscópio.

A largura do pulso observado corresponde ao tempo de execução da task.

Medindo vários pulsos ao longo do tempo e sob diferentes estímulos, o maior valor observado corresponde ao **MCET**.

Exemplo

```c{7,15}
void mpu6050_task(void *p) {
    gpio_init(TASK_PIN)
    gpio_set_dir(TASK_PIN, GPIO_OUT);
    mpu6050_init();

    while(1) {
        gpio_put(TASK_PIN, 1);   // [!code focus]
        int16_t acceleration[3], gyro[3], temp;

        mpu6050_read_raw(acceleration, gyro, &temp);
        printf("Acc. X = %d, Y = %d, Z = %d\n", acceleration[0], acceleration[1], acceleration[2]);
        printf("Gyro. X = %d, Y = %d, Z = %d\n", gyro[0], gyro[1], gyro[2]);
        printf("Temp. = %f\n", (temp / 340.0) + 36.53);

        gpio_put(TASK_PIN, 0);  // [!code focus]
        vTaskDelay(pdMS_TO_TICKS(10));
    }
}
```

::: tip
Com essa instrumentalizacão você será capaz de medir outras métricas também.
:::

## Deadline Miss Rate

O **Deadline Miss Rate** mede com que frequência uma tarefa **não consegue terminar sua execução antes da próxima ativação**. Em uma task periódica, existe um *deadline implícito*: ela deve concluir seu processamento dentro do próprio período. Quando isso não ocorre, dizemos que houve um **deadline miss**.

> Suponha uma task configurada para rodar a cada **10 ms**.
> 
> Se, em alguns momentos, ela leva mais que 10 ms para terminar, a próxima ativação ocorrerá enquanto a anterior ainda está executando. Isso caracteriza um *deadline miss*.

Se uma task executa ( N ) vezes e em ( M ) dessas execuções ela não termina a tempo, então:

$Deadline\ Miss\ Rate = \frac{M}{N}$

Interpretação:

* **0%** → sistema atende completamente aos requisitos temporais
* **> 0%** → o sistema falha em cumprir seus deadlines e precisa ser reavaliado

### Exemplo

Considere uma task configurada para executar a cada **10 ms**.

| Execução | Tempo que a task levou | Cumpriu o deadline? |
|----------|------------------------|---------------------|
| 1        | 8.5 ms                 | ✅ Sim              |
| 2        | 9.2 ms                 | ✅ Sim              |
| 3        | 10.8 ms                | ❌ Não              |
| 4        | 11.3 ms                | ❌ Não              |
| 5        | 9.7 ms                 | ✅ Sim              |

Nessa sequência:

* Total de execuções: **5**
* Deadlines perdidos: **2**

$Deadline\ Miss\ Rate = \frac{2}{5} = 40%$

Isso indica que, em 40% das vezes, a task não conseguiu terminar antes da próxima ativação, mostrando que o sistema não está conseguindo atender aos requisitos temporais.


## Jitter

O jitter é a variação temporal indesejada no instante em que uma tarefa periódica executa. Mesmo que uma task esteja configurada para rodar, por exemplo, a cada 10 ms, na prática ela não executa exatamente nesses instantes. Essa variação é o jitter.

> Em sistemas de tempo real, não basta cumprir o período médio — é fundamental que o instante de execução seja previsível. o alto jitter em aplicações reais (áudio, controle, comunicação) pode causar:
> 
> * distorção de sinal
> * instabilidade de controle
> * perda de amostras

Considere:

* ( T_i ) = instante real da i-ésima execução da task
* ( P ) = período configurado

O período real observado entre execuções é:

$P_i = T_i - T_{i-1}$

O jitter é definido como:

$Jitter = P_{max} - P_{min}$

Onde:

* $P_{max}$ = maior período observado
* $P_{min}$= menor período observado

### Exemplo

Se a task deveria executar a cada **10 ms** e você mede:

| Execução | Período medido |
| -------- | -------------- |
| 1        | 10.1 ms        |
| 2        | 9.8 ms         |
| 3        | 10.4 ms        |
| 4        | 9.7 ms         |

Então:

$Jitter = 10.4 - 9.7 = 0.7\ \text{ms}$

Isso significa que o sistema tem uma incerteza temporal de **700 µs** a cada ativação.

## Métricas de Stack no FreeRTOS

Em sistemas embarcados com RTOS, cada *task* possui **sua própria stack**.
Essa stack é a região de memória utilizada durante a execução da task para:

* variáveis locais
* parâmetros de função
* endereços de retorno de chamadas
* contexto salvo pelo RTOS durante trocas de tarefa (*context switch*)

Diferente de programas simples (*bare-metal*), onde existe apenas uma stack global, no **FreeRTOS** cada task precisa ter sua stack dimensionada corretamente.

> Não existe uma forma correta de definir o tamanho da `stack`, normalmente começamos com um valor e vamos ajustando.

::: tip Regra de ouro
Quando eu trabalhava com desenvolvimento de firmwares para satélite, o requisito do projeto era que a `task` deveria ocupar no seu pior caso 80% da `stack` que foi alocada para ela. Vamos utilizar essa **regra de ouro**.
:::

Sem essa medição, é comum ocorrer:

* estouro de stack intermitente
* comportamento imprevisível
* travamentos difíceis de diagnosticar

### Criação da task e o tamanho da stack

Ao criar uma task, o tamanho da stack é definido no momento da chamada da função:

```c
xTaskCreate(
    vAudioTask,          // Função da task
    "AudioTask",         // Nome
    stack_size,          // Tamanho da stack (palavras) // [!code focus]
    NULL,                // Parâmetros
    prioridade,          // Prioridade
    NULL                 // Handle
);
```

O terceiro parâmetro define **quantas palavras** a stack terá.

Escolher esse valor “no chute” é um erro comum e pode causar:

* Stack overflow (valor pequeno demais)
* Desperdício de memória (valor grande demais)

### Como medir o uso real da stack

> https://www.freertos.org/Documentation/02-Kernel/04-API-references/03-Task-utilities/04-uxTaskGetStackHighWaterMark

O FreeRTOS fornece a função `uxTaskGetStackHighWaterMark` que retorna o tamanho máximo já oculpado pela stack. Ai podemos chamar na task:

```c
UBaseType_t watermark = uxTaskGetStackHighWaterMark(NULL);
printf("Stack livre minima: %u palavras\n", watermark);
```

Essa função retorna **o menor espaço livre já observado** na stack da task desde que ela começou a executar.

Com esse valor, é possível calcular o uso real:

$Stack\ Usage = 1 - \frac{HighWaterMark}{StackSize}$

### Exemplo

Suponha que a task foi criada com:

* `stack_size = 1024` palavras

E a função retornou:

* `HighWaterMark = 300` palavras livres no pior caso depois de um bom tempo executando.

Então:

$Stack\ Usage = 1 - \frac{300}{1024} \approx 70\%$ que é $< 80\%$

Isso indica um dimensionamento adequado (com base na regra que eu comentei dos 80%).
