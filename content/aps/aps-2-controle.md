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
- O jogo deve ser "jogável" com o controle (sem latência)

O controle deve possuir pelo menos:

- Botão de liga/desliga
- Informação visual se o controle está conectado ou não
- 2x entradas analógicas
- 4x entradas digitais
    - Usar IRS

O controle deve ser documentando no README do repositório:

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

- (meio conceito) Controle possui [Haptic Feedback](https://en.wikipedia.org/wiki/Haptic_technology)
