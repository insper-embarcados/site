# Expert - BME280 / ili9341

| Lab Expert - BME280 / ili9341                              |
| ------------------------------------------------------------ |
| **Deadline**: {{lab_expert_2_deadline}} |
| [Repositório no Classroom]({{lab_expert_2_classroom}}) |
| 💰 100% nota de laboratório                                   |

Neste laboratório, iremos criar uma aplicação que faz as leituras de um sensor bme280 (I2C) e mostrar os valroes aferido em um display LCD TFT com driver ili9341 (SPI).


## Definições

Durante o curso realizamos várias aplicações com procolo UART, principalmente para enviar dados da Pico W para o PC e vice-versa, contudo para comunicações com outros dispositivos como sensores por exemplos a velocidade e integridade dos dados se torna mais necessário, para isso, no mundo de embarcados existem outros 2 tipos de comunicação muito utilizados, o SPI e o I2C.

### I2C

Já conhecemos o protocolo I2C, ele foi utilizado anteriormente para ler os dados da IMU, relembre:

https://insper-embarcados.github.io/site/rp2040/rp2040-i2c/

### SPI

O protocolo SPI (Serial Peripheral Interface) é realmente muito útil em comunicações entre microcontroladores e dispositivos periféricos, como sensores. Ele oferece uma comunicação serial síncrona de alta velocidade e é adequado para transferências de dados rápidas e confiáveis em curta distância, você pode encontrar mais detalhes sobre o protocolo no seguinte link:

https://learn.sparkfun.com/tutorials/serial-peripheral-interface-spi/all


### LCD TFT ili9341

![](/imgs-expert-spi/tft_lcd_ili9341.jpg){width=400px}

A principal característica do TFT LCD ili9341 é sua alta resolução e capacidade de exibir cores vivas. Ele geralmente possui uma resolução de 320x240 pixels e é capaz de exibir milhares de cores, o que o torna ideal para aplicações gráficas. Outra vantagem do TFT LCD 9341 é sua capacidade de ser controlado por interfaces comuns, como SPI (Serial Peripheral Interface), o que simplifica ainda mais o processo de comunicação com dispositivos externos.


### BME280

![](/imgs-expert-spi/bosch_bme280.jpg){width=200px}

O BME280 pode ser usado para fazer leituras de pressão, umidade e temperatura. Utilize os dados para obter mudanças de altitude relativas, ou altitude absoluta se a pressão barométrica localmente relatada for conhecida.

Intervalos:

Temp: -40ºC a 85ºC
Umidade: 0 - 100% UR, =-3% de 20-80%
Pressão: 30.000Pa a 110.000Pa, precisão relativa de 12Pa, precisão absoluta de 100Pa
Altitude: 0 a 30.000 pés (9,2 km), precisão relativa de 3,3 pés (1 m) ao nível do mar, 6,6 (2 m) a 30.000 pés.


## LAB

### LCD TFT ili9341 com Adafruit GFX Library (SPI)

A Adafruit criou uma biblioteca muito interessante, ela fornece uma sintaxe comum e um conjunto de funções gráficas para todos os nossos displays LCD e OLED, bem como matrizes de LEDs.

Essa biblioteca é muito utilizada com plataforma Arduino, mas nada que impeça de que seja possível portar a mesma para a Pico por exemplo, e foi isso que o usuário [tvlad1234](https://github.com/tvlad1234) fez:

https://github.com/tvlad1234/pico-displayExamples

No repositório acima você irá encontrar uma aplicação utilizando a Pico para se comunicar com o driver ili9341 já com a biblioteca Adafruit GFX integrada, rode o exemplo e faça testes com o mesmo.

### BME 280 (I2C)

Assim como no lab onde utilizamos a IMU, precisaríamos acessar o [datasheet](https://cdn.sparkfun.com/assets/learn_tutorials/4/1/9/BST-BME280_DS001-10.pdf) do sensor para saber quais os endereços que devemos buscar os dados que queremos, contudo, no próprio repositório da pico-examples está disponível um código exemplo que utiliza esse sensor:

https://github.com/raspberrypi/pico-examples

Encontre o exemplo para ler esse valor utilizando protocolo I2C e execue-o.


## Entrega

Utilizando RTOS, você deverá integrar ambos os dispositivos, tanto o LCD TFT ili9341, quanto o sensor BME280 e entregar uma aplicação onde as leituras das grandezas do sensor sejam lidas e mostradas no LCD.

### Dicas:

	1. Crias exemplos separados com RTOS para cada um dos dispositivos;
	2. Para portar um exemplo externo, seguir as intruções que disponibilizamos no site: https://insper-embarcados.github.io/site/pico/pico-examples/.