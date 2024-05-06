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

Você deve entregar um sistema que possui dois servos motores e dois sensores analógicos (listados a seguir), onde cada um irá ajustar a posição de um servomotor diferente. Por sua vez, o movimento do motor terá que influenciar mecanicamente um objeto, como alguns exemplos abaixo:

1. [Tutorial - Robô de Papel](https://labdegaragem.com/profiles/blogs/tutorial-robo-de-papel-faca-o-seu-garabot-controlado-por-ir)
2. [Robotic Eyebrows](http://www.pyroelectro.com/tutorials/robotic_eyebrows/)
3. [Arduino-Controlled Robotic Hand](https://www.youtube.com/watch?v=QH8MPCCrpbg)

**Requisitos:**

1. Possuir no mínimo dois servos
1. Implementar o sistema com RTOS.
2. Cada um dos sensores deverá estar ligado a um pino ADC diferente.
3. Controlar mecanicamente algum objeto, com um objetivo.

Dicas:

1. Primeiro faća o servomotor funcionar, utilize dois potenciometros como controle da posição
1. Substitua os potenciometros pelos sensores listados a seguir
1. Monte a parte mecânica.
