import { Result } from '../../../src/domain/common/Result';

describe('Result', () => {
  describe('ok', () => {
    it('deve criar um resultado de sucesso com valor', () => {
      const resultado = Result.ok('valor de teste');

      expect(resultado.isSuccess).toBe(true);
      expect(resultado.isFailure).toBe(false);
      expect(resultado.error).toBeUndefined();
      expect(resultado.getValue()).toBe('valor de teste');
    });

    it('deve criar um resultado de sucesso sem valor', () => {
      const resultado = Result.ok();

      expect(resultado.isSuccess).toBe(true);
      expect(resultado.isFailure).toBe(false);
    });

    it('deve criar resultado com objeto complexo', () => {
      const objeto = { id: 1, nome: 'Teste' };
      const resultado = Result.ok(objeto);

      expect(resultado.getValue()).toEqual(objeto);
    });
  });

  describe('fail', () => {
    it('deve criar um resultado de falha com mensagem de erro', () => {
      const resultado = Result.fail('Erro de teste');

      expect(resultado.isSuccess).toBe(false);
      expect(resultado.isFailure).toBe(true);
      expect(resultado.error).toBe('Erro de teste');
    });

    it('deve lançar erro ao tentar obter valor de resultado falhado', () => {
      const resultado = Result.fail('Algum erro');

      expect(() => resultado.getValue()).toThrow('Não é possível obter valor de resultado com falha');
    });
  });

  describe('validações de construtor', () => {
    it('deve lançar erro ao criar sucesso com erro', () => {
      // Teste via reflexão/privado não é o ideal, mas demonstra o conceito
      // Na prática, isso é previsto pela API pública
      expect(() => {
        // @ts-ignore - Acessando construtor privado para teste
        new Result(true, 'erro', 'valor');
      }).toThrow('Resultado inválido: Sucesso não pode ter erro');
    });

    it('deve lançar erro ao criar falha sem erro', () => {
      expect(() => {
        // @ts-ignore - Acessando construtor privado para teste
        new Result(false, undefined, undefined);
      }).toThrow('Resultado inválido: Falha deve ter erro');
    });
  });

  describe('tipagem genérica', () => {
    it('deve funcionar com diferentes tipos', () => {
      const resultadoString = Result.ok<string>('teste');
      const resultadoNumber = Result.ok<number>(123);
      const resultadoBoolean = Result.ok<boolean>(true);

      expect(resultadoString.getValue()).toBe('teste');
      expect(resultadoNumber.getValue()).toBe(123);
      expect(resultadoBoolean.getValue()).toBe(true);
    });
  });

  describe('casos de uso práticos', () => {
    it('deve representar operação bem-sucedida', () => {
      const resultado = Result.ok({ id: '123', nome: 'João' });

      if (resultado.isSuccess) {
        const dados = resultado.getValue();
        expect(dados).toHaveProperty('id');
        expect(dados).toHaveProperty('nome');
      }
    });

    it('deve representar operação com falha', () => {
      const resultado = Result.fail('Usuário não encontrado');

      if (resultado.isFailure) {
        expect(resultado.error).toBe('Usuário não encontrado');
      }
    });
  });
});
