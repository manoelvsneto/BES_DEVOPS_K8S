import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';

export class DatabaseConnection {
  private static instance: Database | null = null;

  static async getConnection(): Promise<Database> {
    if (!this.instance) {
      const dbPath = process.env.DATABASE_PATH || './data/veiculos.db';
      const dbDir = path.dirname(dbPath);
      
      // Garantir que o diretório existe
      const fs = require('fs');
      if (!fs.existsSync(dbDir)) {
        fs.mkdirSync(dbDir, { recursive: true });
      }

      this.instance = await open({
        filename: dbPath,
        driver: sqlite3.Database
      });

      await this.initializeSchema();
    }
    return this.instance;
  }

  private static async initializeSchema(): Promise<void> {
    if (!this.instance) return;

    await this.instance.exec(`
      CREATE TABLE IF NOT EXISTS veiculos (
        id TEXT PRIMARY KEY,
        marca TEXT NOT NULL,
        modelo TEXT NOT NULL,
        ano INTEGER NOT NULL,
        placa TEXT NOT NULL UNIQUE,
        cor TEXT NOT NULL,
        criado_em TEXT NOT NULL,
        atualizado_em TEXT NOT NULL
      )
    `);
  }

  static async closeConnection(): Promise<void> {
    if (this.instance) {
      await this.instance.close();
      this.instance = null;
    }
  }
}
