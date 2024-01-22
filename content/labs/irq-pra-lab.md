# IRQ - Prática

| Lab 2 - IRQ - Prática                          |
|-------------------------------------------------|
| **Deadline**: =={{lab_irq_pra_deadline}}==      |
| =={{lab_irq_pra_classroom}}==                   |

Nesse laboratório iremos aplicar os conceitos de interrupç  ão de hardware (GPIO)

![](https://m.media-amazon.com/images/I/61fvkXeIMqL._AC_SL1500_.jpg){width=400}

| Bill of material
Para isso, vocês vão precisar de:

- Motor de passo: Será utilizado para "trancar" e "destrancar" a porta.
- Quatro botões: Funcionarão como nosso teclado!
- Dois LEDs: Porque se não acender, não tem graça!
    - Um vermelho e um Verde.

## Mínimo - C

É esperado que a nossa fechadura eletrônica possua uma senha de 6 dígitos envolvendo todos os botões (escolha a senha que preferir) e que a porta destranque quando a combinação for acertada, neste caso o LED verde deve acender. Para trancar a porta, qualquer dois botões devem ser apertados simultâneamente. Se a senha for digitada errada o LED vermelho deve acender por um tempo e depois apagar.

!!! info 
    Trancar e destrancar a porta significa rotacionar o motor de passo em exatos `90º`.

### Pontos extras 

- (`+1.0 conceito`) Permitir atualizar a senha.
- (`+1.0 conceito`) Tocar um som quando errar a senha (use um buzzer!).
- (`+0.5 conceito`) Se a senha for errada duas vezes, bloquear por um tempo maior (cooldown).
- (`+0.5 conceito`) Adicionar mais dois botões.
