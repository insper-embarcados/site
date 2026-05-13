---
linksTitle: "Entrega"
links:
  - title:
    text: "Classroom"
    url: "{{lab_expert_2}}"
    box: "box-blue"
  - title: 
    text: "PrairieLearn"
    url: "{{prairielearn}}"
    box: "box-yellow"
---

# Expert - Bluetooth - RTOS

Nesse laboratório iremos trabalhar com:

1. Comunicação Bluetooth serial utilizando o módulo HC-06
2. Integração de tarefas (tasks) via FreeRTOS em Raspberry Pi Pico
3. Troca de dados entre tasks usando filas e notificações RTOS
4. Desenvolvimento e teste de sistemas embarcados com múltiplas portas seriais

Antes de começar o lab, rode e entenda os materiais de referência abaixo:

::::: center
:::: third Exemplo 1
::: card [Bluetooth HC-06 e FreeRTOS](https://insper-embarcados.github.io/site/guides/dispositivos-hc06.html)
:::
::::
:::: third Exemplo 2
::: card [Exemplo OLED (em breve)]()
:::
::::
:::: third
::::
:::::

---

A ideia deste laboratório é implementar um sistema interativo de pareamento do módulo HC-06, utilizando as bases dos exemplos acima para aplicar a seguinte ordem de utilização:

1. **Apertar botão para gerar um PIN randômico**
   - Um botão físico no circuito é pressionado para que o dispositivo gere um novo PIN para pareamento Bluetooth.
2. **Configuração do HC-06**
   - O microcontrolador configura automaticamente o HC-06 com o novo PIN gerado usando comandos AT.
3. **Exibição do PIN no display OLED**
   - O PIN atual será mostrado no display OLED.
4. **Pareamento via PC**
   - O usuário deve parear o computador ao HC-06 utilizando o PIN mostrado na tela do display.

**Funcionalidades adicionais:**
- O status de conexão Bluetooth deve ser indicado por um LED controlado por PWM:
  - Enquanto aguardando conexão: LED pisca (*fade in/out*)
  - Quando conectado: LED permanece aceso

---

## Entrega

Você deverá integrar a aplicação desse laboratório no [Lab 6. ADC e PWM](https://insper-embarcados.github.io/site/labs/adc-pwm-pra.html), criando assim, um mouse wireless.

## Dicas

- **Geração do PIN randômico**
  - Utilize funções de geração de números aleatórios como utilizado na [APS - 1 - Genius](https://insper-embarcados.github.io/site/entregas/aps-1-genius.html)
  - Certifique-se de atualizar o PIN apenas quando o botão for pressionado, evitando acionamentos múltiplos acidentais (debounce).

- **Configuração dinâmica do HC-06**
  - Programe o envio dos comandos AT para configurar o PIN logo após a geração do novo valor.
  - Aguarde a resposta “OK” do HC-06 antes de atualizar o display — isso confirma que o módulo aceitou a configuração.

- **Exibição do PIN no OLED**
  - Inicialize o display antes de exibir o PIN.
  - Atualize o valor sempre que um novo PIN for configurado, garantindo que não haja "resíduos" de valores antigos na tela.

- **Lógica do LED PWM para status**
  - Para efeito de fade, incremente/decremente gradualmente o duty cycle dentro de uma task periódica.
  - Monitore o status de pareamento (por exemplo, usando a saída STATE do HC-06) para alternar entre animar o LED ou mantê-lo aceso.

- **Pareamento via computador**
  - Após criar um novo PIN, faça o pareamento do computador.
  - Se o PC não encontrar o módulo, tente remover emparelhamentos antigos e busque novamente.

---
