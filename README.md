# API CRUD de Veículos

API RESTful para gerenciamento de veículos construída com **Node.js**, **TypeScript**, **Clean Architecture** e **Vertical Slice Architecture**.
Exemplo de uso para os alunos de graduação na disciplina de DEVOPS.


## 🏗️ Arquitetura

### Clean Architecture
- **Domain Layer**: Entidades, interfaces e regras de negócio
- **Infrastructure Layer**: Implementações concretas (SQLite, repositórios)
- **Application Layer**: Features organizadas em vertical slices

### Vertical Slice Architecture
Cada feature (criar, listar, buscar, atualizar, deletar) possui sua própria estrutura completa:
- Handler (controlador)
- Schema (validação)
- Lógica de negócio isolada

## 🚀 Tecnologias

- **Node.js 20** + **TypeScript**
- **Express** - Framework web
- **SQLite** - Banco de dados
- **Zod** - Validação de schemas
- **Swagger/OpenAPI** - Documentação da API
- **Docker** - Containerização
- **Kubernetes** - Orquestração

## 📁 Estrutura do Projeto

```
BES_DEVOPS_K8S/
├── src/
│   ├── domain/                    # Camada de domínio
│   │   ├── entities/             # Entidades
│   │   ├── repositories/         # Interfaces de repositórios
│   │   └── common/               # Utilitários comuns
│   ├── infrastructure/           # Camada de infraestrutura
│   │   ├── database/            # Conexão com banco de dados
│   │   └── repositories/        # Implementação de repositórios
│   ├── features/                # Features (Vertical Slices)
│   │   └── veiculos/
│   │       ├── criar/          # Feature: Criar veículo
│   │       ├── listar/         # Feature: Listar veículos
│   │       ├── buscar/         # Feature: Buscar veículo
│   │       ├── atualizar/      # Feature: Atualizar veículo
│   │       ├── deletar/        # Feature: Deletar veículo
│   │       └── routes.ts       # Rotas da feature
│   ├── config/                  # Configurações
│   │   └── swagger.ts          # Configuração do Swagger
│   ├── app.ts                   # Configuração do Express
│   └── server.ts                # Servidor principal
├── k8s/                          # Manifests Kubernetes
│   ├── namespace.yaml
│   ├── configmap.yaml
│   ├── pvc.yaml
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── ingress.yaml
│   ├── hpa.yaml
│   └── kustomization.yaml
├── Dockerfile
├── package.json
├── tsconfig.json
├── deploy.sh                     # Script de deploy (Linux/Mac)
└── deploy.ps1                    # Script de deploy (Windows)
```

## 🔧 Instalação e Execução Local

### Pré-requisitos
- Node.js 20+
- npm ou yarn

### Passos

1. **Instalar dependências**
```bash
npm install
```

2. **Configurar variáveis de ambiente**
```bash
cp .env.example .env
```

3. **Executar testes**
```bash
npm test
```

4. **Executar em modo desenvolvimento**
```bash
npm run dev
```

5. **Build para produção**
```bash
npm run build
npm start
```

A API estará disponível em: `http://localhost:3000/crud_veiculos`

## 🧪 Testes

### Executar testes unitários
```bash
npm test                  # Executar todos os testes
npm run test:watch        # Modo watch
npm run test:coverage     # Relatório de cobertura
npm run test:verbose      # Saída detalhada
```

### Cobertura de Testes
- **70+ testes unitários** cobrindo todas as features
- **Cobertura > 90%** em statements, branches, functions e lines
- Testes organizados por camada (domain, features, schemas, integration)

Veja [TESTING.md](TESTING.md) para documentação completa dos testes.

## 📚 Documentação da API

Acesse a documentação interativa do Swagger em:
- Local: `http://localhost:3000/crud_veiculos/api-docs`
- Produção: `https://alpaca-simple-newly.ngrok-free.app/crud_veiculos/api-docs`

### Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/veiculos` | Listar todos os veículos |
| GET | `/api/veiculos/:id` | Buscar veículo por ID |
| POST | `/api/veiculos` | Criar novo veículo |
| PUT | `/api/veiculos/:id` | Atualizar veículo |
| DELETE | `/api/veiculos/:id` | Deletar veículo |
| GET | `/health` | Health check |

### Exemplo de Request (Criar Veículo)

```json
POST /crud_veiculos/api/veiculos
Content-Type: application/json

{
  "marca": "Toyota",
  "modelo": "Corolla",
  "ano": 2023,
  "placa": "ABC1D23",
  "cor": "Prata"
}
```

### Exemplo de Response

```json
{
  "sucesso": true,
  "dados": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "marca": "Toyota",
    "modelo": "Corolla",
    "ano": 2023,
    "placa": "ABC1D23",
    "cor": "Prata",
    "criadoEm": "2024-01-01T12:00:00.000Z",
    "atualizadoEm": "2024-01-01T12:00:00.000Z"
  }
}
```

## 🐳 Docker

### Build da imagem
```bash
docker build -t crud-veiculos-api:latest .
```

### Executar container
```bash
docker run -d \
  -p 3000:3000 \
  -e PORT=3000 \
  -e BASE_PATH=/crud_veiculos \
  -v $(pwd)/data:/app/data \
  --name crud-veiculos \
  crud-veiculos-api:latest
```

### Health Check
```bash
curl http://localhost:3000/crud_veiculos/health
```

## ☸️ Deploy no Kubernetes

### Pré-requisitos
- Cluster Kubernetes configurado
- kubectl instalado e configurado
- Docker instalado
- Ingress Controller (nginx) instalado no cluster

### Deploy Completo

**Linux/Mac:**
```bash
chmod +x deploy.sh
./deploy.sh
```

**Windows (PowerShell):**
```powershell
.\deploy.ps1
```

### Deploy Manual

1. **Build da imagem Docker**
```bash
docker build -t crud-veiculos-api:latest .
```

2. **Aplicar manifests do Kubernetes**
```bash
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/pvc.yaml
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl apply -f k8s/ingress.yaml
kubectl apply -f k8s/hpa.yaml
```

3. **Verificar status**
```bash
kubectl get all -n crud-veiculos
```

4. **Ver logs**
```bash
kubectl logs -f -n crud-veiculos -l app=crud-veiculos
```

### Usando Kustomize

```bash
kubectl apply -k k8s/
```

## 🔍 Monitoramento

### Verificar Pods
```bash
kubectl get pods -n crud-veiculos
```

### Ver logs
```bash
kubectl logs -f -n crud-veiculos deployment/crud-veiculos
```

### Verificar HPA (Auto Scaling)
```bash
kubectl get hpa -n crud-veiculos
```

### Descrever recursos
```bash
kubectl describe deployment crud-veiculos -n crud-veiculos
kubectl describe service crud-veiculos-service -n crud-veiculos
kubectl describe ingress crud-veiculos-ingress -n crud-veiculos
```

## 🌐 Acesso à Aplicação

A aplicação está disponível em:
- **URL**: https://alpaca-simple-newly.ngrok-free.app/crud_veiculos
- **API Docs**: https://alpaca-simple-newly.ngrok-free.app/crud_veiculos/api-docs
- **Health Check**: https://alpaca-simple-newly.ngrok-free.app/crud_veiculos/health

## 📊 Recursos do Kubernetes

### ConfigMap
Contém as configurações da aplicação:
- PORT
- NODE_ENV
- DATABASE_PATH
- BASE_PATH

### PersistentVolumeClaim
Armazenamento persistente de 1Gi para o banco de dados SQLite

### Deployment
- 2 réplicas por padrão
- Rolling update strategy
- Health checks (liveness e readiness)
- Resource limits configurados

### Service
- Tipo ClusterIP
- Porta 80 → 3000

### Ingress
- Host: alpaca-simple-newly.ngrok-free.app
- Path: /crud_veiculos
- TLS habilitado

