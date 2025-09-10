# APS - 1 - Genius

::::: center
:::: third 
::: box-blue 1. Classroom
[:memo: Link](https://classroom.github.com/a/7CaCkXVp)
:::
::::
:::: third
::: box-yellow 2. Entrega final
[Enviar no PrairieLearn](https://us.prairielearn.com/pl/course_instance/188020)
:::
::::
:::: third
::: box Nota
A APS pode ser feita individual ou em dupla
:::
::::
:::: third
::::
:::::

<YouTube id="KfF-AZhUkdM"/>

O desafio é desenvolver o protótipo do jogo da memória "Genius", com as seguintes características:

- 4 (ou mais) LEDs de cores diferentes.
- 4 (ou mais) Botões (cada botão corresponde a um LED).
- 1 Buzzer (para reproduzir um som)

## Rubrica

O requisito mínimo do projeto para o conceito C é dele ter funcionamento similar ao do jogo, isso é: 

- Para cada botão, um LED e um som diferentes.
- Uma resposta visual e sonora para quando acertar ou errar.
- Gera aleatoriamente a sequência cada vez que o sistema é ligado ou o começa um novo jogo.
    - Usar a seed no `srand()`
- **Sistema integrado em protótipo físico, consultar página no site sobre prototipação!**

::: tip Qualidade de Código
O código não deve possuir erros de detectados pelas ferramentas de qualidade de código: `cppcheck` e `embedded-check`.
:::

Exemplo de entregas de design aceitável:

| ![](imgs-aps/aps-1/1.jpeg) | ![](imgs-aps/aps-1/2.jpeg) |  
|----------------------------|----------------------------|
| ![](imgs-aps/aps-1/4.png)  | ![](imgs-aps/aps-1/5.jpg)  |   
| ![](imgs-aps/aps-1/3.jpeg) |                            |   

### Ganhando nota

::: info
Conceitos acumulativos, pode fazer qual quiser para ir acumulando pontos. Se deseja incluir algum que não está aqui, mandar mensagem ao professor.
:::

<Badge type="tip" text="meio conceito:" />

-  Organizar o código em arquivos `.c` e `.h` criando funções para organizar o código.
-  Sistema que exibe pontuação final.
-  Armazena pontuação mesmo quando perder a bateria.
-  Dado uma certa dificuldade, jogo acende duas luz ou mais luzes por vez! E espera que o usuário pressione mais de um botão por vez.
-  Diferentes modos de jogo: (Solo, Dupla, ... ).
-  Implementar o código em formato de máquina de estados.
-  Usar alarme de timer para se usuário não apertar o botão em x segundos, perde.
-  Para quem reproduz uma música (tipo mário). 
-  [Manual On and Automatic Off](https://www.youtube.com/watch?v=jSZM9Js_zk8) 
-  Implementar o hardware em uma [placa universal](https://www.youtube.com/watch?v=AQKF6w1v5c0) ou em uma PCB.
<!--
 - <Badge type="info" text="meio conceito" /> Se fizer um sistema que desliga a energia sozinho e liga quando apertar um botão
--> 

