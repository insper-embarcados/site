


# UART

## UART

### Introdução ao UART:
UART é um dos protocolos mais utilizados para comunicação em sistemas digitais, o que inclui computadores, microcontroladores e sistemas embarcados. **UART** significa **Universal Asynchronous Receiver-Transmitter**, e é um protocolo de comunicação utilizado em hardware que permite uma comunicação assíncrona - sem sincronia entre dispositivos - e com velocidade de transmissão configurável.


### Aplicações Práticas:
- placas de rede, 
- controladores de disco, 
- interfaces de áudio e vídeo, 
- entre outros.




<details>
<summary>Expanda se quiser saber sobre a história do UART</summary>


</details>


### Vantagens do UART:



### Desvantagens do UART:



## RP2040 / PICO


### Cenários comuns em que se utiliza o uart:


### Componentes Envolvidos:








## SDK e Praticando

Para usar o DMA você deve modificar o `CMakeLists.txt` adicionando `hardware_dma` no `target_link_libraries`:

```diff
target_link_libraries(
                      ....
                      .....
+                     hardware_dma)
```

E adicionar no headfile:

```c
#include "hardware/dma.h"
```



### Snippets

Códigos de exemplo para o UART.






## Referências:

- "UART COmmunication Working Applications". Disponível em: https://microcontrollerslab.com/uart-communication-working-applications/

- "UART a HARDWARE Communication Protocol". Disponível em : https://www.analog.com/en/resources/analog-dialogue/articles/uart-a-hardware-communication-protocol.html

- "RP2040 Datasheet." Disponível em: https://datasheets.raspberrypi.com/rp2040/rp2040-datasheet.pdf?_gl=1133hn0o_gaNzczNjI3NTcwLjE3MDA1OTg2MjI._ga_22FD70LWDS*MTcxMTQ3MzYxOC4yMi4xLjE3MTE0NzQyMDguMC4wLjA

- "Raspberry Pi Pico W Datasheet." Disponível em: https://datasheets.raspberrypi.com/picow/pico-w-datasheet.pdf?_gl=1cxqmyl_gaNzczNjI3NTcwLjE3MDA1OTg2MjI._ga_22FD70LWDS*MTcxMTQ3MzYxOC4yMi4xLjE3MTE0NzQzNzYuMC4wLjA

- "Raspberry Pi Pico C/C++ SDK." Disponível em: https://datasheets.raspberrypi.com/pico/raspberry-pi-pico-c-sdk.pdf?_gl=11jwcl4q_gaNzczNjI3NTcwLjE3MDA1OTg2MjI._ga_22FD70LWDS*MTcxMTQ3MzYxOC4yMi4xLjE3MTE0NzQzNzYuMC4wLjA