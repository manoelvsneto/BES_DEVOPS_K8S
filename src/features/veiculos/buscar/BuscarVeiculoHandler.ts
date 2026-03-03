import { Request, Response } from 'express';
import { IVeiculoRepository } from '../../../domain/repositories/IVeiculoRepository';

export class BuscarVeiculoHandler {
  constructor(private readonly repository: IVeiculoRepository) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({
          sucesso: false,
          erro: 'ID é obrigatório'
        });
        return;
      }

      const veiculo = await this.repository.buscarPorId(id);

      if (!veiculo) {
        res.status(404).json({
          sucesso: false,
          erro: 'Veículo não encontrado'
        });
        return;
      }

      res.status(200).json({
        sucesso: true,
        dados: veiculo
      });
    } catch (erro) {
      res.status(500).json({
        sucesso: false,
        erro: 'Erro ao buscar veículo'
      });
    }
  }
}
