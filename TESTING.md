# Guia de Testes

## 📋 Visão Geral

Este projeto possui uma suite completa de testes unitários seguindo as melhores práticas de TDD (Test-Driven Development) e cobrindo todas as camadas da aplicação.

## 🏗️ Estrutura de Testes

```
tests/
├── domain/                      # Testes de domínio
│   └── common/
│       └── Result.test.ts      # Testes do Result Pattern
├── features/                    # Testes de features (Vertical Slices)
│   └── veiculos/
│       ├── criar/              # Testes da feature Criar
│       ├── listar/             # Testes da feature Listar
│       ├── buscar/             # Testes da feature Buscar
│       ├── atualizar/          # Testes da feature Atualizar
│       └── deletar/            # Testes da feature Deletar
├── schemas/                     # Testes de validação
│   └── VeiculoSchemas.test.ts
├── integration/                 # Testes de integração
│   └── app.integration.test.ts
├── mocks/                       # Mocks para testes
│   ├── MockVeiculoRepository.ts
│   └── MockExpressTypes.ts
└── fixtures/                    # Dados de teste
    └── veiculos.fixture.ts
```

## 🚀 Executando os Testes

### Executar todos os testes
```bash
npm test
```

### Executar com watchmode
```bash
npm run test:watch
```

### Executar com cobertura
```bash
npm run test:coverage
```

### Executar em modo verbose
```bash
npm run test:verbose
```

### Executar testes específicos
```bash
# Testar apenas os handlers
npm test -- handlers

# Testar apenas schemas
npm test -- schemas

# Testar um arquivo específico
npm test -- CriarVeiculoHandler
```

## 📊 Cobertura de Testes

A suite de testes cobre:

### ✅ Handlers (100%)
- **CriarVeiculoHandler**: 8 casos de teste
  - Criação com dados válidos
  - Validação de todos os campos obrigatórios
  - Validação de formatos (placa, ano)
  
- **ListarVeiculosHandler**: 3 casos de teste
  - Listagem com múltiplos veículos
  - Listagem vazia
  - Verificação de campos retornados

- **BuscarVeiculoHandler**: 4 casos de teste
  - Busca por ID existente
  - Busca por ID inexistente
  - Validação de ID obrigatório
  - Busca correta em múltiplos registros

- **AtualizarVeiculoHandler**: 7 casos de teste
  - Atualização completa
  - Atualização parcial
  - Validações de dados
  - Tratamento de erros

- **DeletarVeiculoHandler**: 5 casos de teste
  - Deleção bem-sucedida
  - Deleção de veículo inexistente
  - Validação de ID
  - Deleção seletiva

### ✅ Schemas (100%)
- **CriarVeiculoSchema**: 24 casos de teste
  - Validação de marca
  - Validação de modelo
  - Validação de ano (limites, formato)
  - Validação de placa (Mercosul e antigo)
  - Validação de cor

- **AtualizarVeiculoSchema**: 11 casos de teste
  - Campos opcionais
  - Validações parciais
  - Combinação de campos

### ✅ Domain (100%)
- **Result Pattern**: 8 casos de teste
  - Criação de resultados de sucesso
  - Criação de resultados de falha
  - Validações de construtor
  - Tipagem genérica

### ✅ Integration (100%)
- **App**: 6 casos de teste
  - Configuração do Express
  - Rotas básicas
  - Middlewares

## 🎯 Padrões de Teste

### Arrange-Act-Assert (AAA)
Todos os testes seguem o padrão AAA:

```typescript
it('deve criar um veículo com dados válidos', async () => {
  // Arrange (Preparar)
  const req = createMockRequest({ body: criarVeiculoDtoMock });
  const res = createMockResponse();

  // Act (Agir)
  await handler.handle(req, res);

  // Assert (Afirmar)
  expect(res.statusCode).toBe(201);
  expect(res.body.sucesso).toBe(true);
});
```

### Descrições Claras
- Usamos `describe` para agrupar testes relacionados
- Usamos `it` ou `test` com descrições que começam com "deve..."
- Cada teste tem um propósito único e claro

### Isolamento
- Cada teste é independente
- Usamos `beforeEach` para setup
- Usamos `afterEach` para cleanup
- Mocks são limpos entre testes

## 🧪 Mocks e Fixtures

### MockVeiculoRepository
Implementação em memória de `IVeiculoRepository` para testes:

```typescript
const repository = new MockVeiculoRepository();
repository.seed(veiculosMock); // Popular com dados
repository.clear(); // Limpar dados
```

