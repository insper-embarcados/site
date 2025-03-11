# Timer - Prática

| Lab 3 - Timer - Prática                               |
|-------------------------------------------------------|
| **Prazo**: =={{lab_timer_pra_deadline}}==               |
| [Repositório no classroom]({{lab_timer_pra_classroom}}) |
| 💰 70% nota de lab                                    |

Neste laboratório, aplicaremos os conceitos de timer para realizarmos a leitura de um sensor de distância e criarmos um dataloger.

!!! info "HC-SR04"
    !!! video
        ![](https://www.youtube.com/watch?v=QOc4vgqFXS0)

Para isso, vocês precisarão de:

| Lista de Materiais | Valor   |
|--------------------|---------|
| 1x HC-SR04         | R$ 14,00 |

## Requisitos

O sistema deve fazer a interface com o módulo de ultrasom, fazer a leitura de forma periódica e enviar os valores pela UART. Além disso, o sistema deve poder ser configurado via um terminal.

### HC-SR04

==O sensor opera com tensão de 5v, mas nossa placa trabalha com 3v3== por conta disso será necessário:

1. Ligar o HC-SR04 no 5V (==VBUS==)
1. Fazer um divisor resistivo no pino do `ECHO`
1. Trigger não precisa fazer nada!

=== "Divisor resistivo"

    - `Pin X`: `Echo` liga na RP2040!
    - `Pin Y`: `Triger` liga na RP2040!
    ![](https://insper.github.io/ComputacaoEmbarcada/navigation/Labs/Lab_RTOS_HCSR04/montagem.svg){width=700}

=== "Protoboard"
    ![](https://insper.github.io/ComputacaoEmbarcada/navigation/Labs/Lab_RTOS_HCSR04/proto.jpg)

!!! warning "No pullup"
    O HC-SR04 é um sensor ativo, não devemos ativar o `pullup` no pino do ECHO! 

### Trigger

Se o sistema ativado, vocês devem gerar um pulso no pino trigger (pesquisa o tempo do pulso), isso vai fazer com que o sensor comece a leitura. 

### Echo

Para detectar quanto tempo o pino do `echo` ficou em `1`, configure uma IRS de subida e descida no GPIO que está conectado o pino. Utilize a API de tempo absoluto para calcular o DT entre a subida e a descida do pino. 

#### Falha

O sensor não é perfeito e muitas vezes falha, por isso você deve implementar um mecanismo de deteccão de falhas, ele deve funcionar detectando quando o `echo` não fica por um tempo em `1`. Para isso utilize um alarme de timer como indicado a seguir:

=== "Leitura correta"
    ![](imgs/lab-timer-pra-1.png)
=== "Leitura com erro"
    E a imagem a seguir ilustra uma falha no sensor, nesse caso o alarme estoura e o sistema fornece uma mensagem de erro.

    ![](imgs/lab-timer-pra-2.png)

### Terminal

O usuário deve ser capaz de controlar algumas opções do sistema pelo terminal:

- `Start`: Inicializa a leitura
- `Stop`: Para a leitura

Em modo start o sistema deve produzir um log no terminal com a hora, minuto e segundo (usar o RTC para isso) que a leitura foi realizada e o valor da distância:

```
22:10:01 - 100 cm
22:10:02 -  89 cm
22:10:03 -  70 cm
22:10:04 -  50 cm
....
23:03:01 - Falha
```

### Resultado

A seguir o resultado esperado desse lab.

!!! video
    ![](https://www.youtube.com/watch?v=Qf8_zQEEllA)

### Dicas

A seguir algumas dicas de como fazer, você pode ou não seguir:

1. Comece pela leitura do sensor (imprima o resultado na serial).
    - Para cancelar um alarme use `cancel_alarm(alarm);`
1. Implemente a detecção de falha.
    - Para testar basta desconectar qualquer fio do sensor!
1. Adicione o RTC (atualize o print).
    - Você deve incluir o RTC no projeto, para isso consulte a página do RTC (configurando `cmake`)
1. Implemente a parte de leitura da serial.

- Para ler dado da serial/terminal sem que o programa fique travado para sempre esperando um dado.

```c
// Return a character from stdin if
// there is one available within a timeout. 
int caracter = getchar_timeout_us (uint32_t timeout_us)
```

- [Documentaćão - API ](https://www.raspberrypi.com/documentation/pico-sdk/runtime.html#ga9b10b3bc1a4750fcb0e691566bc868e8)

!!! info
    Não esqueçam de verificar o code quality! Agora ele vai começar a apitar na cabeça de vocês!

## Desafios extras

Gostou e quer fazer mais? Que tal:

- Pense em uma forma de calibrar o sensor.
- Tente ler dois sensores ao mesmo tempo.
- Modo alerta, se a distância chegar a um limite gere um som de alarme!
- Crie um código em python para exibir o valor.
