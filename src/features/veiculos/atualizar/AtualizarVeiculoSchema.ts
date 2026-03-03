import { z } from 'zod';

export const AtualizarVeiculoSchema = z.object({
  marca: z.string().min(1, 'Marca é obrigatória').optional(),
  modelo: z.string().min(1, 'Modelo é obrigatório').optional(),
  ano: z.number().int().min(1900, 'Ano inválido').max(new Date().getFullYear() + 1, 'Ano inválido').optional(),
  placa: z.string().regex(/^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/, 'Placa inválida (formato: ABC1D23 ou ABC1234)').optional(),
  cor: z.string().min(1, 'Cor é obrigatória').optional()
});

export type AtualizarVeiculoRequest = z.infer<typeof AtualizarVeiculoSchema>;
