
# DMA

RP2040 Datasheet
- https://datasheets.raspberrypi.com/rp2040/rp2040-datasheet.pdf?_gl=1*133hn0o*_ga*NzczNjI3NTcwLjE3MDA1OTg2MjI.*_ga_22FD70LWDS*MTcxMTQ3MzYxOC4yMi4xLjE3MTE0NzQyMDguMC4wLjA. 

RaspBerry Pi Pico W Datasheet
- https://datasheets.raspberrypi.com/picow/pico-w-datasheet.pdf?_gl=1*cxqmyl*_ga*NzczNjI3NTcwLjE3MDA1OTg2MjI.*_ga_22FD70LWDS*MTcxMTQ3MzYxOC4yMi4xLjE3MTE0NzQzNzYuMC4wLjA.

Raspberry Pi Pico C/C++ SDK
- https://datasheets.raspberrypi.com/pico/raspberry-pi-pico-c-sdk.pdf?_gl=1*1jwcl4q*_ga*NzczNjI3NTcwLjE3MDA1OTg2MjI.*_ga_22FD70LWDS*MTcxMTQ3MzYxOC4yMi4xLjE3MTE0NzQzNzYuMC4wLjA.


O DMA (Direct Memory Access) é o hardware responsável por ler e escrever dados no sistema, e sua melhor característica é que utilizando ele, os dados não são processados pela CPU, que consequentemente traz alguns benefícios, sendo eles:
- O controlador DMA pode reduzir o consumo de energia: A CPU permanece em baixo consumo enquanto o DMA está ativo




## Introdução ao DMA:
Definição básica do que é DMA.
DMA (Direct Memory Access) é um controlador especializado em transferir dados, com ele conseguimos transferir dados entre periféricos e memórias sem depender da CPU, o que acaba trazendo diversos benefícios para o sistema e para aplicações de soluções embarcadas, tais como: 
- maior rapidez na transferência de dados
- diminuição do gasto de energia


Breve histórico do desenvolvimento do DMA e sua importância na computação.
O DMA não é uma coisa nova...
- Foi introduzido inicialmente em computadores de mainframe entre os anos de 1950 - 1970. Inicialmente era um simples bloco com mecanismo para mover dados entre um dispositivo e uma memória.
- Nos anos 80, dado a comercialização de computadores pessoais, o DMA tornou-se mais e mais comum em sistemas com periféricos, tal como drivers de memória.
- Nos anos 90, com alta nas aplicações na área de multimídia e internet, surgiram demandas por taxas de transferência de dados mais rápidas. Assim o DMA foi introduzido com foco em otimizar a transferência de dados e reduzir a latência.
- Nos anos 2000, avanços na arquitetura envolvendo os barramentos do computador, tais como o surgimento de tecnologias como o PCI e PCIe, ocasionaram uma melhor comunicação entre dispositivos e a CPU.
- No ano de 2010, dado a emergência de computação paralela e processadores multi-core, os controladores DMA foram otimizados para processamento multi-threading.
- Entre 2010 e 2020, com o destaque do IoT (Internet of Things) e sistemas embarcados, os controladores DMA foram adotados como requisito para sistemas de baixo consumo.

## Funcionamento Básico:
Explicação de como o DMA permite que dispositivos periféricos acessem diretamente a memória principal do sistema, sem a intervenção da CPU.



![DMA structure](/imgs/DMAstructureoverview.png)

Comparação do fluxo de dados com e sem DMA para ilustrar sua eficiência.

## Componentes Envolvidos:
Identificação dos principais componentes envolvidos em uma operação de DMA, incluindo o controlador DMA, o dispositivo periférico e a memória principal.

## Modos de Operação utilizando a RP2040:
O DMA pode operar como leitura e escrita, sendo que na RP2040 o limite de leitura e escrita do DMA é de até 32 bits de tamanho, a cada ciclo de clock. Há 12 canais independentes na RP2040, cada um deles verificando uma sequência de bus transfers.
- Memória para periférico: Um periférico sinaliza ao DMA quando precisa enviar mais dados. O DMA lê os dados de um array da RAM ou flash, e escreve no periférico utilizando o método FIFO (First In, First Out).
- Periférico para memória: Neste modo, o periférico manda um sinal para o DMA quando os dados são recebidos. O DMA lê os dados do periférico por meio do método FIFO, e então escreve os mesmos em um array na RAM do microcontrolador.
- Memória para memória: O DMA transfere dados entre dois buffers na RAM.

Cada um dos 12 canais tem seu pŕoprio registrador de controle e status, no qual o sofware pode programar e monitorar o progresso dos canais. Quando vários canais estão ativos ao mesmo tempo, o DMA divide a largura de banda igualmente entre os canais.

O tamanho de transferência pode ser 32, 16 ou 8 bits, e necessita ser configurado apenas uma vez por canal.

## Modos de transferência:
São 3:
- Burst Mode: O DMA toma conta da memória e libera apenas quando completar a transferência de dados.
- Cycle Stealing Mode: O DMA força o processador a parar a operação e toma conta do barramento de memória por um curto período de tempo.
- Transparent Mode: Neste modo o DMA toma conta do barramento do sistema apenas se o processador não precisar do mesmo.

## Vantagens do DMA:
- Velocidade de transferência de dados mais rápida que na CPU
- Reduz o trabalho da CPU, deixando ela disponível para focar em outras tarefas.
- Múltiplos canais DMA trabalham simultaneamente o que melhora a performance do sistema em termos de fluxo de dados.

O controlador DMA pode reduzir o consumo de energia, permitindo que a CPU permaneça em modo de baixo consumo até que haja uma interrupção externa por parte de algum periférico.

## Desvantagens do DMA:
- Configurações de DMA não são sempre compatíveis entre diferentes hardwares.
- Dificuldades quando estamos escrevendo numa memória que contem tanto a fonte como o destino dos dados.
- Como a DMA toma conta do barramento de memória para transferência de dados, às vezes a CPU tem que esperar o controlador DMA completar sua tarefa.
- Em alguns dos dispositivos pode haver conflito de memória quando múltiplos dispositivos tentarem usar o DMA simultaneamente.

## Aplicações Práticas:
- placas de rede, 
- controladores de disco, 
- interfaces de áudio e vídeo, 
- entre outros.

## Coding:
Configurando canais:


   

ref1: https://hackaday.com/2017/02/28/understanding-dma/
ref2: https://www.ecorfan.org/taiwan/research_journals/Innovacion_Sistematica/vol1num2/Revista_de_Innovacion_Sistem%C3%A1tica_V1_N2.pdf#page=29
ref3: https://www.spiceworks.com/tech/hardware/articles/direct-memory-access/ 
ref4: https://datasheets.raspberrypi.com/rp2040/rp2040-datasheet.pdf?_gl=1*133hn0o*_ga*NzczNjI3NTcwLjE3MDA1OTg2MjI.*_ga_22FD70LWDS*MTcxMTQ3MzYxOC4yMi4xLjE3MTE0NzQyMDguMC4wLjA.

ref 5: https://www.geeksforgeeks.org/direct-memory-access/
///////////////



