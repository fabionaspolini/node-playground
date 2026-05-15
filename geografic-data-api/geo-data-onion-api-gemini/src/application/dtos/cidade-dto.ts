/**
 * DTO para criação/atualização de cidade.
 */
export class CidadeRequestDTO {
  /**
   * Referência ao estado.
   */
  estadoId: string;
  /**
   * Nome da cidade.
   */
  nome: string;
  /**
   * CEP/Zip local.
   */
  codigoPostal: string;
  /**
   * Latitude.
   */
  latitude: number;
  /**
   * Longitude.
   */
  longitude: number;
}

/**
 * DTO para resposta de cidade.
 */
export class CidadeResponseDTO {
  /**
   * Identificador único (UUID).
   */
  id: string;
  /**
   * Referência ao estado.
   */
  estadoId: string;
  /**
   * Nome da cidade.
   */
  nome: string;
  /**
   * CEP/Zip local.
   */
  codigoPostal: string;
  /**
   * Latitude.
   */
  latitude: number;
  /**
   * Longitude.
   */
  longitude: number;
  /**
   * Indicador se o registro ainda é válido.
   */
  ativo: boolean;
}