### HorizontalPodAutoscaler
- Min: 2 réplicas
- Max: 10 réplicas
- Auto scaling baseado em CPU (70%) e memória (80%)

## 🧪 Executar Testes

```bash
# Instalar dependências (se ainda não instalou)
npm install

# Executar todos os testes
npm test

# Modo watch (executar testes ao salvar arquivos)
npm run test:watch

# Gerar relatório de cobertura
npm run test:coverage

# Ver relatório HTML
# Abra: coverage/lcov-report/index.html
```

## 🛠️ Comandos Úteis

### Atualizar deployment
```bash
kubectl rollout restart deployment/crud-veiculos -n crud-veiculos
```

### Ver histórico de deployments
```bash
kubectl rollout history deployment/crud-veiculos -n crud-veiculos
```

### Fazer rollback
```bash
kubectl rollout undo deployment/crud-veiculos -n crud-veiculos
```

### Escalar manualmente
```bash
kubectl scale deployment/crud-veiculos --replicas=3 -n crud-veiculos
```

### Port-forward para acesso local
```bash
kubectl port-forward -n crud-veiculos service/crud-veiculos-service 3000:80
```

### Deletar todos os recursos
```bash
kubectl delete namespace crud-veiculos
```

## 🧪 Testando a API

### Criar veículo
```bash
curl -X POST https://alpaca-simple-newly.ngrok-free.app/crud_veiculos/api/veiculos \
  -H "Content-Type: application/json" \
  -d '{
    "marca": "Toyota",
    "modelo": "Corolla",
    "ano": 2023,
    "placa": "ABC1D23",
    "cor": "Prata"
  }'
```

### Listar veículos
```bash
curl https://alpaca-simple-newly.ngrok-free.app/crud_veiculos/api/veiculos
```

### Buscar veículo por ID
```bash
curl https://alpaca-simple-newly.ngrok-free.app/crud_veiculos/api/veiculos/{id}
```

### Atualizar veículo
```bash
curl -X PUT https://alpaca-simple-newly.ngrok-free.app/crud_veiculos/api/veiculos/{id} \
  -H "Content-Type: application/json" \
  -d '{
    "cor": "Preto"
  }'
```

### Deletar veículo
```bash
curl -X DELETE https://alpaca-simple-urely.ngrok-free.app/crud_veiculos/api/veiculos/{id}
```

## 📝 Validações

### Formato da Placa
- Padrão Mercosul: ABC1D23
- Padrão Antigo: ABC1234

### Regras de Validação
- Marca: obrigatória
- Modelo: obrigatório
- Ano: entre 1900 e ano atual + 1
- Placa: formato válido e única no sistema
- Cor: obrigatória

## 🏗️ Princípios Aplicados

### Clean Architecture
- ✅ Separação de responsabilidades
- ✅ Inversão de dependência
- ✅ Independência de frameworks
- ✅ Testabilidade

### Vertical Slice Architecture
- ✅ Features isoladas e independentes
- ✅ Baixo acoplamento
- ✅ Alta coesão
- ✅ Fácil manutenção e expansão

### SOLID
- ✅ Single Responsibility Principle
- ✅ Open/Closed Principle
- ✅ Liskov Substitution Principle
- ✅ Interface Segregation Principle
- ✅ Dependency Inversion Principle

## 📄 Licença

MIT

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor, leia nosso [Guia de Contribuição](CONTRIBUTING.md) antes de enviar um Pull Request.

Consulte também:
- [Guia de Testes](TESTING.md) - Documentação completa sobre testes
- [Checklist de Qualidade](QUALITY_CHECKLIST.md) - Validações antes de commit
- [Exemplos de API](API_EXAMPLES.md) - Exemplos de uso da API
- [Arquitetura](ARCHITECTURE.md) - Detalhes da arquitetura do projeto

## 👤 Autor

Desenvolvido para BES DevOps K8S
BES_DEVOPS_K8S Exemplo K8S
