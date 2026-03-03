import { criarApp } from '../../src/app';
import { DatabaseConnection } from '../../src/infrastructure/database/DatabaseConnection';

describe('App Integration', () => {
  let app: any;

  beforeAll(async () => {
    // Configurar ambiente de teste
    process.env.NODE_ENV = 'test';
    process.env.BASE_PATH = '/crud_veiculos';
    process.env.DATABASE_PATH = ':memory:'; // SQLite em memória para testes
    
    app = criarApp();
  });

  afterAll(async () => {
    await DatabaseConnection.closeConnection();
  });

  describe('Configuração do Express', () => {
    it('deve criar aplicação Express', () => {
      expect(app).toBeDefined();
      expect(typeof app.listen).toBe('function');
    });

    it('deve ter middlewares configurados', () => {
      expect(app._router).toBeDefined();
    });
  });

  describe('Rotas básicas', () => {
    it('deve ter rota raiz configurada', () => {
      const routes = app._router.stack
        .filter((layer: any) => layer.route)
        .map((layer: any) => layer.route.path);
      
      expect(routes).toContain('/crud_veiculos');
    });

    it('deve ter rotas de API configuradas', () => {
      const middlewares = app._router.stack
        .filter((layer: any) => layer.name === 'router');
      
      expect(middlewares.length).toBeGreaterThan(0);
    });
  });

  describe('Middlewares', () => {
    it('deve ter middleware JSON configurado', () => {
      const jsonMiddleware = app._router.stack
        .find((layer: any) => layer.name === 'jsonParser');
      
      expect(jsonMiddleware).toBeDefined();
    });

    it('deve ter middleware CORS configurado', () => {
      const corsMiddleware = app._router.stack
        .find((layer: any) => layer.name === 'corsMiddleware');
      
      expect(corsMiddleware).toBeDefined();
    });
  });
});
