/** Entidade de domínio País */
export interface Pais {
  /** Código ISO 3166-1 alpha-2 */
  id: string;
  /** Nome do país */
  nome: string;
  codigoISO3: string;
  codigoONU: number;
  codigoDDI: string;
  codigoMoeda: string;
  defaultLocale: string;
  ativo: boolean;
}