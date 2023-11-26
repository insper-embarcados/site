# GPIO - Preparatório

| Lab 1 - GPIO - Preparatório                     |
|-------------------------------------------------|
| **Deadline**: =={{lab_pio_pre_deadline}}==      |
| =={{lab_pio_pre_classroom}}==                   |
| 💰 Penalização de **UM** conceito na nota final |

Um sinal digital é aquele que pode ser interpretado como binário: um ou zero, tem ou não tem, aceso ou apagado, etc. Em sistemas digitais, isso significa se o sinal possui ou não energia (aproximadamente 3V ou 0V).

Um microcontrolador pode precisar gerar um sinal digital em um de seus pinos (saída) ou ler um sinal digital que foi gerado externamente (entrada). Os circuitos integrados (CIs) modernos permitem configurar qualquer pino como entrada ou saída durante a execução do código.

É importante saber de antemão que, para controlar um LED, devemos configurar o pino como saída, ou para ler um botão, configurá-lo como entrada.

!!! info
    Usaremos o termo **atuadores** para tudo que o microcontrolador for acionar e **sensores** para tudo que gerar informações para o microcontrolador (uC).

Segue uma lista de atuadores/sensores controlados digitalmente:

- `output`: LED, motores, relés, etc.
- `inputs`: Botões, sensor de movimento, etc.

## Objetivos 

Hardware:

- Configurar um pino como **saída**
    - Acionar um pino que é saída
- Configurar um pino como **entrada**
    - Ler um valor de um pino digital
    - Ativar pull-up
    
Software: 

- Trabalhar com delay
- Implementar deboucing
