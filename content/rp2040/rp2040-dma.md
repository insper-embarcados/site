
# DMA

RP2040 Datasheet
- https://datasheets.raspberrypi.com/rp2040/rp2040-datasheet.pdf?_gl=1*133hn0o*_ga*NzczNjI3NTcwLjE3MDA1OTg2MjI.*_ga_22FD70LWDS*MTcxMTQ3MzYxOC4yMi4xLjE3MTE0NzQyMDguMC4wLjA. 

RaspBerry Pi Pico W Datasheet
- https://datasheets.raspberrypi.com/picow/pico-w-datasheet.pdf?_gl=1*cxqmyl*_ga*NzczNjI3NTcwLjE3MDA1OTg2MjI.*_ga_22FD70LWDS*MTcxMTQ3MzYxOC4yMi4xLjE3MTE0NzQzNzYuMC4wLjA.

Raspberry Pi Pico C/C++ SDK
- https://datasheets.raspberrypi.com/pico/raspberry-pi-pico-c-sdk.pdf?_gl=1*1jwcl4q*_ga*NzczNjI3NTcwLjE3MDA1OTg2MjI.*_ga_22FD70LWDS*MTcxMTQ3MzYxOC4yMi4xLjE3MTE0NzQzNzYuMC4wLjA.

DMA é Direct Memory Access



Sistemas de computadores utilizam um hardware especializado chamado Direct Memory Access - para transferir dados entre dispositivos input/output e o sistema DRAM (memória RAM) do computador. Quando um programa do computador requisita uma operação "Input/Output", como por exemplo, ler um periférico SSD/HDD a mando de um programa, o sistema utiliza o DMA para fazer a leitura dos dados do SSD e copia eles para a RAM do computador.
DMA significa Direct Memory Acces, ele é um controlador encontrado em diversos

Direct Memory Access é um processo de transferência de dados sem o envolvimento do processador em si. Isto é frequentemente utilizado  para transferência de dados "TO/FROM", que seriam dados entre inputs/outputs de dispositivos. Um controlador do tipo DMA é necessário para gerenciar a transferência de dados.

Utilizar um mecanismo de hardware especializado para copiar dados entre dispositivos input/output têm duas maiores vantagens. Primeiro, a CPU não tem o trabalho de copiar dados. Sendo assim, enquanto o DMA copia os dados, a CPU pode executar programas que não dependam dos dados de input/output que a DMA está trabalhando.
A segunda vantagem é que utilizando hardware especializado para copiar dados, é seu design criado para realizar cópia. O hardware é simples e eficiente. Não há sobrecarga de instruções enquanto realiza a cópia. Como resultado, a cópia pode ser realizada a velocidades rápidas, mais rápido do que um processador poderia.

ref: Robert Oshana, in DSP Software Development Techniques for Embedded and Real-Time Systems, 2006
ref: David B. Kirk, Wen-mei W. Hwu, in Programming Massively Parallel Processors (Second Edition), 2013
ref: https://www.sciencedirect.com/topics/computer-science/direct-memory-access  Edmund Lai PhD, BEng, in Practical Digital Signal Processing, 2003



O controlador DMA pode reduzir o consumo de energia, permitindo que a CPU permaneça em modo de baixo consumo até que haja uma interrupção externa por parte de algum periférico.
ref: https://www.ecorfan.org/taiwan/research_journals/Innovacion_Sistematica/vol1num2/Revista_de_Innovacion_Sistem%C3%A1tica_V1_N2.pdf#page=29




ref: rp2040 datasheet
O controlador DMA do microcontrolador RP2040 tem conexões separadas para realizar a leitura e escrita, e realiza transferÊncia em massa de dados sem o processador. Isto deixa o processador livre para atender outras tarefas, ou entrar em estados de baixo consumo energético. O datathroughput ( taxa de tranferência de dados ) através do DMA é significativamente maior do que o data throughput de um processador do RP2040.

