# Pico examples

A raspberry pi fundation disponibiliza oficialmente uma série de códigos exemplos para a nossa placa, acesse o repositório no github para saber mais:

- https://github.com/raspberrypi/pico-examples

## Usando exemplos

Para usar o exemplos na nossa infra basta clonar o repositório e criar uma pasta chamada `.devcontainer` com o arquivo `devcontainer.json` com o  seguinte conteúdo:

- [devcontainer.json](
https://github.com/insper-embarcados/pico-base-project/blob/main/.devcontainer/devcontainer.json)

!!! tip
    Todos os códigos que disponibilizamos para vocês possuem esse arquivo, vocês podem apenas copiar para o repositório clonado.

Agora com o `.devcontainer` configurado seremos capaz de compilar e usar os exemplos, mas agora precisamos configurar que a placa que possuímos é a versão `W`, ou seja, possui o módulo de WIFI e BlueTooth.

Então modifique o arquivo `CMakeLists.txt` e adicione na segunda linha `set(PICO_BOARD pico_w)` como demonstrado a seguir:

```diff
cmake_minimum_required(VERSION 3.12)

+set(PICO_BOARD pico_w)
```
