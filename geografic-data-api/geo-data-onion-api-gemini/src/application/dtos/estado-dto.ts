/**
 * DTO para criação/atualização de estado.
 */
export class EstadoRequestDTO {
  /**
   * Identificador único (ISO 3166-2).
   */
  id: string;
  /**
   * Referência ao país.
   */
  paisId: string;
  /**
   * Nome do estado.
   */
  nome: string;
  /**
   * Sigla nacional.
   */
  sigla: string;
  /**
   * Tipo da subdivisão (STATE, PROVINCE, etc).
   */
  tipo: string;
}

/**
 * DTO para resposta de estado.
 */
export class EstadoResponseDTO {
  /**
   * Identificador único.
   */
  id: string;
  /**
   * Referência ao país.
   */
  paisId: string;
  /**
   * Nome do estado.
   */
  nome: string;
  /**
   * Sigla nacional.
   */
  sigla: string;
  /**
   * Tipo da subdivisão.
   */
  tipo: string;
  /**
   * Indicador se o registro ainda é válido.
   */
  ativo: boolean;
}
