# WIFI




## Scan Wi-fi

Vamos implementar uma scan para listar as redes wifi disponiveis para se conectar. O código é adaptado do repositório oficial da raspiberry pi pico W.

- [https://github.com/raspberrypi/pico-examples/blob/master/pico_w/wifi/wifi_scan/picow_wifi_scan.c](https://github.com/raspberrypi/pico-examples/blob/master/pico_w/wifi/wifi_scan/picow_wifi_scan.c)

```C
#include <stdio.h>
#include "pico/stdlib.h"
#include "pico/cyw43_arch.h"

// Função de callback para resultados de escaneamento de Wi-Fi
static int scan_result(void *env, const cyw43_ev_scan_result_t *result) {
    if (result) {
        // Exibe informações sobre a rede Wi-Fi encontrada
        printf("SSID: %-32s RSSI: %4d Canal: %3d MAC: %02x:%02x:%02x:%02x:%02x:%02x Segurança: %u\n",
            result->ssid, result->rssi, result->channel,
            result->bssid[0], result->bssid[1], result->bssid[2], 
            result->bssid[3], result->bssid[4], result->bssid[5],
            result->auth_mode);
    }
    return 0;
}

int main() {
    stdio_init_all(); // Inicializa todas as interfaces padrão de I/O

    // Inicializa o módulo Wi-Fi
    if (cyw43_arch_init()) {
        printf("Falha ao inicializar\n");
        return 1;
    }

    // Habilita o modo estação (STA)
    cyw43_arch_enable_sta_mode();

    // Variáveis para controle de tempo e status de escaneamento
    absolute_time_t scan_test = nil_time;
    bool scan_in_progress = false;

    while (true) {
        if (absolute_time_diff_us(get_absolute_time(), scan_test) < 0) {
            if (!scan_in_progress) {
                // Configura e inicia um escaneamento de Wi-Fi
                cyw43_wifi_scan_options_t scan_options = {0};
                int err = cyw43_wifi_scan(&cyw43_state, &scan_options, NULL, scan_result);
                if (err == 0) {
                    printf("\nRealizando escaneamento de Wi-Fi\n");
                    scan_in_progress = true;
                } else {
                    printf("Falha ao iniciar escaneamento: %d\n", err);
                    scan_test = make_timeout_time_ms(10000); // Aguarda 10s e tenta novamente
                }
            } else if (!cyw43_wifi_scan_active(&cyw43_state)) {
                scan_in_progress = false;
                scan_test = make_timeout_time_ms(10000); // Aguarda 10s e tenta novamente
            }
        }
    }

    cyw43_arch_deinit(); // Desliga o módulo Wi-Fi antes de encerrar
    return 0;
}
```

- `cyw43_arch_enable_sta_mode()`: O dispositivo atua como um cliente Wi-Fi.

- `cyw43_wifi_scan_options_t()`: De acordo com a documentação oficial, atualmente as opções desse argumento são ignoradas. 

- `cyw43_wifi_scan()`: Este método inicia o processo de escaneamento por redes Wi-Fi disponíveis. Ele utiliza as configurações de escaneamento e requer uma função de callback (quarto parametro) para lidar com os resultados encontrados durante o escaneamento.

- `cyw43_wifi_scan_active()`: Verifica se um escaneamento de redes Wi-Fi está ativo no momento. Retorna `true` se um escaneamento estiver em andamento e `false` caso contrário, ajudando a gerenciar o fluxo de controle em aplicações que dependem do status do escaneamento.

- `scan_result`: A função de callback pega o resultado e imprime seu conteúdo. O `BSSID` (Basic Service Set Identifier) da rede, que é o endereço MAC do ponto de acesso que transmite a SSID. É composto por 6 bytes, usualmente exibidos em formato hexadecimal.

!!! exercice
    Crie um novo projeto e faça o scan das redes Wi-Fi para validar a o funcionamento do modulo Wi-Fi da Raspiberry Pi Pico W. 
    - Use seu computador ou celular como roteador e avalie se aparece disponivel no scan.
    - Note que algumas redes aparecem duplicadas e com a potência muito baixa.

    [](./imgs/scan_network.png)

    - Crie uma função para ordenar as redes disponiveis por potência RSSI e que remova as redes duplicdas.

### Conectando-se na internet

O código base a seguir irá `tentar` se conectar à internet, se for sucesso o led da placa acende.

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

- `cyw43_arch_wifi_connect_blocking()`: Esta função tenta estabelecer uma conexão Wi-Fi usando as credenciais fornecidas (SSID e senha) e tipo de autenticação. Ela bloqueará a execução do programa até que a conexão Wi-Fi seja estabelecida ou falhe. Isso significa que, se a conexão Wi-Fi demorar muito ou não for bem-sucedida, seu programa esperará indefinidamente, a menos que seja interrompido externamente.

!!! tip
    De acordo com a documentação oficial, existem 4 tipos de autenticação: `CYW43_AUTH_OPEN`, `CYW43_AUTH_WPA_TKIP_PSK`, `CYW43_AUTH_WPA2_AES_PSK`, `CYW43_AUTH_WPA2_MIXED_PSK`.  

Podemos realizar a conexão Wi-Fi da pico W tanto com função `cyw43_arch_wifi_connect_blocking()` como com a função `cyw43_arch_wifi_connect_timeout_ms()`, mas cada uma comporta-se de uma forma diferente.

- `cyw43_arch_wifi_connect_timeout_ms()`: Esta função tenta estabelecer uma conexão Wi-Fi com um parâmetro adicional de `time out` (tempo limite) em milissegundos. Se a conexão não for bem-sucedida dentro do período especificado, ela retorna um erro. A duração do tempo limite permite especificar por quanto tempo o sistema deve tentar se conectar antes de desistir.

!!! tip
    A escolha entre as funções para tentar estabelecer uma conexão Wi-Fi, depende dos requisitos de responsividade da sua aplicação e de como você deseja lidar com cenários em que a conectividade Wi-Fi está atrasada ou indisponível. Para aplicações onde você não pode se dar ao luxo de esperar indefinidamente, `cyw43_arch_wifi_connect_timeout_ms()` fornece uma maneira de falhar de forma controlada após um período definido. Por outro lado, `cyw43_arch_wifi_connect_blocking()` é mais simples de usar quando o tempo para estabelecimento da conexão Wi-Fi não é crítico para a continuação do programa.


O drive cyw43 possui a função `cyw43_tcpip_link_status` que retorna o status da conexão. As opções são:

| link status |	Meaning |
| ------------- | ------------- |
| CYW43_LINK_DOWN | Wifi down | 
| CYW43_LINK_JOIN | Connected to wifi | 
| CYW43_LINK_NOIP | Connected to wifi, but no IP address | 
| CYW43_LINK_UP | Connect to wifi with an IP address | 
| CYW43_LINK_FAIL | Connection failed | 
| CYW43_LINK_NONET | No matching SSID found (could be out of range, or down) | 
| CYW43_LINK_BADAUTH | Authenticatation failure | 


Vamos criar uma função `get_wifi_status` que recebe o retorno dessa opção, Vamos utilizar para garantir a conexão de rede.

```C
void get_wifi_status(int status) {
    if (status == CYW43_LINK_UP) {
        printf("wifi on\n");
        
    } else {
        printf("wifi off\n");
    }
}
```

Para chamar a função:

```C
get_wifi_status(cyw43_tcpip_link_status(&cyw43_state, CYW43_ITF_STA));

```

### Verificando seu IP

Após conectado é possivel vericar o IP alocado para a raspberry pi Pico.

```C
   char sIP[] = "xxx.xxx.xxx.xxx";  
    strcpy (sIP, ip4addr_ntoa(netif_ip4_addr(netif_list)));  
    printf ("Conectado, IP %s\n", sIP);  
```    
