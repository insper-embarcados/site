# GPIO - Preparatório

| Lab 1 - GPIO - Preparatório                         |
|-----------------------------------------------------|
| **Deadline**: ==Antes do lab de segunda feira!==    |
| **Entrega:** [classroom]({{lab_pio_pre_classroom}}) |


!!! exercise "Leitura delay"

    Para realizar este laboratório você deve estudar antes.
   
    - O que é delay e como ele funciona: [📕 ==RP2040/Delay==](/rp2040/rp2040-delay)
    - O que é o periférico GPIO: [📘 ==RP2040/GPIO==](/rp2040/rp2040-gpio)
    
## Labs preparatórios

- [ ] Explicar como realizar os labs.. talvez criar uma página a parte?

!!! exercise "exe1"
    - Arquivo: `exe1/main.c`
    - Teste: Verifica se os dois LEDs mudam de estado.
    
    #### Hardware
    
    Não precisa mexer.
    
    #### Código
    
    Faça os dois LEDs do `exe1` piscarem ao mesmo tempo! O código fornecido já funciona com o LED vermelho, agora você deve fazer o mesmo com o amarelo. ==Lembre de manter o vermelho piscando junto!==
    
!!! exercise "exe2"
    - Arquivo: `exe2/main.c`
    - Teste: Aperta um dos botões e verifica a mensagem no terminal.
    
    #### Hardware
    
    Não precisa mexer.
    
    #### Código
    
    1. botão 1 for apertado imprima na tela: `Botao 1`
    1. botão 2 for apertado imprima na tela: `Botao 2`
    
    Lembre de configurar o botão 2 como entrada!
    
!!! exercise "exe3"
    - Arquivo: `exe3/main.c`
    - Teste: Aperta um dos botões e verifica se o LED correspondente muda de valor.
    
    #### Hardware
    
    Termine de conectar os botões e leds na placa.
    
    #### Código

    Toda vez que o botão for apertado inverta o estado do LED de cor relativa.
    
    Exemplo: Ambos os leds estão apagados, quando o botão vermelho for apertado, acenda o LED Vermelho. Se o Botão for apertado e solto novamente, apague o LED Vermelho. Faça o mesmo para o Verde!. 

    Lembre de configurar todos os pinos como Entrada ou Saída.


!!! exercise "exe4"
    - Arquivo: `exe4/main.c`
    - Teste: Verifica se os LEDs acendem na ordem certa.
    
    #### Hardware
    
    Não precisa mexer.
    
    #### Código

    Toda vez que o Btn Vermelho for apertado, faca os LEDs acenderem na ordem: Vermelho, Roxo, Azul e Verde. ==Só acenda um LED por vez!==.
    
    Utilize um delay de `300ms` entre os estados.
