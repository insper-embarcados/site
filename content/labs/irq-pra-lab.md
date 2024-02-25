# IRQ - Prática

| Lab 2 - IRQ - Prática                      |
|--------------------------------------------|
| **Deadline**: =={{lab_irq_pra_deadline}}== |
| =={{lab_irq_pra_classroom}}==              |

Nesse laboratório iremos aplicar os conceitos de interrupção de hardware / GPIO (IRQ), como desafio iremos desenvolver um telégrafo digital!

=== "História"
    !!! video
        ![](https://www.youtube.com/watch?v=hIN1wH4iYdg)
=== "Hello world 🤣"
    !!! video
        ![](https://www.youtube.com/watch?v=L6gxfX4GrbI)

Para isso, vocês vão precisar de:

| Bill of Material | Valor   |
|------------------|---------|
| 2x Push buttons  | R$ 0.20 |
| 1x Buzzer        | R$ 2.7  |

O buzzer é um piezo elético capaz de vibrar quando acionado corretamente (leia sobre em [Dispositivos/Buzzer](/site/dispositivos/buzzer)), com ele seremo capazes de gerar o tom necessário para simularmos o telégrafo e podermos reproduzir um código morse:

<figure>
    <figcaption>Hello World</figcaption>
    <audio
        controls
        src="/labs/imgs/lab_irq_pra_morse.wav">
            Your browser does not support the
            <code>audio</code> element.
    </audio>
</figure>

Notem que existem dois tipos de sinal: Curto e Longo, o desafio deste laboratório vai ser identificar esses dois tipos diferentes de informaćão.

![](imgs/lab-irq-pra-morse.png)

## Requisitos 

O seu projeto deve possuir dois botões e um buzzer, cada botão deve reproduzir um tom diferente (indicamos `freq1`, `freq2`), o código deve fazer uso de IRQ  
