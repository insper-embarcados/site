---
linkstitle: "Praticando"
links:
  - title:
    text: "classroom"
    url: "{{modulo_2_banco_exercicios}}"
    box: "box-blue"
---

# Avaliação prática - Módulo 2

::: box-red
Para ser aprovado na disciplina é preciso ter sido aprovado nessa avaliação.

- Serão duas chances: uma durante a AF e outra durante a AS.
:::

Pense nessa avaliação como um laboratório prático, onde terão que aplicar o que aprenderam para resolver um problema. Na avaliação prática individual do módulo 2 vocês precisarão solucionar um problema que contará com:

- Interrupção 
- Tasks
- Filas
- Semáforos
- Timeout
- Seguir um diagrama de blocos (diagrama -> código)
- Qualidade de código

## Teste no hardware

::: box-green 
Já venham para a prova com um a placa montada. A prova pode usar:

- 3 botões
- 3 Leds
- Um analógico
- Um led PWM
:::

O problema deverá ser testado no hardware e validado por alguém da equipe **durante a realização da prova**. Não validaremos entregas realizadas após a prova. 

A nota da prova é binária, todos os requisitos precisam ser cumpridos para ganharem o `OK`, isso inclui:

- Funcionalidade
- Organização do código conforme pedido
- Qualidade de código
- <Badge type="tip" text="Requisitos de funcionalidade e de software" /> 

A duração total da avaliação será de 2h, não haverá ajuda de ninguém da equipe durante a realização da prova e vocês **não poderão utilizar LLM**. Vocês podem consultar os seus próprios códigos e o site da disciplina.

## Praticando

Como o formato da prova é novo não possuímos nenhum "simulado", mas vocês vão poder praticar com exercícios de provas dos anos passados. Notem que o formato é diferente, mas vai ser um bom exercício para praticarem.

A maioria dos exercícios possui teste automatizado, mas não confie neles. O Wokwi pode indicar que está errado, mas o seu está certo.

::: info
Não teste apenas no simulado, execute alguns dos exercícios também na placa.
:::

## FAQ

Critério de avaliação:

- Precisam ter um OK na prova prática tanto do módulo 1 quanto do módulo 2 para liberarem o cálculo da nota
- Ter um OK na prova é critério de barreira!

Geral:

- Como é uma avaliação durante a semana de provas, possui substitutiva caso alguém não possa fazer (ou decida subar)
- A prova possui delta (se não passar nessa, tem outra chance, durante a semana de substitutivas)
- 2h de prova

Consulta:

- Não poder usar LLM
- Consulta liberada aos materiais de aula e aos seus códigos.
- SMOWL ativado o tempo todo

Validação:

- A prova possui apenas uma questão prática (devem mostrar funcionando na plaquinha)
- Vocês devem pedir validação durante o horário da prova para testarmos o código e darmos o cartão de validação (igual ao lab prático)
- O código não pode ter erros de qualidade de código e deve passar em todas as verificações
- A prova é 1 ou 0, não existe meio certo (assim como nos labs)

Hardware:

- Já venham para a prova com três botões e três LEDs configurados, vai poupar tempo.
    - NÃO SOFRAM COM DEBOUNCE!! Usem capacitores nos botões para tirar o bounce!!
- Um led pwm
- Um analógico

Ajuda!!

- Não vai ter ajuda durante a prova, você deve ser capaz de arrumar os erros que encontrar ("minha placa não funciona", "meu código não vai", "tá tudo certo, o LED não acende"..., Nessa altura do semestre, já devem ser capazes de resolver isso sozinhos)

Alunos com tempo extra:

- Alguma restrição de fazerem a prova no lab de arquitetura? Assim fica mais fácil validarmos
- Se alguém tiver algo contra, me manda uma msg e alinhamos como fazer
