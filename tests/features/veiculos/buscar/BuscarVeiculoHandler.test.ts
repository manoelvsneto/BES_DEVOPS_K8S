import { BuscarVeiculoHandler } from '../../../../src/features/veiculos/buscar/BuscarVeiculoHandler';
import { MockVeiculoRepository } from '../../../mocks/MockVeiculoRepository';
import { createMockRequest, createMockResponse } from '../../../mocks/MockExpressTypes';
import { veiculoMock, veiculosMock } from '../../../fixtures/veiculos.fixture';

describe('BuscarVeiculoHandler', () => {
  let handler: BuscarVeiculoHandler;
  let repository: MockVeiculoRepository;

  beforeEach(() => {
    repository = new MockVeiculoRepository();
    handler = new BuscarVeiculoHandler(repository);
  });

  afterEach(() => {
    repository.clear();
  });

  describe('handle', () => {
    it('deve buscar um veículo por ID existente', async () => {
      repository.seed([veiculoMock]);

      const req = createMockRequest({
        params: { id: veiculoMock.id }
      });
      const res = createMockResponse();

      await handler.handle(req, res);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('sucesso', true);
      expect(res.body).toHaveProperty('dados');
      expect(res.body.dados).toMatchObject({
        id: veiculoMock.id,
        marca: veiculoMock.marca,
        modelo: veiculoMock.modelo,
        ano: veiculoMock.ano,
        placa: veiculoMock.placa,
        cor: veiculoMock.cor
      });
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

    it('deve retornar o veículo correto quando houver múltiplos veículos', async () => {
      repository.seed(veiculosMock);

      const veiculoEsperado = veiculosMock[1];
      const req = createMockRequest({
        params: { id: veiculoEsperado.id }
      });
      const res = createMockResponse();

      await handler.handle(req, res);

      expect(res.statusCode).toBe(200);
      expect(res.body.dados.id).toBe(veiculoEsperado.id);
      expect(res.body.dados.marca).toBe(veiculoEsperado.marca);
    });
  });
});
