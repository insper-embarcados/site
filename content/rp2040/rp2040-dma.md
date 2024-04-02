


# DMA

## Introdução ao DMA:
DMA (Direct Memory Access) é um controlador especializado em transferir dados, com ele conseguimos transferir dados entre periféricos e memórias sem depender da CPU, o que acaba trazendo diversos benefícios para o sistema e consequentemente para aplicações de soluções embarcadas. 
O nosso RP2040 é equipado com um poderoso DMA, o qual pode transferir até 32 bits de tamanho a cada clock do sistema, e dado que o System Clock da nossa RP2040 é de 125MHz, o nosso DMA pode transmitir mais dados do que você pode contar.


## Componentes Envolvidos:
Analisando a estrutura do nosso microcontrolador RP2040 na Figura 1, observamos que o DMA está conectado diretamente ao Bus Fabric.

Figura 1 - Arquitetura do RP2040

![rp2040-arch](/imgs/rp2040-arch.png "Figura 1")

## O que é o "Bus Fabric"?
  
Na figura 2, vocês podem ver os componentes do Bus Fabric da RP2040 em amarelo e com quais partes do nosso microcontrolador ele se interliga, repare que o DMA está representado no canto superior direito. O Bus Fabric serve para interligar endereços e transportar dados através do chip. AHB-lite Crossbar é um barramento que trabalha com um protocolo AHB-lite (AMBA 3 AHB-lite), o qual o Bus Trafic faz uso. O DMA utiliza os barramentos do Bus Trafic para transmitir dados.

Figura 2 - RP2040 Bus Fabric

![rp2040-bus-fabric](/imgs/rp2040-bus-fabric.png "Figura 2")
  






