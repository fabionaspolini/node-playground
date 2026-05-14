import { Pais } from '../../domain/entities/pais.js';

export const toPaisResponse = (pais: Pais) => ({
  ...pais
});