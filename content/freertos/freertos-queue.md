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
      if( xQueueReceive( xQueueButId, &id, ( TickType_t ) 500 )){
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
