import { EstadoService } from "@application/Services/EstadoService";
import { IEstadoRepository } from "@domain/Repositories/IEstadoRepository";
import { Estado } from "@domain/Entities/Estado";
import { mock, MockProxy } from "jest-mock-extended";

describe("EstadoService - Application", () => {
  let service: EstadoService;
  let repository: MockProxy<IEstadoRepository>;

  beforeEach(() => {
    repository = mock<IEstadoRepository>();
    service = new EstadoService(repository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("list", () => {
    it("should return all estados when no filter provided", async () => {
      const estados = [
        new Estado({ id: "BR-SP", paisId: "BR", nome: "São Paulo", sigla: "SP", tipo: "STATE" }),
        new Estado({ id: "BR-SC", paisId: "BR", nome: "Santa Catarina", sigla: "SC", tipo: "STATE" })
      ];

      repository.findAll.mockResolvedValue(estados);

      const result = await service.list();

      expect(result).toEqual(estados);
      expect(repository.findAll).toHaveBeenCalled();
    });
  });

  describe("getById", () => {
    it("should return estado when found", async () => {
      const estado = new Estado({ id: "BR-SP", paisId: "BR", nome: "São Paulo", sigla: "SP", tipo: "STATE" });

      repository.findById.mockResolvedValue(estado);

      const result = await service.getById("BR-SP");

      expect(result).toEqual(estado);
      expect(repository.findById).toHaveBeenCalledWith("BR-SP");
    });
  });

  describe("create", () => {
    it("should create a new estado", async () => {
      const estado = new Estado({ id: "BR-SP", paisId: "BR", nome: "São Paulo", sigla: "SP", tipo: "STATE" });
      repository.create.mockResolvedValue(estado);

      const result = await service.create(estado);

      expect(result).toEqual(estado);
      expect(repository.create).toHaveBeenCalledWith(estado);
    });
  });

  describe("update", () => {
    it("should update an existing estado", async () => {
      const estado = new Estado({ id: "BR-SP", paisId: "BR", nome: "São Paulo", sigla: "SP", tipo: "STATE" });
      repository.findById.mockResolvedValue(estado);
      repository.update.mockResolvedValue(estado);

      const result = await service.update(estado);

      expect(result).toEqual(estado);
      expect(repository.findById).toHaveBeenCalledWith("BR-SP");
      expect(repository.update).toHaveBeenCalledWith(estado);
    });

    it("should throw error when estado not found", async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.update(new Estado({ id: "BR-SP", paisId: "BR", nome: "São Paulo", sigla: "SP", tipo: "STATE" })))
        .rejects.toThrow("Estado com ID BR-SP não encontrado");
    });
  });

  describe("remove", () => {
    it("should return true when estado removed", async () => {
      const estado = new Estado({ id: "BR-SP", paisId: "BR", nome: "São Paulo", sigla: "SP", tipo: "STATE" });
      repository.findById.mockResolvedValue(estado);
      repository.update.mockResolvedValue(estado);

      const result = await service.remove("BR-SP");

      expect(result).toBe(true);
      expect(estado.ativo).toBe(false);
    });

    it("should return false when estado not found", async () => {
      repository.findById.mockResolvedValue(null);

      const result = await service.remove("BR-SP");

      expect(result).toBe(false);
    });
  });
});
