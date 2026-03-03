import { AtualizarVeiculoHandler } from '../../../../src/features/veiculos/atualizar/AtualizarVeiculoHandler';
import { MockVeiculoRepository } from '../../../mocks/MockVeiculoRepository';
import { createMockRequest, createMockResponse } from '../../../mocks/MockExpressTypes';
import { veiculoMock, atualizarVeiculoDtoMock } from '../../../fixtures/veiculos.fixture';

describe('AtualizarVeiculoHandler', () => {
  let handler: AtualizarVeiculoHandler;
  let repository: MockVeiculoRepository;

  beforeEach(() => {
    repository = new MockVeiculoRepository();
    handler = new AtualizarVeiculoHandler(repository);
  });

  afterEach(() => {
    repository.clear();
  });

  describe('handle', () => {
    it('deve atualizar um veículo existente', async () => {
      repository.seed([veiculoMock]);

      const req = createMockRequest({
        params: { id: veiculoMock.id },
        body: atualizarVeiculoDtoMock
      });
      const res = createMockResponse();

      await handler.handle(req, res);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('sucesso', true);
      expect(res.body).toHaveProperty('dados');
      expect(res.body.dados.cor).toBe(atualizarVeiculoDtoMock.cor);
      expect(res.body.dados.ano).toBe(atualizarVeiculoDtoMock.ano);
      expect(res.body.dados.marca).toBe(veiculoMock.marca); // Não alterado
    });

    it('deve atualizar apenas os campos fornecidos', async () => {
      repository.seed([veiculoMock]);

      const req = createMockRequest({
        params: { id: veiculoMock.id },
        body: { cor: 'Verde' }
      });
      const res = createMockResponse();

      await handler.handle(req, res);

      expect(res.statusCode).toBe(200);
      expect(res.body.dados.cor).toBe('Verde');
      expect(res.body.dados.marca).toBe(veiculoMock.marca);
      expect(res.body.dados.modelo).toBe(veiculoMock.modelo);
      expect(res.body.dados.ano).toBe(veiculoMock.ano);
    });

    it('deve retornar erro 404 quando veículo não existir', async () => {
      const req = createMockRequest({
        params: { id: 'id-inexistente' },
        body: atualizarVeiculoDtoMock
      });
      const res = createMockResponse();

      await handler.handle(req, res);

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('sucesso', false);
      expect(res.body).toHaveProperty('erro', 'Veículo não encontrado');
    });

    it('deve retornar erro 400 quando ID não for fornecido', async () => {
      const req = createMockRequest({
        params: {},
        body: atualizarVeiculoDtoMock
      });
      const res = createMockResponse();

      await handler.handle(req, res);

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('sucesso', false);
      expect(res.body).toHaveProperty('erro', 'ID é obrigatório');
    });

    it('deve retornar erro 400 quando dados forem inválidos', async () => {
      repository.seed([veiculoMock]);

      const req = createMockRequest({
        params: { id: veiculoMock.id },
        body: { ano: 1800 } // Ano inválido
      });
      const res = createMockResponse();

      await handler.handle(req, res);

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('sucesso', false);
      expect(res.body).toHaveProperty('erro', 'Dados inválidos');
    });

    it('deve validar formato de placa ao atualizar', async () => {
      repository.seed([veiculoMock]);

      const req = createMockRequest({
        params: { id: veiculoMock.id },
        body: { placa: 'INVALIDA' }
      });
      const res = createMockResponse();

      await handler.handle(req, res);

      expect(res.statusCode).toBe(400);
      expect(res.body.sucesso).toBe(false);
    });

    it('deve aceitar atualização com corpo vazio (sem alterações)', async () => {
      repository.seed([veiculoMock]);

      const req = createMockRequest({
        params: { id: veiculoMock.id },
        body: {}
      });
      const res = createMockResponse();

      await handler.handle(req, res);

      expect(res.statusCode).toBe(200);
      expect(res.body.sucesso).toBe(true);
    });
  });
});
