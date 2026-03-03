import { criarApp } from './app';
import { DatabaseConnection } from './infrastructure/database/DatabaseConnection';

const PORT = process.env.PORT || 3010;

async function iniciarServidor() {
  try {
    // Inicializar conexão com banco de dados
    await DatabaseConnection.getConnection();
    console.log('✓ Banco de dados conectado');

    // Criar e iniciar aplicação
    const app = criarApp();
    
    app.listen(PORT, () => {
      const basePath = process.env.BASE_PATH || '/crud_veiculos';
      console.log(`✓ Servidor rodando na porta ${PORT}`);
      console.log(`✓ Documentação disponível em: http://localhost:${PORT}${basePath}/api-docs`);
      console.log(`✓ Health check: http://localhost:${PORT}${basePath}/health`);
    });
  } catch (erro) {
    console.error('Erro ao iniciar servidor:', erro);
    process.exit(1);
  }
}

// Tratamento de sinais de encerramento
process.on('SIGINT', async () => {
  console.log('\nEncerrando servidor...');
  await DatabaseConnection.closeConnection();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\nEncerrando servidor...');
  await DatabaseConnection.closeConnection();
  process.exit(0);
});

iniciarServidor();
