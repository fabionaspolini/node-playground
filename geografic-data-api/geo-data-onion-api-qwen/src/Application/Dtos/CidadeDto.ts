/**
 * Represents a request to create a new city (Cidade)
 */
export interface ICidadeCreateRequest {
  /**
   * City identifier (UUID v7)
   */
  id: string;

  /**
   * State identifier (EstadoId)
   */
  estadoId: string;

  /**
   * City name
   */
  nome: string;

  /**
   * Postal code (CEP/Zip)
   */
  códigoPostal?: string;

  /**
   * Latitude coordinate for maps and logistics
   */
  latitude?: number;

  /**
   * Longitude coordinate for maps and logistics
   */
  longitude?: number;

  /**
   * Indicates if the record is active
   * @default true
   */
  ativo?: boolean;
}

/**
 * Represents a response with city data including state info
 */
import type { IEstadoResponse } from "./EstadoDto";

export interface ICidadeResponse extends ICidadeCreateRequest {
  /**
   * Creation timestamp
   */
  createdAt: Date;

  /**
   * Last update timestamp
   */
  updatedAt?: Date;

  /**
   * Associated state data
   */
  estado?: IEstadoResponse;
}

/**
 * Represents a request to update an existing city
 */
export interface ICidadeUpdateRequest {
  /**
   * City identifier (UUID v7)
   */
  id: string;

  /**
   * State identifier (EstadoId)
   */
  estadoId?: string;

  /**
   * City name
   */
  nome?: string;

  /**
   * Postal code (CEP/Zip)
   */
  códigoPostal?: string;

  /**
   * Latitude coordinate for maps and logistics
   */
  latitude?: number;

  /**
   * Longitude coordinate for maps and logistics
   */
  longitude?: number;

  /**
   * Indicates if the record is active
   */
  ativo?: boolean;
}
