# Guia de Configuração do Azure Pipelines

## 📋 Visão Geral

Este projeto inclui 3 pipelines do Azure DevOps:

1. **azure-pipelines.yml** - Pipeline completo (CI/CD)
2. **azure-pipelines-ci.yml** - Apenas CI (Testes e SonarCloud)
3. **azure-pipelines-cd.yml** - Apenas CD (Docker e Kubernetes)

## 🔧 Pré-requisitos

### 1. Azure DevOps Project
- Crie um projeto no Azure DevOps
- Importe este repositório

### 2. Service Connections

Crie as seguintes Service Connections no Azure DevOps:

#### SonarCloud Connection
1. Vá em **Project Settings** > **Service connections**
2. Clique em **New service connection**
3. Selecione **SonarCloud**
4. Nome: `SonarCloud-Connection`
5. Token: Gere em https://sonarcloud.io/account/security
6. Organização: `manoelvsneto`

#### Docker Hub Connection
1. **New service connection** > **Docker Registry**
2. Registry type: **Docker Hub**
3. Nome: `DockerHub-Connection`
4. Docker ID: Seu username do Docker Hub
5. Docker Password: Seu token/senha

#### Kubernetes Connection
1. **New service connection** > **Kubernetes**
2. Nome: `Kubernetes-Connection`
3. Método: **KubeConfig**
4. Cole seu arquivo kubeconfig

### 3. Variable Group

Crie um Variable Group chamado `crud-veiculos-secrets`:

1. Vá em **Pipelines** > **Library**
2. **+ Variable group**
3. Nome: `crud-veiculos-secrets`
4. Adicione as variáveis:

| Nome | Valor | Secreto |
|------|-------|---------|
| DOCKER_USERNAME | seu-username-dockerhub | Não |
| DOCKER_PASSWORD | seu-token-dockerhub | Sim |
| SONAR_TOKEN | seu-token-sonarcloud | Sim |

### 4. SonarCloud Setup

1. Acesse https://sonarcloud.io
2. Faça login com GitHub/Azure DevOps
3. Crie nova organização: `manoelvsneto`
4. Importe o projeto `BES_DEVOPS_K8S`
5. Gere token em **My Account** > **Security**
6. Atualize variáveis no pipeline se necessário

## 🚀 Configuração dos Pipelines

### Pipeline Completo (CI/CD)

Arquivo: `azure-pipelines.yml`

```yaml
# Edite estas variáveis conforme seu ambiente:
variables:
  sonarCloudOrganization: 'manoelvsneto'
  sonarCloudProjectKey: 'manoelvsneto_BES_DEVOPS_K8S'
  sonarCloudProjectName: 'BES_DEVOPS_K8S'
```

**Criar Pipeline:**
1. **Pipelines** > **New pipeline**
2. Selecione **Azure Repos Git** (ou GitHub)
3. Selecione seu repositório
4. **Existing Azure Pipelines YAML file**
5. Caminho: `/azure-pipelines.yml`
6. **Run**

### Pipeline CI (Apenas Testes)

Arquivo: `azure-pipelines-ci.yml`

**Para que serve:**
- Executa em todos os branches e PRs
- Build e testes unitários
- Análise de código com SonarCloud
- Relatórios de cobertura

**Criar Pipeline:**
1. **Pipelines** > **New pipeline**
2. Caminho: `/azure-pipelines-ci.yml`
3. Renomeie para `CI - Build and Test`

### Pipeline CD (Deploy)

Arquivo: `azure-pipelines-cd.yml`

**Para que serve:**
- Executa apenas na branch `main`
- Build e push da imagem Docker
- Deploy no Kubernetes
- Smoke tests

**Criar Pipeline:**
1. **Pipelines** > **New pipeline**
2. Caminho: `/azure-pipelines-cd.yml`
3. Renomeie para `CD - Deploy`

## 📊 Dashboards e Relatórios

### SonarCloud

Após a primeira execução, visualize:
- Quality Gate status
- Code coverage
- Code smells, bugs, vulnerabilities
- Technical debt

Acesse: https://sonarcloud.io/dashboard?id=manoelvsneto_BES_DEVOPS_K8S

