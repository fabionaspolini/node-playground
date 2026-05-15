import { PaisUseCase } from "../../src/application/use-cases/pais-use-case";
import { IPaisRepository } from "../../src/domain/repositories/pais-repository.interface";
import { KafkaProducer } from "../../src/infrastructure/messaging/kafka-producer";
import { Pais } from "../../src/domain/entities/pais";

describe("PaisUseCase", () => {
  let useCase: PaisUseCase;
  let repository: jest.Mocked<IPaisRepository>;
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

    useCase = new PaisUseCase(repository, kafka);
  });

  it("deve criar um país com sucesso", async () => {
    const dto = {
      id: "BR",
      nome: "Brasil",
      codigoISO3: "BRA",
      codigoONU: 76,
      codigoDDI: "+55",
      codigoMoeda: "BRL",
      defaultLocale: "pt-BR",
    };

    const entity = new Pais({ ...dto, ativo: true });
    repository.create.mockResolvedValue(entity);

    const result = await useCase.create(dto);

    expect(result.id).toBe("BR");
    expect(repository.create).toHaveBeenCalled();
    expect(kafka.produce).toHaveBeenCalledWith("geografia.pais", "BR", expect.any(Object));
  });
});
