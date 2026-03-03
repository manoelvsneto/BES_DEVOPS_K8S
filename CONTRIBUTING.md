# Guia de Contribuição

Obrigado por considerar contribuir com este projeto! 🎉

## 📋 Índice

- [Começando](#começando)
- [Desenvolvimento](#desenvolvimento)
- [Testes](#testes)
- [Pull Requests](#pull-requests)
- [Padrões de Código](#padrões-de-código)

## 🚀 Começando

### 1. Fork e Clone

```bash
# Fork o repositório no GitHub
# Clone seu fork
git clone https://github.com/SEU-USUARIO/BES_DEVOPS_K8S.git
cd BES_DEVOPS_K8S

# Adicione o repositório original como upstream
git remote add upstream https://github.com/manoelvsneto/BES_DEVOPS_K8S.git
```

### 2. Instale as Dependências

```bash
npm install
```

### 3. Configure o Ambiente

```bash
cp .env.example .env
# Edite .env conforme necessário
```

### 4. Rode os Testes

```bash
npm test
```

## 💻 Desenvolvimento

### Estrutura de Branch

- `main` - Produção, sempre estável
- `develop` - Desenvolvimento, base para features
- `feature/nome-da-feature` - Novas funcionalidades
- `fix/nome-do-bug` - Correções de bugs
- `test/nome-dos-testes` - Adição/melhoria de testes

### Criando uma Nova Feature

```bash
# Atualize sua branch develop
git checkout develop
git pull upstream develop

# Crie nova branch para feature
git checkout -b feature/minha-nova-feature

# Faça suas alterações...
# Commit frequentemente com mensagens claras
git add .
git commit -m "feat: adiciona funcionalidade X"

# Execute os testes
npm test

# Valide antes de push
npm run validate

# Push para seu fork
git push origin feature/minha-nova-feature
```

## 🧪 Testes

### Executando Testes

```bash
# Todos os testes
npm test

# Watch mode (recomendado durante desenvolvimento)
npm run test:watch

# Cobertura de código
npm run test:coverage

# Verbose (para debugging)
npm run test:verbose

# Apenas um arquivo
npm test -- CriarVeiculoHandler

# Apenas um teste específico
npm test -- -t "deve criar um veículo"
```

### Escrevendo Testes

#### 1. Localização
Coloque os testes na estrutura que reflete o código:
```
src/features/veiculos/criar/CriarVeiculoHandler.ts
tests/features/veiculos/criar/CriarVeiculoHandler.test.ts
```

#### 2. Estrutura do Teste

```typescript
import { Handler } from '../../../src/features/.../Handler';
import { MockRepository } from '../../mocks/MockRepository';
import { createMockRequest, createMockResponse } from '../../mocks/MockExpressTypes';

describe('Nome do Handler/Classe', () => {
  let handler: Handler;
  let repository: MockRepository;

  beforeEach(() => {
    // Setup antes de cada teste
    repository = new MockRepository();
    handler = new Handler(repository);
  });

  afterEach(() => {
    // Cleanup após cada teste
    repository.clear();
  });

  describe('método ou funcionalidade', () => {
    it('deve fazer X quando Y', async () => {
      // Arrange (preparar)
      const req = createMockRequest({ body: dadosDeTeste });
      const res = createMockResponse();

      // Act (agir)
      await handler.handle(req, res);

      // Assert (verificar)
      expect(res.statusCode).toBe(200);
      expect(res.body.sucesso).toBe(true);
    });

    it('deve retornar erro quando dados inválidos', async () => {
      // Testar caso de erro
    });
  });
});
```

#### 3. Boas Práticas de Teste

✅ **Faça:**
- Um teste por comportamento
- Nome descritivo: "deve X quando Y"
- Arrange-Act-Assert
- Testes independentes
- Mocks para dependências externas

❌ **Evite:**
- Testes dependentes (ordem importa)
- Lógica complexa nos testes
- Múltiplos asserts não relacionados
- Testes sem assertions
- Hardcoded sleeps/timeouts

#### 4. Cobertura Esperada

Ao adicionar nova funcionalidade, garanta:
- **Casos de sucesso**: Fluxo feliz funcionando
- **Validações**: Dados inválidos retornam erro apropriado
- **Edge cases**: Valores limites, strings vazias, null, undefined
- **Erros**: Tratamento de exceções

Meta de cobertura: **≥ 90%**

## 📝 Pull Requests

### Antes de Abrir um PR

1. **Testes passam?**
   ```bash
   npm test
   ```

2. **Build funciona?**
   ```bash
   npm run build
   ```

3. **Cobertura adequada?**
   ```bash
   npm run test:coverage
   ```

4. **Code style ok?**
   ```bash
   npm run lint  # se configurado
   ```

5. **Branch atualizada?**
   ```bash
   git pull upstream develop
   ```

### Título do PR

Use prefixos convencionais:
- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `test:` - Adicionar/melhorar testes
- `docs:` - Documentação
- `refactor:` - Refatoração de código
- `perf:` - Melhoria de performance
- `chore:` - Tarefas de manutenção

Exemplos:
- `feat: adiciona endpoint de busca por placa`
- `fix: corrige validação de formato de data`
- `test: adiciona testes para DeletarVeiculoHandler`

### Descrição do PR

Inclua:
- **O quê**: Resumo da mudança
- **Por quê**: Motivação/contexto
- **Como**: Abordagem técnica (se relevante)
- **Testes**: Como testar manualmente (se aplicável)
- **Screenshots**: Se mudança visual
- **Breaking changes**: Se houver

Template:
```markdown
## Descrição
Breve descrição da mudança.

## Motivação e Contexto
Por que essa mudança é necessária?

## Como foi testado?
- [ ] Testes unitários
- [ ] Testes manuais
- [ ] Teste em ambiente local

## Checklist
- [ ] Testes passam
- [ ] Cobertura ≥ 90%
- [ ] Documentação atualizada
- [ ] Sem breaking changes (ou documentados)
```

## 🎨 Padrões de Código

### TypeScript

```typescript
// ✅ Bom
interface UserDTO {
  nome: string;
  email: string;
}

function criarUsuario(dto: UserDTO): User {
  // lógica
}

// ❌ Evite
function criarUsuario(nome: any, email: any): any {
  // lógica
}
```

### Nomenclatura

- **Classes**: PascalCase - `VeiculoRepository`
- **Interfaces**: PascalCase com I prefix - `IVeiculoRepository`
- **Métodos/Funções**: camelCase - `buscarPorId`
- **Variáveis**: camelCase - `veiculoId`
- **Constantes**: UPPER_SNAKE_CASE - `MAX_RESULTS`
- **Arquivos**: kebab-case ou PascalCase dependendo do conteúdo

### Arquitetura

Este projeto usa:
- **Clean Architecture**: Domain, Infrastructure, Application
- **Vertical Slice Architecture**: Features auto-contidas
- **SOLID Principles**
- **Repository Pattern**

Ao adicionar código:
1. Domínio vai em `src/domain/`
2. Infraestrutura em `src/infrastructure/`
3. Features em `src/features/[entidade]/[acao]/`

### Comentários

```typescript
// ✅ Commente o "por quê", não o "o quê"
// Usamos regex porque placas antigas e Mercosul têm formatos diferentes
const placaRegex = /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/;

// ❌ Evite comentários óbvios
// Define a variável id
const id = '123';
```

## 🤝 Código de Conduta

- Seja respeitoso e profissional
- Dê feedback construtivo
- Aceite críticas com mente aberta
- Foque no que é melhor para o projeto

## 📞 Dúvidas?

- Abra uma [Issue](https://github.com/manoelvsneto/BES_DEVOPS_K8S/issues)
- Consulte a documentação:
  - [README.md](README.md)
  - [TESTING.md](TESTING.md)
  - [ARCHITECTURE.md](ARCHITECTURE.md)

## 🙏 Obrigado!

Sua contribuição é muito valiosa! 🚀
