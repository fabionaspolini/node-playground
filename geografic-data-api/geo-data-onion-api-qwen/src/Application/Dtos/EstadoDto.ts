/**
 * Represents a request to create a new state (Estado)
 */
export interface IEstadoCreateRequest {
  /**
   * State identifier in ISO 3166-2 format
   * @example "BR-SP", "US-AK"
   */
  id: string;

  /**
   * Country identifier (PaisId)
   * @example "BR", "US"
   */
  paisId: string;

  /**
   * State name
   * @example "São Paulo", "Alaska"
   */
  nome: string;

  /**
   * State abbreviation (without country prefix)
   * @example "SP", "AK"
   */
  sigla: string;

  /**
   * Subdivision type in the country
   */
  tipo: "STATE" | "PROVINCE" | "DEPARTMENT" | "DISTRICT";

  /**
   * Indicates if the record is active
   * @default true
   */
  ativo?: boolean;
}

/**
 * Represents a response with state data including country info
 */
import type { IPaisResponse } from "./PaisDto";

export interface IEstadoResponse extends IEstadoCreateRequest {
  /**
   * Creation timestamp
   */
  createdAt: Date;

  /**
   * Last update timestamp
   */
  updatedAt?: Date;

  /**
   * Associated country data
   */
  pais?: IPaisResponse;
}

/**
 * Represents a request to update an existing state
 */
export interface IEstadoUpdateRequest {
  /**
   * State identifier in ISO 3166-2 format
   */
  id: string;

  /**
   * Country identifier (PaisId)
   */
  paisId?: string;

  /**
   * State name
   */
  nome?: string;

  /**
   * State abbreviation (without country prefix)
   */
  sigla?: string;

  /**
   * Subdivision type in the country
   */
  tipo?: "STATE" | "PROVINCE" | "DEPARTMENT" | "DISTRICT";

  /**
   * Indicates if the record is active
   */
  ativo?: boolean;
}
