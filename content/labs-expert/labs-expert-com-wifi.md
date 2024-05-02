# Expert - wifi

| Lab Expert - WiFi - Áudio Preparatório                          |
|----------------------------------------------------------------|
| **Deadline**: {{lab_expert_wifi_deadline}}                |
| [Repositório no classroom]({{lab_expert_wifi_classroom}}) |
| 💰 100% nota de lab                                            |

Neste laboratório, vamos explorar os recursos de conectividade `Wi-Fi` da `Raspberry Pi Pico W`. 

!!! warning
    Lembrando que algumas configurações básicas são necessárias, incluindo as configurações `cmakelist.txt` e modificações no código para utilizar esse recursos da  com o Pico W. Relembre essas configurações no exemplo blink com pico W. 

## Lab

Sistemas embarcados devem muitas vezes se comunicarem com outros dispositivos, ou se conectarem a internet. Muitas são as soluções que podemos assumir para a comunicaćão, que vão desde de protocolos proprietários de comunicacão de rádio frequência (por exemplo uma [sensor de frequência cardíaca](https://www.polar.com/br/sensores/sensor-de-frequencia-cardiaca/h9) ) ou o uso de comunicacoes como: WIFI, bluetooth, 4G, Ethernet. Recentemente muitas soluções surgiram para a comunicação de longas distâncias e com baixo consumo energético como: LoRA ou Sigfox.

O nosso kit de desenvolvimento possui além do microcontrolador rp2040 (o que temos programado até agora), um outro dispositivo chamado de 

![](imgs-com/pico-cyw.png)

O WIFI é uma solucão importante e utilizada em muitos produtos, mas possui uma série de problemas que devem ser levadas em consideraćão quando 

## Entrega



### Desenvolvimento

Ao longo deste laboratório vamos entender como trabalhar com o modulo wifi

!!! exercice
    Vamos juntar o conhecimento adquirido até o momento. É considerada uma boa prática em projetos de IoT ter um código que `gerencia ativamente` a conexão e implementa uma `função de reconexão` em caso de perda de conexão. Essa abordagem ajuda a aumentar a resiliência e confiabilidade dos dispositivos em ambientes onde as conexões de rede podem ser intermitentes ou instáveis, como é comum em redes GSM ou via satélite​. Nesse sentido, crie um código que tenta realizar a cónexão Wi-Fi da Pico-W ao seu computador ou celular (em modo hotspot) e uma função de reconexão. Leia mais sobre o assunto em nos links [https://learn.microsoft.com/en-us/azure/iot/concepts-manage-device-reconnections](https://learn.microsoft.com/en-us/azure/iot/concepts-manage-device-reconnections) e [https://learn.microsoft.com/en-us/azure/iot-dps/concepts-deploy-at-scale](https://learn.microsoft.com/en-us/azure/iot-dps/concepts-deploy-at-scale).

    - Para validar o funcionamento da reconexão automática, o loop principal do programa deverá exibir logs de status e controlar o LED on-board da placa. Inicie observando o LED aceso, indicando que a conexão Wi-Fi está ativa. Para testar a resiliência da conexão, desligue o Wi-Fi do seu computador ou celular. É esperado que o LED começe a piscar, simbolizando a perda de conexão, e os logs exibirão mensagens de falha na tentativa de reconexão. Após alguns segundos, reative o Wi-Fi. O sistema deve `reconectar-se automaticamente`, cessando o piscar do LED e exibindo um log de sucesso de reconexão.
    
    - Certifique-se de estar monitorando os logs através do terminal, e verifique se os estados do LED correspondem às condições de conexão descritas.

<!---
#### Enviando dados da Pico-W para um PC/notebook

Vamos fazer a raspiberry pi pico W enviar dados para um notebook.

--->
