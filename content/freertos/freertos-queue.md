# Queue

!!! tip
    Para mais informações ler o site do freeRTOS sobre filas:
    
    - https://www.freertos.org/Embedded-RTOS-Queues.html
    - https://freertos.org/a00018.html 

!!! video
    ![](https://www.youtube.com/watch?v=pHJ3lxOoWeI)

Mailbox/ `queue` é uma das maneiras de enviarmos dados entre tarefa em um sistema operacional, com ele podemos comunicar interrupção com tarefa e tarefa com tarefa, enviando valores (diferente do semáforo que só funciona de forma binária).

!!! note
    Queues are the primary form of intertask communications. They can be used to send messages between tasks, and between interrupts and tasks. In most cases they are used as thread safe FIFO (First In First Out) buffers with new data being sent to the back of the queue, although data can also be sent to the front. 
    
    Writing to and reading from a queue. In this example the queue was created to hold 5 items, and the queue never becomes full.
    
    ![](https://www.freertos.org/fr-content-src/uploads/2018/07/queue_animation.gif) 
    
    > Material retirado do site: https://www.freertos.org/Embedded-RTOS-Queues.html

Em uma fila você pode enviar qualquer tamanho de "informação" e a fila pode ter N posições.

## Para que serve?

As filas vão ser utilizadas para transmitir dado entre partes de um programa, e isso pode ser de um `callback` para um `task`, de uma `task` para um `callback` ou entre `tasks`. Analise o exemplo aplicado para o LAB 3 do sensor de ultrasom, onde queremos ler o valor do timer quando o pino sobe e quando ele desce:

```c
// time_end e time_init são variáveis globais! 

void gpio_callback(uint gpio, uint32_t events) {
    if (events == 0x4) { // fall edge
        time_end = to_us_since_boot(get_absolute_time());
    } else if (events == 0x8) { // rise edge
        time_init = to_us_since_boot(get_absolute_time());
    }
}
```

Com uma fila podemos simplesmente colocar o dado na fila e depois lê na `task` que vai processar os dados:

```c
// apenas xQueueTime é global (fila do RTOS)

void gpio_callback(uint gpio, uint32_t events) {
    int time = 0;
    if (events == 0x4) { // fall edge
        time = to_us_since_boot(get_absolute_time());
    } else if (events == 0x8) { // rise edge
        time = to_us_since_boot(get_absolute_time());
    }
    xQueueSendFromISR(xQueueTime, &time, 0);
}
```

O dado que está na fila pode ser lido da seguinte maneira:

```c
void taks_1(void){
  
  int gpio;
  while(1) {
  
    if (xQueueReceive(xQueueBtn, &gpio,  pdMS_TO_TICKS(100))) {
      printf("Botão pressionado pino %d", gpio);
    } else {
      // cai aqui se não chegar um dado em 100 ms!
    }
  }
  
}
```

Notem o exemplo anterior ler um dado da fila, temos que passar 3 argumentos:

- `xQueueBtn`: Fila que desejamos ler
- `&gpio`: Local que vamos armazenar o valor lido
- `pdMS_TO_TICKS(100))`: Tempo que iremos esperar o dado na fila.


!!! info "Timeout"
  É o tempo que iremos esperar um dado na fila (task dorme enquanto espera dado).



## IRS

FreeRTOS é projetado para sistemas embarcados onde a manipulação eficiente de interrupções é crucial para o desempenho em tempo real. Quando uma interrupção ocorre, a execução normal do sistema é pausada e a ISR correspondente é executada. Após a conclusão da execução da ISR, o sistema retoma sua operação normal. Como as ISRs podem interromper a execução de tarefas regulares a qualquer momento, é essencial minimizar o tempo gasto dentro de uma ISR para manter a capacidade de resposta do sistema.  

Sempre que forem manipular o RTOS de uma interrupção/ callback de hardawre vocês devem utilizar o conjunto de funções que terminam em `FromIRS`. O sufixo `FromISR` nos nomes das funções significa "From Interrupt Service Routine" (De Rotina de Serviço de Interrupção), indicando que essas funções são seguras para serem chamadas de uma ISR (Interrupt Service Routine).

No caso da fila, vai ser muito comum colocarmos dados na fila de uma IRS e ler o valor em uma `task`:

```c
// nesse exemplo colocamos o valor do botão que gerou a IRS na fila!
void btn_callback(uint gpio, uint32_t events) {
    xQueueSendFromISR(xQueueBtn, &gpio, 0);
}
```

Mas se for enviar informacão de uma `task_1` para outra `task_2` usar:

```c
void task_1(void) {
  xQueueSend(xQueueBtn, &dado, 0 );

}
```

## Usando

Para criarmos e usarmos um semáforo é necessário:

1. Criar a variável global que representará a fila
    - `QueueHandle_t xQueueButId;`
1. Criar a fila (na função `main`)
    - `xQueueButId = xQueueCreate(32, sizeof(char) );`
    - Ao criar a fila você deve informar a quantidade de itens (`32`) nessa fila e o tipo dos itens (`sizeof(char)`).
1. Colocar dados na fila:
    - `xQueueSendFromISR(xQueueButId, &id, 0);` (se for de uma ISR)
    - `xQueueSend(xQueueButId, &id);` (se for de uma outra task)
1. Receber dados da fila:
    - `xQueueReceive( xQueueButId, &id, ( TickType_t ) 500 )`


### Snippets

Snippets de código usando `queue`.

### Task-Task

```c

//fila
QueueHandle_t xQueueInput;

void led_1_task(void *p) {

    int number = 0;
    int finished = 1;

    for (;;) {

          if (finished == 1) {
          //Recebe número da main para começar tarefa
            if (xQueueReceive(xQueueInput, &number, pdMS_TO_TICKS(500)) == pdTRUE) {
                finished = 2;
            }
        }

        //Aguarda receber número da main ou da task_2_led para executar
        if (finished == 2 || xQueueReceive(xQueueLed1, &number, pdMS_TO_TICKS(500)) == pdTRUE) {

            //Muda finished para 0, indicando que o número atual está sendo processado
            if (finished == 2) {
                finished = 0;
            }

            if (number > 0) {

              //Pisca LED amarelo e decrementa o número
                gpio_put(LED_PIN_Y, 1);
                vTaskDelay(pdMS_TO_TICKS(500));
                gpio_put(LED_PIN_Y, 0);
                vTaskDelay(pdMS_TO_TICKS(500));

                number--;

                if (number >= 0) {
                  //Manda novo valor do número para a led_2_task
                    xQueueSend(xQueueLed2, &number, 0);
                }
            }

            if (number < 1) {
              //Finaliza operação para receber próximo número na fila xQueueInput
                finished = 1;
            }
        }
    }
}

void led_2_task(void *p) {
    int number = 0;

    for (;;) {

        //Aguarda receber número da task_1_led para executar
        if (xQueueReceive(xQueueLed2, &number, pdMS_TO_TICKS(500)) == pdTRUE) {
            if (number > 0) {

              //Pisca LED azul e decrementa o número
                gpio_put(LED_PIN_B, 1);
                vTaskDelay(pdMS_TO_TICKS(500));
                gpio_put(LED_PIN_B, 0);
                vTaskDelay(pdMS_TO_TICKS(500));

                number--;

                if (number >= 0) {
                  //Manda novo valor do número de volta para a led_1_task
                    xQueueSend(xQueueLed1, &number, 0);
                }
            }
        }
    }
}

void main(void) {

  //Cria fila de imput
  xQueueInput = xQueueCreate(32, sizeof(int) );
  int number = 8;


  if (xQueueButId == NULL){
      printf("falha em criar a fila \n");
  }
  else{
    //Envia número para a fila xQueueInput
    xQueueSend(xQueueInput, &number, 0);
  }

}

```

### IRQ-TASK

```c
// fila
QueueHandle_t xQueueButId;
 
void btn_callback(uint gpio, uint32_t events) {
  char id;
  if (events == 23) {         
      id = 23;
  } else if (gpio == 22) {  
      id = 22;
  }
  
  xQueueSendFromISR(xQueueButId, &id, 0);
}


static void task_led(void *pvParameters){
  init_led1();   // inicializa LED1
  init_but1();   // inicializa botao 1, com callback
  init_but2();   // inicializa botao 2, com callback
  
  // variável local para leitura do dado da fila
  char id;

  for (;;) {
      // aguarda por até 500 ms pelo se for liberado entra no if
      if( xQueueReceive( xQueueButId, &id, pdMS_TO_TICKS(100))){
        for (i =0; i < 10; i++) {
          gpio_put(id, i/2);
          vTaskDelay(pdMS_TO_TICKS(100));
        }
      }
    }
}

void main(void) {
  // .... //

  // cria fila de 32 slots de char
  xQueueButId = xQueueCreate(32, sizeof(char) );
  
  // verifica se fila foi criada corretamente
  if (xQueueButId == NULL)
      printf("falha em criar a fila \n");
}
```
