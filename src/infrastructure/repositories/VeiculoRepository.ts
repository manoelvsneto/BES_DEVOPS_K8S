import { IVeiculoRepository } from '../../domain/repositories/IVeiculoRepository';
import { Veiculo, CriarVeiculoDTO, AtualizarVeiculoDTO } from '../../domain/entities/Veiculo';
import { DatabaseConnection } from '../database/DatabaseConnection';
import { randomUUID } from 'crypto';

export class VeiculoRepository implements IVeiculoRepository {
  async criar(veiculoDTO: CriarVeiculoDTO): Promise<Veiculo> {
    const db = await DatabaseConnection.getConnection();
    const id = randomUUID();
    const agora = new Date().toISOString();

    await db.run(
      `INSERT INTO veiculos (id, marca, modelo, ano, placa, cor, criado_em, atualizado_em)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, veiculoDTO.marca, veiculoDTO.modelo, veiculoDTO.ano, veiculoDTO.placa, veiculoDTO.cor, agora, agora]
    );

    return {
      id,
      marca: veiculoDTO.marca,
      modelo: veiculoDTO.modelo,
      ano: veiculoDTO.ano,
      placa: veiculoDTO.placa,
      cor: veiculoDTO.cor,
      criadoEm: new Date(agora),
      atualizadoEm: new Date(agora)
    };
  }

  async buscarPorId(id: string): Promise<Veiculo | null> {
    const db = await DatabaseConnection.getConnection();
    const row = await db.get('SELECT * FROM veiculos WHERE id = ?', [id]);

    if (!row) return null;

    return this.mapToVeiculo(row);
  }

  async listarTodos(): Promise<Veiculo[]> {
    const db = await DatabaseConnection.getConnection();
    const rows = await db.all('SELECT * FROM veiculos ORDER BY criado_em DESC');

    return rows.map(row => this.mapToVeiculo(row));
  }

  async atualizar(id: string, veiculoDTO: AtualizarVeiculoDTO): Promise<Veiculo | null> {
    const db = await DatabaseConnection.getConnection();
    const veiculoExistente = await this.buscarPorId(id);

    if (!veiculoExistente) return null;

    const campos: string[] = [];
    const valores: any[] = [];

    if (veiculoDTO.marca !== undefined) {
      campos.push('marca = ?');
      valores.push(veiculoDTO.marca);
    }
    if (veiculoDTO.modelo !== undefined) {
      campos.push('modelo = ?');
      valores.push(veiculoDTO.modelo);
    }
    if (veiculoDTO.ano !== undefined) {
      campos.push('ano = ?');
      valores.push(veiculoDTO.ano);
    }
    if (veiculoDTO.placa !== undefined) {
      campos.push('placa = ?');
      valores.push(veiculoDTO.placa);
    }
    if (veiculoDTO.cor !== undefined) {
      campos.push('cor = ?');
      valores.push(veiculoDTO.cor);
    }

    const agora = new Date().toISOString();
    campos.push('atualizado_em = ?');
    valores.push(agora);
    valores.push(id);

    await db.run(
      `UPDATE veiculos SET ${campos.join(', ')} WHERE id = ?`,
      valores
    );

    return this.buscarPorId(id);
  }

  async deletar(id: string): Promise<boolean> {
    const db = await DatabaseConnection.getConnection();
    const resultado = await db.run('DELETE FROM veiculos WHERE id = ?', [id]);

    return (resultado.changes ?? 0) > 0;
  }

  private mapToVeiculo(row: any): Veiculo {
    return {
      id: row.id,
      marca: row.marca,
      modelo: row.modelo,
      ano: row.ano,
      placa: row.placa,
      cor: row.cor,
      criadoEm: new Date(row.criado_em),
      atualizadoEm: new Date(row.atualizado_em)
    };
  }
}