Abaixo, na figura 3, é possível observar a estrutura interna do DMA. O mesmo possui conexões separadas de leitura e escrita que são ligadas diretamente ao Bus Fabric, e realizam a transferência de dados. **A taxa de transferência de dados através de um DMA é superior ao que um dos processadores do RP2040 conseguiria realizar**.
- As conexões de leitura e escrita são ligadas diretamente ao Bus Trafic, através do AHB-lite Read Master e AHB-lite Write Master.
- Internamente no DMA é processado o endereço de origem e destino dos dados.
- Para controle e verificação do status das transferências de dados com o DMA é necessário manipular seus registradores específicos para cada ação. Caso queira saber mais sobre os registradores do DMA, acesse: [DMA Registers](https://datasheets.raspberrypi.com/rp2040/rp2040-datasheet.pdf#page=103)


Figura 3 - DMA

![dma_intern](/imgs/dma_intern.png "Figura 3")



## Modos de Operação do DMA utilizando a RP2040:
O DMA pode operar como leitura e escrita, sendo que na RP2040 o limite de leitura e escrita do DMA é de até 32 bits de tamanho, a cada ciclo de clock. Há 12 canais independentes na RP2040, cada um deles verificando uma sequência de transferência de dados.

## Cenários comuns em que se utiliza o DMA para transferência de dados:
- Memória para periférico: Um periférico sinaliza ao DMA quando precisa enviar mais dados. O DMA lê os dados de um array da RAM ou flash, e escreve no periférico utilizando o método FIFO (First In, First Out).

- Periférico para memória: Neste modo, o periférico manda um sinal para o DMA quando os dados são recebidos. O DMA lê os dados do periférico por meio do método FIFO, e então escreve os mesmos em um array na RAM do microcontrolador.

- Memória para memória: O DMA transfere dados entre dois buffers na RAM.

Cada um dos 12 canais tem seu pŕoprio registrador de controle e status, no qual o sofware pode programar e monitorar o progresso dos canais. Quando vários canais estão ativos ao mesmo tempo, o DMA divide a largura de banda igualmente entre os canais.

O tamanho de transferência pode ser 32, 16 ou 8 bits, e necessita ser configurado apenas uma vez por canal.

## Histório de desenvolvimento do DMA
**O DMA não é uma coisa nova...**

- Foi introduzido inicialmente em computadores de mainframe entre os anos de 1950 - 1970. Inicialmente era um simples bloco com mecanismo para mover dados entre um dispositivo e uma memória.

- Nos anos 80, dado a comercialização de computadores pessoais, o DMA tornou-se mais e mais comum em sistemas com periféricos, tal como drivers de memória.

- Nos anos 90, com alta nas aplicações na área de multimídia e internet, surgiram demandas por taxas de transferência de dados mais rápidas. Assim o DMA foi introduzido com foco em otimizar a transferência de dados e reduzir a latência.

- Nos anos 2000, avanços na arquitetura envolvendo os barramentos do computador, tais como o surgimento de tecnologias como o PCI e PCIe, ocasionaram uma melhor comunicação entre dispositivos e a CPU.

- No ano de 2010, dado a emergência de computação paralela e processadores multi-core, os controladores DMA foram otimizados para processamento multi-threading.

- Entre 2010 e 2020, com o destaque do IoT (Internet of Things) e sistemas embarcados, os controladores DMA foram adotados como requisito para sistemas de baixo consumo.



## Modos de transferência:
Alguns deles:

- Burst Mode: O DMA toma conta da memória e libera apenas quando completar a transferência de dados.

- Cycle Stealing Mode: O DMA força o processador a parar a operação e toma conta do barramento de memória por um curto período de tempo.

- Transparent Mode: Neste modo o DMA toma conta do barramento do sistema apenas se o processador não precisar do mesmo.

## Vantagens do DMA:

- Velocidade de transferência de dados mais rápida que na CPU.

- Reduz o trabalho da CPU, deixando ela disponível para focar em outras tarefas.

- Múltiplos canais DMA trabalham simultaneamente o que melhora a performance do sistema em termos de fluxo de dados.

O controlador DMA pode reduzir o consumo de energia, permitindo que a CPU permaneça em modo de baixo consumo até que haja uma interrupção externa por parte de algum periférico.

## Desvantagens do DMA:

- Configurações de DMA não são sempre compatíveis entre diferentes hardwares.

- Dificuldades quando estamos escrevendo numa memória que contém tanto a fonte como o destino dos dados.

- Como a DMA toma conta do barramento de memória para transferência de dados, às vezes a CPU tem que esperar o controlador DMA completar sua tarefa.

- Em alguns dos dispositivos pode haver conflito de memória quando múltiplos dispositivos tentarem usar o DMA simultaneamente.

## Aplicações Práticas:
- placas de rede, 
- controladores de disco, 
- interfaces de áudio e vídeo, 
- entre outros.


# Sem mais delongas ... Let's Code!!


## SDK

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

## Snippets

Códigos exemplo para o DMA.

### Hello DMA

[Simulação no wokwi](/definir/link){.ah-button}
/
[pico-examples/dma/hello_dma/hello_dma.c](https://github.com/raspberrypi/pico-examples/blob/master/dma/hello_dma/hello_dma.c){.ah-button}

```c
// Use the DMA to copy data between two buffers in memory.

#include <stdio.h>
#include "pico/stdlib.h"
#include "hardware/dma.h"

// Data will be copied from src to dst
const char src[] = "Hello, world! (from DMA)";
char dst[count_of(src)];

int main() {
    stdio_init_all();

    // Get a free channel, panic() if there are none
    int chan = dma_claim_unused_channel(true);

    // 8 bit transfers. Both read and write address increment after each
    // transfer (each pointing to a location in src or dst respectively).
    // No DREQ is selected, so the DMA transfers as fast as it can.

    dma_channel_config c = dma_channel_get_default_config(chan);
    channel_config_set_transfer_data_size(&c, DMA_SIZE_8);
    channel_config_set_read_increment(&c, true);
    channel_config_set_write_increment(&c, true);

    dma_channel_configure(
        chan,          // Channel to be configured
        &c,            // The configuration we just created
        dst,           // The initial write address
        src,           // The initial read address
        count_of(src), // Number of transfers; in this case each is 1 byte.
        true           // Start immediately.
    );

    // We could choose to go and do something else whilst the DMA is doing its
    // thing. In this case the processor has nothing else to do, so we just
    // wait for the DMA to finish.
    dma_channel_wait_for_finish_blocking(chan);

    // The DMA has now copied our text from the transmit buffer (src) to the
    // receive buffer (dst), so we can print it out from there.
    puts(dst);
}
```





## Referências:

 "Understanding DMA." Hackaday. Disponível em: https://hackaday.com/2017/02/28/understanding-dma/

"Direct Memory Access: Basics and Its Applications." Revista de Innovación Sistemática, vol. 1, nº 2, p. 29. Disponível em: https://www.ecorfan.org/taiwan/research_journals/Innovacion_Sistematica/vol1num2/Revista_de_Innovacion_Sistem%C3%A1tica_V1_N2.pdf#page=29

"Direct Memory Access (DMA)." Spiceworks. Disponível em: https://www.spiceworks.com/tech/hardware/articles/direct-memory-access/

"RP2040 Datasheet." Raspberry Pi Datasheets. Disponível em: https://datasheets.raspberrypi.com/rp2040/rp2040-datasheet.pdf?_gl=1*133hn0o*_ga*NzczNjI3NTcwLjE3MDA1OTg2MjI.*_ga_22FD70LWDS*MTcxMTQ3MzYxOC4yMi4xLjE3MTE0NzQyMDguMC4wLjA.

"Direct Memory Access (DMA)." GeeksforGeeks. Disponível em: https://www.geeksforgeeks.org/direct-memory-access/


Hackaday. "Understanding DMA." Disponível em: https://hackaday.com/2017/02/28/understanding-dma/

Revista de Innovación Sistemática. "Direct Memory Access: Basics and Its Applications." Vol. 1, nº 2, p. 29. Disponível em: https://www.ecorfan.org/taiwan/research_journals/Innovacion_Sistematica/vol1num2/Revista_de_Innovacion_Sistem%C3%A1tica_V1_N2.pdf#page=29

Spiceworks. "Direct Memory Access (DMA)." Disponível em: https://www.spiceworks.com/tech/hardware/articles/direct-memory-access/

Raspberry Pi Datasheets. "RP2040 Datasheet." Disponível em: https://datasheets.raspberrypi.com/rp2040/rp2040-datasheet.pdf?_gl=1*133hn0o*_ga*NzczNjI3NTcwLjE3MDA1OTg2MjI.*_ga_22FD70LWDS*MTcxMTQ3MzYxOC4yMi4xLjE3MTE0NzQyMDguMC4wLjA.

GeeksforGeeks. "Direct Memory Access (DMA)." Disponível em: https://www.geeksforgeeks.org/direct-memory-access/
   
Spiceworks. "Direct Memory Access (DMA)." Disponível em: https://www.spiceworks.com/tech/hardware/articles/direct-memory-access/

Infineon Technologies. "HOW TO USE DIRECT MEMORY ACCESS (DMA) CONTROLLER IN THE XMC7000 FAMILY." Disponível em: https://community.infineon.com/gfawx74859/attachments/gfawx74859/jpxmc/198/1/Infineon-AN234225-HOW_TO_USE_DIRECT_MEMORY_ACCESS_(DMA)_CONTROLLER_IN_THE_XMC7000_FAMILY-ApplicationNotes-v01_00-EN.pdf

University of Michigan. "AMBA AHB-Lite SPECIFICATION." Disponível em: https://www.eecs.umich.edu/courses/eecs373/readings/ARM_IHI0033A_AMBA_AHB-Lite_SPEC.pdf

"RP2040 Datasheet." Disponível em: https://datasheets.raspberrypi.com/rp2040/rp2040-datasheet.pdf?_gl=1133hn0o_gaNzczNjI3NTcwLjE3MDA1OTg2MjI._ga_22FD70LWDS*MTcxMTQ3MzYxOC4yMi4xLjE3MTE0NzQyMDguMC4wLjA

"Raspberry Pi Pico W Datasheet." Disponível em: https://datasheets.raspberrypi.com/picow/pico-w-datasheet.pdf?_gl=1cxqmyl_gaNzczNjI3NTcwLjE3MDA1OTg2MjI._ga_22FD70LWDS*MTcxMTQ3MzYxOC4yMi4xLjE3MTE0NzQzNzYuMC4wLjA

"Raspberry Pi Pico C/C++ SDK." Disponível em: https://datasheets.raspberrypi.com/pico/raspberry-pi-pico-c-sdk.pdf?_gl=11jwcl4q_gaNzczNjI3NTcwLjE3MDA1OTg2MjI._ga_22FD70LWDS*MTcxMTQ3MzYxOC4yMi4xLjE3MTE0NzQzNzYuMC4wLjA
