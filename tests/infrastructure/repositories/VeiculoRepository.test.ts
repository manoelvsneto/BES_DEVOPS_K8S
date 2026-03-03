import { VeiculoRepository } from '../../../src/infrastructure/repositories/VeiculoRepository';
import { criarVeiculoDtoMock } from '../../fixtures/veiculos.fixture';

// Mock do DatabaseConnection para testes sem banco real
jest.mock('../../../src/infrastructure/database/DatabaseConnection', () => ({
  DatabaseConnection: {
    getConnection: jest.fn().mockResolvedValue({
      run: jest.fn().mockResolvedValue({ changes: 1 }),
      get: jest.fn().mockResolvedValue(null),
      all: jest.fn().mockResolvedValue([])
    })
  }
}));

describe('VeiculoRepository', () => {
  let repository: VeiculoRepository;

  beforeEach(() => {
    repository = new VeiculoRepository();
    jest.clearAllMocks();
  });

  describe('criar', () => {
    it('deve retornar veículo com id gerado', async () => {
      const veiculo = await repository.criar(criarVeiculoDtoMock);

      expect(veiculo).toHaveProperty('id');
      expect(veiculo.marca).toBe(criarVeiculoDtoMock.marca);
      expect(veiculo.modelo).toBe(criarVeiculoDtoMock.modelo);
      expect(veiculo).toHaveProperty('criadoEm');
      expect(veiculo).toHaveProperty('atualizadoEm');
    });

    it('deve gerar UUID válido', async () => {
      const veiculo = await repository.criar(criarVeiculoDtoMock);

      // UUID v4 tem formato: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      expect(veiculo.id).toMatch(uuidRegex);
    });

    it('deve gerar timestamps válidos', async () => {
      const antes = new Date();
      const veiculo = await repository.criar(criarVeiculoDtoMock);
      const depois = new Date();

      expect(veiculo.criadoEm.getTime()).toBeGreaterThanOrEqual(antes.getTime());
      expect(veiculo.criadoEm.getTime()).toBeLessThanOrEqual(depois.getTime());
      expect(veiculo.atualizadoEm).toEqual(veiculo.criadoEm);
    });
  });

  describe('buscarPorId', () => {
    it('deve retornar null quando veículo não existir', async () => {
      const resultado = await repository.buscarPorId('id-inexistente');
      expect(resultado).toBeNull();
    });
  });

  describe('listarTodos', () => {
    it('deve retornar array vazio quando não houver veículos', async () => {
      const resultado = await repository.listarTodos();
      expect(resultado).toEqual([]);
      expect(Array.isArray(resultado)).toBe(true);
    });
  });

  describe('atualizar', () => {
    it('deve retornar null quando veículo não existir', async () => {
      const resultado = await repository.atualizar('id-inexistente', { cor: 'Azul' });
      expect(resultado).toBeNull();
    });
  });

  describe('deletar', () => {
    it('deve retornar false quando veículo não existir', async () => {
      const resultado = await repository.deletar('id-inexistente');
      expect(resultado).toBe(false);
    });
  });
});
