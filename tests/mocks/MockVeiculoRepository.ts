import { Veiculo, CriarVeiculoDTO, AtualizarVeiculoDTO } from '../../src/domain/entities/Veiculo';
import { IVeiculoRepository } from '../../src/domain/repositories/IVeiculoRepository';

export class MockVeiculoRepository implements IVeiculoRepository {
  private veiculos: Veiculo[] = [];

  async criar(dto: CriarVeiculoDTO): Promise<Veiculo> {
    const veiculo: Veiculo = {
      id: this.generateId(),
      ...dto,
      criadoEm: new Date(),
      atualizadoEm: new Date()
    };
    this.veiculos.push(veiculo);
    return veiculo;
  }

  async buscarPorId(id: string): Promise<Veiculo | null> {
    return this.veiculos.find(v => v.id === id) || null;
  }

  async listarTodos(): Promise<Veiculo[]> {
    return [...this.veiculos];
  }

  async atualizar(id: string, dto: AtualizarVeiculoDTO): Promise<Veiculo | null> {
    const index = this.veiculos.findIndex(v => v.id === id);
    if (index === -1) return null;

    this.veiculos[index] = {
      ...this.veiculos[index],
      ...dto,
      atualizadoEm: new Date()
    };

    return this.veiculos[index];
  }

  async deletar(id: string): Promise<boolean> {
    const index = this.veiculos.findIndex(v => v.id === id);
    if (index === -1) return false;

    this.veiculos.splice(index, 1);
    return true;
  }

  // Métodos auxiliares para testes
  clear(): void {
    this.veiculos = [];
  }

  seed(veiculos: Veiculo[]): void {
    this.veiculos = [...veiculos];
  }

  private generateId(): string {
    return `mock-id-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}
