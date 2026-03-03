import { Request, Response } from 'express';
import { AtualizarVeiculoSchema } from './AtualizarVeiculoSchema';
import { IVeiculoRepository } from '../../../domain/repositories/IVeiculoRepository';

export class AtualizarVeiculoHandler {
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

      const validacao = AtualizarVeiculoSchema.safeParse(req.body);

      if (!validacao.success) {
        res.status(400).json({
          sucesso: false,
          erro: 'Dados inválidos',
          detalhes: validacao.error.errors
        });
        return;
      }

      const veiculo = await this.repository.atualizar(id, validacao.data);

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
    } catch (erro: any) {
      if (erro.message?.includes('UNIQUE constraint failed')) {
        res.status(409).json({
          sucesso: false,
          erro: 'Placa já cadastrada'
        });
        return;
      }

      res.status(500).json({
        sucesso: false,
        erro: 'Erro ao atualizar veículo'
      });
    }
  }
}