### Azure DevOps

No Azure DevOps, você verá:
- **Test Results** - Resultados dos testes unitários
- **Code Coverage** - Cobertura de código
- **Build Artifacts** - Artefatos gerados
- **Release History** - Histórico de deployments

## 🔐 Secrets e Segurança

### Variáveis Secretas

Marque como secretas:
- `DOCKER_PASSWORD`
- `SONAR_TOKEN`
- Tokens do Kubernetes

### Boas Práticas

✅ **Faça:**
- Use Variable Groups para secrets
- Marque secrets como "Secret"
- Rotacione tokens periodicamente
- Use Service Connections

❌ **Evite:**
- Hardcode de secrets no YAML
- Commit de secrets no repositório
- Compartilhamento de tokens

## 🎯 Ambientes

### Criar Environment

1. **Pipelines** > **Environments**
2. **New environment**
3. Nome: `production-k8s`
4. Resource: **Kubernetes**
5. Configure aprovações (opcional)

### Aprovações Manuais

Para adicionar aprovação antes do deploy:

1. Vá no environment `production-k8s`
2. **Approvals and checks**
3. **+ Add** > **Approvals**
4. Adicione aprovadores

## 🔄 Triggers

### Branch Triggers

```yaml
trigger:
  branches:
    include:
      - main
      - develop
    exclude:
      - feature/*
```

### PR Triggers

```yaml
pr:
  branches:
    include:
      - main
  paths:
    exclude:
      - '*.md'
```

### Scheduled Triggers

Para executar testes diariamente:

```yaml
schedules:
  - cron: "0 2 * * *"
    displayName: 'Nightly build'
    branches:
      include:
        - main
    always: true
```

## 🐛 Troubleshooting

### Problema: SonarCloud Analysis Failed

**Solução:**
1. Verifique token do SonarCloud
2. Confirme organização e project key
3. Verifique se projeto existe no SonarCloud

### Problema: Docker Push Failed

**Solução:**
1. Verifique credenciais do Docker Hub
2. Confirme Service Connection
3. Verifique limites de rate do Docker Hub

### Problema: Kubernetes Deploy Failed

**Solução:**
1. Valide kubeconfig
2. Verifique permissões do service account
3. Confirme namespace existe

### Problema: Tests Failing

**Solução:**
1. Execute testes localmente: `npm test`
2. Verifique logs do pipeline
3. Confirme dependências instaladas

## 📝 Customização

### Adicionar Notification

Para receber notificações:

1. **Project Settings** > **Service hooks**
2. **+ Create subscription**
3. Selecione serviço (Slack, Teams, Email)
4. Configure filtros (build failed, etc.)

### Modificar Quality Gate

Edite no arquivo `sonar-project.properties`:

```properties
sonar.qualitygate.wait=true
sonar.qualitygate.timeout=300
```

### Adicionar Stages

Adicione stages customizados no YAML:

```yaml
- stage: IntegrationTests
  displayName: 'Integration Tests'
  dependsOn: BuildAndTest
  jobs:
    - job: RunTests
      steps:
        # seus steps aqui
```

## 📚 Recursos Adicionais

- [Azure Pipelines Documentation](https://docs.microsoft.com/azure/devops/pipelines/)
- [SonarCloud Documentation](https://docs.sonarcloud.io/)
- [Docker Hub](https://hub.docker.com/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)

## ✅ Checklist de Deploy

Antes de executar o pipeline completo:

- [ ] Service connections configuradas
- [ ] Variable group criado
- [ ] SonarCloud project criado
- [ ] Docker Hub account configurado
- [ ] Kubernetes cluster acessível
- [ ] Environment criado no Azure DevOps
- [ ] Testes passando localmente
- [ ] Dockerfile validado

## 🎉 Pronto!

Agora você tem um pipeline completo com:
- ✅ Testes unitários automatizados
- ✅ Análise de código com SonarCloud
- ✅ Build e push de imagem Docker
- ✅ Deploy automático no Kubernetes
- ✅ Smoke tests pós-deploy

Execute o pipeline e monitore o progresso! 🚀
