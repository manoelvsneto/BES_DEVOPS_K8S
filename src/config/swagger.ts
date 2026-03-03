export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'API CRUD de Veículos',
    version: '1.0.0',
    description: 'API para gerenciamento de veículos com Clean Architecture e Vertical Slice',
    contact: {
      name: 'Suporte',
      email: 'suporte@exemplo.com'
    }
  },
  servers: [
    {
      url: 'https://alpaca-simple-newly.ngrok-free.app/crud_veiculos',
      description: 'Servidor de Produção'
    },
    {
      url: 'http://localhost:3000/crud_veiculos',
      description: 'Servidor de Desenvolvimento'
    }
  ],
  tags: [
    {
      name: 'Veículos',
      description: 'Operações de CRUD de veículos'
    }
  ],
  paths: {
    '/api/veiculos': {
      get: {
        tags: ['Veículos'],
        summary: 'Listar todos os veículos',
        description: 'Retorna uma lista com todos os veículos cadastrados',
        responses: {
          '200': {
            description: 'Lista de veículos retornada com sucesso',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    sucesso: { type: 'boolean', example: true },
                    dados: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/Veiculo' }
                    },
                    total: { type: 'number', example: 10 }
                  }
                }
              }
            }
          }
        }
      },
      post: {
        tags: ['Veículos'],
        summary: 'Criar novo veículo',
        description: 'Cadastra um novo veículo no sistema',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CriarVeiculo' }
            }
          }
        },
        responses: {
          '201': {
            description: 'Veículo criado com sucesso',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    sucesso: { type: 'boolean', example: true },
                    dados: { $ref: '#/components/schemas/Veiculo' }
                  }
                }
              }
            }
          },
          '400': {
            description: 'Dados inválidos',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Erro' }
              }
            }
          },
          '409': {
            description: 'Placa já cadastrada',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Erro' }
              }
            }
          }
        }
      }
    },
    '/api/veiculos/{id}': {
      get: {
        tags: ['Veículos'],
        summary: 'Buscar veículo por ID',
        description: 'Retorna um veículo específico pelo ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'ID do veículo',
            schema: { type: 'string', format: 'uuid' }
          }
        ],
        responses: {
          '200': {
            description: 'Veículo encontrado',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    sucesso: { type: 'boolean', example: true },
                    dados: { $ref: '#/components/schemas/Veiculo' }
                  }
                }
              }
            }
          },
          '404': {
            description: 'Veículo não encontrado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Erro' }
              }
            }
          }
        }
      },
      put: {
        tags: ['Veículos'],
        summary: 'Atualizar veículo',
        description: 'Atualiza os dados de um veículo existente',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'ID do veículo',
            schema: { type: 'string', format: 'uuid' }
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/AtualizarVeiculo' }
            }
          }
        },
        responses: {
          '200': {
            description: 'Veículo atualizado com sucesso',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    sucesso: { type: 'boolean', example: true },
                    dados: { $ref: '#/components/schemas/Veiculo' }
                  }
                }
              }
            }
          },
          '404': {
            description: 'Veículo não encontrado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Erro' }
              }
            }
          }
        }
      },
      delete: {
        tags: ['Veículos'],
        summary: 'Deletar veículo',
        description: 'Remove um veículo do sistema',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'ID do veículo',
            schema: { type: 'string', format: 'uuid' }
          }
        ],
        responses: {
          '200': {
            description: 'Veículo deletado com sucesso',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    sucesso: { type: 'boolean', example: true },
                    mensagem: { type: 'string', example: 'Veículo deletado com sucesso' }
                  }
                }
              }
            }
          },
          '404': {
            description: 'Veículo não encontrado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Erro' }
              }
            }
          }
        }
      }
    }
  },
  components: {
    schemas: {
      Veiculo: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid', example: '123e4567-e89b-12d3-a456-426614174000' },
          marca: { type: 'string', example: 'Toyota' },
          modelo: { type: 'string', example: 'Corolla' },
          ano: { type: 'number', example: 2023 },
          placa: { type: 'string', example: 'ABC1D23' },
          cor: { type: 'string', example: 'Prata' },
          criadoEm: { type: 'string', format: 'date-time', example: '2024-01-01T12:00:00.000Z' },
          atualizadoEm: { type: 'string', format: 'date-time', example: '2024-01-01T12:00:00.000Z' }
        }
      },
      CriarVeiculo: {
        type: 'object',
        required: ['marca', 'modelo', 'ano', 'placa', 'cor'],
        properties: {
          marca: { type: 'string', example: 'Toyota' },
          modelo: { type: 'string', example: 'Corolla' },
          ano: { type: 'number', example: 2023 },
          placa: { type: 'string', example: 'ABC1D23', description: 'Formato: ABC1D23 ou ABC1234' },
          cor: { type: 'string', example: 'Prata' }
        }
      },
      AtualizarVeiculo: {
        type: 'object',
        properties: {
          marca: { type: 'string', example: 'Toyota' },
          modelo: { type: 'string', example: 'Corolla' },
          ano: { type: 'number', example: 2023 },
          placa: { type: 'string', example: 'ABC1D23' },
          cor: { type: 'string', example: 'Prata' }
        }
      },
      Erro: {
        type: 'object',
        properties: {
          sucesso: { type: 'boolean', example: false },
          erro: { type: 'string', example: 'Mensagem de erro' },
          detalhes: { type: 'array', items: { type: 'object' } }
        }
      }
    }
  }
};
