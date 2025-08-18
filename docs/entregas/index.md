# Sobre

## Infra

O curso pode ser realizado em qualquer sistema operacional e em x86 ou ARM. Você deve ter o vscode instalado e deve instalar as seguintes extensões:

- [Raspberry Pi Pico](https://marketplace.visualstudio.com/items?itemName=raspberry-pi.raspberry-pi-pico)
- [Wokwi Simulator](https://marketplace.visualstudio.com/items?itemName=Wokwi.wokwi-vscode)

Para podermos utilizar o wokwi, cada aluno precisa registrar criar uma conta gratuíta na plataforma https://wokwi.com/ .  

## Entregas

No curso temos 4 categorias de entregas:

- Labs Core: Individual
- Labs Expert: Individual
- APS: Dupla
- Projeto: Trio

### Labs Core

A disciplina utilizará atividades preparatórias que ajudarão vocês no desenvolvimento dos laboratórios. Essas atividades devem ser realizadas no VSCode e não necessitam do uso da placa de desenvolvimento. O objetivo é desacoplar um pouco os elementos: com o simulador, é possível praticar apenas o código e alguns aspectos da conexão de hardware, sem a complexidade de montar os componentes eletrônicos.

Já as atividades de laboratório prático demandam que vocês utilizem a placa física e apliquem o que aprenderam no ambiente virtual em uma aplicação real.

![](imgs/labs.png){width=400}

### Labs Expert

Cada aluno vai trilhar uma especialidade diferente, podendo escolher entre: 

- **Comunicação**: Aprender a utilizar outras formas de comunicação entre o uC e outro dispositivo.
- **Processamento Digital de Sinais (DSP)**: Focada em como adquirir, tratar e processar sinais em sistemas embarcados, essa trilha avança até a aplicação de Inteligência Artificial.
- **Sensores e Atuadores**: Esta trilha aprofunda a compreensão sobre como podemos detectar e controlar o mundo físico usando módulos. Frequentemente, esses módulos requerem o uso de protocolos machine-to-machine (M2M), como I2C, SPI, entre outros.
- **Firmware**: Uma das principais preocupações em sistemas embarcados são os requisitos energéticos, segurança e confiabilidade. Esta trilha se dedica a aprofundar o entendimento sobre como desenvolver códigos eficientes.

> As trilhas foram criadas com base na experiência da equipe e também utilizando como referência informações disponíveis sobre o desenvolvimento de produtos com sistemas embarcados.

### APS

Ao todo, são duas APS. Elas se diferenciam dos laboratórios por serem mais complexas, realizadas em duplas e por envolverem design e criação de protótipos. São elas:

1. Jogo Genius
2. Desenvolvimento de um controle Bluetooth para um jogo

::: highlight
Mais informações em breve...
:::

### Projeto

No curso, temos um único projeto, que é de escopo aberto. 

::: highlight
Mais informações em breve...
:::

## Sistema de Verificação Automática

![](imgs/checks.png)

A disciplina faz uso de um sistema de verificação automática integrado ao GitHub, que envolve diferentes frentes:

1. Verificação se o projeto compila
2. Teste de funcionalidade do código (apenas para os pré-labs e prova)
3. Verificação de qualidade de código, com dois verificadores:
   - **cppcheck**: qualidade de código na linguagem C
   - **embedded-check**: qualidade de código para sistemas embarcados

O sistema está totalmente integrado ao GitHub e utiliza o Github Actions para realizar os testes. 
