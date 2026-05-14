/**
 * Represents a request to create a new country (Pais)
 */
export interface IPaisCreateRequest {
  /**
   * Country identifier in ISO 3166-1 alpha-2 format
   * @example "BR", "US"
   */
  id: string;

  /**
   * Common country name
   * @example "Brasil", "United States"
   */
  nome: string;

  /**
   * ISO 3166-1 alpha-3 country code
   * @example "BRA", "USA"
   */
  códigoISO3: string;

  /**
   * United Nations numeric code
   * @example 76, 840
   */
  códigoONU: number;

  /**
   * Dialing code (DDI)
   * @example "+55", "+1"
   */
  códigoDDI: string;

  /**
   * Currency code (ISO 4217)
   * @example "BRL", "USD"
   */
  códigoMoeda: string;

  /**
   * Main language/locale
   * @example "pt-BR", "en-US"
   */
  defaultLocale: string;

  /**
   * Indicates if the record is active
   * @default true
   */
  ativo?: boolean;
}

/**
 * Represents a response with country data
 */
import type { IEstadoResponse } from "./EstadoDto";

export interface IPaisResponse extends IPaisCreateRequest {
  /**
   * Creation timestamp
   */
  createdAt: Date;

  /**
   * Last update timestamp
   */
  updatedAt?: Date;

  /**
   * List of states in this country
   */
  estados?: IEstadoResponse[];
}

/**
 * Represents a request to update an existing country
 */
export interface IPaisUpdateRequest {
  /**
   * Country identifier in ISO 3166-1 alpha-2 format
   */
  id: string;

  /**
   * Common country name
   */
  nome?: string;

  /**
   * ISO 3166-1 alpha-3 country code
   */
  códigoISO3?: string;

  /**
   * United Nations numeric code
   */
  códigoONU?: number;

  /**
   * Dialing code (DDI)
   */
  códigoDDI?: string;

  /**
   * Currency code (ISO 4217)
   */
  códigoMoeda?: string;

  /**
   * Main language/locale
   */
  defaultLocale?: string;

  /**
   * Indicates if the record is active
   */
  ativo?: boolean;
}
