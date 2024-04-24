# Expert - wifi

| Lab Expert - WiFi - Áudio Preparatório                          |
|----------------------------------------------------------------|
| **Deadline**: {{lab_expert_wifi_deadline}}                |
| [Repositório no classroom]({{lab_expert_wifi_classroom}}) |
| 💰 100% nota de lab                                            |

Neste laboratório, vamos explorar as capacidades de `WiFI` da `Raspberry Pi Pico W` utilizando a `conexão Wifi` e o protocolo de comunicação `MQTT`, um protocolo leve de mensagens ideal para dispositivos conectados à Internet. 

## Lab

O objetivo é desenvolver um sistema de monitoramento de temperatura e umidade que envia dados para um servidor MQTT, permitindo o monitoramento remoto em tempo real.

### Componentes Necessários

- Raspberry Pi Pico W
- Sensor de temperatura e umidade (veficar os modelos disponíveis no lab)



- https://github.com/raspberrypi/pico-examples/tree/master/pico_w/wifi

https://www.i-programmer.info/programming/148-hardware/15838-the-picow-in-c-simple-web-client.html

- [video webserver](https://www.youtube.com/watch?v=C_O0MXGBHsw&t=787s)

- [template webserver](https://github.com/LearnEmbeddedSystems/pico-w-webserver-template)


https://wokwi.com/projects/388980535045857281


https://wokwi.com/projects/360480722185134081


https://wokwi.com/projects/373639443546024961

https://www.hivemq.com/blog/iot-reading-sensor-data-raspberry-pi-pico-w-micropython-mqtt-node-red/

https://datasheets.raspberrypi.com/pico/raspberry-pi-pico-c-sdk.pdf

https://github.com/danjperron/StairPersonDetector/blob/daa14c338639972be5d42ca6dbda04463ee70449/mpu6050_mqtt/mpu6050_mqtt.c#L147

https://github.com/Figuejojo/SmartAirPollutionMonitor/blob/941da1b6e766377d0f3fbf8eab388c14bddeaf49/WIFI/wifi_mqtt.c#L186. ---esse é legal

https://github.com/elmot/hackatum2022-mqtt/blob/master/mqtt_led.c#L54. ---é isso!

https://github.com/leungjch/rpi-pico-w-air-monitor/blob/f8b39524b359db7836ad7f35dd643a0ee993255e/backend/mqtt_server/src/main.rs

https://github.com/cniles/picow-iot/blob/09540ac99e705f0ca6ab32ecd0129f5c8aa796e8/picow_iot.c#L40

https://github.com/DBYang81/IoT-Composter-Project

https://github.com/SMerrony/picowpanel/tree/main

https://mcuoneclipse.com/2023/02/11/using-mqtt-with-the-raspberry-pi-pico-w-and-homeassistant-for-an-optimized-solar-energy-electrical-vehicle-charger/

ble https://mcuoneclipse.com/2023/03/19/ble-with-wifi-and-freertos-on-raspberry-pi-pico-w/
```C
#include "pico/stdlib.h"
#include "pico/cyw43_arch.h"
#include "mqtt_client.h"

// Substitua esses valores pelos detalhes do seu WiFi e MQTT Broker
const char *ssid = "your_ssid";
const char *password = "your_password";
const char *mqtt_broker = "broker_address";

// Função para conectar ao WiFi
void connect_to_wifi() {
    cyw43_arch_init();
    if (cyw43_arch_wifi_connect_timeout_ms(ssid, password, CYW43_AUTH_WPA2_AES_PSK, 10000) != 0) {
        printf("Falha na conexão WiFi\n");
    } else {
        printf("Conectado ao WiFi\n");
    }
}

if (cyw43_arch_init()) {
        printf("failed to initialise\n");
        return 1;
    }

// Função principal
int main() {
    stdio_init_all();
    connect_to_wifi();

    mqtt_client_t client;
    mqtt_init(&client, mqtt_broker);

    if (mqtt_connect(&client)) {
        printf("Conectado ao MQTT Broker\n");
    } else {
        printf("Falha na conexão MQTT\n");
        return 1;
    }

    // Substitua "topic" e "message" pelos seus dados
    if (mqtt_publish(&client, "topic", "message", QOS_0)) {
        printf("Mensagem publicada\n");
    } else {
        printf("Falha ao publicar mensagem\n");
    }

    mqtt_disconnect(&client);
    cyw43_arch_deinit();
    return 0;
}

```