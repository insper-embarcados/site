# GPIO - Preparatório

| Lab 1 - GPIO - Preparatório                            |
|--------------------------------------------------------|
| **Deadline**: {{lab_gpio_pre_deadline}}                |
| **Atividade:** [classroom]({{lab_gpio_pre_classroom}}) |
| 💰 30% nota de lab                                  |


O laboratório é composto de duas partes: uma chamada pré-lab, onde praticamos um pouco em um ambiente simulado, e outra chamada prática, onde realmente usamos o microcontrolador e controlamos algo real.

Aqui, iremos aprender sobre qualidade de código e também sobre os conceitos básicos do microcontrolador. As notas são binárias; ou seja, para conseguir os 30%, você deve fazer todas as entregas desta página.

## Qualidade Código

Na disciplina de embarcados, precisaremos ter um cuidado especial com o código que geramos. Não basta que o programa funcione; é necessário também considerar os possíveis problemas que podem surgir. Os principais motivos sã

1. Nem todo erro ou problema aparece na fase de teste.
2. Erros em códigos de sistemas embarcados podem ser catastróficos.
3. Não existe um mecanismo fácil de atualizar sistemas embarcados; uma vez produzido o produto, dificilmente ele receberá atualizações.

Para minimizar possíveis erros, vamos criar códigos com um nível mínimo de qualidade.

### Praticando

Para que vocês comecem a entender as regras, vamos fazer dois exercícios:

!!! exercise "Cppcheck"

    - Exercício qualidade de código referente a ferramenta cppcheck: [==Code Quality/Cppcheck==](/site/CodeQuality/cppcheck)

!!! exercise "Variáveis"

    - Exercício sobre qualidade de código referente a variáveis: [==Code Quality/Variáveis==](/site/CodeQuality/variables)

## Firmware 


!!! exercise
    Antes de seguir, será necessário configurar a infra.
    
!!! exercise
    Leia sobre os laboratórios preparatórios:
    - [labs/preparatórios](/site/labs/pre-lab)

!!! exercise "Leitura prévia"

    Para realizar este laboratório você deve estudar antes.
   
    - O que é delay e como ele funciona: [📕 ==RP2040/Delay==](/site/rp2040/rp2040-delay)
    - O que é o periférico GPIO: [📘 ==RP2040/GPIO==](/site/rp2040/rp2040-gpio)
    
## Atividades

Agora execute os exercícios, lembre que você pode consultar os snippets de código dentro de [RP2040/GPIO/snippets](/site/rp2040/rp2040-gpio/#snippets) e enviar o código para o github para validação.

!!! exercise "exe1"
    - Arquivo: `exe1/main.c`
    - Teste: Verifica se os dois LEDs mudam de estado.
    
    #### Código
    
    Faça os dois LEDs do `exe1` piscarem ao mesmo tempo! O código fornecido já funciona com o LED vermelho, agora você deve fazer o mesmo com o amarelo. ==Lembre de manter o vermelho piscando junto!==
    
    #### Funcionalidade esperada
    
    ![](imgs/lab_gpio_pre_exe1.gif)
    
!!! exercise "exe2"
    - Arquivo: `exe2/main.c`
    - Teste: Aperta um dos botões e verifica a mensagem no terminal.
    
    #### Código
    
    1. botão 1 for apertado imprima na tela: `Botao 1`
    1. botão 2 for apertado imprima na tela: `Botao 2`
    
    Lembre de configurar o botão 2 como entrada!
    
    ```c 
    // Usar o printf a seguir:
    printf("Botao 1\n");
    printf("Botao 2\n");
    ```
 
    #### Funcionalidade esperada
    
    ![](imgs/lab_gpio_pre_exe2.gif)
    
!!! exercise "exe3"
    - Arquivo: `exe3/main.c`
    - Teste: Aperta um dos botões e verifica se o LED correspondente muda de valor.
    
    #### Código

    Toda vez que o botão for apertado inverta o estado do LED de cor relativa.
    
    Exemplo: Ambos os leds estão apagados, quando o botão vermelho for apertado, acenda o LED Vermelho. Se o Botão for apertado e solto novamente, apague o LED Vermelho. Faça o mesmo para o Verde!. 

    Lembre de configurar todos os pinos como Entrada ou Saída.

    #### Funcionalidade esperada
    
    ![](imgs/lab_gpio_pre_exe3.gif)
    
!!! exercise "exe4"
    - Arquivo: `exe4/main.c`
    - Teste: Verifica se os LEDs acendem na ordem certa.
    
    #### Código

    Toda vez que o Btn Vermelho for apertado, faca os LEDs acenderem na ordem: Vermelho, Roxo, Azul e Verde. ==Só acenda um LED por vez!==.
    
    Utilize um delay de `300ms` entre os estados.

    #### Funcionalidade esperada
    
    ![](imgs/lab_gpio_pre_exe4.gif)
