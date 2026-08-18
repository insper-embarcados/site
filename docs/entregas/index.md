# Sobre

## Infra

O curso pode ser realizado em qualquer sistema operacional e em x86 ou ARM. Você deve ter o vscode instalado e deve instalar as seguintes extensões:

- [Raspberry Pi Pico](https://marketplace.visualstudio.com/items?itemName=raspberry-pi.raspberry-pi-pico)
- [Wokwi Simulator](https://marketplace.visualstudio.com/items?itemName=Wokwi.wokwi-vscode)

Para podermos utilizar o wokwi, cada aluno precisa registrar criar uma conta gratuíta na plataforma https://wokwi.com/ .

A disciplina faz uso de um sistema de verificação automática integrado ao GitHub, que envolve diferentes frentes:

![](imgs/checks.png)

1. Verificação se o projeto compila
2. Teste de funcionalidade do código (apenas para os pré-labs e prova)
3. Verificação de qualidade de código, com dois verificadores:
   - **cppcheck**: qualidade de código na linguagem C
   - **embedded-check**: qualidade de código para sistemas embarcados

O sistema está totalmente integrado ao GitHub e utiliza o Github Actions para realizar os testes. 

## Entregas

No curso temos 3 categorias de entregas:

- Labs Preparatório (individual)
- Labs Prática (individual)
- APS (dupla)

::: box-red
As entregas possuem datas fixas. A entrega em atraso implica penalização automática de 60% por até uma semana; após esse prazo, a atividade deixa de ter valor para nota.

Os prazos estão fixados no PrairieLearn.
:::

### Labs Preparatório

A disciplina utilizará atividades preparatórias que ajudarão vocês no desenvolvimento dos laboratórios. Essas atividades devem ser realizadas no VSCode e não necessitam do uso da placa de desenvolvimento. O objetivo é desacoplar um pouco os elementos: com o simulador, é possível praticar apenas o código e alguns aspectos da conexão de hardware, sem a complexidade de montar os componentes eletrônicos.

![](imgs/labs.png){width=400}

Esta entrega possui verificação automática. Para validar a entrega, envie o código para o seu repositório no GitHub e verifique o resultado do Actions. O sistema verifica:

- Se o código compila.
- Teste de unidade em cada código (se funciona).
- Análise da qualidade de código:
    - cppcheck *(erros básicos de linguagem C)*
    - embedded-check *(erros conceituais de sistemas embarcados)*

Vocês devem obter o seguinte resultado no Actions:

![](/sobre/imgs/lab_pre_actions.png)


### Labs Práticos

Já as atividades de laboratório prático demandam que vocês utilizem a placa física e apliquem o que aprenderam no ambiente virtual em uma aplicação real.

No curso iremos usar o [debug-probe](https://www.raspberrypi.com/documentation/microcontrollers/debug-probe.html), um dispositivo criado para podermos gravar, depurar e ter acesso à saída UART da Raspberry Pi Pico. Para usar o debug probe, faça conexão como indicado a seguir:

:::tabs
== tab Montagem
![](/guides/pico-imgs/pico-probe.png){width=400}
== tab Imagem
![](/guides/pico-imgs/pico-probe-real.jpeg)
:::

> Note a necessidade de dois cabos USB!

### APS

Ao todo, são duas APS. Elas se diferenciam dos laboratórios por serem mais complexas, realizadas em duplas e por envolverem design e criação de protótipos. São elas:

1. Jogo Genius
2. Desenvolvimento de um controle Bluetooth para um jogo

## Horários 

Consulte os **horários disponíveis** para apresentar as entregas práticas:

::: box

|        Horário         |     Segunda&#8209;feira     |      Terça&#8209;feira      |     Quarta&#8209;feira      |     Quinta&#8209;feira      |      Sexta&#8209;feira      |
|:----------------------:|:---------------------------:|:---------------------------:|:---------------------------:|:---------------------------:|:---------------------------:|
| **07:30<br>~<br>09:30** |                            |                             |                             |                             |                             |
| **09:45<br>~<br>11:45** |       Marco<br>**(Arq)**   |       Marco<br>**(Arq)**    |       Marco<br>**(Arq)**    |       Marco<br>**(Arq)**    |                             |
| **14:15<br>~<br>16:15** |                            |                             |                             |      Daniel<br>**(Ágil)**   |                             |
| **16:30<br>~<br>18:30** |                            |       Marco<br>**(Arq)**    |                             |       Corsi<br>**(Arq)**    |      Daniel<br>**(Ágil)**   |
| **19:00<br>~<br>21:00** |      Daniel<br>**(Ágil)**  |      Daniel<br>**(Ágil)**   |      Daniel<br>**(Ágil)**   |      Daniel<br>**(Ágil)**   |      Daniel<br>**(Ágil)**   |

- (Arq): Laboratório Arquitetura de Computadores
- (Ágil): Laboratório Ágil 2
:::


