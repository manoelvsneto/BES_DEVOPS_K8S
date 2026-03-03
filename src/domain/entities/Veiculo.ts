export interface Veiculo {
  id: string;
  marca: string;
  modelo: string;
  ano: number;
  placa: string;
  cor: string;
  criadoEm: Date;
  atualizadoEm: Date;
}

export type CriarVeiculoDTO = Omit<Veiculo, 'id' | 'criadoEm' | 'atualizadoEm'>;
export type AtualizarVeiculoDTO = Partial<CriarVeiculoDTO>;
