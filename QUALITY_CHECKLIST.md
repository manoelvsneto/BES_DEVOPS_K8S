# Checklist de Qualidade

## ✅ Antes de Fazer Commit

Execute este checklist antes de cada commit:

### 1. Testes
- [ ] Todos os testes passam: `npm test`
- [ ] Cobertura adequada: `npm run test:coverage`
- [ ] Sem testes ignorados (.skip) esquecidos

### 2. Código
- [ ] Build compila sem erros: `npm run build`
- [ ] Sem console.log esquecidos (exceto logs apropriados)
- [ ] Código formatado corretamente
- [ ] Imports organizados

### 3. Documentação
- [ ] README atualizado se necessário
- [ ] Comentários em código complexo
- [ ] Swagger/OpenAPI atualizado se mudou API

### 4. Testes Novos
Se adicionou nova funcionalidade:
- [ ] Testes unitários criados
- [ ] Casos de sucesso testados
- [ ] Casos de erro testados
- [ ] Edge cases considerados

### 5. Validação Automática
Execute o script de validação:
```bash
npm run validate
```

Ou use o pre-commit:
```bash
npm run precommit
```

## ✅ Antes de Pull Request

- [ ] Todos os itens acima ✓
- [ ] Branch atualizada com main/develop
- [ ] Sem conflitos
- [ ] Descrição clara do PR
- [ ] Screenshots se mudança visual
- [ ] Testes de integração passam

## ✅ Antes de Deploy

- [ ] Todos os testes passam em CI/CD
- [ ] Build de produção testado localmente
- [ ] Variáveis de ambiente configuradas
- [ ] Migrations/schemas do banco revisados
- [ ] Rollback plan preparado

## 🎯 Métricas de Qualidade

### Cobertura de Testes
- **Mínimo Aceitável**: 80%
- **Meta**: 90%+
- **Excelente**: 95%+

### Performance dos Testes
- Cada teste: < 100ms
- Suite completa: < 10s
- Com cobertura: < 15s

### Complexidade
- Funções: < 10 linhas (idealmente)
- Classes: < 200 linhas
- Arquivos: < 300 linhas
- Complexidade ciclomática: < 10

## 🚀 Scripts Úteis

```bash
# Validação completa
npm run validate

# Pre-commit check
npm run precommit

# Testes em watch mode
npm run test:watch

# Cobertura visual
npm run test:coverage
# Abrir: coverage/lcov-report/index.html

# Build e testes
npm run build && npm test

# Limpar e reinstalar
rm -rf node_modules dist coverage
npm install
```

## 📝 Boas Práticas

### Commits
- Mensagens claras e descritivas
- Um commit por mudança lógica
- Prefixos úteis: feat:, fix:, test:, docs:, refactor:

### Testes
- Nome descritivo: "deve fazer X quando Y"
- Arrange-Act-Assert
- Um assert por conceito
- Mocks para dependências externas

### Código
- SOLID principles
- DRY (Don't Repeat Yourself)
- KISS (Keep It Simple, Stupid)
- YAGNI (You Aren't Gonna Need It)

## 🔧 Configuração do Git Hooks (Opcional)

Para executar validações automaticamente:

### 1. Instalar husky
```bash
npm install --save-dev husky
npx husky install
```

### 2. Adicionar pre-commit hook
```bash
npx husky add .husky/pre-commit "npm run precommit"
```

### 3. Adicionar pre-push hook
```bash
npx husky add .husky/pre-push "npm test"
```

## 📊 Monitoramento Contínuo

- CI/CD deve executar todos os testes
- Relatórios de cobertura devem ser gerados
- Builds devem ser validados antes de merge
- Deploy automático apenas se testes passarem

---

**Lembre-se**: Qualidade é responsabilidade de todos! 🎯
