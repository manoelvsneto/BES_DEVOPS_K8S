import { CriarVeiculoHandler } from '../../../../src/features/veiculos/criar/CriarVeiculoHandler';
import { MockVeiculoRepository } from '../../../mocks/MockVeiculoRepository';
import { createMockRequest, createMockResponse } from '../../../mocks/MockExpressTypes';
import { criarVeiculoDtoMock } from '../../../fixtures/veiculos.fixture';

describe('CriarVeiculoHandler', () => {
  let handler: CriarVeiculoHandler;
  let repository: MockVeiculoRepository;

  beforeEach(() => {
    repository = new MockVeiculoRepository();
    handler = new CriarVeiculoHandler(repository);
  });

  afterEach(() => {
    repository.clear();
  });

  describe('handle', () => {
    it('deve criar um veículo com dados válidos', async () => {
      const req = createMockRequest({ body: criarVeiculoDtoMock });
      const res = createMockResponse();

      await handler.handle(req, res);

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('sucesso', true);
      expect(res.body).toHaveProperty('dados');
      expect(res.body.dados).toMatchObject({
        marca: criarVeiculoDtoMock.marca,
        modelo: criarVeiculoDtoMock.modelo,
        ano: criarVeiculoDtoMock.ano,
        placa: criarVeiculoDtoMock.placa,
        cor: criarVeiculoDtoMock.cor
      });
      expect(res.body.dados).toHaveProperty('id');
      expect(res.body.dados).toHaveProperty('criadoEm');
      expect(res.body.dados).toHaveProperty('atualizadoEm');
    });

    it('deve retornar erro 400 quando marca estiver ausente', async () => {
      const req = createMockRequest({
        body: { ...criarVeiculoDtoMock, marca: undefined }
      });
      const res = createMockResponse();

      await handler.handle(req, res);

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('sucesso', false);
      expect(res.body).toHaveProperty('erro', 'Dados inválidos');
      expect(res.body).toHaveProperty('detalhes');
    });

    it('deve retornar erro 400 quando modelo estiver ausente', async () => {
      const req = createMockRequest({
        body: { ...criarVeiculoDtoMock, modelo: undefined }
      });
      const res = createMockResponse();

      await handler.handle(req, res);

      expect(res.statusCode).toBe(400);
      expect(res.body.sucesso).toBe(false);
    });

    it('deve retornar erro 400 quando ano for inválido', async () => {
      const req = createMockRequest({
        body: { ...criarVeiculoDtoMock, ano: 1800 }
      });
      const res = createMockResponse();

      await handler.handle(req, res);

      expect(res.statusCode).toBe(400);
      expect(res.body.sucesso).toBe(false);
    });

    it('deve retornar erro 400 quando placa for inválida', async () => {
      const req = createMockRequest({
        body: { ...criarVeiculoDtoMock, placa: 'INVALIDA' }
      });
      const res = createMockResponse();

      await handler.handle(req, res);

      expect(res.statusCode).toBe(400);
      expect(res.body.sucesso).toBe(false);
      expect(res.body.detalhes).toBeDefined();
    });

    it('deve retornar erro 400 quando cor estiver ausente', async () => {
      const req = createMockRequest({
        body: { ...criarVeiculoDtoMock, cor: undefined }
      });
      const res = createMockResponse();

      await handler.handle(req, res);

      expect(res.statusCode).toBe(400);
      expect(res.body.sucesso).toBe(false);
    });

    it('deve aceitar placa no formato Mercosul (ABC1D23)', async () => {
      const req = createMockRequest({
        body: { ...criarVeiculoDtoMock, placa: 'ABC1D23' }
      });
      const res = createMockResponse();

      await handler.handle(req, res);

      expect(res.statusCode).toBe(201);
      expect(res.body.sucesso).toBe(true);
      expect(res.body.dados.placa).toBe('ABC1D23');
    });

    it('deve aceitar placa no formato antigo (ABC1234)', async () => {
      const req = createMockRequest({
        body: { ...criarVeiculoDtoMock, placa: 'ABC1234' }
      });
      const res = createMockResponse();

      await handler.handle(req, res);

      expect(res.statusCode).toBe(201);
      expect(res.body.sucesso).toBe(true);
      expect(res.body.dados.placa).toBe('ABC1234');
    });
  });
});
