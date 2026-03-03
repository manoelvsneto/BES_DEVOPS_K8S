# Quick Start Guide

## Desenvolvimento Local

### 1. Instalar dependências
```bash
npm install
```

### 2. Executar testes
```bash
npm test
```

### 3. Executar em modo dev
```bash
npm run dev
```

### 4. Validar antes de commit
```bash
npm run validate
# ou
npm run precommit
```

### 5. Acessar aplicação
- API: http://localhost:3000/crud_veiculos
- Swagger: http://localhost:3000/crud_veiculos/api-docs
- Health: http://localhost:3000/crud_veiculos/health

## Docker

### Build e Run
```bash
docker build -t crud-veiculos-api .
docker run -d -p 3000:3000 --name crud-veiculos crud-veiculos-api
```

## Kubernetes

### Deploy Rápido (Windows)
```powershell
.\deploy.ps1
```

### Deploy Rápido (Linux/Mac)
```bash
chmod +x deploy.sh
./deploy.sh
```

### Deploy Manual
```bash
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/pvc.yaml
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl apply -f k8s/ingress.yaml
kubectl apply -f k8s/hpa.yaml
```

### Verificar Status
```bash
kubectl get all -n crud-veiculos
kubectl logs -f -n crud-veiculos -l app=crud-veiculos
```

## Testar API

### Criar Veículo
```bash
curl -X POST http://localhost:3000/crud_veiculos/api/veiculos \
  -H "Content-Type: application/json" \
  -d '{"marca":"Toyota","modelo":"Corolla","ano":2023,"placa":"ABC1D23","cor":"Prata"}'
```

### Listar Veículos
```bash
curl http://localhost:3000/crud_veiculos/api/veiculos
```

## URLs Produção

- API: https://alpaca-simple-newly.ngrok-free.app/crud_veiculos
- Docs: https://alpaca-simple-newly.ngrok-free.app/crud_veiculos/api-docs
- Health: https://alpaca-simple-newly.ngrok-free.app/crud_veiculos/health