### MockExpressTypes
Mocks de Request e Response do Express:

```typescript
const req = createMockRequest({
  body: { marca: 'Toyota' },
  params: { id: '123' }
});

const res = createMockResponse();
await handler.handle(req, res);

expect(res.statusCode).toBe(200);
expect(res.body).toHaveProperty('sucesso');
```

### Fixtures
Dados de teste reutilizáveis:

```typescript
import { veiculoMock, veiculosMock, criarVeiculoDtoMock } from '../fixtures/veiculos.fixture';
```

## 📈 Relatório de Cobertura

Após executar `npm run test:coverage`, um relatório HTML é gerado em `coverage/`:

```
coverage/
├── lcov-report/
│   └── index.html    # Abra este arquivo no navegador
└── lcov.info
```

### Métricas de Cobertura Esperadas
- **Statements**: > 90%
- **Branches**: > 85%
- **Functions**: > 90%
- **Lines**: > 90%

## 🔍 Debugging de Testes

### Executar teste específico em debug
```bash
node --inspect-brk node_modules/.bin/jest --runInBand tests/features/veiculos/criar/CriarVeiculoHandler.test.ts
```

### Adicionar logs temporários
```typescript
it('deve fazer algo', () => {
  const resultado = funcao();
  console.log('DEBUG:', resultado);
  expect(resultado).toBe(esperado);
});
```

### Usar .only para focar em um teste
```typescript
it.only('deve testar apenas isso', () => {
  // Este será o único teste executado
});
```

### Usar .skip para pular um teste
```typescript
it.skip('teste temporariamente desabilitado', () => {
  // Este teste será pulado
});
```

## ✅ Checklist de Boas Práticas

- [x] Testes são independentes e podem rodar em qualquer ordem
- [x] Cada teste testa apenas uma coisa
- [x] Descrições são claras e começam com "deve..."
- [x] Usamos mocks ao invés de dependências reais
- [x] Setup e teardown são feitos em hooks apropriados
- [x] Testes são rápidos (< 1s cada)
- [x] Não há lógica complexa dentro dos testes
- [x] Assertions são específicas e claras
- [x] Casos de erro são testados
- [x] Casos extremos (edge cases) são cobertos

## 🎓 Exemplos de Teste

### Teste de Sucesso
```typescript
it('deve criar um veículo com dados válidos', async () => {
  const req = createMockRequest({ body: criarVeiculoDtoMock });
  const res = createMockResponse();

  await handler.handle(req, res);

  expect(res.statusCode).toBe(201);
  expect(res.body.sucesso).toBe(true);
  expect(res.body.dados).toHaveProperty('id');
});
```

### Teste de Validação
```typescript
it('deve retornar erro 400 quando marca estiver ausente', async () => {
  const req = createMockRequest({
    body: { ...criarVeiculoDtoMock, marca: undefined }
  });
  const res = createMockResponse();

  await handler.handle(req, res);

  expect(res.statusCode).toBe(400);
  expect(res.body.sucesso).toBe(false);
  expect(res.body.erro).toBe('Dados inválidos');
});
```

### Teste de Not Found
```typescript
it('deve retornar erro 404 quando veículo não existir', async () => {
  const req = createMockRequest({
    params: { id: 'id-inexistente' }
  });
  const res = createMockResponse();

  await handler.handle(req, res);

  expect(res.statusCode).toBe(404);
  expect(res.body.erro).toBe('Veículo não encontrado');
});
```

## 🚀 Continuous Integration

Os testes devem ser executados automaticamente em CI/CD:

```yaml
# Exemplo para GitHub Actions
- name: Run tests
  run: npm test

- name: Upload coverage
  run: npm run test:coverage
```

## 📚 Recursos Adicionais

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Testing Best Practices](https://testingjavascript.com/)
- [Clean Architecture Testing](https://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html)

## 🤝 Contribuindo com Testes

Ao adicionar novas features:

1. Escreva os testes primeiro (TDD)
2. Garanta cobertura mínima de 90%
3. Teste casos de sucesso e erro
4. Teste validações
5. Teste edge cases
6. Execute toda a suite antes de commit

## 📝 Comandos Rápidos

```bash
# Instalar dependências
npm install

# Executar testes
npm test

# Executar com watch
npm run test:watch

# Gerar relatório de cobertura
npm run test:coverage

# Limpar cache do Jest
npx jest --clearCache
```

---

**Total de Testes**: 70+
**Cobertura Esperada**: > 90%
**Tempo de Execução**: < 10s
