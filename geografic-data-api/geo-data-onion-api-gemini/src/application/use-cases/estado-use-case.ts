import { IEstadoRepository } from "../../domain/repositories/estado-repository.interface";
import { KafkaProducer } from "../../infrastructure/messaging/kafka-producer";
import { EstadoMappers } from "../mappers/estado-mappers";
import { EstadoRequestDTO, EstadoResponseDTO } from "../dtos/estado-dto";

export class EstadoUseCase {
  constructor(
    private readonly repository: IEstadoRepository,
    private readonly kafka: KafkaProducer
  ) {}

  async create(dto: EstadoRequestDTO): Promise<EstadoResponseDTO> {
    const entity = EstadoMappers.toEntity(dto);
    const created = await this.repository.create(entity);
    
    this.kafka.produce("geografia.estado", created.id, {
      operation: "CREATE",
      data: created
    });

    return EstadoMappers.toResponseDTO(created);
  }

  async update(id: string, dto: Partial<EstadoRequestDTO>): Promise<EstadoResponseDTO> {
    const updated = await this.repository.update(id, dto as any);
    
    this.kafka.produce("geografia.estado", updated.id, {
      operation: "UPDATE",
      data: updated
    });

    return EstadoMappers.toResponseDTO(updated);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
    
    this.kafka.produce("geografia.estado", id, {
      operation: "DELETE",
      id: id
    });
  }

  async getById(id: string): Promise<EstadoResponseDTO | null> {
    const found = await this.repository.findById(id);
    return found ? EstadoMappers.toResponseDTO(found) : null;
  }

  async list(filters?: any): Promise<EstadoResponseDTO[]> {
    const found = await this.repository.findAll(filters);
    return found.map(EstadoMappers.toResponseDTO);
  }
}
