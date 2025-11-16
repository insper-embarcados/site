# Expert - Firmware - DMA

## LAB

Neste laboratório, vocês irão processar um áudio, gerar a FFT e exibir as informações em um monitor (VGA!). Não se preocupem, o trabalho mais difícil já foi feito.

Neste laboratório, usaremos o exemplo de um professor da Cornell, que também ministra um curso de sistemas embarcados e utiliza a PICO (com um foco maior em DSP em seu curso). Consulte a documentação do projeto na página a seguir:

- Documentacao: https://vanhunteradams.com/Pico/VGA/FFT.html
- Código: https://github.com/vha3/Hunter-Adams-RP2040-Demos/tree/master/Audio/f_Audio_FFT

Leia e entenda!

### DMA

DMA (Direct Memory Access) é um controlador especializado em transferir dados. Com ele, conseguimos transferir dados entre periféricos e memórias de computadores sem depender da CPU, trazendo diversos benefícios para sistemas computacionais e também para aplicações de soluções embarcadas. 

::: info 
Leiamais sobre o periférico DMA em:

- [RP2040/DMA](/guides/pico-dma)
:::

### Entrega

A entrega desse laboratório é:

1. Executar o código exemplo (que faz uso de DMA)
2. Um diagrama de blocos explicando o que está acontecendo com os DMAs em evidência
