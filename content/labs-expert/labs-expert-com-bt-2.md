# Expert - Bluetooth

| Lab Expert - Bluetooth                                 |
|--------------------------------------------------------|
| **Deadline**: {{lab_expert_2_deadline}}                |
| [Repositório no Classroom]({{lab_expert_2_classroom}}) |
| 💰 100% nota de lab                                    |

Neste laboratório vamos explorar os recursos de conectividade `Bluetooth` da `Raspberry Pi Pico W`. 

### Definições

Já conhecemos a tecnologia Bluetooth, inclusive usamos em nosso curso por meio do módulo HC05/HC06. 

Se já conhecemos e usamos bluetooth, por que vamos voltar nesse assunto? Bem, é chegada a hora de aprofundarmos nosso conhecimento um pouco mais na tecnologia bluetooth e aproveitar para conhecer como usar o modulo bluetooth da pico W.

A Raspberry Pi Pico W possui a versão 5.2 do Bluetooth, que é a especificação do módulo CYW43439 de wifi/bt. O modulo possui o modo BLE (Bluetooth Low Energy) que oferece melhorias em termos de velocidade, alcance e eficiência energética. 

| Característica   | CYW43439 (Pico W) | HC-05/HC-06   |
|------------------|-------------------|---------------|
| Versão Bluetooth | Bluetooth 5.2     | Bluetooth 2.0 |
Modos de Operação	| BLE (Bluetooth Low Energy)	| Bluetooth Clássico | 
Taxa de Transferência	| Mais alta devido ao BLE e Bluetooth 5.2	| Limitada (Bluetooth 2.0) | 
Energia	| Mais eficiente (BLE)	| Menos eficiente | 
Alcance	| Maior alcance (BLE e Bluetooth 5.2)	| Menor alcance | 
Facilidade de Uso	| Mais complexo, mas mais funcionalidades	| Mais simples, ideal para iniciantes | 
Modos de Conexão	| Central e Periférico	| Mestre (HC-05) e Escravo | 
Interfacing	| SPI	| UART (serial) | 

### Comunicação Bluetooth LE

Bluetooth Low Energy (BLE) foi introduzido como parte da especificação Bluetooth 4.0, projetado para oferecer uma alternativa de baixo consumo de energia ao Bluetooth clássico, e tenta ser uma alternativa para aplicações que requerem comunicação sem fio eficiente em termos de energia, como dispositivos vestíveis, sensores e dispositivos IoT (Internet das Coisas).

A medida que começamos a nos aprofundar no sistema bluetooth, vamos nos deparar com uma verdadeira sopa de letrinhas, isso por que o sistema bluetooth é bem complexo e requer conhecimento e diversos protocolos aplicados em diversas camadas. 

De acordo com a propria especificação, o sistema Bluetooth é composto por um Host, um Controlador Primário e zero ou mais Controladores Secundários. Uma implementação mínima do sistema core Bluetooth BR/EDR cobre as quatro camadas mais baixas e os protocolos associados definidos pela especificação Bluetooth, bem como um protocolo de camada de serviço comum; o Service Discovery Protocol (SDP). Os requisitos gerais do perfil são especificados no Generic Access Profile (GAP). O sistema core BR/EDR inclui suporte para Alternate MAC/PHYs (AMPs), incluindo um AMP Manager Protocol e Protocol Adaptation Layers (PALs) que suportam MAC/PHYs referenciados externamente. Uma implementação mínima de um sistema core apenas Bluetooth LE cobre as quatro camadas mais baixas e os protocolos associados definidos pela especificação Bluetooth, bem como dois protocolos comuns de camada de serviço; o Security Manager (SM) e o Attribute Protocol (ATT). Os requisitos gerais do perfil são especificados no Generic Attribute Profile (GATT) e no Generic Access Profile (GAP).

## btstack

A pico W utiliza da stack opensource [btsatck](https://github.com/bluekitchen/btstack) que implementa os protocolos bluetooth comentandos anteriormente. 

![](https://bluekitchen-gmbh.com/wp-content/uploads/2025/04/slider-1.jpg)

A stack possui diversos exemplos e estão disponíveis no repositório ofical da pico de exemplos:

- https://github.com/raspberrypi/pico-examples/tree/master/pico_w/bt

Os exemplos são todos muito bem documentados no site da stack:

- https://bluekitchen-gmbh.com/btstack/#examples/examples/

## PICO

O problema é que executar esses exemplos é um pesadelo, então para facilitar a nossa vida já configuramos um repositório com um exemplo da pico simulando um teclado/mouse

-  https://github.com/insper-embarcados/pico-bluetooth-hid

Ao execcutar esse exemplo a pico vira um device bluetooth com nome `HID Keyboard Demo` (que é definido [nessa linha](https://github.com/insper-embarcados/pico-bluetooth-hid/blob/6ff3aee36b4a619c2d9e8927a8ab1f90d525dff8/hid/hid_keyboard_demo.c#L421C1-L421C63)). Uma vez conectado no computador, abra o monitor serial e digite uma sequência de caracteres, a PICO irá reproduzir essa mesma sequência, como se você estivesse apertando as teclas.


## Entrega

A entrega deve ser um sistema com 4 botões que eumulem as teclas `A`, `S`, `W`, `D` via bluetooth. Um LED azul deve ficar piscando enquanto nenhum device está pareado, e ficar aceso quando um computador se conectar na pico.

![](imgs-blt/lab-blt.png)
