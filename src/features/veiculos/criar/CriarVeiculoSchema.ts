import { z } from 'zod';

export const CriarVeiculoSchema = z.object({
  marca: z.string().min(1, 'Marca é obrigatória'),
  modelo: z.string().min(1, 'Modelo é obrigatório'),
  ano: z.number().int().min(1900, 'Ano inválido').max(new Date().getFullYear() + 1, 'Ano inválido'),
  placa: z.string().regex(/^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/, 'Placa inválida (formato: ABC1D23 ou ABC1234)'),
  cor: z.string().min(1, 'Cor é obrigatória')
});

export type CriarVeiculoRequest = z.infer<typeof CriarVeiculoSchema>;
