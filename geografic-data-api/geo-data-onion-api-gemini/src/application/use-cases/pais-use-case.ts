import { IPaisRepository } from "../../domain/repositories/pais-repository.interface";
import { KafkaProducer } from "../../infrastructure/messaging/kafka-producer";
import { PaisMappers } from "../mappers/pais-mappers";
import { PaisRequestDTO, PaisResponseDTO } from "../dtos/pais-dto";

export class PaisUseCase {
  constructor(
    private readonly repository: IPaisRepository,
    private readonly kafka: KafkaProducer
  ) {}

  async create(dto: PaisRequestDTO): Promise<PaisResponseDTO> {
    const entity = PaisMappers.toEntity(dto);
    const created = await this.repository.create(entity);
    
    this.kafka.produce("geografia.pais", created.id, {
      operation: "CREATE",
      data: created
    });

    return PaisMappers.toResponseDTO(created);
  }

  async update(id: string, dto: Partial<PaisRequestDTO>): Promise<PaisResponseDTO> {
    const updated = await this.repository.update(id, dto as any);
    
    this.kafka.produce("geografia.pais", updated.id, {
      operation: "UPDATE",
      data: updated
    });

    return PaisMappers.toResponseDTO(updated);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
    
    this.kafka.produce("geografia.pais", id, {
      operation: "DELETE",
      id: id
    });
  }

  async getById(id: string): Promise<PaisResponseDTO | null> {
    const found = await this.repository.findById(id);
    return found ? PaisMappers.toResponseDTO(found) : null;
  }

  async list(filters?: any): Promise<PaisResponseDTO[]> {
    const found = await this.repository.findAll(filters);
    return found.map(PaisMappers.toResponseDTO);
  }
}
