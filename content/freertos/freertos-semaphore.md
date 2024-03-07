## Semáforos / `sempahore`

!!! tip
    Para mais informações ler o site do freeRTOS sobre semáforos binários:
    
    - https://www.freertos.org/Embedded-RTOS-Binary-Semaphores.html

!!! video
    ![](https://www.youtube.com/watch?v=5JcMtbA9QEE)

Filas / mutex são uma ferramenta fundamental de sincronização em programação concorrente e sistemas operacionais, utilizados para gerenciar o acesso a recursos compartilhados por múltiplas tarefas. Eles funcionam como um contador que regula quantas tarefas podem acessar um determinado recurso simultaneamente.

Quando uma tarefa deseja acessar um recurso que é gerenciado por um semáforo, ela precisa realizar uma operação de "espera" (`wait`). Esta operação verifica se o contador do semáforo é maior que zero, o que indica que o recurso está disponível. Se for o caso, a tarefa decrementa o contador e ganha acesso ao recurso. Caso contrário, se o contador for zero, isso indica que não há recursos disponíveis no momento, e a tarefa é colocada em um estado de espera até que um recurso seja liberado.

![](https://www.freertos.org/fr-content-src/uploads/2018/07/binary-semaphore.gif)

## Para que serve?

O semáforo veio para substituir o uso de flags, no sistema barematal nós fazíamos algo como:

```c
void btn_callback(uint gpio, uint32_t events) {
    if (events == 0x4) {         // fall edge
        flag_f_r = 1;
    }
} 


void main(void) {
 // ....
 
    while(1) { 
        if(flag_f_r) {
            // faz alguma coisa
            flag_f_r = 0;
        }
    }
}
```
 
Agora com semáforo iremos fazer o seguinte:

```c
void btn_callback(uint gpio, uint32_t events) {
    if (events == 0x4) {         // fall edge
        xSemaphoreGiveFromISR(xSemaphore, 0);
} 


void task_main(void) {
 // ....

    while(1) { 

        if(xSemaphoreTake(xSemaphore, pdMS_TO_TICKS(100)))
            // faz alguma coisa
        } else { 
            // cai aqui se o semáforo não for liberado em 100 ms!
        }
        
    }
}
```

!!! info "Timeout"
    É o tempo que iremos esperar um dado na fila (task dorme enquanto espera dado).
 
## IRS

FreeRTOS é projetado para sistemas embarcados onde a manipulação eficiente de interrupções é crucial para o desempenho em tempo real. Quando uma interrupção ocorre, a execução normal do sistema é pausada e a ISR correspondente é executada. Após a conclusão da execução da ISR, o sistema retoma sua operação normal. Como as ISRs podem interromper a execução de tarefas regulares a qualquer momento, é essencial minimizar o tempo gasto dentro de uma ISR para manter a capacidade de resposta do sistema.  

Sempre que forem manipular o RTOS de uma interrupção/ callback de hardawre vocês devem utilizar o conjunto de funções que terminam em `FromIRS`. O sufixo `FromISR` nos nomes das funções significa "From Interrupt Service Routine" (De Rotina de Serviço de Interrupção), indicando que essas funções são seguras para serem chamadas de uma ISR (Interrupt Service Routine).

No caso do semáforo, vai ser muito comum liberar o semáforo de uma IRS, como no exemplo a seguir de um alarme de timer:

```c
bool timer_0_callback(repeating_timer_t *rt) {
    xSemaphoreGiveFromISR(xSemaphore, 0);
    return true; // keep repeating
}
```

Mas se for liberar o semáforo de uma `task_1` para outra `task_2` usar:

```c
void task_1(void) {
    // ..
    xSemaphoreGive(xSemaphore);

}
```

!!! warning
    Muitos alunos confundem e acham que devem chamar `FromIRS` quando estão recebendo um dado de uma IRS, mas isso não é verdade, as funções com o sufixo devem ser usadas quando chamadas de uma IRS.

### Dicas de uso

!!! tip "Regra de ouro"
    O semáforo vai ser utilizado no lugar do uso de flag. 

Para criarmos e usarmos um semáforo é necessário:

1. Criar a variável global que representará o semáforo
    - `SemaphoreHandle_t xSemaphore;`
1. Criar o semáforo (na função `main`)
    - [`xSemaphoreCreateBinary();`](https://www.freertos.org/xSemaphoreCreateBinary.html)
1. Liberar o semáforo
    - [`xSemaphoreGiveFromISR(xSemaphore, 0);`](https://www.freertos.org/a00124.html) (se for liberado de uma ISR)
    - [`xSemaphoreGive(xSemaphore);`](https://www.freertos.org/a00123.html) (se for liberado de outra task)
1. Esperar pelo semáforo
    - [`xSemaphoreTake(xSemaphore, 500)`](https://www.freertos.org/a00122.html)

### Snippets

Snippets de código usando semáforo

### Task-Task

Analise o código a seguir, onde um semáforo binário é liberado de uma task para outra:

```c
/* ... Código omitido */

SemaphoreHandle_t xSemaphore_r;

void led_1_task(void *p) {
  gpio_init(LED_PIN_R);
  gpio_set_dir(LED_PIN_R, GPIO_OUT);

  int delay = 250;
  int status = 0;

  while (true) {

    if (xSemaphoreTake(xSemaphore_r, pdMS_TO_TICKS(500)) == pdTRUE) {
      gpio_put(LED_PIN_R, 1);
      vTaskDelay(pdMS_TO_TICKS(delay));
      gpio_put(LED_PIN_R, 0);
      vTaskDelay(pdMS_TO_TICKS(delay));
    }
  }
}

void btn_1_task(void *p) {
  gpio_init(BTN_PIN_R);
  gpio_set_dir(BTN_PIN_R, GPIO_IN);
  gpio_pull_up(BTN_PIN_R);

  while (true) {
    if (!gpio_get(BTN_PIN_R)) {
      while (!gpio_get(BTN_PIN_R)) {
        vTaskDelay(pdMS_TO_TICKS(1));
      }
      xSemaphoreGive(xSemaphore_r);
    }
  }
}

int main() {
  /* ... Código omitido */
  
  xSemaphore_r = xSemaphoreCreateBinary();

  xTaskCreate(led_1_task, "LED_Task 1", 256, NULL, 1, NULL);
  xTaskCreate(btn_1_task, "BTN_Task 1", 256, NULL, 1, NULL);

  /* ... Código omitido */
```

### IRQ - TASK

``` c
// variável global que é o endereço 
// do semáforo  
SemaphoreHandle_t xSemaphore;

void but_callback(void){
  // libera semáforo 
  xSemaphoreGiveFromISR(xSemaphore, 0);
}

static void task_led(void *pvParameters){
  init_led1();   // inicializa LED1
  init_but1();   // inicializa botao 1, com callback
  
  for (;;) {
      // aguarda por até 500 ms pelo se for liberado entra no if
      if( xSemaphoreTake(xSemaphore, 500 / portTICK_PERIOD_MS) == pdTRUE ){
        LED_Toggle(LED0);
      }
    }
}

void main(void) {
  // .... //

  // cria semáforo binário
  xSemaphore = xSemaphoreCreateBinary();

  // verifica se semáforo foi criado corretamente
  if (xSemaphore == NULL)
      printf("falha em criar o semaforo \n");
```
    
!!! tip
    1. O semáforo deve ser sempre alocado antes do seu uso, caso alguma parte do firmware tente liberar o semáforo antes dele ser criado (`xSemaphoreCreateBinary()`) o código irá travar.
    1. Você deve usar `fromISR` SEMPRE que liberar um semáforo de uma interrupção, caso contrário usar a função `xSemaphoreGive()`

