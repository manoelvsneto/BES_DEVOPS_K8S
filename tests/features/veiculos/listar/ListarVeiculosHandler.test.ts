import { ListarVeiculosHandler } from '../../../../src/features/veiculos/listar/ListarVeiculosHandler';
import { MockVeiculoRepository } from '../../../mocks/MockVeiculoRepository';
import { createMockRequest, createMockResponse } from '../../../mocks/MockExpressTypes';
import { veiculosMock } from '../../../fixtures/veiculos.fixture';

describe('ListarVeiculosHandler', () => {
  let handler: ListarVeiculosHandler;
  let repository: MockVeiculoRepository;

  beforeEach(() => {
    repository = new MockVeiculoRepository();
    handler = new ListarVeiculosHandler(repository);
  });

  afterEach(() => {
    repository.clear();
  });

  describe('handle', () => {
    it('deve listar todos os veículos', async () => {
      repository.seed(veiculosMock);

      const req = createMockRequest();
      const res = createMockResponse();

      await handler.handle(req, res);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('sucesso', true);
      expect(res.body).toHaveProperty('dados');
      expect(res.body).toHaveProperty('total', 3);
      expect(res.body.dados).toHaveLength(3);
      expect(res.body.dados[0]).toMatchObject({
        marca: 'Toyota',
        modelo: 'Corolla'
      });
    });

    it('deve retornar lista vazia quando não houver veículos', async () => {
      const req = createMockRequest();
      const res = createMockResponse();

      await handler.handle(req, res);

      expect(res.statusCode).toBe(200);
      expect(res.body.sucesso).toBe(true);
      expect(res.body.dados).toEqual([]);
      expect(res.body.total).toBe(0);
    });

    it('deve retornar todos os campos dos veículos', async () => {
      repository.seed([veiculosMock[0]]);

      const req = createMockRequest();
      const res = createMockResponse();

      await handler.handle(req, res);

      expect(res.statusCode).toBe(200);
      const veiculo = res.body.dados[0];
      expect(veiculo).toHaveProperty('id');
      expect(veiculo).toHaveProperty('marca');
      expect(veiculo).toHaveProperty('modelo');
      expect(veiculo).toHaveProperty('ano');
      expect(veiculo).toHaveProperty('placa');
      expect(veiculo).toHaveProperty('cor');
      expect(veiculo).toHaveProperty('criadoEm');
      expect(veiculo).toHaveProperty('atualizadoEm');
    });
  });
});
