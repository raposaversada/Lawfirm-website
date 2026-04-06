# Docker Compose - Lawfirm Website

## 📋 Arquivos Criados

- **docker-compose.yml** - Orquestração dos serviços (frontend e backend)
- **back-end/Dockerfile** - Imagem Docker para o backend (Node.js/Express)
- **front-end/Dockerfile** - Imagem Docker para o frontend (Nginx)
- **front-end/nginx.conf** - Configuração do Nginx
- **.env.example** - Variáveis de ambiente necessárias

## 🚀 Como usar

### 1. Preparar variáveis de ambiente

```bash
cp .env.example .env
```

Edite o arquivo `.env` e adicione suas credenciais do Gmail:
```
EMAIL_USER=seu_email@gmail.com
EMAIL_PASS=sua_senha_app_google
```

### 2. Construir e iniciar os serviços

```bash
docker-compose up -d
```

### 3. Acessar a aplicação

- **Frontend**: http://localhost
- **Backend API**: http://localhost:3000

## 🔧 Comandos úteis

```bash
# Ver logs em tempo real
docker-compose logs -f

# Logs de um serviço específico
docker-compose logs -f backend
docker-compose logs -f frontend

# Parar os serviços
docker-compose down

# Reconstruir as imagens
docker-compose up -d --build

# Remover tudo (containers, volumes, networks)
docker-compose down -v
```

## 📝 Detalhes da Configuração

### Backend
- **Porta**: 3000
- **Tecnologia**: Node.js 18 (Alpine)
- **Variáveis de ambiente**: PORT, NODE_ENV, EMAIL_USER, EMAIL_PASS

### Frontend
- **Porta**: 80
- **Tecnologia**: Nginx (Alpine)
- **Funcionalidades**:
  - Proxy reverso para API do backend em `/contato`
  - Cache de arquivos estáticos (1 ano)
  - Fallback para index.html para SPAs

## 🔗 Comunicação entre serviços

Os serviços comunicam através da rede `lawfirm-network`:
- Backend pode ser acessado internamente como: `http://backend:3000`
- Frontend faz proxy das requisições para `/contato` para o backend

## 📦 Estrutura esperada

```
.
├── docker-compose.yml
├── .env
├── back-end/
│   ├── Dockerfile
│   ├── package.json
│   └── index.js
└── front-end/
    ├── Dockerfile
    ├── nginx.conf
    ├── index.html
    └── src/
```
