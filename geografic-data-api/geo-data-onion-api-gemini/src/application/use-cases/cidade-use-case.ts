import { ICidadeRepository } from "../../domain/repositories/cidade-repository.interface";
import { KafkaProducer } from "../../infrastructure/messaging/kafka-producer";
import { CidadeMappers } from "../mappers/cidade-mappers";
import { CidadeRequestDTO, CidadeResponseDTO } from "../dtos/cidade-dto";

export class CidadeUseCase {
  constructor(
    private readonly repository: ICidadeRepository,
    private readonly kafka: KafkaProducer
  ) {}

  async create(dto: CidadeRequestDTO): Promise<CidadeResponseDTO> {
    const entity = CidadeMappers.toEntity(dto);
    const created = await this.repository.create(entity);
    
    this.kafka.produce("geografia.cidade", created.id, {
      operation: "CREATE",
      data: created
    });

    return CidadeMappers.toResponseDTO(created);
  }

  async update(id: string, dto: Partial<CidadeRequestDTO>): Promise<CidadeResponseDTO> {
    const updated = await this.repository.update(id, dto as any);
    
    this.kafka.produce("geografia.cidade", updated.id, {
      operation: "UPDATE",
      data: updated
    });

    return CidadeMappers.toResponseDTO(updated);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
    
    this.kafka.produce("geografia.cidade", id, {
      operation: "DELETE",
      id: id
    });
  }

  async getById(id: string): Promise<CidadeResponseDTO | null> {
    const found = await this.repository.findById(id);
    return found ? CidadeMappers.toResponseDTO(found) : null;
  }

  async list(filters?: any): Promise<CidadeResponseDTO[]> {
    const found = await this.repository.findAll(filters);
    return found.map(CidadeMappers.toResponseDTO);
  }
}
