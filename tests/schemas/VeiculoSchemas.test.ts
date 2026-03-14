import { CriarVeiculoSchema } from '../../src/features/veiculos/criar/CriarVeiculoSchema';
import { AtualizarVeiculoSchema } from '../../src/features/veiculos/atualizar/AtualizarVeiculoSchema';

describe('Schemas de Validação', () => {
  describe('CriarVeiculoSchema', () => {
    const veiculoValido = {
      marca: 'Toyota',
      modelo: 'Corolla',
      ano: 2023,
      placa: 'ABC1D23',
      cor: 'Prata'
    };

    it('deve validar um veículo válido', () => {
      const resultado = CriarVeiculoSchema.safeParse(veiculoValido);
      expect(resultado.success).toBe(true);
    });

    describe('Validação de marca', () => {
      it('deve rejeitar quando marca estiver ausente', () => {
        const { marca, ...semMarca } = veiculoValido;
        const resultado = CriarVeiculoSchema.safeParse(semMarca);
        expect(resultado.success).toBe(false);
      });

      it('deve rejeitar marca vazia', () => {
        const resultado = CriarVeiculoSchema.safeParse({ ...veiculoValido, marca: '' });
        expect(resultado.success).toBe(false);
      });
    });

    describe('Validação de modelo', () => {
      it('deve rejeitar quando modelo estiver ausente', () => {
        const { modelo, ...semModelo } = veiculoValido;
        const resultado = CriarVeiculoSchema.safeParse(semModelo);
        expect(resultado.success).toBe(false);
      });

      it('deve rejeitar modelo vazio', () => {
        const resultado = CriarVeiculoSchema.safeParse({ ...veiculoValido, modelo: '' });
        expect(resultado.success).toBe(false);
      });
    });

    describe('Validação de ano', () => {
      it('deve rejeitar ano anterior a 1900', () => {
        const resultado = CriarVeiculoSchema.safeParse({ ...veiculoValido, ano: 1899 });
        expect(resultado.success).toBe(false);
      });

      it('deve aceitar ano atual', () => {
        const anoAtual = new Date().getFullYear();
        const resultado = CriarVeiculoSchema.safeParse({ ...veiculoValido, ano: anoAtual });
        expect(resultado.success).toBe(true);
      });

      it('deve aceitar ano seguinte ao atual', () => {
        const proximoAno = new Date().getFullYear() + 1;
        const resultado = CriarVeiculoSchema.safeParse({ ...veiculoValido, ano: proximoAno });
        expect(resultado.success).toBe(true);
      });

      it('deve rejeitar ano muito futuro', () => {
        const anoFuturo = new Date().getFullYear() + 2;
        const resultado = CriarVeiculoSchema.safeParse({ ...veiculoValido, ano: anoFuturo });
        expect(resultado.success).toBe(false);
      });

      it('deve rejeitar quando ano estiver ausente', () => {
        const { ano, ...semAno } = veiculoValido;
        const resultado = CriarVeiculoSchema.safeParse(semAno);
        expect(resultado.success).toBe(false);
      });

      it('deve rejeitar ano não-inteiro', () => {
        const resultado = CriarVeiculoSchema.safeParse({ ...veiculoValido, ano: 2023.5 });
        expect(resultado.success).toBe(false);
      });
    });

    describe('Validação de placa', () => {
      it('deve aceitar placa formato Mercosul (ABC1D23)', () => {
        const resultado = CriarVeiculoSchema.safeParse({ ...veiculoValido, placa: 'ABC1D23' });
        expect(resultado.success).toBe(true);
      });

      it('deve aceitar placa formato antigo (ABC1234)', () => {
        const resultado = CriarVeiculoSchema.safeParse({ ...veiculoValido, placa: 'ABC1234' });
        expect(resultado.success).toBe(true);
      });

      it('deve rejeitar placa com letras minúsculas', () => {
        const resultado = CriarVeiculoSchema.safeParse({ ...veiculoValido, placa: 'abc1d23' });
        expect(resultado.success).toBe(false);
      });

      it('deve rejeitar placa com formato inválido', () => {
        const resultado = CriarVeiculoSchema.safeParse({ ...veiculoValido, placa: 'ABCD123' });
        expect(resultado.success).toBe(false);
      });

      it('deve rejeitar placa muito curta', () => {
        const resultado = CriarVeiculoSchema.safeParse({ ...veiculoValido, placa: 'ABC123' });
        expect(resultado.success).toBe(false);
      });

      it('deve rejeitar placa muito longa', () => {
        const resultado = CriarVeiculoSchema.safeParse({ ...veiculoValido, placa: 'ABC12345' });
        expect(resultado.success).toBe(false);
      });

      it('deve rejeitar quando placa estiver ausente', () => {
        const { placa, ...semPlaca } = veiculoValido;
        const resultado = CriarVeiculoSchema.safeParse(semPlaca);
        expect(resultado.success).toBe(false);
      });
    });

    describe('Validação de cor', () => {
      it('deve rejeitar quando cor estiver ausente', () => {
        const { cor, ...semCor } = veiculoValido;
        const resultado = CriarVeiculoSchema.safeParse(semCor);
        expect(resultado.success).toBe(false);
      });

      it('deve rejeitar cor vazia', () => {
        const resultado = CriarVeiculoSchema.safeParse({ ...veiculoValido, cor: '' });
        expect(resultado.success).toBe(false);
      });

      it('deve aceitar qualquer string não-vazia como cor', () => {
        const cores = ['Vermelho', 'Azul', 'Verde', 'Preto', 'Branco', 'Prata'];
        cores.forEach(cor => {
          const resultado = CriarVeiculoSchema.safeParse({ ...veiculoValido, cor });
          expect(resultado.success).toBe(true);
        });
      });
    });
  });

  describe('AtualizarVeiculoSchema', () => {
    it('deve aceitar objeto vazio (todos os campos opcionais)', () => {
      const resultado = AtualizarVeiculoSchema.safeParse({});
      expect(resultado.success).toBe(true);
    });

    it('deve aceitar atualização parcial - apenas cor', () => {
      const resultado = AtualizarVeiculoSchema.safeParse({ cor: 'Azul' });
      expect(resultado.success).toBe(true);
    });

    it('deve aceitar atualização parcial - apenas ano', () => {
      const resultado = AtualizarVeiculoSchema.safeParse({ ano: 2024 });
      expect(resultado.success).toBe(true);
    });

    it('deve aceitar atualização de múltiplos campos', () => {
      const resultado = AtualizarVeiculoSchema.safeParse({
        cor: 'Verde',
        ano: 2024,
        marca: 'Honda'
      });
      expect(resultado.success).toBe(true);
    });

    it('deve validar ano quando fornecido', () => {
      const resultado = AtualizarVeiculoSchema.safeParse({ ano: 1800 });
      expect(resultado.success).toBe(false);
    });

    it('deve validar placa quando fornecida', () => {
      const resultado = AtualizarVeiculoSchema.safeParse({ placa: 'INVALIDA' });
      expect(resultado.success).toBe(false);
    });

    it('deve aceitar placa válida', () => {
      const resultado = AtualizarVeiculoSchema.safeParse({ placa: 'ABC1D23' });
      expect(resultado.success).toBe(true);
    });

    it('deve validar marca quando fornecida', () => {
      const resultado = AtualizarVeiculoSchema.safeParse({ marca: '' });
      expect(resultado.success).toBe(false);
    });

    it('deve validar modelo quando fornecido', () => {
      const resultado = AtualizarVeiculoSchema.safeParse({ modelo: '' });
      expect(resultado.success).toBe(false);
    });

    it('deve validar cor quando fornecida', () => {
      const resultado = AtualizarVeiculoSchema.safeParse({ cor: '' });
      expect(resultado.success).toBe(false);
    });

    it('deve aceitar todos os campos válidos', () => {
      const resultado = AtualizarVeiculoSchema.safeParse({
        marca: 'Toyota',
        modelo: 'Corolla',
        ano: 2023,
        placa: 'ABC1D23',
        cor: 'Prata'
      });
      expect(resultado.success).toBe(true);
    });
  });
});
