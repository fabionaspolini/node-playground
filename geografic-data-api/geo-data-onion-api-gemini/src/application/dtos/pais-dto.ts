/**
 * DTO para criação/atualização de país.
 */
export class PaisRequestDTO {
  /**
   * Identificador único (ISO 3166-1 alpha-2).
   */
  id: string;
  /**
   * Nome comum do país.
   */
  nome: string;
  /**
   * Código ISO 3166-1 alpha-3.
   */
  codigoISO3: string;
  /**
   * Código numérico da ONU.
   */
  codigoONU: number;
  /**
   * DDI (Código de discagem).
   */
  codigoDDI: string;
  /**
   * Código da moeda (ISO 4217).
   */
  codigoMoeda: string;
  /**
   * Idioma principal.
   */
  defaultLocale: string;
}

/**
 * DTO para resposta de país.
 */
export class PaisResponseDTO {
  /**
   * Identificador único.
   */
  id: string;
  /**
   * Nome comum do país.
   */
  nome: string;
  /**
   * Código ISO 3166-1 alpha-3.
   */
  codigoISO3: string;
  /**
   * Código numérico da ONU.
   */
  codigoONU: number;
  /**
   * DDI (Código de discagem).
   */
  codigoDDI: string;
  /**
   * Código da moeda (ISO 4217).
   */
  codigoMoeda: string;
  /**
   * Idioma principal.
   */
  defaultLocale: string;
  /**
   * Indicador se o registro ainda é válido.
   */
  ativo: boolean;
}
