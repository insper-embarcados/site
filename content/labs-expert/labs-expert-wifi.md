# Expert - wifi

| Lab Expert - WiFi - Áudio Preparatório                          |
|----------------------------------------------------------------|
| **Deadline**: {{lab_expert_wifi_deadline}}                |
| [Repositório no classroom]({{lab_expert_wifi_classroom}}) |
| 💰 100% nota de lab                                            |

Neste laboratório, vamos explorar os recursos de conectividade `Wi-Fi` da `Raspberry Pi Pico W`. 

!!! warning
    Lembrando que algumas configurações básicas são necessárias, incluindo as configurações `cmakelist.txt` e modificações no código para utilizar esse recursus da  com o Pico W. Relembre essas configurações no exemplo blink com pico W. 

## Lab

O objetivo é desenvolver um sistema de monitoramento de temperatura e umidade que envia dados para um servidor MQTT, permitindo o monitoramento remoto em tempo real.

### Componentes Necessários

- Raspberry Pi Pico W
- Sensor de temperatura e umidade (veficar os modelos disponíveis no lab)

### Desenvolvimento

Ao longo deste laboratório vamos entender como trabalhar com o modulo wifi

#### Conectando-se na internet

O código base a seguir irá tentar se conectar à internet, se for sucesso o led da placa acende.


```C
#include "pico/stdlib.h"
#include "pico/cyw43_arch.h"

#define WIFI_SSID "your_wifi_ssid"
#define WIFI_PASSWORD "your_wifi_password"

int main() {
    stdio_init_all();

    // Inicializa o módulo Wi-Fi
    if (cyw43_arch_init()) {
        printf("Falha na inicialização do Wi-Fi\n");
        return -1;
    }
    printf("Wi-Fi inicializado com sucesso\n");

    // Ativa o modo de estação (STA)
    cyw43_arch_enable_sta_mode();

    // Tenta conectar ao Wi-Fi
    int result = cyw43_arch_wifi_connect_blocking(WIFI_SSID, WIFI_PASSWORD, CYW43_AUTH_WPA2_MIXED_PSK);

    // Verifica o resultado da conexão
    if (result) {
        printf("Conexão Wi-Fi falhou\n");
        cyw43_arch_gpio_put(CYW43_WL_GPIO_LED_PIN, 0); // Desliga o LED
        return -1;
    }

    // Se conectado com sucesso, acende o LED
    printf("Conectado ao Wi-Fi com sucesso\n");
    cyw43_arch_gpio_put(CYW43_WL_GPIO_LED_PIN, 1); // Acende o LED

    // Mantém o programa rodando
    while (true) {
        printf("loop principal\n");
        sleep_ms(1000);
    }
}

```
- `cyw43_arch_enable_sta_mode()`: O dispositivo atua como um cliente Wi-Fi, o que significa que ele se conecta a uma rede Wi-Fi existente (como a de sua casa ou escritório).



#### Comunicar-se com uma API REST

Vamos fazer a raspiberry pi pico W receber os dados de uma API de previsão do tempo.


```C
//refatorado
#include "lwip/dns.h"
#include "pico/stdlib.h"
#include "pico/cyw43_arch.h"
#include "lwip/apps/mqtt.h"

#define HIVEMQ_PORT (1883)
#define HIVEMQ_HOST "public.mqtthq.com"

struct mqtt_connect_client_info_t hivemq_client_info = {
    .client_id = "picow",
    .client_user = NULL,
    .client_pass = NULL,
    .keep_alive = 100,
    .will_msg = NULL,
    .will_topic = NULL
};
volatile int blink_period = 20;

ip_addr_t hiveIP;
static mqtt_client_t *mqtt_client;

void mqtt_request_callback(void *arg, err_t err) {
    if(err != ERR_OK) {
        printf("Subscription error\n");
        blink_period = 0;
    }
}

void mqtt_connection_callback(mqtt_client_t *client, void *arg, mqtt_connection_status_t status) {
    if (status == MQTT_CONNECT_ACCEPTED) {
        printf("MQTT Connected\n");
        err_t statusSub = mqtt_sub_unsub(client, "hackatum2022-jetbrains", 1, mqtt_request_callback, NULL, 1);
        if (statusSub != ERR_OK) {
            printf("Subscription failed\n");
            blink_period = 10;
        } else {
            blink_period = 100;
        }
    } else {
        printf("MQTT Connection failed\n");
        blink_period = 10;
    }
}

void hivemq_found_callback(const char *name, const ip_addr_t *ipaddr, void *callback_arg) {
    if (ipaddr == NULL) {
        printf("DNS resolution failed\n");
        blink_period = 10;
    } else {
        blink_period = 50;
        memcpy(&hiveIP, ipaddr, sizeof(ip4_addr_t));
        mqtt_client_connect(mqtt_client, &hiveIP, HIVEMQ_PORT, mqtt_connection_callback, NULL, &hivemq_client_info);
    }
}

void mqtt_incoming_data_cb(void *arg, const u8_t *data, u16_t len, u8_t flags) {
    if (data == NULL || len == 0) {
        printf("Empty data received\n");
        blink_period = 0;
    } else {
        int value = *data - '0';
        if (value >= 0 && value <= 9) {
            blink_period = 200 * value;
        } else {
            printf("Invalid data format\n");
            blink_period = 0;
        }
    }
}

void mqtt_incoming_publish_cb(void *arg, const char *topic, u32_t tot_len) {
    if (tot_len == 0) {
        printf("Empty publish received\n");
        blink_period = 0;
    }
}

int main() {
    stdio_init_all();
    if (cyw43_arch_init()) {
        printf("WiFi init failed\n");
        return -1;
    }

    cyw43_arch_enable_sta_mode();
    int result = cyw43_arch_wifi_connect_blocking("jetbrains-hackatum", "rpipicow", CYW43_AUTH_WPA2_MIXED_PSK);
    if (result) {
        printf("WiFi connection failed\n");
        return -1;
    }
    printf("WiFi connected\n");
    cyw43_arch_gpio_put(CYW43_WL_GPIO_LED_PIN, 1);
    cyw43_arch_lwip_begin();

    dns_gethostbyname(HIVEMQ_HOST, &hiveIP, &hivemq_found_callback, NULL);
    mqtt_client = mqtt_client_new();
    if (mqtt_client == NULL) {
        printf("Failed to create MQTT client\n");
        return -1;
    }

    mqtt_set_inpub_callback(mqtt_client, mqtt_incoming_publish_cb, mqtt_incoming_data_cb, NULL);

    while (true) {
        if (blink_period > 0) {
            cyw43_arch_gpio_put(CYW43_WL_GPIO_LED_PIN, 1);
            sleep_ms(blink_period);
            cyw43_arch_gpio_put(CYW43_WL_GPIO_LED_PIN, 0);
            sleep_ms(blink_period);
        } else {
            cyw43_arch_gpio_put(CYW43_WL_GPIO_LED_PIN, 0);
        }
    }
}


```






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
