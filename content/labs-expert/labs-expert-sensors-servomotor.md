# Expert - PPM - Servomotor

| Lab Expert - PPM - Servomotor                                |
| ------------------------------------------------------------ |
| **Deadline**: {{lab_expert_1_deadline}}                |
| [Repositório no classroom]({{lab_expert_1_classroom}}) |
| 💰 100% nota de laboratório                                   |

Neste laboratório, iremos criar um sistema capaz de ajustar a posição de um servomotor através da seleção de diferentes sensores!

## Lab

Sistema embarcados são responsáveis por ler e controlar o mundo externo e fazer isso é muitas vezes desafiador pois precisamos usar sensores e atuadores externos, esses dispositivos possuem diferentes interfaces e características distintas. Nessa série de laboratórios da especialidade de sensores e atuadores iremos explorar um pouco esse vasto mundo e fornecer ferramentas a vocês para facilitar esse processo.  

### Servomotor

Uma de controlarmos posição de um objeto é utilizando um motor chamado de `servomotor`, ele diferente do motor de passo, recebe como entrada a posição e automaticamente (ele possui uma malha fechada interna), faz com que o rotor vá direto para a posição definida. Servo motores são muitos utilizados, podemos listar alguns exemplos:

- Controle da direção de um carrinho de controle remoto
- Posicionadores robóticos
- Posicionamento de câmeras
- Fechaduras automáticas

Nesse laboratório vocês irão criar um sistema (DIVERTIDO) usando dois servomotores e dois sensores analógicos. 

![](https://m.media-amazon.com/images/I/61zmykS365L._AC_SL1500_.jpg){width=400px}

Para entender como o servo motor funciona, consulte o material no site da disiplina:

- [Dispositivos/Servomotor](/site/dispositivos/servo)

### Sensores e sensores e mais sensores

Você deve escolher dois sensores do listados a seguir, todos irão gerar uma variação da tensão dado uma grandeza externa. Para uma lista dos sesnores disponíveis, consulte o site disciplina:

- [Dispositivos/Analogicos](/site/dispositivos/analogicos)

## Entrega

Você deverá efetuar uma montagem mecânica utilizando no mínimo 2 servomotores, a sugestão é que você replique o mecanismo Pan-Tilt conforme o projeto do link abaixo:

https://www.thingiverse.com/thing:708819



O controle desse mecanismo deverá ser feito utilizando no mínimo 2 dos sensores apresentados:

- [LDR](https://insper-embarcados.github.io/site/dispositivos/analogicos/#ldr)
- [Termistor NTC](https://insper-embarcados.github.io/site/dispositivos/analogicos/#termistor-ntc)
- [Strain gauge](https://insper-embarcados.github.io/site/dispositivos/analogicos/#strain-gauge)
- [SHARP](https://insper-embarcados.github.io/site/dispositivos/analogicos/#sharp)



Existem outros projetos utilizando 2 servomotores, disponíveis no próprio [Thingiverse](https://www.thingiverse.com/):

https://www.thingiverse.com/search?q=servo+pan+tilt&page=1



**Requisitos:**

1. Possuir no mínimo dois servos
1. Implementar o sistema com RTOS.
2. Cada um dos sensores deverá estar ligado a um pino ADC diferente.
3. Controlar mecanicamente algum objeto, com um objetivo.

**Dicas:**

1. Monte a parte mecânica.
1. Faça o servomotor funcionar, utilize dois potenciômetros como controle da posição;
1. Substitua os potenciômetros pelos sensores listados;
