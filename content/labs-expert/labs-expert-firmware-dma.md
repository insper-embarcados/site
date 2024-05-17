# Expert - DSP - Áudio

| Lab Expert - DSP - Áudio Preparatório                          |
|----------------------------------------------------------------|
| **Deadline**: {{lab_expert_dsp_audio_deadline}}                |
| [Repositório no classroom]({{lab_expert_dsp_audio_classroom}}) |
| 💰 100% nota de lab                                            |

## Lab

Neste laboratório iremos trabalhar usando todos os cores do nosso processador usando o FreeRTOS no modo SMP. Além disso, iremos modificar a lib do OLED1 para fazer uso de um DMA.

### DMA

DMA (Direct Memory Access) é um controlador especializado em transferir dados, com ele conseguimos transferir dados entre periféricos e memórias de computadores sem depender da CPU, o que acaba trazendo diversos benefícios para sistemas computacionais e também para aplicações de soluções embarcadas. 

Vamos analisar a função do OLED que temos que chamar para atualizar o display:

```c
gfx_clear_buffer(&disp);
gfx_draw_string(&disp, 0, 0, 1, "Mandioca");
gfx_show(&disp);
```

Toda vez que desejamos atualizar o OLED temos que fazer a chamada da funcão `gfx_show`. O papel dessa funcã́o é transferir a imagem (`framebuffer`) que está na RAM da pico para a memória do display, isso é realizado fazendo uma cópia px a px e enviando o dado via o protocolo `SPI`:

```c
void gfx_show(ssd1306_t *p) {
    for (uint8_t page = 0; page < p->pages; page++) {
        ssd1306_put_page(p->buffer + (page * p->width), page, 0, p->width);
    }
}
```

Notem que o nosso display trabalha por páginas, então para cada página temos que fazer a cópia dos px, isso é feito na `ssd1306_put_page`:

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

Estamos interessados aqui na `do while`, que é realizado por `width` vezes. A funcão `ssd1306_write_data` possui a seguinte implementacão:

```c
void ssd1306_write_data(uint8_t data) {
    gpio_put(SSD1306_DATA_CMD_SEL, 1);
    spi_cs_select();
    spi_write_blocking(SPI_PORT, &data, 1);
    busy_wait_us_32(4);
```

Nessa funcao o `gpio_put` indica para o OLED que iremos fazer um envio de dado e não de comando, e a função `spi_write_blocking` faz o envio do `$data` pelo SPI.

Como podemos melhorar esse código, ganhar performance, sem modificar muita coisa? Reescrevendo o `ssd1306_write_data` para fazer uso de um DMA no lugar do `do while`, assim poupamos esforco da CPU em ficar copiando os dados da memória para o SPI.

## Entrega
