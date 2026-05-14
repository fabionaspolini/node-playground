import { Pais } from "@domain/Entities/Pais";
import { Estado } from "@domain/Entities/Estado";
import { Cidade } from "@domain/Entities/Cidade";
import {
  IPaisCreateRequest,
  IPaisResponse,
  IPaisUpdateRequest
} from "@application/Dtos/PaisDto";
import {
  IEstadoCreateRequest,
  IEstadoResponse,
  IEstadoUpdateRequest
} from "@application/Dtos/EstadoDto";
import {
  ICidadeCreateRequest,
  ICidadeResponse,
  ICidadeUpdateRequest
} from "@application/Dtos/CidadeDto";

/**
 * Classe estática de extension methods para conversão de DTOs
 * e entidades de domínio
 */
export class EntityExtensions {
  /**
   * Converte uma entidade Pais para DTO de criação
   * @param entity - Entidade Pais
   * @returns DTO de criação de país
   */
  static toPaisCreateDto(entity: Pais): IPaisCreateRequest {
    return {
      id: entity.id,
      nome: entity.nome,
      codigoISO3: entity.codigoISO3,
      codigoONU: entity.codigoONU,
      codigoDDI: entity.codigoDDI,
      codigoMoeda: entity.codigoMoeda,
      defaultLocale: entity.defaultLocale,
      ativo: entity.ativo
    };
  }

  /**
   * Converte uma entidade Pais para DTO de resposta
   * @param entity - Entidade Pais
   * @returns DTO de resposta de país
   */
  static toPaisResponseDto(entity: Pais): IPaisResponse {
    return {
      id: entity.id,
      nome: entity.nome,
      codigoISO3: entity.codigoISO3,
      codigoONU: entity.codigoONU,
      codigoDDI: entity.codigoDDI,
      codigoMoeda: entity.codigoMoeda,
      defaultLocale: entity.defaultLocale,
      ativo: entity.ativo,
      createdAt: entity.createdAt!,
      updatedAt: entity.updatedAt,
      estados: entity.estados?.map(EntityExtensions.toEstadoResponseDto)
    };
  }

  /**
   * Converte um array de entidades Pais para array de DTOs de resposta
   * @param entities - Array de entidades Pais
   * @returns Array de DTOs de resposta
   */
  static toPaisResponseDtoList(entities: Pais[]): IPaisResponse[] {
    return entities.map(EntityExtensions.toPaisResponseDto);
  }

  /**
   * Converte uma entidade Estado para DTO de criação
   * @param entity - Entidade Estado
   * @returns DTO de criação de estado
   */
  static toEstadoCreateDto(entity: Estado): IEstadoCreateRequest {
    return {
      id: entity.id,
      paisId: entity.paisId,
      nome: entity.nome,
      sigla: entity.sigla,
      tipo: entity.tipo,
      ativo: entity.ativo
    };
  }

  /**
   * Converte uma entidade Estado para DTO de resposta
   * @param entity - Entidade Estado
   * @returns DTO de resposta de estado
   */
  static toEstadoResponseDto(entity: Estado): IEstadoResponse {
    return {
      id: entity.id,
      paisId: entity.paisId,
      nome: entity.nome,
      sigla: entity.sigla,
      tipo: entity.tipo,
      ativo: entity.ativo,
      createdAt: entity.createdAt!,
      updatedAt: entity.updatedAt,
      pais: entity.pais ? EntityExtensions.toPaisResponseDto(entity.pais) : undefined
    };
  }

  /**
   * Converte um array de entidades Estado para array de DTOs de resposta
   * @param entities - Array de entidades Estado
   * @returns Array de DTOs de resposta
   */
  static toEstadoResponseDtoList(entities: Estado[]): IEstadoResponse[] {
    return entities.map(EntityExtensions.toEstadoResponseDto);
  }

  /**
   * Converte uma entidade Cidade para DTO de criação
   * @param entity - Entidade Cidade
   * @returns DTO de criação de cidade
   */
  static toCidadeCreateDto(entity: Cidade): ICidadeCreateRequest {
    return {
      id: entity.id,
      estadoId: entity.estadoId,
      nome: entity.nome,
      codigoPostal: entity.codigoPostal,
      latitude: entity.latitude,
      longitude: entity.longitude,
      ativo: entity.ativo
    };
  }

  /**
   * Converte uma entidade Cidade para DTO de resposta
   * @param entity - Entidade Cidade
   * @returns DTO de resposta de cidade
   */
  static toCidadeResponseDto(entity: Cidade): ICidadeResponse {
    return {
      id: entity.id,
      estadoId: entity.estadoId,
      nome: entity.nome,
      codigoPostal: entity.codigoPostal,
      latitude: entity.latitude,
      longitude: entity.longitude,
      ativo: entity.ativo,
      createdAt: entity.createdAt!,
      updatedAt: entity.updatedAt,
      estado: entity.estado
        ? EntityExtensions.toEstadoResponseDto(entity.estado)
        : undefined
    };
  }

  /**
   * Converte um array de entidades Cidade para array de DTOs de resposta
   * @param entities - Array de entidades Cidade
   * @returns Array de DTOs de resposta
   */
  static toCidadeResponseDtoList(entities: Cidade[]): ICidadeResponse[] {
    return entities.map(EntityExtensions.toCidadeResponseDto);
  }

  /**
   * Converte um DTO de criação de país para entidade Pais
   * @param dto - DTO de criação de país
   * @returns Entidade Pais
   */
  static toPaisEntity(dto: IPaisCreateRequest | IPaisUpdateRequest): Pais {
    return new Pais({
      id: dto.id,
      nome: dto.nome,
      codigoISO3: dto.codigoISO3,
      codigoONU: dto.codigoONU,
      codigoDDI: dto.codigoDDI,
      codigoMoeda: dto.codigoMoeda,
      defaultLocale: dto.defaultLocale,
      ativo: dto.ativo ?? true
    });
  }

  /**
   * Converte um DTO de criação de estado para entidade Estado
   * @param dto - DTO de criação de estado
   * @returns Entidade Estado
   */
  static toEstadoEntity(dto: IEstadoCreateRequest | IEstadoUpdateRequest): Estado {
    return new Estado({
      id: dto.id,
      paisId: dto.paisId,
      nome: dto.nome,
      sigla: dto.sigla,
      tipo: dto.tipo,
      ativo: dto.ativo ?? true
    });
  }

  /**
   * Converte um DTO de criação de cidade para entidade Cidade
   * @param dto - DTO de criação de cidade
   * @returns Entidade Cidade
   */
  static toCidadeEntity(dto: ICidadeCreateRequest | ICidadeUpdateRequest): Cidade {
    return new Cidade({
      id: dto.id,
      estadoId: dto.estadoId,
      nome: dto.nome,
      codigoPostal: dto.codigoPostal,
      latitude: dto.latitude,
      longitude: dto.longitude,
      ativo: dto.ativo ?? true
    });
  }
}
