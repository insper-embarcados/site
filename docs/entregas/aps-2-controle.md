---
linksTitle: "Entrega"
links:
  - title:
    text: "Classroom"
    url: "{{aps_2}}"
    box: "box-blue"
  - title:
    text: "PrairieLearn"
    url: "{{prairielearn}}"
    box: "box-yellow"
  - title: "Realizar em dupla!"
    box: "box-green"
---

# APS - 2 - Controle

<YouTube id="uCgnWqoP4MM"/>

::: highlight
O desafio é desenvolver um protótipo de um controle para um jogo de computador. 
:::

Veja alguns exemplos de entregas de semestres passados:

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

::: half
- Enzo Provenza Trivellato Ristori
- Gabriel Camargo Vidigal
<YouTube id="YVrig4paHU"/>
:::
::: half
:::

## Entrega mínima (C)

A ideia do controle é:

- Ser desenvolvido para um jogo específico
- Deve possuir um protótipo mecânico customizado para o jogo em questão
- Ser estruturado utilizando RTOS (não pode mais utilizar variáveis globais!)

O controle deve possuir pelo menos:

- Informação visual se o controle está conectado ao computador ou não
- 2x entradas analógicas (ou uma IMU)
- 4x entradas digitais 
    - Todas operando com callback / interrupção.

Funcionalidade esperada:

- O jogo deve ser "jogável" com o controle (sem latência e validado pela equipe)
- Todo o hardware deve estar integrado ao controle (bateria e tudo mais)

### Expert

Vocês deverão aplicar o lab de expert nesta APS, de forma muito similar ao que fizeram na APS passada. Os labs foram pensados para que pudessem ser aplicados aqui e contribuir para o projeto. Temos as seguintes combinações de expert que podem ser utilizadas:

- IA e Bluetooth
- IA e RTOS 
- RTOS e Bluetooth

Durante a apresentação, a equipe deverá justificar tecnicamente as decisões de projeto e demonstrar de forma clara como os recursos selecionados foram incorporados ao sistema.

::: info
Converse com a equipe do curso para ter ideias de como aplicar os labs.
:::

### Documentação

O controle deve ser documentado no README do repositório e deve conter:

- Jogo
- Ideia do controle (projeto mecánico, scratch)
- Inputs e Outputs (sensores e atuadores que irão utilizar)
- Protocolo utilizado
- Diagrama de blocos do firmware
  - Indicando tasks, filas, semáforos e ISR
- Imagens do controle (proposta e real), e links para arquivos ou outras coisas úteis
  - (apenas para entrega final)
  
::: tip Qualidade de Código
O código não deve possuir erros detectados pelas ferramentas de qualidade de código: `cppcheck` e `embedded-check`.

Além disso, após o envio do projeto, o código passará por um processo de revisão manual, onde a equipe pode pedir revisões do código.
:::

## Ganhando nota

::: info
Conceitos acumulativos: pode fazer o que quiser para ir acumulando pontos. Se quiser incluir algum que não está aqui, mande mensagem ao professor.
:::

Entrega prévia:

- <Badge type="warning" text="meio conceito"/> Entrega de design antecipada **(05/15)**
    - Entregar o README do projeto preenchido (vocês podem alterar depois se necessário)
       
Entrega final:

- <Badge type="warning" text="meio conceito"/> Utiliza ADC e IMU em conjunto no controle
- <Badge type="warning" text="meio conceito"/> Utiliza algum componente não visto em sala de aula
- <Badge type="warning" text="meio conceito"/> Botão de macro (salva e reproduz uma série de comandos)
- <Badge type="warning" text="meio conceito"/> Envia junto com a entrega um vídeo TOP/stonks do controle, nível Kickstarter
- <Badge type="warning" text="meio conceito"/> Controle recebe informações do PC/jogo e faz alguma coisa (ex: jogador morre e o controle vibra)

Novas (nesse semestre):
- <Badge type="warning" text="meio conceito"/> Calibracao guiada (wizard): centra joystick/IMU e indica status por LED
- <Badge type="warning" text="meio conceito"/> Modo “perfil” por usuário (2-3 mapeamentos de botoes/sensibilidade trocados por combinacao) 
- <Badge type="warning" text="meio conceito"/> Haptico simples (vibracao/buzzer) para eventos locais do controle (modo ativo, conectado , ...)
- <Badge type="warning" text="meio conceito"/> Gerenciamento de bateria: leitura de tensao, indicacao de nivel, alerta.

- <Badge type="tip" text="UM conceito:"/> Implementar um dos expert-1 (áudio ou LCD) no controle.
- <Badge type="tip" text="UM conceito:"/> Design surpreendentemente bom!
    - Tem que convencer pelo menos dois membros da equipe de embarcados!
