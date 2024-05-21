# Expert - Firmware - DMA

| Lab Expert - Firmware - DMA                             |
|--------------------------------------------------------|
| **Deadline**: {{lab_expert_2_deadline}}                |
| [Repositório no Classroom]({{lab_expert_2_classroom}}) |
| 💰 100% nota de lab                                    |

## Lab

Neste laboratório, iremos trabalhar usando todos os cores do nosso processador, utilizando o FreeRTOS no modo SMP. Além disso, iremos modificar a biblioteca do OLED1 para fazer uso de DMA.

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

### Biblioteca OLED

Vamos analisar a função do OLED que precisamos chamar para atualizar o display:

```c
gfx_clear_buffer(&disp);
gfx_draw_string(&disp, 0, 0, 1, "Mandioca");
gfx_show(&disp);
```

Toda vez que desejamos atualizar o OLED, precisamos chamar a função `gfx_show`. O papel dessa função é transferir a imagem (`framebuffer`) que está na RAM da Pico para a memória do display, realizando uma cópia pixel a pixel e enviando os dados via o protocolo SPI:

```c
void gfx_show(ssd1306_t *p) {
    for (uint8_t page = 0; page < p->pages; page++) {
        ssd1306_put_page(p->buffer + (page * p->width), page, 0, p->width);
    }
}
```

Nosso display trabalha por páginas, então, para cada página, temos que fazer a cópia dos pixels. Isso é feito na `ssd1306_put_page`:

```c
void ssd1306_put_page(uint8_t *data, uint8_t page, uint8_t column,
                      uint8_t width) {
    ssd1306_set_page_address(page);
    ssd1306_set_column_address(column);

    do {
        ssd1306_write_data(*data++);
    } while (--width);
}
```

Estamos interessados em otimizar o que está dentro do `do while`, que é realizado `width` vezes. A função `ssd1306_write_data` possui a seguinte implementação:

```c
void ssd1306_write_data(uint8_t data) {
    gpio_put(SSD1306_DATA_CMD_SEL, 1);
    spi_cs_select();
    spi_write_blocking(SPI_PORT, &data, 1);
    busy_wait_us_32(4);
}
```

Nessa função, `gpio_put` indica para o OLED que iremos fazer um envio de dado e não de comando, e a função `spi_write_blocking` faz o envio do `data` pelo SPI.

Como podemos melhorar esse código e ganhar performance sem modificar muita coisa? Reescrevendo a `ssd1306_write_data` para fazer uso de um DMA no lugar do `do while`, poupamos esforço da CPU em copiar os dados da memória para o SPI. Além disso, podemos alocar todo o processamento do OLED para um CORE específico, liberando o outro para operações críticas.

## Entrega

Nesta entrega, vocês devem criar duas tasks, cada uma alocada em um dos COREs da CPU. A primeira task deve ser dedicada à leitura do ADC e a segunda deve ser dedicada à atualização do OLED.    

Além disso, vocês devem modificar a função da biblioteca OLED `ssd1306_put_page` para operar com DMA.

Dicas:

- Leia o exemplo de DMA + SPI da própria Pico: [DMA + SPI Example](https://github.com/raspberrypi/pico-examples/blob/master/spi/spi_dma/spi_dma.c)

