# Arquitetura do Projeto

## 🏛️ Visão Geral

Este projeto combina **Clean Architecture** com **Vertical Slice Architecture** para criar uma API modular, testável e de fácil manutenção.

## 📐 Clean Architecture

### Camadas

```
┌─────────────────────────────────────────┐
│         Presentation Layer              │
│    (Express Routes, Controllers)        │
├─────────────────────────────────────────┤
│         Application Layer               │
│      (Features / Use Cases)             │
├─────────────────────────────────────────┤
│          Domain Layer                   │
│   (Entities, Business Rules)            │
├─────────────────────────────────────────┤
│      Infrastructure Layer               │
│  (Database, External Services)          │
└─────────────────────────────────────────┘
```

### 1. Domain Layer (Núcleo)
**Localização**: `src/domain/`

- **Entities**: Definições de entidades de negócio
  - `Veiculo.ts`: Entidade principal
  - DTOs para criação e atualização
  
- **Repositories**: Interfaces (contratos)
  - `IVeiculoRepository.ts`: Contrato do repositório
  
- **Common**: Utilitários de domínio
  - `Result.ts`: Pattern para tratamento de resultados

**Características**:
- ✅ Sem dependências externas
- ✅ Regras de negócio puras
- ✅ Independente de frameworks
- ✅ Fácil de testar

### 2. Infrastructure Layer
**Localização**: `src/infrastructure/`

- **Database**: Gerenciamento de conexões
  - `DatabaseConnection.ts`: Singleton para conexão SQLite
  - Schema do banco de dados
  
- **Repositories**: Implementações concretas
  - `VeiculoRepository.ts`: Implementa `IVeiculoRepository`
  - Queries SQL
  - Mapeamento de dados

**Características**:
- ✅ Implementa interfaces do domínio
- ✅ Isola detalhes técnicos
- ✅ Pode ser substituído facilmente

### 3. Application Layer (Features)
**Localização**: `src/features/`

Aqui entra a **Vertical Slice Architecture**.

## 🔪 Vertical Slice Architecture

Cada feature é uma "fatia vertical" completa:

```
features/
└── veiculos/
    ├── criar/
    │   ├── CriarVeiculoHandler.ts    # Controlador
    │   └── CriarVeiculoSchema.ts     # Validação
    ├── listar/
    │   └── ListarVeiculosHandler.ts
    ├── buscar/
    │   └── BuscarVeiculoHandler.ts
    ├── atualizar/
    │   ├── AtualizarVeiculoHandler.ts
    │   └── AtualizarVeiculoSchema.ts
    ├── deletar/
    │   └── DeletarVeiculoHandler.ts
    └── routes.ts                      # Rotas da feature
```

### Benefícios

1. **Isolamento**: Cada feature é independente
2. **Coesão**: Tudo relacionado a uma operação fica junto
3. **Manutenção**: Fácil localizar e modificar funcionalidades
4. **Escalabilidade**: Adicionar features não afeta as existentes
5. **Deploy**: Possível ativar/desativar features facilmente

### Estrutura de uma Feature

#### Handler (Controlador)
```typescript
export class CriarVeiculoHandler {
  constructor(private readonly repository: IVeiculoRepository) {}
  
  async handle(req: Request, res: Response): Promise<void> {
    // 1. Validação
    // 2. Lógica de negócio
    // 3. Resposta
  }
}
```

#### Schema (Validação)
```typescript
export const CriarVeiculoSchema = z.object({
  marca: z.string().min(1),
  modelo: z.string().min(1),
  // ...
});
```

### 4. Presentation Layer
**Localização**: `src/app.ts`, `src/server.ts`, `src/config/`

- **app.ts**: Configuração do Express
- **server.ts**: Inicialização do servidor
- **config/swagger.ts**: Documentação OpenAPI

## 🔄 Fluxo de uma Requisição

```
1. HTTP Request
   ↓
2. Express Router (routes.ts)
   ↓
3. Handler (ex: CriarVeiculoHandler)
   ↓
4. Validação (Zod Schema)
   ↓
5. Repository (IVeiculoRepository)
   ↓
6. Database (SQLite)
   ↓
7. Response ← ← ← ← ←
```

### Exemplo Completo

```
POST /crud_veiculos/api/veiculos
   ↓
routes.ts → router.post('/', ...)
   ↓
CriarVeiculoHandler.handle()
   ↓
CriarVeiculoSchema.safeParse() ✓
   ↓
repository.criar()
   ↓
VeiculoRepository.criar()
   ↓
DatabaseConnection.getConnection()
   ↓
SQLite INSERT
   ↓
Return Veiculo
   ↓
Response 201 Created
```

