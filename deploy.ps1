# Script de deploy para Kubernetes (Windows PowerShell)

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "Deploy CRUD Veículos API no Kubernetes" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan

# Verificar se kubectl está instalado
if (-not (Get-Command kubectl -ErrorAction SilentlyContinue)) {
    Write-Host "❌ kubectl não está instalado" -ForegroundColor Red
    exit 1
}

# Verificar conexão com cluster
try {
    kubectl cluster-info | Out-Null
    Write-Host "✓ Conectado ao cluster Kubernetes" -ForegroundColor Green
} catch {
    Write-Host "❌ Não foi possível conectar ao cluster Kubernetes" -ForegroundColor Red
    exit 1
}

# Build da imagem Docker
Write-Host ""
Write-Host "📦 Building Docker image..." -ForegroundColor Yellow
docker build -t crud-veiculos-api:latest .

# Opcional: Tag e push para registry (descomentar se necessário)
# docker tag crud-veiculos-api:latest your-registry/crud-veiculos-api:latest
# docker push your-registry/crud-veiculos-api:latest

# Aplicar configurações do Kubernetes
Write-Host ""
Write-Host "🚀 Aplicando configurações do Kubernetes..." -ForegroundColor Yellow

kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/pvc.yaml
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl apply -f k8s/ingress.yaml
kubectl apply -f k8s/hpa.yaml

Write-Host ""
Write-Host "✓ Deploy concluído com sucesso!" -ForegroundColor Green

Write-Host ""
Write-Host "📊 Status dos recursos:" -ForegroundColor Cyan
kubectl get all -n crud-veiculos

Write-Host ""
Write-Host "🔍 Para verificar os logs:" -ForegroundColor Cyan
Write-Host "   kubectl logs -f -n crud-veiculos -l app=crud-veiculos" -ForegroundColor White

Write-Host ""
Write-Host "🌐 A aplicação estará disponível em:" -ForegroundColor Cyan
Write-Host "   https://alpaca-simple-newly.ngrok-free.app/crud_veiculos" -ForegroundColor White
Write-Host "   Documentação: https://alpaca-simple-newly.ngrok-free.app/crud_veiculos/api-docs" -ForegroundColor White
