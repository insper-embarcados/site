# IRQ - Preparatório

| Lab 2 - IRQ - Preparatório                            |
|--------------------------------------------------------|
| **Deadline**: =={{lab_irq_pre_deadline}}==             |
| **Entrega:** [classroom]({{lab_irq_pre_classroom}})    |
| 💰 Penalização de **UM** conceito na nota final do lab |

!!! warning
    1. IRQ
    1. Borda
    1. sleep mode

Em computação, frequentemente surge a necessidade de realizar ações com base em eventos. Esses eventos podem ser classificados como internos ou externos ao processador/microcontrolador. Por exemplo, o término de um cálculo realizado por um dos núcleos de um processador multicore ou a detecção de um overflow de memória são exemplos de eventos internos ao CORE (processador). Por outro lado, a notificação de um novo pacote recebido pela comunicação Ethernet ilustra um evento externo ao CORE.

A estruturação de um programa orientada a eventos oferece várias vantagens ao programador:

1. Independência entre as diferentes partes do programa.
1. Facilidade de modificação e atualização.
1. Definição clara de prioridades.
1. Melhoria na correlação entre o código e a documentação.

Nesse paradigma, define-se funções específicas para determinados eventos, que são executadas quando esses eventos são detectados. As funções/eventos podem ter diferentes níveis de prioridade, permitindo ao programador estabelecer quais devem ser executadas primeiro em caso de eventos simultâneos.

Por exemplo, é possível definir uma função que é acionada sempre que chega um dado pela porta Ethernet e outra que reage ao pressionamento de um botão. Também se podem estabelecer eventos periódicos, como a execução de uma função a cada X segundos (por exemplo, para piscar um LED).

## Embarcados

Em computadores, os eventos são geralmente gerenciados pelo sistema operacional (OS), como Linux, Windows, entre outros. Porém, em sistemas embarcados, nem sempre dispomos de um sistema operacional, ou não podemos tolerar a latência associada à troca de contexto do OS (nada é de graça!). Para esses casos, existem as interrupções de hardware, que são chamadas de funções (ou eventos) executadas pelo microcontrolador (uC) em resposta a eventos detectados pelos periféricos. Embora essas interrupções também ocorram em computadores, nelas o OS geralmente gerencia tudo.

Por exemplo, é possível configurar o uC para que, toda vez que um botão for pressionado (ou seja, quando houver uma mudança de estado de HIGH para LOW), uma função específica (conhecida como `handler`) seja executada. Isso elimina a necessidade de verificar constantemente a mudança de estado do pino em um loop `while(1)`, técnica conhecida como polling. O uso de interrupções abre portas para uma série de otimizações, sendo a economia de energia uma das principais vantagens.

O estilo de programação que consiste em verificar repetidamente uma mudança de estado é chamado de **polling**, método que foi utilizado nos laboratórios realizados até agora.

``` c
while(1){
  if(gpio_get(BTN))
    gpio_set(LED, 1);
  else
    gpio_set(LED, 0);
};
```

!!! info
    Nesse exemplo de código fica-se constantemente checando por alterações no registrador do PIO responsável pelo botão a fim de decidirmos se o LED ficará acesso ou apagado. O CORE está constantemente trabalhando a fim de executar essas operações.

## IRQ

Interruption Request (`IRQ`) 

## IRQ - Keep it short and simple 

O tempo que um firmware deve ficar na interrupção deve ser o menor possível, pelos principais motivos:

1. Outras interrupções de mesma prioridade irão aguardar o retorno da interrupção. O firmware irá deixar de servir de maneira rápida a diferentes interrupções se gastar tempo nelas.
2. Nem todas as funções [são reentrantes](https://en.wikipedia.org/wiki/Reentrancy_(computing)). Funções como `printf` podem ==não operar== corretamente dentro de interrupções por poderem ser chamadas mais de uma vez, sem terem terminado de executar.
3. RTOS: As tarefas devem ser executadas em tasks e não nas interrupções, possibilitando assim um maior controle do fluxo de execução do firmware (vamos ver isso mais para frente).

> Para maiores informações acesse: https://betterembsw.blogspot.com/2013/03/rules-for-using-interrupts.html

Existem algumas soluções para essa questão, a mais simples delas é a de realizar o processamento de uma interrupção no loop principal (`while(1)`), essa abordagem é muito utilizada em sistemas embarcados. E deve ser feita da forma a seguir:

- Define-se uma variável global que servirá como `flag` (`true` ou `false`) e **importante, essa variável precisa ser do tipo `volatile`**)
- Interrupção altera o status da `flag` para True
- `while(1)` verifica status da `flag` para realizar ação.
- `while(1)` volta a `flag` para o estado original False.

Analise o exemplo a seguir que ilustra o uso de flags para tratar o evento no botão:

``` c
/* flag */
volatile char g_but_flag; // (1)

/* funcao de callback/ Handler */
void btn_callback(uint gpio, uint32_t events) {
  g_but_flag = 1;
}

void main(void){
  /* Inicializacao */
  // ...
  // ...

  while(1){
  
   if (g_but_flag) {  // (2)
       pisca_led(5, 200);    
       g_but_flag = 0; // (3)
   }
  }
}
```

1. Note que a variável que será utilizada como flag foi declarada como volatile
1. O bloco de código dentro do if só será processado quando o but_flag for True
1. ⚠️ Essa linha é muito importante pois sem ela o bloco do if seria executuado novamente sem o evento externo do botão.

!!! info "volatile"
    Sempre que uma interrupção alterar uma variável global, essa deve possuir o 'pragma'/modificador [`volatile`](https://barrgroup.com/Embedded-Systems/How-To/C-Volatile-Keyword).
    
    Exemplo: `volatile int valADC;`
    
    Esse pragma serve para informar o compilador (no nosso caso GCC) que essa variável será modificada sem que o compilador saiba, evitando assim que a variável não seja compilada. 
    
    Compiladores são projetados para otimizar programas removendo trechos ou variáveis desnecessárias. Como a função de `Handler` (interrupção) nunca é chamada diretamente pelo programa, o compilador pode supor que essa função não vai ser executada nunca e pode optimizar a variável que nela seria atualizada (já que não é chamada diretamente, mas sim pelo hardware quando ocorre um evento). 
    
    - Leia mais sobre [volatile](https://barrgroup.com/Embedded-Systems/How-To/C-Volatile-Keyword)
    
    ==ATENÇÃO: só usar `volatile` quando necessário uma IRQ altera o valor de uma variável==.


