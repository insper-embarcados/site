# Servo Motor

Um servomotor é um dispositivo que pode girar um determinado ângulo de acordo com o sinal que recebe. Ele possui três fios: um para fornecer energia (VCC), um para aterramento (GND) e um para o sinal de controle.

![Tipos de Servomotor](imgs-ppm-servomotor/Tipos_de_Servomotor.jpg){width=500px}

### Controlando o servomotor

Como foi estudado no LAB 5, podemos controlar o brilho de um LED através de uma técnica chamada de Pulse Width Modulation (PWM). Essa técnica permite que um sinal digital seja modulado em largura de pulso, variando a razão entre o tempo em que o sinal está em nível alto (`1`) e o tempo em que está em nível baixo (`0`). Isso resulta em um sinal com uma largura de pulso variável, o que permite controlar a média de potência entregue ao dispositivo. [Relembre sobre o PWM](https://insper-embarcados.github.io/site/rp2040/rp2040-pwm/)

Podemos usar o PWM para gerar um outro tipo de sinal o Pulse Position Modulation (PPM) que é uma técnica onde a informação é codificada na posição do pulso em relação a um intervalo de tempo fixo. Em um sinal PPM, um pulso é enviado em momentos específicos durante um período fixo, e a posição desses pulsos em relação ao início do período é usada para representar dados:

- https://www.geeksforgeeks.org/pulse-position-modulation-ppm/

A maioria dos servomotores utiliza o PPM. Normalmente, aplicam essa técnica através de pulsos PWM com uma frequência de cerca de 50 Hz (ou um período de 20 ms), e a largura do pulso determina a posição desejada do servomotor. Um pulso de 1 ms geralmente representa a posição mínima, um pulso de 1,5 ms representa a posição central e um pulso de 2 ms representa a posição máxima, embora esses valores possam variar dependendo do fabricante e do modelo específico do servomotor.

![PPM Servomotor](imgs-ppm-servomotor/ppmSERVO.jpg)

Para entender melhor, acesse:

- https://blog.wokwi.com/learn-servo-motor-using-wokwi-logic-analyzer/

## RP2040 / PICO

Para controlar o servomotor, não seria tão complicado. Bastaria modificar o [exemplo de PWM](https://github.com/raspberrypi/pico-examples/tree/master/pwm/hello_pwm), e ajustar o duty cycle com um período de 20 ms (50 Hz), e variar a largura da onda entre 1ms a 2ms para e com isso o servo variar seu eixo de 0º a 180º. No link abaixo você pode encontrar um exemplo do usuário [Thomas-Kleist](https://github.com/thomas-kleist) para controlar o servomotor utilizando pwm, consulte:

- https://github.com/Thomas-Kleist/Pico-Servo

!!! warning
		Lembrando que para poder utilizar o exemplo com a nossa infra, você precisará seguir os passsos em:
		
		https://insper-embarcados.github.io/site/pico/pico-examples/