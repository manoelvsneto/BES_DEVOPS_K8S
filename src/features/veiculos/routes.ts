import { Router } from 'express';
import { VeiculoRepository } from '../../infrastructure/repositories/VeiculoRepository';
import { CriarVeiculoHandler } from './criar/CriarVeiculoHandler';
import { ListarVeiculosHandler } from './listar/ListarVeiculosHandler';
import { BuscarVeiculoHandler } from './buscar/BuscarVeiculoHandler';
import { AtualizarVeiculoHandler } from './atualizar/AtualizarVeiculoHandler';
import { DeletarVeiculoHandler } from './deletar/DeletarVeiculoHandler';

export function criarRotasVeiculos(): Router {
  const router = Router();
  const repository = new VeiculoRepository();

  const criarHandler = new CriarVeiculoHandler(repository);
  const listarHandler = new ListarVeiculosHandler(repository);
  const buscarHandler = new BuscarVeiculoHandler(repository);
  const atualizarHandler = new AtualizarVeiculoHandler(repository);
  const deletarHandler = new DeletarVeiculoHandler(repository);

  router.post('/', (req, res) => criarHandler.handle(req, res));
  router.get('/', (req, res) => listarHandler.handle(req, res));
  router.get('/:id', (req, res) => buscarHandler.handle(req, res));
  router.put('/:id', (req, res) => atualizarHandler.handle(req, res));
  router.delete('/:id', (req, res) => deletarHandler.handle(req, res));

  return router;
}
