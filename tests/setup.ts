// Tipos auxiliares para testes
// Este arquivo resolve problemas de tipagem do TypeScript em testes

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveProperty(property: string, value?: any): R;
      toMatchObject(expected: Record<string, any>): R;
    }
  }
}

export {};
