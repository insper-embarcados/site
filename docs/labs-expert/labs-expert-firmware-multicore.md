# Expert - firmware - Multi core

Neste laboratório iremos trabalhar com o uso do multicore da pico. O objetivo é fazer cada **core** da Pico ser responsável por uma parte específica do sistema. A comunicação entre os núcleos será realizada por meio da **FIFO de sincronização** disponibilizada pelo hardware.

::: tip LEITURA

Antes de seguir no laboratório será necessário ler o material:

- [Pico multi core](/guides/pico-core)
- [Métricas bare-metal multicore](/guides/metricas-baremetal)
:::

## Laboratório

A proposta é expandir o **LAB-3-pra**, distribuindo as responsabilidades nos múltiplos cores da seguinte forma:

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

## Medindo

Instrumente o firmware com um GPIO para cada core, conforme explicado no guia de [métricas bare-metal multicore](/guides/metricas-baremetal):

- **Core 0**: mantenha o GPIO em nível alto enquanto o core processa um comando da UART. Mantenha-o em nível baixo enquanto aguarda um novo comando.
- **Core 1**: mantenha o GPIO em nível alto durante a leitura do HC-SR04 e o envio da medida pela FIFO. Mantenha-o em nível baixo enquanto aguarda a próxima leitura.

Com um osciloscópio ou analisador lógico, meça durante o mesmo intervalo de tempo:

1. A **utilização de cada core**, calculando o percentual de tempo em que seu GPIO permaneceu em nível alto.
2. O **WCET observado de cada core**, encontrando o pulso mais longo de cada sinal.
3. O **desbalanceamento de carga**, calculando a diferença absoluta entre as utilizações dos cores: $D = |U_0 - U_1|$.

Repita as medições usando diferentes frequências de leitura do sensor e compare os resultados, adicione no README.md do seu repositório a análise realizada.
