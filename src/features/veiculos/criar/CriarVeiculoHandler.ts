import { Request, Response } from 'express';
import { CriarVeiculoSchema } from './CriarVeiculoSchema';
import { IVeiculoRepository } from '../../../domain/repositories/IVeiculoRepository';
import { Result } from '../../../domain/common/Result';

export class CriarVeiculoHandler {
  constructor(private readonly repository: IVeiculoRepository) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const validacao = CriarVeiculoSchema.safeParse(req.body);

      if (!validacao.success) {
        res.status(400).json({
          sucesso: false,
          erro: 'Dados inválidos',
          detalhes: validacao.error.errors
        });
        return;
      }

      const veiculo = await this.repository.criar(validacao.data);

      res.status(201).json({
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
        erro: 'Erro ao criar veículo'
      });
    }
  }
}
