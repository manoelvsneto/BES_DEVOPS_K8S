import { Veiculo } from '../../src/domain/entities/Veiculo';

export const veiculoMock: Veiculo = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  marca: 'Toyota',
  modelo: 'Corolla',
  ano: 2023,
  placa: 'ABC1D23',
  cor: 'Prata',
  criadoEm: new Date('2024-01-01T12:00:00.000Z'),
  atualizadoEm: new Date('2024-01-01T12:00:00.000Z')
};

export const veiculosMock: Veiculo[] = [
  veiculoMock,
  {
    id: '123e4567-e89b-12d3-a456-426614174001',
    marca: 'Honda',
    modelo: 'Civic',
    ano: 2022,
    placa: 'XYZ9W87',
    cor: 'Preto',
    criadoEm: new Date('2024-01-02T12:00:00.000Z'),
    atualizadoEm: new Date('2024-01-02T12:00:00.000Z')
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174002',
    marca: 'Ford',
    modelo: 'Focus',
    ano: 2021,
    placa: 'DEF5K67',
    cor: 'Branco',
    criadoEm: new Date('2024-01-03T12:00:00.000Z'),
    atualizadoEm: new Date('2024-01-03T12:00:00.000Z')
  }
];

export const criarVeiculoDtoMock = {
  marca: 'Volkswagen',
  modelo: 'Gol',
  ano: 2024,
  placa: 'GHI2J89',
  cor: 'Vermelho'
};

export const atualizarVeiculoDtoMock = {
  cor: 'Azul',
  ano: 2024
};
