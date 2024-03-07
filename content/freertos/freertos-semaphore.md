## Semáforos / `sempahore`

!!! tip
    Para mais informações ler o site do freeRTOS sobre semáforos binários:
    
    - https://www.freertos.org/Embedded-RTOS-Binary-Semaphores.html

!!! video
    ![](https://www.youtube.com/watch?v=5JcMtbA9QEE)

Filas / mutex são uma ferramenta fundamental de sincronização em programação concorrente e sistemas operacionais, utilizados para gerenciar o acesso a recursos compartilhados por múltiplas tarefas. Eles funcionam como um contador que regula quantas tarefas podem acessar um determinado recurso simultaneamente.

Quando uma tarefa deseja acessar um recurso que é gerenciado por um semáforo, ela precisa realizar uma operação de "espera" (`wait`). Esta operação verifica se o contador do semáforo é maior que zero, o que indica que o recurso está disponível. Se for o caso, a tarefa decrementa o contador e ganha acesso ao recurso. Caso contrário, se o contador for zero, isso indica que não há recursos disponíveis no momento, e a tarefa é colocada em um estado de espera até que um recurso seja liberado.

![](https://www.freertos.org/fr-content-src/uploads/2018/07/binary-semaphore.gif)

### Usando

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

