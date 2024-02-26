# IRQ - Prática

| Lab 2 - IRQ - Prática                       |
|---------------------------------------------|
| **Prazo**: =={{lab_irq_pra_deadline}}==     |
| =={{lab_irq_pra_classroom}}==               |

Neste laboratório, vamos aplicar os conceitos de interrupção de hardware / GPIO (IRQ). Como desafio, desenvolveremos um telégrafo digital!

=== "História"
    !!! video
        ![](https://www.youtube.com/watch?v=hIN1wH4iYdg)
=== "Hello world 🤣"
    !!! video
        ![](https://www.youtube.com/watch?v=L6gxfX4GrbI)

Para isso, vocês precisarão de:

| Lista de Materiais   | Valor   |
|----------------------|---------|
| 2x Botões de pressão | R$ 0,20 |
| 1x Buzzer            | R$ 2,70 |

O buzzer é um piezoelétrico capaz de vibrar quando acionado corretamente (leia sobre em [Dispositivos/Buzzer](/site/dispositivos/buzzer)). Com ele, seremos capazes de gerar o tom necessário para simular o telégrafo e reproduzir um código morse:

<figure>
    <figcaption>Hello World</figcaption>
    <audio
        controls
        src="/labs/imgs/lab_irq_pra_morse.wav">
            Seu navegador não suporta o elemento
            <code>audio</code>.
    </audio>
</figure>

Note que existem dois tipos de sinal: Curto e Longo. O desafio deste laboratório será gerarmos automaticamente esses dois tons.

![](imgs/lab-irq-pra-morse.png)

## Requisitos

Seu projeto deve possuir dois botões (`btn1` e `btn2`) e um buzzer. Cada botão deve reproduzir um tom diferente (indicamos `freq1`, `freq2`). O código deve fazer uso de IRQ para leitura dos botões. O `btn1` deve reproduzir `freq1` por um determinado tempo, e o `btn2` deve reproduzir `freq2` pelo triplo do tempo do outro botão.
