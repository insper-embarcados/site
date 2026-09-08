---
tags:
  - pcm
  - pwm
description: Gerando som com PCM
---

# Pulse Code Modulation (PCM)

PCM é um método usado para representarmos um valor analógico em um sistema digital. Muito utilizado
para representar áudio, o PCM é utilizado em diversos dispositivos eletrônicos que precisam reproduzir um
som (de forma simplificada, sem compactação ou criptografia).

A ideia do PCM é muito similar ao do PWM, onde cada valor de uma amostra analógica será representado por
um duty cycle do PWM.

::: info Sites com mais informações

- https://digital-audio.fandom.com/wiki/Pulse-Code_Modulation

:::

## Sistemas Digitais

Precisamos relembrar que um áudio é uma forma de onda analógica. A primeira etapa para digitalizarmos esse sinal
é amostrar o sinal no tempo (`ts`), ou seja, como se tirássemos uma "foto" desse sinal a cada `ts`
segundos. A segunda etapa é "digitalizar" essa foto — ou no termo correto: **quantizar** — que é a etapa em que transformamos
uma informação contínua em amplitude em um valor discreto. Por fim, precisamos **codificar** esse sinal para armazená-lo ou transmiti-lo.

As três etapas do PCM são:

1. **Sampling** (Amostragem)
1. **Quantization** (Quantização)
1. **Encoding** (Codificação)

![](https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Pcm.svg/500px-Pcm.svg.png)

> Ref: Wikipédia — As três etapas do PCM: amostragem, quantização e codificação.

### Frequências e resoluções comuns de áudio

| Aplicação             | Taxa de amostragem | Resolução |
|-----------------------|--------------------|-----------|
| Telefonia             | 8 kHz              | 8 bits    |
| CD de áudio           | 44,1 kHz           | 16 bits   |
| DVD / áudio profissional | 48 kHz          | 24 bits   |
| Estúdio de alta definição | 96 kHz / 192 kHz | 24 bits |

## Sampling

A **amostragem** é o processo de capturar o valor de um sinal analógico em instantes de tempo periódicos, com período de amostragem `Ts` e taxa de amostragem `fs = 1/Ts`.

![](https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Sampling_rates_of_audio_signals.svg/400px-Sampling_rates_of_audio_signals.svg.png)

> Ref: Wikipédia

O resultado é uma sequência de amostras do sinal original, espaçadas de `Ts` segundos.

::: warning Teorema de Nyquist-Shannon

Para que o sinal original possa ser reconstruído sem perdas (sem *aliasing*), a taxa de amostragem `fs`
deve ser **pelo menos o dobro** da maior frequência presente no sinal:

$$f_s \geq 2 \cdot f_{max}$$

Por exemplo, o ouvido humano percebe frequências de até ~20 kHz. Por isso, o CD usa `44,1 kHz` —
superior ao mínimo de 40 kHz exigido pelo teorema.

Se a taxa de amostragem for insuficiente, ocorre o **aliasing**: frequências altas do sinal original
são "dobradas" sobre frequências mais baixas, gerando distorções impossíveis de corrigir após a captura.

:::

## Quantization

A **quantização** é o processo de mapear cada amostra contínua em amplitude para um valor discreto dentro de um conjunto finito de níveis.

Se usarmos `n` bits para representar cada amostra, teremos `2^n` níveis possíveis. Para um sinal que varia de `0 V` a `3,3 V` com 8 bits:

$$\Delta = \frac{3{,}3\,V}{2^8} = \frac{3{,}3}{256} \approx 12{,}9\,mV$$

Esse valor `Δ` é chamado de **passo de quantização** (LSB — Least Significant Bit). Qualquer valor analógico dentro de uma faixa `Δ` será mapeado para o mesmo valor digital — isso é o **erro de quantização**, inerente ao processo.

