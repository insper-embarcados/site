# APS - 1 - Genius

| APS 1                                               |
|-----------------------------------------------------|
| **Prazo**: =={{aps_1_deadline}}==             |
| **Entrega código:** [classroom]({{aps_1_classroom}}) |
| **Entrega forms:** [google forms]({{aps_1_forms}})|

!!! video
    ![](https://www.youtube.com/watch?v=KfF-AZhUkdM)

O desafio é desenvolver o protótipo do jogo da memória "Genius", com as seguintes características:

- 4 (ou mais) LEDs de cores diferentes.
- 4 (ou mais) Botões (cada botão corresponde a um LED).
- 1 Buzzer (para reproduzir um som)

## Rubrica

O requisito mínimo do projeto para o conceito C é dele ter funcionamento similar ao do jogo, isso é: 

- Para cada botão, um LED e um som diferentes.
- O jogo deve progressivamente ir aumentando a dificuldade.
- Uma resposta visual e sonora para quando acertar ou errar.
- Gera aleatoriamente a sequência cada vez que o sistema é ligado ou o começa um novo jogo.
    - Usar a seed no `srand()`
    
!!! tip "Qualidade de Código"
    O código não deve possuir erros de detectados pelas ferramentas de qualidade de código: `cppcheck` e `embedded-check`.
    
    Além disso, após o envio do projeto, o código passará por um processo de revisão manual, onde a equipe pode pedir revisões do código.

### C+

Sistema integrado em protótipo físico, consultar página no site sobre prototipação!.

### B / A

!!! tip
    Conceitos acumulativos, pode fazer qual quiser para ir acumulando pontos. Se deseja incluir algum que não está aqui, 
    mandar mensagem ao professor.

- (meio conceito) Organizar o código em arquivos `.c` e `.h` criando funções para organizar o código.
- (meio conceito) Sistema que exibe pontuação final.
- (meio conceito) Armazena pontuação mesmo quando perder a bateria.
    - Ler sobre memória em: `RP2040/Flash`
- (meio conceito) Dado uma certa dificuldade, jogo acende duas luz ou mais luzes por vez!
- (meio conceito) Diferentes modos de jogo:
    - Solo, Dupla, ... 
- (meio conceito) Implementar o código em formato de máquina de estados
- (meio conceito) Usar alarme de timer para se usuário não apertar o botão em x segundos, perde.
- (meio conceito) Para quem reproduz uma música (tipo mário). 
- (meio conceito) [Manual On and Automatic Off](https://www.youtube.com/watch?v=jSZM9Js_zk8) 
    - 
<!--
 - (meio conceito) Se fizer um sistema que desliga a energia sozinho e liga quando apertar um botão
--> 

