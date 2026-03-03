import { DeletarVeiculoHandler } from '../../../../src/features/veiculos/deletar/DeletarVeiculoHandler';
import { MockVeiculoRepository } from '../../../mocks/MockVeiculoRepository';
import { createMockRequest, createMockResponse } from '../../../mocks/MockExpressTypes';
import { veiculoMock, veiculosMock } from '../../../fixtures/veiculos.fixture';

describe('DeletarVeiculoHandler', () => {
  let handler: DeletarVeiculoHandler;
  let repository: MockVeiculoRepository;

  beforeEach(() => {
    repository = new MockVeiculoRepository();
    handler = new DeletarVeiculoHandler(repository);
  });

  afterEach(() => {
    repository.clear();
  });

  describe('handle', () => {
    it('deve deletar um veículo existente', async () => {
      repository.seed([veiculoMock]);

      const req = createMockRequest({
        params: { id: veiculoMock.id }
      });
      const res = createMockResponse();

      await handler.handle(req, res);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('sucesso', true);
      expect(res.body).toHaveProperty('mensagem', 'Veículo deletado com sucesso');

      // Verificar se realmente foi deletado
      const veiculos = await repository.listarTodos();
      expect(veiculos).toHaveLength(0);
    });

    it('deve retornar erro 404 quando veículo não existir', async () => {
      const req = createMockRequest({
        params: { id: 'id-inexistente' }
      });
      const res = createMockResponse();

      await handler.handle(req, res);

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('sucesso', false);
      expect(res.body).toHaveProperty('erro', 'Veículo não encontrado');
    });

    it('deve retornar erro 400 quando ID não for fornecido', async () => {
      const req = createMockRequest({
        params: {}
      });
      const res = createMockResponse();

      await handler.handle(req, res);

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('sucesso', false);
      expect(res.body).toHaveProperty('erro', 'ID é obrigatório');
    });

    it('deve deletar apenas o veículo especificado', async () => {
      repository.seed(veiculosMock);

      const veiculoParaDeletar = veiculosMock[1];
      const req = createMockRequest({
        params: { id: veiculoParaDeletar.id }
      });
      const res = createMockResponse();

      await handler.handle(req, res);

      expect(res.statusCode).toBe(200);
      expect(res.body.sucesso).toBe(true);

      const veiculosRestantes = await repository.listarTodos();
      expect(veiculosRestantes).toHaveLength(2);
      expect(veiculosRestantes.find(v => v.id === veiculoParaDeletar.id)).toBeUndefined();
      expect(veiculosRestantes.find(v => v.id === veiculosMock[0].id)).toBeDefined();
      expect(veiculosRestantes.find(v => v.id === veiculosMock[2].id)).toBeDefined();
    });

    it('não deve permitir deletar o mesmo veículo duas vezes', async () => {
      repository.seed([veiculoMock]);

      const req1 = createMockRequest({ params: { id: veiculoMock.id } });
      const res1 = createMockResponse();

      await handler.handle(req1, res1);
      expect(res1.statusCode).toBe(200);

      const req2 = createMockRequest({ params: { id: veiculoMock.id } });
      const res2 = createMockResponse();

      await handler.handle(req2, res2);
      expect(res2.statusCode).toBe(404);
      expect(res2.body.erro).toBe('Veículo não encontrado');
    });
  });
});
