# Configurando Módulo Bluetooth HC-06 no Ubuntu

> Tutorial original: [Building Walls – Marc Queiroz](https://marcqueiroz.wordpress.com/aventuras-com-arduino/configurando-hc-06-bluetooth-module-device-no-ubuntu-12-04/)

---

## Passo 1 — Localizar o endereço do dispositivo

Execute o comando abaixo para escanear dispositivos Bluetooth próximos:

```bash
hcitool scan
```

A saída será algo como:

```
linvor  00:12:06:DE:E1:B3
```

Anote o endereço MAC exibido — ele será necessário nos próximos passos.

---

## Passo 2 — Criar a porta serial virtual (RFCOMM)

Utilize o comando `rfcomm` para criar uma conexão RFCOMM com o kernel do Linux, associando o dispositivo a uma porta serial virtual.

O comando aceita dois modos de operação: `connect` ou `bind`. Escolha conforme sua necessidade:

| Modo | Comando | Comportamento |
|------|---------|---------------|
| **connect** | `sudo rfcomm connect /dev/rfcomm0 00:12:06:DE:E1:B3` | Abre a conexão imediatamente e mantém o terminal ocupado. A porta é encerrada ao pressionar `CTRL-C`. Útil para testes rápidos. |
| **bind** | `sudo rfcomm bind /dev/rfcomm0 00:12:06:DE:E1:B3` | Apenas registra o vínculo entre a porta e o dispositivo, sem abrir a conexão. A conexão real ocorre quando algum programa acessar `/dev/rfcomm0`. Libera o terminal e persiste até um `rfcomm release` ou reinício. |

> **Resumo prático:** use `connect` para testar na hora; use `bind` quando quiser deixar a porta disponível em segundo plano para outros programas usarem.

No exemplo abaixo, a porta escolhida é `/dev/rfcomm0` e o canal utilizado é o padrão:

```bash
# Conexão imediata (terminal bloqueado)
sudo rfcomm connect /dev/rfcomm0 00:12:06:DE:E1:B3

# ou: vínculo em segundo plano
sudo rfcomm bind /dev/rfcomm0 00:12:06:DE:E1:B3
```

> **Nota:** Na primeira conexão, o gerenciador **bluez** do Ubuntu pode solicitar um código de pareamento. Insira `1234` quando solicitado.

Se a conexão for bem-sucedida, a saída será:

```
Connected /dev/rfcomm0 to 00:12:06:DE:E1:B3 on channel 1
Press CTRL-C for hangup
```

---

## Passo 3 — Acessar a porta serial

Com a porta `/dev/rfcomm0` disponível, utilize um programa de terminal serial para enviar e receber dados.

### Opção 1 — screen (mais simples)

O `screen` já vem instalado na maioria das distribuições e é a forma mais rápida de acessar a porta:

```bash
sudo screen /dev/rfcomm0 9600
```

Para sair do `screen`, pressione `CTRL-A` seguido de `K`, depois confirme com `Y`.

### Opção 2 — minicom

O `minicom` oferece uma interface mais completa. Caso não esteja instalado:

```bash
sudo apt-get install minicom
```

Para acessar a porta:

```bash
sudo minicom --device /dev/rfcomm0 --baudrate 9600
```

Para sair do `minicom`, pressione `CTRL-A` seguido de `X` e confirme.

---

## Resultado

Pronto! Agora é possível enviar e receber dados pelo módulo Bluetooth HC-06 no Ubuntu através da porta serial virtual `/dev/rfcomm0`.
