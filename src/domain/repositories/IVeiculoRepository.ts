import { Veiculo, CriarVeiculoDTO, AtualizarVeiculoDTO } from '../entities/Veiculo';

export interface IVeiculoRepository {
  criar(veiculo: CriarVeiculoDTO): Promise<Veiculo>;
  buscarPorId(id: string): Promise<Veiculo | null>;
  listarTodos(): Promise<Veiculo[]>;
  atualizar(id: string, veiculo: AtualizarVeiculoDTO): Promise<Veiculo | null>;
  deletar(id: string): Promise<boolean>;
}
