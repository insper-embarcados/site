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

<iframe width="520" height="320" src="https://www.youtube.com/embed/jvIzIAgRWV0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

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

!!! tip "Notas"
    As notas musicais são definidas pela frequência principal que elas emitem, um Dó-4 é definido por 262 Hz, um Lá-4 por 440Hz e assim por diante (o 4 se refere ao meio do piano). Além da frequência principal, cada instrumento musical emite outras frequências que compõem o som, gerando um som único para cada instrumento.
    
    Iremos usar a notacao americana para as notas:
    
    | Dó | Ré | Mi | Fá | Sol | Lá | Sí |
    |----|----|----|----|-----|----|----|
    | C  | D  | E  | F  | G   | A  | B  |
    
    ![](https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Frequency_vs_name.svg/350px-Frequency_vs_name.svg.png)
    
    > Ref: https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Frequency_vs_name.svg/350px-Frequency_vs_name.svg.png Wikipidia 

!!! info "Frequências"
    Lembre que uma onda quadrada pode ser decomposta em infinitas senoides pela transformada de Fourier. 
    
    ![](https://mathworld.wolfram.com/images/eps-gif/FourierSeriesSquareWave_800.gif){width=300}
    
    Sendo a componente principal (de maior energia) centrada na frequência da onda quadrada (no nosso caso):
    
    ![](https://mathworld.wolfram.com/images/equations/FourierSeriesSquareWave/NumberedEquation3.gif)
    
    Portanto o som que iremos escutar será composto da frequência principal mais as harmónicas.
    
    > ref: https://mathworld.wolfram.com/images/eps-gif/FourierSeriesSquareWave_800.gif
    
    <iframe width="560" height="315" src="https://www.youtube.com/embed/3IAMpH4xF9Q" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Existem diversas maneiras de gerarmos uma onda quadrada em um pino do microcontrolador, a que estamos sugerindo aqui não envolve nenhum periférico específico do microcontrolador, logo iremos fazer tudo por código.

Por exemplo, para gerar uma onda quadrada de 1000 Hz:
    
```c
while(1){
    gpio_put(PIN_BUZZER, 1);
    sleep_us(500);
    gpio_put(PIN_BUZZER, 0);
    sleep_us(500);
}
```

## Música

Eu fiz por anos aula de sax alto e meu professor falava que para começar a tocar uma música bastava: `tocar a nota certa no momento certo e não tocar quando não for para tocar`, para quem tem prática é fácil, mas para mim não era. Trouxe este assunto para explicar um pouco como iremos reproduzir uma música. Cada música será formada por notas (frequências), pela duração da nota e por um silêncio entre notas (que também tem duração ). Toda essa informação está presente na partitura:

![](https://cdn.statically.io/img/www.musicnotes.com/now/wp-content/uploads/2018/02/4.png?quality=80&f=auto)

> ref: https://www.musicnotes.com/now/tips/how-to-read-sheet-music/

Portanto para reproduzirmos uma música teremos que para cada intervalo de tempo:

1. Reproduzir uma nota (gerar a frequência da nota no pino do buzzer) ou não tocar nada (pausa)
1. Manter a nota/pausa pelo tempo determinado
1. Ir para o próximo intervalo de tempo