![](https://www.allaboutcircuits.com/uploads/articles/quantisation.png)

> Ref: [allaboutcircuits.com](https://www.allaboutcircuits.com/technical-articles/understanding-analog-to-digital-converters-deciphering-resolution-and-sampl/)

::: tip Mais bits = menos ruído

Aumentar a resolução reduz o erro de quantização. Cada bit adicional divide o passo pela metade,
melhorando a relação sinal-ruído (SNR) em aproximadamente **6 dB por bit**.

| Resolução | Níveis   | SNR aproximado |
|-----------|----------|----------------|
| 8 bits    | 256      | ~48 dB         |
| 16 bits   | 65.536   | ~96 dB         |
| 24 bits   | 16.777.216 | ~144 dB      |

:::

## Encoding

A **codificação** é a etapa de representar cada valor quantizado como uma sequência de bits.

Em PCM linear (o mais comum), o valor de cada amostra é simplesmente convertido para sua representação binária de `n` bits. Uma amostra de valor `127` com 8 bits é codificada como `01111111`.

O resultado final é um fluxo de bits: para áudio CD mono (44.100 amostras/s × 16 bits/amostra), a taxa de dados bruta é:

$$44.100 \times 16 = 705.600\,\text{bits/s} \approx 705\,\text{kbps}$$

Para estéreo, esse valor dobra: **~1,41 Mbps**.

### Formato WAV

O formato **WAV** (Waveform Audio File Format) é o contêiner mais comum para armazenar áudio PCM sem compressão. Um arquivo WAV é composto por:

- Um cabeçalho RIFF com metadados (taxa de amostragem, número de canais, bits por amostra)
- Os dados PCM brutos em sequência

```
[RIFF header] [fmt  chunk] [data chunk: amostra0 | amostra1 | amostra2 | ...]
```

## PWM

Para reproduzir o áudio PCM em um microcontrolador **sem DAC**, utilizamos o **PWM** como conversor digital-analógico improvisado.

A ideia é simples: cada amostra PCM de `n` bits define um **duty cycle** do PWM. Uma amostra de valor `128` em 8 bits (50% do valor máximo de `255`) gera um duty cycle de 50%.

$$\text{duty cycle} = \frac{\text{amostra}}{2^n - 1} \times 100\%$$

O sinal PWM alterna rapidamente entre 0 e 1. Ao passar por um **filtro passa-baixas**, os componentes de alta frequência (a portadora do PWM) são atenuados, e o que resta é a componente de baixa frequência — o sinal analógico reconstruído.

::: warning Frequência do PWM

A frequência da portadora do PWM deve ser **muito maior** que a maior frequência do áudio. Para áudio de 20 kHz, o PWM deve operar a centenas de kHz. Se a frequência do PWM for baixa, ela cai dentro da faixa audível e será ouvida como um chiado.

:::

## Conectando tudo

O pipeline completo para reprodução de áudio PCM em um microcontrolador é:

```
Arquivo WAV
    │
    ▼
Leitura das amostras PCM (ex: 44100 amostras/s, 16 bits)
    │
    ▼
Conversão da amostra → Duty Cycle do PWM
    │
    ▼
Sinal PWM no pino do GPIO  (sinal digital: pulsos 0/1)
    │
    ▼
Filtro passa-baixas RC  (remove portadora do PWM)
    │
    ▼
Sinal analógico reconstruído
    │
    ▼
Amplificador de áudio
    │
    ▼
Alto-falante / Speaker
```

### Timing crítico

Para que o áudio soe corretamente, cada amostra PCM deve ser entregue ao PWM no intervalo exato de `Ts = 1/fs`. Um atraso ou jitter nessa entrega gera distorções audíveis.

Em microcontroladores, isso é feito tipicamente com:

- **Timer + interrupção**: a cada `Ts`, a ISR lê a próxima amostra e atualiza o duty cycle do PWM.
- **DMA**: o DMA alimenta automaticamente o periférico PWM a partir de um buffer em memória, sem intervenção da CPU.

## Problemas

### Aliasing (Nyquist)

Se a taxa de amostragem for inferior ao dobro da frequência máxima do sinal, ocorre **aliasing**: frequências altas "dobram" sobre frequências baixas e aparecem como ruído ou tons indesejados no áudio reconstruído.

A solução é sempre garantir `fs ≥ 2 × fmax` **e** aplicar um **filtro anti-aliasing** analógico antes da conversão ADC para eliminar as frequências acima de `fs/2`.

### Erro de Quantização Linear

Na quantização linear, o erro de quantização (diferença entre o valor real e o valor quantizado) é uniforme em toda a faixa do sinal. Isso é um problema para sinais de baixa amplitude, pois o erro representa uma fração maior do sinal.

Uma solução clássica é a **quantização não-linear** (como a lei µ usada em telefonia), que aplica mais níveis para amplitudes baixas e menos para amplitudes altas, melhorando a qualidade percebida do áudio sem aumentar o número de bits.
