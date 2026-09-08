# Expert - firmware - Multi core

Neste laboratório iremos trabalhar com o uso do multicore da pico. O objetivo é fazer cada **core** da Pico ser responsável por uma parte específica do sistema. A comunicação entre os núcleos será realizada por meio da **FIFO de sincronização** disponibilizada pelo hardware.


::: tip LEITURA

Antes de seguir no laboratório será necessário ler o material:

- [Pico multi core](/guides/pico-core)
:::

## Laboratório

A proposta é expandir o **LAB-3-pra**, distribuindo as responsabilidades da seguinte forma:

1. **Core 0**:  
   - Leitura da UART  
   - Implementação do protocolo de comunicação com o PC  

2. **Core 1**:  
   - Leitura do sensor ultrassônico **HC-SR04**

Conforme ilustrado no diagrama abaixo:

![](imgs-firmware/multi-core.png)

## FIFOs

No diagrama, observe que o `Core 0` e o `Core 1` se comunicam por meio das **FIFOs de sincronização**. Elas serão utilizadas para:

- **Core 0 → Core 1**: envio da frequência de leitura do sensor  
- **Core 1 → Core 0**: envio da distância medida  

::: box-blue Pensar
Alguns problemas que precisam ser resolvidos:

1. Como sinalizar ao `Core 1` que a leitura deve ser interrompida (por exemplo, ao receber o comando `stop`)?
2. Como o `Core 1` deve informar ao `Core 0` que ocorreu um erro na leitura do sensor?
:::

::: box
Lembrem que as FIFOs utilizadas no processador rp2350 são de 32 bits.
:::

## Printfs

Devido às características das funções da biblioteca `stdio` (`printf`, `scanf`, etc.), não é possível utilizá-las simultaneamente em diferentes núcleos, pois **não são [reentrantes](https://pt.wikipedia.org/wiki/Reentr%C3%A2ncia)**.

Por esse motivo, recomenda-se que apenas o `Core 0` seja responsável pelas operações de `printf` e `scanf`.
