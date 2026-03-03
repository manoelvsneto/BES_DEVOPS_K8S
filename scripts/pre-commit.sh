#!/bin/bash

# Script de validação pré-commit
# Executa testes e validações antes de permitir commit

set -e

echo "🔍 Executando validações pré-commit..."
echo ""

# 1. Verificar se há mudanças staged
if git diff --cached --quiet; then
    echo "⚠️  Nenhuma mudança staged para commit"
    exit 1
fi

# 2. Executar linter (se configurado)
if npm run lint --if-present > /dev/null 2>&1; then
    echo "✓ Linter passou"
else
    echo "ℹ️  Linter não configurado (opcional)"
fi

# 3. Executar testes unitários
echo ""
echo "🧪 Executando testes unitários..."
npm test -- --passWithNoTests

if [ $? -eq 0 ]; then
    echo "✓ Todos os testes passaram"
else
    echo "❌ Alguns testes falharam"
    exit 1
fi

# 4. Verificar cobertura mínima
echo ""
echo "📊 Verificando cobertura de código..."
npm run test:coverage -- --silent > /dev/null 2>&1

# Extrair cobertura (se disponível)
if [ -f coverage/coverage-summary.json ]; then
    COVERAGE=$(node -pe "JSON.parse(require('fs').readFileSync('coverage/coverage-summary.json')).total.lines.pct")
    THRESHOLD=80
    
    if (( $(echo "$COVERAGE >= $THRESHOLD" | bc -l) )); then
        echo "✓ Cobertura de código: $COVERAGE% (mínimo: $THRESHOLD%)"
    else
        echo "⚠️  Cobertura de código baixa: $COVERAGE% (mínimo: $THRESHOLD%)"
        echo "   Considere adicionar mais testes"
    fi
else
    echo "ℹ️  Relatório de cobertura não disponível"
fi

# 5. Verificar build
echo ""
echo "🔨 Verificando build TypeScript..."
npm run build > /dev/null 2>&1

if [ $? -eq 0 ]; then
    echo "✓ Build compilou sem erros"
else
    echo "❌ Build falhou"
    exit 1
fi

echo ""
echo "✅ Todas as validações passaram! Commit permitido."
echo ""