O controlador DMA pode realizar leitura e escrita, com até 32 bits de comprimento, em cada ciclo de clock. Há 12 canais independentes, cada um supervisiona uma sequência de transferência de dados, normalmente em um dos seguintes cenários:
Memory-to-peripheral: um sinal periférico avisa o DMA quando é necessário mais dados para serem transmitidos. O DMA lê os dados de um array na RAM ou flash, e escreve neste periférios dados FIFO.
Peripheral-to-memory: Um periférico avisa o DMA quando os dados são recebidos. O DMA lê este dado FIFO do periférico e escreve em um array na RAM. 
Memory-to-merory: O DMA transfere dados entre dois buffers na RAM, tão rápido quanto conseguir.
ref: rp2040 datasheet




//////////////// conteudo utilizavel
O DMA (Direct Memory Access) é o hardware responsável por ler e escrever dados no sistema, e sua melhor característica é que utilizando ele, os dados não são processados pela CPU, que consequentemente traz alguns benefícios, sendo eles:
- O controlador DMA pode reduzir o consumo de energia: A CPU permanece em baixo consumo enquanto o DMA está ativo



Topicos:
    Introdução ao DMA:
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

    Funcionamento Básico:
        Explicação de como o DMA permite que dispositivos periféricos acessem diretamente a memória principal do sistema, sem a intervenção da CPU.



        ![DMA structure](/imgs/DMAstructureoverview.png)

        Comparação do fluxo de dados com e sem DMA para ilustrar sua eficiência.

    Componentes Envolvidos:
        Identificação dos principais componentes envolvidos em uma operação de DMA, incluindo o controlador DMA, o dispositivo periférico e a memória principal.

    Modos de Operação utilizando a RP2040:
        Explicação dos diferentes modos de operação do DMA, como transferência de memória para memória (DMA-to-DMA), memória para periférico (DMA-to-device) e periférico para memória (device-to-DMA).

        ## Modos de operação:
        O DMA pode operar como leitura e escrita, sendo que na RP2040 o limite de leitura e escrita do DMA é de até 32 bits de tamanho, a cada ciclo de clock. Há 12 canais independentes na RP2040, cada um deles verificando uma sequência de bus transfers.
        - Memória para periférico: Um periférico sinaliza ao DMA quando precisa enviar mais dados. O DMA lê os dados de um array da RAM ou flash, e escreve no periférico utilizando o método FIFO (First In, First Out).
        - Periférico para memória: Neste modo, o periférico manda um sinal para o DMA quando os dados são recebidos. O DMA lê os dados do periférico por meio do método FIFO, e então escreve os mesmos em um array na RAM do microcontrolador.
        - Memória para memória: O DMA transfere dados entre dois buffers na RAM.

        Cada um dos 12 canais tem seu pŕoprio registrador de controle e status, no qual o sofware pode programar e monitorar o progresso dos canais. Quando vários canais estão ativos ao mesmo tempo, o DMA divide a largura de banda igualmente entre os canais.

        O tamanho de transferência pode ser 32, 16 ou 8 bits, e necessita ser configurado apenas uma vez por canal.

    Vantagens do DMA:
        Destaque das vantagens do DMA em relação às transferências de dados tradicionais conduzidas pela CPU, como redução da carga da CPU, aumento da velocidade de transferência e melhoria na eficiência geral do sistema.

    Aplicações Práticas:
        - placas de rede, 
        - controladores de disco, 
        - interfaces de áudio e vídeo, 
        - entre outros.

    Limitações e Considerações:
        Discussão sobre possíveis limitações do DMA, como gerenciamento de conflitos de acesso à memória e possíveis impactos na segurança do sistema.

    Configurando canais:


    Referências e Recursos Adicionais:
        Fornecimento de referências bibliográficas, artigos acadêmicos, documentação de dispositivos e outros recursos que os alunos possam consultar para aprofundar seu entendimento sobre o assunto.

ref1: https://hackaday.com/2017/02/28/understanding-dma/
ref2: https://www.ecorfan.org/taiwan/research_journals/Innovacion_Sistematica/vol1num2/Revista_de_Innovacion_Sistem%C3%A1tica_V1_N2.pdf#page=29
ref3: https://www.spiceworks.com/tech/hardware/articles/direct-memory-access/ 
ref4: https://datasheets.raspberrypi.com/rp2040/rp2040-datasheet.pdf?_gl=1*133hn0o*_ga*NzczNjI3NTcwLjE3MDA1OTg2MjI.*_ga_22FD70LWDS*MTcxMTQ3MzYxOC4yMi4xLjE3MTE0NzQyMDguMC4wLjA.
///////////////



