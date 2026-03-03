#!/bin/bash

# Script de deploy para Kubernetes

set -e

echo "========================================="
echo "Deploy CRUD Veículos API no Kubernetes"
echo "========================================="

# Verificar se kubectl está instalado
if ! command -v kubectl &> /dev/null; then
    echo "❌ kubectl não está instalado"
    exit 1
fi

# Verificar conexão com cluster
if ! kubectl cluster-info &> /dev/null; then
    echo "❌ Não foi possível conectar ao cluster Kubernetes"
    exit 1
fi

echo "✓ Conectado ao cluster Kubernetes"

# Build da imagem Docker
echo ""
echo "📦 Building Docker image..."
docker build -t crud-veiculos-api:latest .

# Opcional: Tag e push para registry (descomentar se necessário)
# docker tag crud-veiculos-api:latest your-registry/crud-veiculos-api:latest
# docker push your-registry/crud-veiculos-api:latest

# Aplicar configurações do Kubernetes
echo ""
echo "🚀 Aplicando configurações do Kubernetes..."

kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/pvc.yaml
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl apply -f k8s/ingress.yaml
kubectl apply -f k8s/hpa.yaml

echo ""
echo "✓ Deploy concluído com sucesso!"

echo ""
echo "📊 Status dos recursos:"
kubectl get all -n crud-veiculos

echo ""
echo "🔍 Para verificar os logs:"
echo "   kubectl logs -f -n crud-veiculos -l app=crud-veiculos"

echo ""
echo "🌐 A aplicação estará disponível em:"
echo "   https://alpaca-simple-newly.ngrok-free.app/crud_veiculos"
echo "   Documentação: https://alpaca-simple-newly.ngrok-free.app/crud_veiculos/api-docs"
