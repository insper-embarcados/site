# Expert - Firmware - DMA

| Lab Expert - Firmware - DMA                             |
|--------------------------------------------------------|
| **Deadline**: {{lab_expert_2_deadline}}                |
| [Repositório no Classroom]({{lab_expert_2_classroom}}) |
| 💰 100% nota de lab                                    |

## Lab

Neste laboratório, iremos trabalhar usando todos os cores do nosso processador, utilizando o FreeRTOS no modo SMP. Além disso, iremos aprender o que é DMA e como ele funciona.

### SMP

O nosso FreeRTOS suporta um modo de operação chamado SMP. Esse modo, ativado quando temos mais de uma unidade de processamento (CORE), permite alocar cada tarefa para um desses COREs específicos.

!!! info 
    Leia mais sobre esse modo de operação em:
    
    - [FreeRTOS/SMP](/site/freertos/freertos-smp)

### DMA

DMA (Direct Memory Access) é um controlador especializado em transferir dados. Com ele, conseguimos transferir dados entre periféricos e memórias de computadores sem depender da CPU, trazendo diversos benefícios para sistemas computacionais e também para aplicações de soluções embarcadas. 

!!! info 
    Leia mais sobre o periférico DMA em:
    
    - [RP2040/DMA](/site/rp2040/rp2040-dma)

## LAB

Neste laboratório, vocês irão processar um áudio, gerar a FFT e exibir as informações em um monitor (VGA!). Não se preocupem, o trabalho mais difícil já foi feito.

Neste laboratório, usaremos o exemplo de um professor da Cornell, que também ministra um curso de sistemas embarcados e utiliza a PICO (com um foco maior em DSP em seu curso). Consulte a documentação do projeto na página a seguir:

- Documentacao: https://vanhunteradams.com/Pico/VGA/FFT.html
- Código: https://github.com/vha3/Hunter-Adams-RP2040-Demos/tree/master/Audio/f_Audio_FFT

Leia e entenda!

### Entrega

A entrega desse laboratório é:

1. O código portado para operar com Freertos SMP
2. Um diagrama de blocos do sistema
