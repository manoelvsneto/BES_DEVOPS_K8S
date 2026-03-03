import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './config/swagger';
import { criarRotasVeiculos } from './features/veiculos/routes';

export function criarApp(): Application {
  const app = express();

  // Middlewares
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const basePath = process.env.BASE_PATH || '/crud_veiculos';

  // Health check
  app.get(`${basePath}/health`, (req: Request, res: Response) => {
    res.status(200).json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  });

  // Swagger UI
  app.use(`${basePath}/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  // Rotas da API
  app.use(`${basePath}/api/veiculos`, criarRotasVeiculos());

  // Rota raiz
  app.get(basePath, (req: Request, res: Response) => {
    res.json({
      mensagem: 'API CRUD de Veículos',
      versao: '1.0.0',
      documentacao: `${basePath}/api-docs`
    });
  });

  // Tratamento de rotas não encontradas
  app.use((req: Request, res: Response) => {
    res.status(404).json({
      sucesso: false,
      erro: 'Rota não encontrada'
    });
  });

  return app;
}
