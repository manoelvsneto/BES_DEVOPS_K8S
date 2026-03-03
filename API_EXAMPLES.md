# Exemplos de Teste da API CRUD de Veículos

## Usando cURL

### 1. Health Check
```bash
curl http://localhost:3000/crud_veiculos/health
```

### 2. Criar Veículo
```bash
curl -X POST http://localhost:3000/crud_veiculos/api/veiculos \
  -H "Content-Type: application/json" \
  -d '{
    "marca": "Toyota",
    "modelo": "Corolla",
    "ano": 2023,
    "placa": "ABC1D23",
    "cor": "Prata"
  }'
```

### 3. Listar Todos os Veículos
```bash
curl http://localhost:3000/crud_veiculos/api/veiculos
```

### 4. Buscar Veículo por ID
```bash
# Substitua {id} pelo ID retornado na criação
curl http://localhost:3000/crud_veiculos/api/veiculos/{id}
```

### 5. Atualizar Veículo
```bash
curl -X PUT http://localhost:3000/crud_veiculos/api/veiculos/{id} \
  -H "Content-Type: application/json" \
  -d '{
    "cor": "Preto",
    "ano": 2024
  }'
```

### 6. Deletar Veículo
```bash
curl -X DELETE http://localhost:3000/crud_veiculos/api/veiculos/{id}
```

---

## Usando PowerShell (Windows)

### 1. Health Check
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/crud_veiculos/health" -Method Get
```

### 2. Criar Veículo
```powershell
$body = @{
    marca = "Toyota"
    modelo = "Corolla"
    ano = 2023
    placa = "ABC1D23"
    cor = "Prata"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/crud_veiculos/api/veiculos" `
  -Method Post `
  -Body $body `
  -ContentType "application/json"
```

### 3. Listar Todos os Veículos
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/crud_veiculos/api/veiculos" -Method Get
```

### 4. Buscar Veículo por ID
```powershell
$id = "seu-id-aqui"
Invoke-RestMethod -Uri "http://localhost:3000/crud_veiculos/api/veiculos/$id" -Method Get
```

### 5. Atualizar Veículo
```powershell
$id = "seu-id-aqui"
$body = @{
    cor = "Preto"
    ano = 2024
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/crud_veiculos/api/veiculos/$id" `
  -Method Put `
  -Body $body `
  -ContentType "application/json"
```

### 6. Deletar Veículo
```powershell
$id = "seu-id-aqui"
Invoke-RestMethod -Uri "http://localhost:3000/crud_veiculos/api/veiculos/$id" -Method Delete
```

---

## Usando HTTPie

### 1. Criar Veículo
```bash
http POST http://localhost:3000/crud_veiculos/api/veiculos \
  marca="Toyota" \
  modelo="Corolla" \
  ano:=2023 \
  placa="ABC1D23" \
  cor="Prata"
```

### 2. Listar Veículos
```bash
http GET http://localhost:3000/crud_veiculos/api/veiculos
```

### 3. Atualizar Veículo
```bash
http PUT http://localhost:3000/crud_veiculos/api/veiculos/{id} \
  cor="Preto" \
  ano:=2024
```

---

## Exemplos de Respostas

### Sucesso - Criar Veículo (201)
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

### Sucesso - Listar Veículos (200)
```json
{
  "sucesso": true,
  "dados": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "marca": "Toyota",
      "modelo": "Corolla",
      "ano": 2023,
      "placa": "ABC1D23",
      "cor": "Prata",
      "criadoEm": "2024-01-01T12:00:00.000Z",
      "atualizadoEm": "2024-01-01T12:00:00.000Z"
    }
  ],
  "total": 1
}
```

### Erro - Dados Inválidos (400)
```json
{
  "sucesso": false,
  "erro": "Dados inválidos",
  "detalhes": [
    {
      "code": "invalid_type",
      "expected": "string",
      "received": "undefined",
      "path": ["marca"],
      "message": "Marca é obrigatória"
    }
  ]
}
```

### Erro - Veículo Não Encontrado (404)
```json
{
  "sucesso": false,
  "erro": "Veículo não encontrado"
}
```

### Erro - Placa Duplicada (409)
```json
{
  "sucesso": false,
  "erro": "Placa já cadastrada"
}
```

---

## Testando em Produção

Substitua `http://localhost:3000` por `https://alpaca-simple-newly.ngrok-free.app` em todos os exemplos acima.

Exemplo:
```bash
curl https://alpaca-simple-newly.ngrok-free.app/crud_veiculos/api/veiculos
```

---

## Swagger UI

Para testar de forma interativa, acesse:
- Local: http://localhost:3000/crud_veiculos/api-docs
- Produção: https://alpaca-simple-newly.ngrok-free.app/crud_veiculos/api-docs
