import { Pais } from "../../domain/entities/pais";
import { PaisRequestDTO, PaisResponseDTO } from "../dtos/pais-dto";

export class PaisMappers {
  static toEntity(dto: PaisRequestDTO): Pais {
    return new Pais({
      id: dto.id,
      nome: dto.nome,
      codigoISO3: dto.codigoISO3,
      codigoONU: dto.codigoONU,
      codigoDDI: dto.codigoDDI,
      codigoMoeda: dto.codigoMoeda,
      defaultLocale: dto.defaultLocale,
      ativo: true,
    });
  }

  static toResponseDTO(entity: Pais): PaisResponseDTO {
    return {
      id: entity.id,
      nome: entity.nome,
      codigoISO3: entity.codigoISO3,
      codigoONU: entity.codigoONU,
      codigoDDI: entity.codigoDDI,
      codigoMoeda: entity.codigoMoeda,
      defaultLocale: entity.defaultLocale,
      ativo: entity.ativo,
    };
  }
}
