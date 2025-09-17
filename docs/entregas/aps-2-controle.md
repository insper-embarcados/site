# APS - 2 - Controle


<YouTube id="uCgnWqoP4MM"/>

O desafio é desenvolver um protótipo de um controle para um jogo de computador. 

## Exemplos

Veja alguns exemplos de entregas do semestre passado:

::: half
- VINÍCIUS BARRETO POMILIO	
- RAPHAEL BACARIM BARBUTI

<YouTube id="XjOHiLd93II"/>
:::

::: half
- ENZO DAVI RIBEIRO BARROSO DA SILVA
- GABRIELLY CARNEIRO SUSKO

<YouTube id="W6gnPhgk_Oc"/>
:::

::: half
- GUSTAVO EIZO TAKAHASHI	
- MARCOS AUGUSTO ROSSI PAULINO COSTA
<YouTube id="aSvf94ADpdw"/>
:::

::: half
- MARCELO DA COSTA POLTRONIERI	
- VITOR HIDEKI PEREIRA KATAKURA
<YouTube id="2x4wYwhdspk"/>
:::


## Rubrica

A ideia do controle é:

- Ser desenvolvido para um jogo específico
- Deve possuir um protótipo mecânico customizado para o jogo em questão
-  Estruturado utilizando RTOS (não pode mais utilizar variáveis globais bua bua bua)!

O controle deve possuir pelo menos:

- Botão de liga/desliga
- Informação visual se o controle está conectado ao computador ou não
- 2x entradas analógicas (ou uma IMU)
- 4x entradas digitais 
    - Todas operando com callback / interrupcão.

Funcionalidade esperada:

- O jogo deve ser "jogável" com o controle (sem latência, e avalido pela equipe)
- Todo hardware estar integrado no controle (bateria e tudo mais) 

O controle deve ser documentando no README do repositório e deve conter:

- Jogo
- Ideia do controle
- Inputs e Outputs (sensores e atuadores)
- Protocolo utilizado
- Diagrama de blocos explicativo do firmware
    - Indicando tasks, filas, semáforos e IRS
- Imagens do controle (proposta e real), e links para arquivos ou outras coisas úteis

::: tip Qualidade de Código
O código não deve possuir erros de detectados pelas ferramentas de qualidade de código: `cppcheck` e `embedded-check`.

Além disso, após o envio do projeto, o código passará por um processo de revisão manual, onde a equipe pode pedir revisões do código.
:::

### Ganhando nota

::: info
Conceitos acumulativos, pode fazer qual quiser para ir acumulando pontos. Se deseja incluir algum que não está aqui, mandar mensagem ao professor.
:::

<Badge type="info" text="meio conceito:" />

- Entrega de design antecipada **(3/10)**
    - Via README do repositório (peça para alguém da equipe avaliar)
- Utiliza ADC e IMU em conjunto no controle
- Utiliza algum componente não visto em sala de aula
- Botão de macro (salva e reproduz uma série de comandos)
- Envia junto com a entrega um vídeo TOP/stonks do controle nível quickstarter
- Controle recebe informações do PC/jogo e faz alguma coisa (ex: jogador morre e o controle vibra)
- Design e jogabilidade surpreendentemente bons!
    - Tem que convencer pelo menos dois membros da equipe de embarcados!

<Badge type="tip" text="UM conceito:" />

- (um conceito) Fazer a comunicação via bluetooth
    - Indicar visualmente se o controle está conectado ao PC
    - Indicar visualmente se o controle está conectado ao software
