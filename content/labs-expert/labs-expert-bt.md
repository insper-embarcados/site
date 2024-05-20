# Expert - Bluetooth

| Lab Expert - Bluetooth - Preparatório                          |
|----------------------------------------------------------------|
| *Deadline*: {{lab_expert_Bluetooth_deadline}}                |
| [Repositório no classroom]({{lab_expert_Bluetooth_classroom}}) |
| 💰 100% nota de lab                                            |

Neste laboratório vamos explorar os recursos de conectividade `Bluetooth` da `Raspberry Pi Pico W`. 

### Definições

Já conhecemos a técnologia Bluetooth, inclusive usamos em nosso curso por meio do módulo HC05/HC06. 

Se já conhecemos e usamos bluetooth, por que vamos voltar nesse assunto? Bem, é chegada a hora de aprofundarmos nosso conhecimento um pouco mais na tecnologia bluetooth e aproveitar para conhecer como usar o modulo bluetooth da pico W.

A Raspberry Pi Pico W possui a versão 5.2 do Bluetooth, que é a especificação do módulo CYW43439 de wifi/bt. O modulo possui o modo BLE (Bluetooth Low Energy) que oferece melhorias em termos de velocidade, alcance e eficiência energética. 

| Característica | CYW43439 (Pico W) | HC-05/HC-06 |
| --- | --- | --- |    
| Versão Bluetooth  | Bluetooth 5.2 | Bluetooth 2.0 | 
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

Fica calmo que vamos tentar desvendadr alguns desses protocólos. 

