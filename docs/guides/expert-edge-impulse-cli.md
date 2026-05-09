---
tags:
  - edge impulse
description: Tutorial instalação edge impulse
---

# Edge impulse CLI

Ferramenta de linha de comando usada para configurar e conectar dispositivos ao Edge Impulse. Veja a [documentação oficial](https://docs.edgeimpulse.com/docs/tools/edge-impulse-cli).

## Instalação 

> IMPORTANTE: Para instalar corretamente siga os passos descritos na documentação oficial. 
> [https://docs.edgeimpulse.com/docs/tools/edge-impulse-cli/cli-installation](https://docs.edgeimpulse.com/docs/tools/edge-impulse-cli/cli-installation)

Basicamente as etapas são:

1. Criar uma conta no [Edge Impulse](https://edgeimpulse.com/).
2. **Python 3** instalado no computador.
3. Instale **Node.js** v20 ou superior no computador.

### Windows

etapas para instalação WINDOWS

1. Crie uma conta no edge-impulse
2. Instale python3 no computador
3. Instale Node.js (Instale o "tools for native modules" caso sugerido)
4. Reinicie o computador e rode o seguinte comando através do PowerShell:

```bash
npm install -g edge-impulse-cli --force
```

### linux

Comece instalando o node

```bash
curl -sL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v
```

Verifique o diretório de instalação do Node.

```bash
npm config get prefix
```

> Se o comando retornar **/usr/local/**, rode os seguintes comandos para mudar o diretório padrão do npm.
>
> 
>  ```bash
>  mkdir ~/.npm-global
>  npm config set prefix '~/.npm-global'
>  echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.profile
> ```

> Se estiver no No MAC com zsh:
> 
> ```bash
> mkdir ~/.npm-global
> npm config set prefix '~/.npm-global'
> echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.zprofile
>```

Instale o edge-impulse-cli.

```bash
npm install -g edge-impulse-cli
```

Agora reinicie o linux/mac.
