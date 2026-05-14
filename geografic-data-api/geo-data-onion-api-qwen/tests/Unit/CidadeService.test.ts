import { CidadeService } from "@application/Services/CidadeService";
import { ICidadeRepository } from "@domain/Repositories/ICidadeRepository";
import { Cidade } from "@domain/Entities/Cidade";
import { mock, MockProxy } from "jest-mock-extended";

describe("CidadeService - Application", () => {
  let service: CidadeService;
  let repository: MockProxy<ICidadeRepository>;

  beforeEach(() => {
    repository = mock<ICidadeRepository>();
    service = new CidadeService(repository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("list", () => {
    it("should return all cidades when no filter provided", async () => {
      const cidades = [
        new Cidade({ id: "1", estadoId: "BR-SP", nome: "São Paulo" }),
        new Cidade({ id: "2", estadoId: "BR-SP", nome: "Campinas" })
      ];

      repository.findAll.mockResolvedValue(cidades);

      const result = await service.list();

      expect(result).toEqual(cidades);
      expect(repository.findAll).toHaveBeenCalled();
    });
  });

  describe("getById", () => {
    it("should return cidade when found", async () => {
      const cidade = new Cidade({ id: "1", estadoId: "BR-SP", nome: "São Paulo" });

      repository.findById.mockResolvedValue(cidade);

      const result = await service.getById("1");

      expect(result).toEqual(cidade);
      expect(repository.findById).toHaveBeenCalledWith("1");
    });
  });

  describe("create", () => {
    it("should create a new cidade", async () => {
      const cidade = new Cidade({ id: "1", estadoId: "BR-SP", nome: "São Paulo" });
      repository.create.mockResolvedValue(cidade);

      const result = await service.create(cidade);

      expect(result).toEqual(cidade);
      expect(repository.create).toHaveBeenCalledWith(cidade);
    });
  });

  describe("update", () => {
    it("should update an existing cidade", async () => {
      const cidade = new Cidade({ id: "1", estadoId: "BR-SP", nome: "São Paulo" });
      repository.findById.mockResolvedValue(cidade);
      repository.update.mockResolvedValue(cidade);

      const result = await service.update(cidade);

      expect(result).toEqual(cidade);
      expect(repository.findById).toHaveBeenCalledWith("1");
      expect(repository.update).toHaveBeenCalledWith(cidade);
    });

    it("should throw error when cidade not found", async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.update(new Cidade({ id: "1", estadoId: "BR-SP", nome: "São Paulo" })))
        .rejects.toThrow("Cidade com ID 1 não encontrada");
    });
  });

  describe("remove", () => {
    it("should return true when cidade removed", async () => {
      const cidade = new Cidade({ id: "1", estadoId: "BR-SP", nome: "São Paulo" });
      repository.findById.mockResolvedValue(cidade);
      repository.update.mockResolvedValue(cidade);

      const result = await service.remove("1");

      expect(result).toBe(true);
      expect(cidade.ativo).toBe(false);
    });

    it("should return false when cidade not found", async () => {
      repository.findById.mockResolvedValue(null);

      const result = await service.remove("1");

      expect(result).toBe(false);
    });
  });
});
