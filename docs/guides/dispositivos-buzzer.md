# Buzzer

Músicas monofonicas[^1] são aquelas que só possuem uma única nota tocada por vez, como indicado na partitura a seguir:

![](https://upload.wikimedia.org/wikipedia/commons/4/4a/Pop_Goes_the_Weasel_updated.png){width=400}

> ref: wikipidia

[^1]:  https://en.wikipedia.org/wiki/Monophony

A música monofonica tem o som como a seguir:

<figure>
    <figcaption>Pop Goes the Weasel.ogg (wiki)</figcaption>
    <audio
        controls
        src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Pop_Goes_the_Weasel.ogg">
            Your browser does not support the
            <code>audio</code> element.
    </audio>
</figure>

Esse tipo de música foi muito utilizada nos primeiros videogames, quando a sintetização de músicas ainda estava no começo.  Veja como era feito nos Nintendo, aqui já era possível gerar mais de um tom por vez:


<YouTube id="jvIzIAgRWV0"/>

## Buzzer

Para gerarmos o som é necessário termos algum dispositivo capaz de gerar movimentação no ar, o buzzer é um dispositivo simples que a partir de uma bobina (controlada por um terminal) conseguimos movimentar um disco que por sua vez movimentar o ar. Os buzzers podem ser de duas categorias (piezoelétricos):

- **Ativo:** basta energizar o terminal que o dispositivo vibra automaticamente em uma determinada frequência, muito usado para alarmes.
- **Passivo:** Um circuito externo (ou microcontrolador) deve gerar a frequência de vibração, usado para gerar som.

Buzzers são diferentes de altofalantes[^2] em vários aspectos (mecânico, eletromecânico): não necessitam de tensão negativa; possuem um espectro de operação menor; baixa resistência; baixa potência ... .

A conexão do buzzer com um microcontrolador se da por dois pinos: Um conectado no terra (gnd) e outro conectado
em um pino que o microcontrolador possui controle, conforme ilustração a seguir:

![image](https://user-images.githubusercontent.com/1039615/109496798-e660e380-7a6f-11eb-831d-604cce45f5f6.png){width=500}

[^2]: https://en.wikipedia.org/wiki/Loudspeaker

<iframe width="560" height="315" src="https://www.youtube.com/embed/77h1JhD9Syw" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Gerando som

Podemos fazer com que o buzzer oscile em uma determinada frequência, para isso basta gerarmos um sinal de onda quadrada  no terminal positivo do dispositivo, isso irá fazer com que o piezo movimente na mesma frequência, gerando o tom desejado.

::: tip Notas
As notas musicais são definidas pela frequência principal que elas emitem, um Dó-4 é definido por 262 Hz, um Lá-4 por 440Hz e assim por diante (o 4 se refere ao meio do piano). Além da frequência principal, cada instrumento musical emite outras frequências que compõem o som, gerando um som único para cada instrumento.

Iremos usar a notacao americana para as notas:

| Dó | Ré | Mi | Fá | Sol | Lá | Sí |
|----|----|----|----|-----|----|----|
| C  | D  | E  | F  | G   | A  | B  |

![](https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Frequency_vs_name.svg/350px-Frequency_vs_name.svg.png)

> https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Frequency_vs_name.svg/350px-Frequency_vs_name.svg.png Wikipidia 
:::


::: info Frequências
Lembre que uma onda quadrada pode ser decomposta em infinitas senoides pela transformada de Fourier. 

![](https://mathworld.wolfram.com/images/eps-svg/FourierSeriesSquareWave_800.svg)

Sendo a componente principal (de maior energia) centrada na frequência da onda quadrada. Portanto o som que iremos escutar será composto da frequência principal mais as harmónicas.

<YouTube id="3IAMpH4xF9Q"/>

> https://mathworld.wolfram.com/images/eps-gif/FourierSeriesSquareWave_800.gif
:::


Existem diversas maneiras de gerarmos uma onda quadrada em um pino do microcontrolador, a que estamos sugerindo aqui não envolve nenhum periférico específico do microcontrolador, logo iremos fazer tudo por código.

## Gerando a frequência

Para gerar uma onda quadrada da nota Dó (**261.63** Hz) precisamos calcular seu período e definir o tempo em que a mesma ficará em nível lógico alto e baixo (0 e 1):

T = 1 ÷ **261,63**

T = 0,0038s

Na **Pico W**, programando em C, geralmente utilizamos a função **sleep_ms** para gerar atraso no código, precisamos então converter esse valor para **milissegundos** ( dividir por 1000) e também dividr por 2 e gerar os respectivos atrasos nos níveis lógico:

delay = (0,0038 x 1000 ) ÷ 2

delay ≃ **1,9** ms


```c
while(1){
    gpio_put(PIN_BUZZER, 1);
    sleep_ms(1,9);
    gpio_put(PIN_BUZZER, 0);
    sleep_ms(1,9);
}
```

::: warning sleep_us
Como podemos observar, utilizando **sleep_ms** temos um limite de frequência das notas músicais que podemos alcançar, por 2 motivos:

1. Essa função é do tipo int, ou seja, dependendo do valor do delay  a parte fracionária será perdida, mantendo somente a parte inteira;	
2. Para frequências acima de 506Hz, o delay utilizado no *sleep_ms* começa a receber valores **abaixo** de 1, fazendo com que seja necessário a utilização da função da **sleep_us** no lugar da *sleep_ms*.
:::

::: tip
**OBS:** Não esquecer de alterar a escala de ms para us: `0,000001s = 0,001ms = 1us`
:::

​	
Para o mesmo exemplo com a nota Dó (**261.63** Hz), utlizando **sleep_us**, ficaria:	
```c
while(1){
    gpio_put(PIN_BUZZER, 1);
    sleep_us(1900);
    gpio_put(PIN_BUZZER, 0);
    sleep_us(1900);
}
```

## Controlando a duração

Agora que sabemos como gerar a frequência, precisamos entender como controlamos a duração da mesma.

Por exemplo, para tocar a nota Dó (**261.63** Hz) por 2 segundos (2.000.000us), sabendo que o período total é de 3800us, precisamos definir quantas vezes é preciso repetir esse ciclo, basta dividir o tempo desejado pela duração de cada ciclo:

```
2.000.000 ÷ 3800 ≃ 526 vezes
```

Ou seja, precisamos repetir esse periodo 526 vezes, logo:

```c
for(int i = 0; i < 526 ; i++){
    gpio_put(PIN_BUZZER, 1);
    sleep_us(1900);
    gpio_put(PIN_BUZZER, 0);
    sleep_us(1900);
}
```

## Música

Eu fiz por anos aula de sax alto e meu professor falava que para começar a tocar uma música bastava: `tocar a nota certa no momento certo e não tocar quando não for para tocar`, para quem tem prática é fácil, mas para mim não era. Trouxe este assunto para explicar um pouco como iremos reproduzir uma música. Cada música será formada por notas (frequências), pela duração da nota e por um silêncio entre notas (que também tem duração ). Toda essa informação está presente na [partitura]( https://www.musicnotes.com/now/tips/how-to-read-sheet-music/).

Portanto para reproduzirmos uma música teremos que para cada intervalo de tempo:

1. Reproduzir uma nota (gerar a frequência da nota no pino do buzzer) ou não tocar nada (pausa)
1. Manter a nota/pausa pelo tempo determinado
1. Ir para o próximo intervalo de tempo
