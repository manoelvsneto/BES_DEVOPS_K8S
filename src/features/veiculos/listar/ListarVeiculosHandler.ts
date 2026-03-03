import { Request, Response } from 'express';
import { IVeiculoRepository } from '../../../domain/repositories/IVeiculoRepository';

export class ListarVeiculosHandler {
  constructor(private readonly repository: IVeiculoRepository) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const veiculos = await this.repository.listarTodos();

      res.status(200).json({
        sucesso: true,
        dados: veiculos,
        total: veiculos.length
      });
    } catch (erro) {
      res.status(500).json({
        sucesso: false,
        erro: 'Erro ao listar veículos'
      });
    }
  }
}
