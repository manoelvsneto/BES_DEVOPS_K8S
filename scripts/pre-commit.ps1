# Script de validação pré-commit (PowerShell)
# Executa testes e validações antes de permitir commit

$ErrorActionPreference = "Stop"

Write-Host "🔍 Executando validações pré-commit..." -ForegroundColor Cyan
Write-Host ""

# 1. Verificar se há mudanças staged
$stagedChanges = git diff --cached --name-only
if (-not $stagedChanges) {
    Write-Host "⚠️  Nenhuma mudança staged para commit" -ForegroundColor Yellow
    exit 1
}

# 2. Verificar se node_modules existe
if (-not (Test-Path "node_modules")) {
    Write-Host "❌ node_modules não encontrado. Execute 'npm install' primeiro" -ForegroundColor Red
    exit 1
}

# 3. Executar linter (se configurado)
try {
    npm run lint --if-present 2>&1 | Out-Null
    Write-Host "✓ Linter passou" -ForegroundColor Green
} catch {
    Write-Host "ℹ️  Linter não configurado (opcional)" -ForegroundColor Gray
}

# 4. Executar testes unitários
Write-Host ""
Write-Host "🧪 Executando testes unitários..." -ForegroundColor Cyan

try {
    npm test -- --passWithNoTests 2>&1 | Out-Null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Todos os testes passaram" -ForegroundColor Green
    } else {
        Write-Host "❌ Alguns testes falharam" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "❌ Erro ao executar testes" -ForegroundColor Red
    exit 1
}

# 5. Verificar cobertura mínima
Write-Host ""
Write-Host "📊 Verificando cobertura de código..." -ForegroundColor Cyan

try {
    npm run test:coverage -- --silent 2>&1 | Out-Null
    
    if (Test-Path "coverage/coverage-summary.json") {
        $coverageData = Get-Content "coverage/coverage-summary.json" | ConvertFrom-Json
        $coverage = [math]::Round($coverageData.total.lines.pct, 2)
        $threshold = 80
        
        if ($coverage -ge $threshold) {
            Write-Host "✓ Cobertura de código: $coverage% (mínimo: $threshold%)" -ForegroundColor Green
        } else {
            Write-Host "⚠️  Cobertura de código baixa: $coverage% (mínimo: $threshold%)" -ForegroundColor Yellow
            Write-Host "   Considere adicionar mais testes" -ForegroundColor Yellow
        }
    } else {
        Write-Host "ℹ️  Relatório de cobertura não disponível" -ForegroundColor Gray
    }
} catch {
    Write-Host "ℹ️  Não foi possível verificar cobertura" -ForegroundColor Gray
}

# 6. Verificar build
Write-Host ""
Write-Host "🔨 Verificando build TypeScript..." -ForegroundColor Cyan

try {
    npm run build 2>&1 | Out-Null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Build compilou sem erros" -ForegroundColor Green
    } else {
        Write-Host "❌ Build falhou" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "❌ Erro ao executar build" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "✅ Todas as validações passaram! Commit permitido." -ForegroundColor Green
Write-Host ""
