import { Request, Response } from 'express';
import { IVeiculoRepository } from '../../../domain/repositories/IVeiculoRepository';

export class DeletarVeiculoHandler {
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

      const deletado = await this.repository.deletar(id);

      if (!deletado) {
        res.status(404).json({
          sucesso: false,
          erro: 'Veículo não encontrado'
        });
        return;
      }

      res.status(200).json({
        sucesso: true,
        mensagem: 'Veículo deletado com sucesso'
      });
    } catch (erro) {
      res.status(500).json({
        sucesso: false,
        erro: 'Erro ao deletar veículo'
      });
    }
  }
}
