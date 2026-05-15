import { CidadeUseCase } from "../../src/application/use-cases/cidade-use-case";
import { ICidadeRepository } from "../../src/domain/repositories/cidade-repository.interface";
import { KafkaProducer } from "../../src/infrastructure/messaging/kafka-producer";
import { Cidade } from "../../src/domain/entities/cidade";

describe("CidadeUseCase", () => {
  let useCase: CidadeUseCase;
  let repository: jest.Mocked<ICidadeRepository>;
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

    useCase = new CidadeUseCase(repository, kafka);
  });

  it("deve criar uma cidade com sucesso", async () => {
    const dto = {
      estadoId: "BR-SP",
      nome: "São Paulo",
      codigoPostal: "01000-000",
      latitude: -23.5505,
      longitude: -46.6333,
    };

    const entity = new Cidade({ id: "uuid-v7", ...dto, ativo: true });
    repository.create.mockResolvedValue(entity);

    const result = await useCase.create(dto);

    expect(result.nome).toBe("São Paulo");
    expect(kafka.produce).toHaveBeenCalledWith("geografia.cidade", "uuid-v7", expect.any(Object));
  });
});
