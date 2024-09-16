# APS - 2 - Controle

| APS 2                                                |
|------------------------------------------------------|
| **Prazo**: =={{aps_2_deadline}}==                    |
| **Entrega código:** [classroom]({{aps_2_classroom}}) |
| **Entrega forms:** TBD                               |

!!! video
    ![](https://www.youtube.com/watch?v=uCgnWqoP4MM)

O desafio é desenvolver um protótipo de um controle bluetooth para um jogo de computador. 

## Rubrica

A ideia do controle é:

- Ser desenvolvido para um jogo específico
- Deve possuir um protótipo mecânico customizado para o jogo em questão
- Fazer uso de RTOS

O controle deve possuir pelo menos:

- Botão de liga/desliga
- Informação visual se o controle está conectado ou não
- 2x entradas analógicas (ou a IMU)
- 4x entradas digitais 
    - Usar IRS

O controle deve ser documentando no README do repositório e deve conter:

- Jogo
- Ideia do controle
- Inputs e Outputs (sensores e atuadores)
- Diagrama de blocos explicativo do firmware
    - Indicando tasks, filas, semáforos e IRS
- Imagens do controle e links para arquivos ou outras coisas úteis

!!! tip "Qualidade de Código"
    O código não deve possuir erros de detectados pelas ferramentas de qualidade de código: `cppcheck` e `embedded-check`.
    
    Além disso, após o envio do projeto, o código passará por um processo de revisão manual, onde a equipe pode pedir revisões do código.

### Ganhando nota

!!! tip
    Conceitos acumulativos, pode fazer qual quiser para ir acumulando pontos. Se deseja incluir algum que não está aqui, 
    mandar mensagem ao professor.

- ==(meio conceito) Entrega design antecipada (18/09)==
    - Via README do repositório (pedir para alguém da equipe avaliar)
- (meio conceito) Controle possui [Haptic Feedback](https://en.wikipedia.org/wiki/Haptic_technology)
- (meio conceito) Utiliza ADC e IMU juntos no jogo
- (meio conceito) O jogo deve ser "jogável" com o controle (sem latência, e avalido pela equipe)
- (meio conceito) Controle recebe informações do PC/jogo e faz alguma coisa (exe: jogador morre e controle vibra)
- (meio conceito) Hardware integrado no controle (bateria e tudo mais) 
- (meio conceito) Utiliza algum componente não visto em sala de aula
- (meio conceito) Botão de macro (salva, e reproduz uma série de comandos)
- (meio conceito) Envia com a entrega vídeo TOP/ stonks do controle nível quickstarter  