## 🎯 Princípios SOLID Aplicados

### Single Responsibility Principle (SRP)
- Cada handler tem uma única responsabilidade
- Repositório só gerencia dados
- Validação separada da lógica de negócio

### Open/Closed Principle (OCP)
- Aberto para extensão (novas features)
- Fechado para modificação (features existentes)

### Liskov Substitution Principle (LSP)
- `VeiculoRepository` pode ser substituído por qualquer implementação de `IVeiculoRepository`

### Interface Segregation Principle (ISP)
- Interfaces específicas e focadas
- `IVeiculoRepository` contém apenas métodos relacionados a veículos

### Dependency Inversion Principle (DIP)
- Handlers dependem de abstrações (`IVeiculoRepository`)
- Não dependem de implementações concretas

## 📦 Padrões de Design

### Repository Pattern
```typescript
interface IVeiculoRepository {
  criar(dto: CriarVeiculoDTO): Promise<Veiculo>;
  buscarPorId(id: string): Promise<Veiculo | null>;
  // ...
}
```

### Result Pattern
```typescript
class Result<T> {
  static ok<U>(value?: U): Result<U>
  static fail<U>(error: string): Result<U>
}
```

### Singleton Pattern
```typescript
class DatabaseConnection {
  private static instance: Database | null = null;
  static async getConnection(): Promise<Database>
}
```

### Factory Pattern
```typescript
export function criarRotasVeiculos(): Router {
  const repository = new VeiculoRepository();
  const handler = new CriarVeiculoHandler(repository);
  // ...
}
```

## 🧪 Testabilidade

### Por que é fácil testar?

1. **Injeção de Dependências**
```typescript
const mockRepository: IVeiculoRepository = {
  criar: jest.fn(),
  // ...
};
const handler = new CriarVeiculoHandler(mockRepository);
```

2. **Interfaces**
```typescript
// Mock simples da interface
const repository = {
  criar: async (dto) => ({ id: '123', ...dto })
};
```

3. **Isolamento**
- Cada feature pode ser testada independentemente
- Sem efeitos colaterais entre features

## 🚀 Escalabilidade

### Adicionar Nova Feature

1. Criar nova pasta em `src/features/veiculos/`
2. Criar Handler
3. Criar Schema (se necessário)
4. Adicionar rota em `routes.ts`

### Adicionar Nova Entidade

1. Criar entidade em `src/domain/entities/`
2. Criar interface de repositório em `src/domain/repositories/`
3. Implementar repositório em `src/infrastructure/repositories/`
4. Criar features em `src/features/nova-entidade/`

## 🔐 Separação de Responsabilidades

```
┌─────────────────────────────────────────────┐
│ src/features/veiculos/criar/                │
│   Handler → Coordena a operação             │
│   Schema  → Valida entrada                  │
├─────────────────────────────────────────────┤
│ src/domain/                                 │
│   Entities     → Estrutura de dados         │
│   Repositories → Contratos                  │
├─────────────────────────────────────────────┤
│ src/infrastructure/                         │
│   Database     → Conexão                    │
│   Repositories → Implementação              │
└─────────────────────────────────────────────┘
```

## 📊 Comparação: Tradicional vs Vertical Slice

### Arquitetura Tradicional (Por Camada)
```
controllers/
  VeiculoController.ts (TODOS os métodos)
services/
  VeiculoService.ts (TODA a lógica)
validators/
  VeiculoValidator.ts (TODAS as validações)
```

**Problemas**:
- Arquivos grandes
- Difícil encontrar código relacionado
- Alto acoplamento

### Vertical Slice Architecture
```
features/veiculos/
  criar/         (tudo sobre criar)
  listar/        (tudo sobre listar)
  atualizar/     (tudo sobre atualizar)
```

**Vantagens**:
- Arquivos pequenos e focados
- Código relacionado junto
- Baixo acoplamento

## 🎓 Conclusão

Esta arquitetura oferece:

✅ **Manutenibilidade**: Fácil encontrar e modificar código
✅ **Testabilidade**: Componentes isolados e mockáveis
✅ **Escalabilidade**: Adicionar features sem quebrar existentes
✅ **Flexibilidade**: Trocar implementações facilmente
✅ **Clareza**: Estrutura clara e previsível

## 📚 Referências

- [Clean Architecture - Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Vertical Slice Architecture - Jimmy Bogard](https://www.jimmybogard.com/vertical-slice-architecture/)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)
