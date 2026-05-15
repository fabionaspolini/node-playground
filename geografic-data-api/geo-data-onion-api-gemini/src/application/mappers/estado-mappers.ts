import { Estado } from "../../domain/entities/estado";
import { EstadoRequestDTO, EstadoResponseDTO } from "../dtos/estado-dto";

export class EstadoMappers {
  static toEntity(dto: EstadoRequestDTO): Estado {
    return new Estado({
      id: dto.id,
      paisId: dto.paisId,
      nome: dto.nome,
      sigla: dto.sigla,
      tipo: dto.tipo,
      ativo: true,
    });
  }

  static toResponseDTO(entity: Estado): EstadoResponseDTO {
    return {
      id: entity.id,
      paisId: entity.paisId,
      nome: entity.nome,
      sigla: entity.sigla,
      tipo: entity.tipo,
      ativo: entity.ativo,
    };
  }
}