!!! tip
    Entender alguns desses protocolos é importante pois ajuda a entender melhor alguns dos exemplos disponiveis no próprio [site da raspberry pico](https://github.com/raspberrypi/pico-examples/tree/master).


### Comunicação BLE

Aplicação: `Lê o sensor de temperatura integrado na pico W e envia notificações via BLE, além de pisca a cada segundo para mostrar que está funcionando.`

Neste exemplo vamos configurar o Generic Access Profile (GAP), que basicamente define como os dispositivos BLE descobrem e se conectam uns aos outros, no modo de operação broadcast (anúncios). Permitindo que dispositivos BLE enviem pacotes de dados de anúncio para serem descobertos por outros dispositivos.


Comece ajustando a infra necessária:

No `Cmakelist.txt` configure da seguinte forma:

```sh
# configura a placa com wifi
set(PICO_BOARD pico_w)

add_executable(main
    main.c server_common.c
    )
    
target_link_libraries(main
    pico_stdlib
    pico_btstack_ble
    pico_btstack_cyw43
    pico_cyw43_arch_none
    hardware_adc
    )

target_include_directories(main PRIVATE
    ${CMAKE_CURRENT_LIST_DIR} # For btstack config
    )
pico_btstack_make_gatt_header(main PRIVATE "${CMAKE_CURRENT_LIST_DIR}/temp_sensor.gatt")

```

Carregue no diretório main os arquivos de apoio do projeto.

- [btstack_config.h](https://github.com/raspberrypi/pico-examples/blob/master/pico_w/bt/standalone/btstack_config.h)
- [lwipopts.h](https://github.com/raspberrypi/pico-examples/blob/master/pico_w/bt/standalone/lwipopts.h)
- [temp_sensor.gatt](https://github.com/raspberrypi/pico-examples/blob/master/pico_w/bt/standalone/temp_sensor.gatt)
- [server_common.h](https://github.com/raspberrypi/pico-examples/blob/master/pico_w/bt/standalone/server_common.h)
- [server_common.c](https://github.com/raspberrypi/pico-examples/blob/master/pico_w/bt/standalone/server_common.c)

o nosso código principal é o seguinte: 

```C
/**
 * Levemente adaptado para o nosso curso 
 * Copyright (c) 2023 Raspberry Pi (Trading) Ltd.
 *
 * SPDX-License-Identifier: BSD-3-Clause
 */

#include <stdio.h>
#include "btstack.h" //funcionalidades de Bluetooth.
#include "pico/cyw43_arch.h"
#include "pico/btstack_cyw43.h"
#include "hardware/adc.h"
#include "pico/stdlib.h"

#include "server_common.h"

#define HEARTBEAT_PERIOD_MS 1000

static btstack_timer_source_t heartbeat;
static btstack_packet_callback_registration_t hci_event_callback_registration;

static void heartbeat_handler(struct btstack_timer_source *ts) {
    static uint32_t counter = 0;
    counter++;

    // Update the temp every 10s
    if (counter % 10 == 0) {
        poll_temp();
        if (le_notification_enabled) {
            att_server_request_can_send_now_event(con_handle);
        }
    }

    // Invert the led
    static int led_on = true;
    led_on = !led_on;
    cyw43_arch_gpio_put(CYW43_WL_GPIO_LED_PIN, led_on);

    // Restart timer
    btstack_run_loop_set_timer(ts, HEARTBEAT_PERIOD_MS);
    btstack_run_loop_add_timer(ts);
}

int main() {
    stdio_init_all();

    // initialize CYW43 driver architecture (will enable BT if/because CYW43_ENABLE_BLUETOOTH == 1)
    if (cyw43_arch_init()) {
        printf("failed to initialise cyw43_arch\n");
        return -1;
    }

    // Inicializa a leitura do sensor de temperatura, 
    // esse sensor já vem embutido na placa, não precisamos adicionar nenhum sensor na placa.
    adc_init();
    adc_select_input(ADC_CHANNEL_TEMPSENSOR);
    adc_set_temp_sensor_enabled(true);

    l2cap_init(); // Inicializa o L2CAP (Logical Link Control and Adaptation Protocol) 
    sm_init(); // Inicializa o SM (Security Manager) do Bluetooth.

    // Inicializar o servidor ATT (Attribute Protocol)
    // com o perfil GATT definido (profile_data) e os callbacks de leitura e escrita.
    att_server_init(profile_data, att_read_callback, att_write_callback);
        
    // Registrar callbacks BTstack state
    hci_event_callback_registration.callback = &packet_handler;
    hci_add_event_handler(&hci_event_callback_registration);

    // register for ATT event
    att_server_register_packet_handler(packet_handler);

    // set one-shot btstack timer
    heartbeat.process = &heartbeat_handler;
    btstack_run_loop_set_timer(&heartbeat, HEARTBEAT_PERIOD_MS);
    btstack_run_loop_add_timer(&heartbeat);

    // turn on bluetooth!
    hci_power_control(HCI_POWER_ON);
    
    while(1) {
        tight_loop_contents();

    }
    return 0;
}

```

agora no arquivo `server_common.c` edite em `adv_data` o campo `BLUETOOTH_DATA_TYPE_COMPLETE_LOCAL_NAME`, troque para um nome seu personalizado:

!!! warning
    Note que o primeiro argumento é referente a quantidade de caractere, esse valor em hexadecimal você deve ajustar conforme o nome desejado.

    O Attribute Protocol (ATT) define a maneira como os dados são organizados, acessados e manipulados em dispositivos BLE. Ele estrutura os dados em "atributos", que são unidades básicas de dados identificadas por identificadores únicos (handles). Esses atributos podem representar várias coisas, como valores de sensores, estados de dispositivos ou configurações.

    - Atributos: São unidades básicas de dados identificadas por um identificador único (handle). Cada atributo tem um tipo e um valor.

    - [https://github.com/bluekitchen/btstack/blob/master/src/bluetooth_data_types.h](https://github.com/bluekitchen/btstack/blob/master/src/bluetooth_data_types.h)


```C
static uint8_t adv_data[] = {
    // Flags general discoverable
    0x02, BLUETOOTH_DATA_TYPE_FLAGS, APP_AD_FLAGS,
    // Name
    0x17, BLUETOOTH_DATA_TYPE_COMPLETE_LOCAL_NAME, 'P', 'i', 'c', 'o', ' ', '0', '0', ':', '0', '0', ':', '0', '0', ':', '0', '0', ':', '0', '0', ':', '0', '0',
    0x03, BLUETOOTH_DATA_TYPE_COMPLETE_LIST_OF_16_BIT_SERVICE_CLASS_UUIDS, 0x1a, 0x18,
};
static const uint8_t adv_data_len = sizeof(adv_data);
```
Compile e rode o código em sua placa. 

### Para receber os anuncios em outros dispositivos

1) Receba pelo celular, para isso faça:

- Instalar no telefone celular o aplicativo `Nordic nRF Connect`.
- Verifica os BLE próximos 
- Exibir os dados recebidos.

## Desafio do Lab

Receba por outra placa pico W, para isso faça:

- Você vai precisar de uma segunda placa pico W,
- Configure o ambiente
- Use como base o código [client.c](https://github.com/raspberrypi/pico-examples/blob/master/pico_w/bt/standalone/client.c).
- Faça os ajustes necessários, para que o valor seja exibido no display oled. 
- Execute e exiba os resultados.



## Referências:

https://www.bluetooth.com/specifications/assigned-numbers/

https://www.bluetooth.com/specifications/specs/hid-over-gatt-profile-1-0/

https://www.bluetooth.com/wp-content/uploads/Files/Specification/HTML/CSS_v11/out/en/supplement-to-the-bluetooth-core-specification/data-types-specification.html

https://github.com/bluekitchen/btstack/tree/master/example

https://bluekitchen-gmbh.com/