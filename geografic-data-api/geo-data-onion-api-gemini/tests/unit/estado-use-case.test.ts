import { EstadoUseCase } from "../../src/application/use-cases/estado-use-case";
import { IEstadoRepository } from "../../src/domain/repositories/estado-repository.interface";
import { KafkaProducer } from "../../src/infrastructure/messaging/kafka-producer";
import { Estado } from "../../src/domain/entities/estado";

describe("EstadoUseCase", () => {
  let useCase: EstadoUseCase;
  let repository: jest.Mocked<IEstadoRepository>;
  let kafka: jest.Mocked<KafkaProducer>;

  beforeEach(() => {
    repository = {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
    } as any;

    kafka = {
      produce: jest.fn(),
    } as any;

    useCase = new EstadoUseCase(repository, kafka);
  });

  it("deve criar um estado com sucesso", async () => {
    const dto = {
      id: "BR-SP",
      paisId: "BR",
      nome: "São Paulo",
      sigla: "SP",
      tipo: "STATE",
    };

    const entity = new Estado({ ...dto, ativo: true });
    repository.create.mockResolvedValue(entity);

    const result = await useCase.create(dto);

    expect(result.id).toBe("BR-SP");
    expect(kafka.produce).toHaveBeenCalledWith("geografia.estado", "BR-SP", expect.any(Object));
  });
});
