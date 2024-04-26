# Expert - PPM - Servomotor

| Lab Expert - PPM - Servomotor                                |
| ------------------------------------------------------------ |
| **Deadline**: {{lab_expert_pwm_servomotor_deadline}}         |
| [Repositório no classroom]({{lab_expert_dsp_audio_classroom}}) |
| 💰 100% nota de lab                                           |

Neste laboratório iremos criar um sistema capaz de ajustar a posição de um servomotor através da leitura de luminosidade de um LDR! 

### PWM

Como foi estudado no LAB 5 podemos controlar o brilho de um LED através de um técnica chamada de PWM (Pulse Width Modulation), esta técnica permite que um sinal digital seja modulado em largura de pulso, variando a razão entre o tempo em que o sinal está em nível alto (1) e o tempo em que está em nível baixo (0). Isso resulta em um sinal com uma largura de pulso variável, o que permite controlar a média de potência entregue ao dispositivo:

![dutyPWM](imgs-ppm-servomotor\dutyPWM.svg)

Na imagem acima podemos observar 3 ondas PWM com duty cycles diferentes, ou seja, dependendo da variação da lagura de pulso em um período T específico, conseguimos controlar a potência entregue na saída PWM, se cosideramos que um LED está ligado a esse sinal, seu brilho irá variar dependendo do pulso, onde 0% ele estaria apagado e 100% ele está aceso com toda a potência disponível.

Diversos dispositivos além de LED podem ser controlados através da utilização do PWM, como por exemplo Motores DC (Velocidade), Pastilhas Peltier (Temperatura), Fan de PC (Velocidade), Fita de LED (Brilho) e Servomotor (Posição).



### PPM - Servomotor

PPM (Pulse Position Modulation) é um técnica onde a informação é codificada na posição do pulso em relação a um intervalo de tempo fixo. Em um sinal PPM, um pulso é enviado em momentos específicos durante um período fixo, e a posição desses pulsos em relação ao início do período é usada para representar dados.

A maioria dos servomotores utiliza o PPM, normalmente, aplicam essa técnica através de pulsos PWM com uma frequência de cerca de 50 Hz (ou um período de 20 ms), e a largura do pulso determina a posição desejada do servomotor. Um pulso de 1 ms geralmente representa a posição mínima, um pulso de 1,5 ms representa a posição central e um pulso de 2 ms representa a posição máxima, embora esses valores possam variar dependendo do fabricante e do modelo específico do servomotor:



![ppmSERVO](imgs-ppm-servomotor\ppmSERVO.jpg)

​																Figura 2

## Lab

Existem algumas formas de aferir o duty cycle que está sendo gerado pelo PWM, uma delas é utilizando a própria Pico W para isso, consulte e execute o exemplo:



https://github.com/raspberrypi/pico-examples/tree/master/pwm/measure_duty_cycle



Esse exemplo acima não é a forma ideal para aferir o duty cycle de um sinal PWM, existem equipamentos melhores e mais precisos para essa finalidade, um desses equipamentos é o Osciloscópio:



![DPO_2021B](imgs-ppm-servomotor\DPO_2021B.jpeg)



Agora conecte o sinal PWM que está sendo gerado no GPIO do exemplo e compare o valor aferido pelo Osciloscópio.



## Desafio

Sabendo que é possível aferir o sinal utilizando o osciloscópio, vamos modificar o exemplo do PWM para gerar um sinal PPM compatível com os formatos de onda da Figura 2.

## Entrega

Vocês já fizeram diversas entregas utilizando ADC, agora a proposta é que vocês leiam o valor da luminosidade de um LDR e modifiquem a posição do servomotor dependendo dessa luminosidade.



- Primeiro rode o exemplo da PICO do PWM
- Modifique o exemplo para o sinal ser compatível com PPM
- Monte e faça a leitura dos valores do LDR
- Desenvolva um código para que o servomotor vá para uma posição relativa ao valor da luminosidade lida pelo LDR.
