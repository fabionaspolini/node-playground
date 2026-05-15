import { Cidade } from "../../domain/entities/cidade";
import { CidadeRequestDTO, CidadeResponseDTO } from "../dtos/cidade-dto";

export class CidadeMappers {
  static toEntity(dto: CidadeRequestDTO, id?: string): Cidade {
    return new Cidade({
      id: id || "",
      estadoId: dto.estadoId,
      nome: dto.nome,
      codigoPostal: dto.codigoPostal,
      latitude: dto.latitude,
      longitude: dto.longitude,
      ativo: true,
    });
  }

  static toResponseDTO(entity: Cidade): CidadeResponseDTO {
    return {
      id: entity.id,
      estadoId: entity.estadoId,
      nome: entity.nome,
      codigoPostal: entity.codigoPostal,
      latitude: entity.latitude,
      longitude: entity.longitude,
      ativo: entity.ativo,
    };
  }
}
