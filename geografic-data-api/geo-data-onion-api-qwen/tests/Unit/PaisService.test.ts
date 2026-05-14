import { PaisService } from "@application/Services/PaisService";
import { IPaisRepository } from "@domain/Repositories/IPaisRepository";
import { Pais } from "@domain/Entities/Pais";
import { mock, MockProxy } from "jest-mock-extended";

describe("PaisService - Application", () => {
  let service: PaisService;
  let repository: MockProxy<IPaisRepository>;

  beforeEach(() => {
    repository = mock<IPaisRepository>();
    service = new PaisService(repository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("list", () => {
    it("should return all pais when no filter provided", async () => {
      const paises = [
        new Pais({ id: "BR", nome: "Brasil", codigoISO3: "BRA", codigoONU: 76, codigoDDI: "+55", codigoMoeda: "BRL", defaultLocale: "pt-BR" }),
        new Pais({ id: "US", nome: "Estados Unidos", codigoISO3: "USA", codigoONU: 840, codigoDDI: "+1", codigoMoeda: "USD", defaultLocale: "en-US" })
      ];

      repository.findAll.mockResolvedValue(paises);

      const result = await service.list();

      expect(result).toEqual(paises);
      expect(repository.findAll).toHaveBeenCalled();
    });

    it("should filter by ativo when provided", async () => {
      const paises = [
        new Pais({ id: "BR", nome: "Brasil", codigoISO3: "BRA", codigoONU: 76, codigoDDI: "+55", codigoMoeda: "BRL", defaultLocale: "pt-BR" })
      ];

      repository.findByFilters.mockResolvedValue(paises);

      const result = await service.list(true);

      expect(result).toEqual(paises);
      expect(repository.findByFilters).toHaveBeenCalledWith({ ativo: true });
    });
  });

  describe("getById", () => {
    it("should return pais when found", async () => {
      const pais = new Pais({ id: "BR", nome: "Brasil", codigoISO3: "BRA", codigoONU: 76, codigoDDI: "+55", codigoMoeda: "BRL", defaultLocale: "pt-BR" });

      repository.findById.mockResolvedValue(pais);

      const result = await service.getById("BR");

      expect(result).toEqual(pais);
      expect(repository.findById).toHaveBeenCalledWith("BR");
    });
  });

  describe("create", () => {
    it("should create a new pais", async () => {
      const pais = new Pais({ id: "BR", nome: "Brasil", codigoISO3: "BRA", codigoONU: 76, codigoDDI: "+55", codigoMoeda: "BRL", defaultLocale: "pt-BR" });
      repository.create.mockResolvedValue(pais);

      const result = await service.create(pais);

      expect(result).toEqual(pais);
      expect(repository.create).toHaveBeenCalledWith(pais);
    });
  });

  describe("update", () => {
    it("should update an existing pais", async () => {
      const pais = new Pais({ id: "BR", nome: "Brasil", codigoISO3: "BRA", codigoONU: 76, codigoDDI: "+55", codigoMoeda: "BRL", defaultLocale: "pt-BR" });
      repository.findById.mockResolvedValue(pais);
      repository.update.mockResolvedValue(pais);

      const result = await service.update(pais);

      expect(result).toEqual(pais);
      expect(repository.findById).toHaveBeenCalledWith("BR");
      expect(repository.update).toHaveBeenCalledWith(pais);
    });

    it("should throw error when pais not found", async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.update(new Pais({ id: "BR", nome: "Brasil", codigoISO3: "BRA", codigoONU: 76, codigoDDI: "+55", codigoMoeda: "BRL", defaultLocale: "pt-BR" })))
        .rejects.toThrow("País com ID BR não encontrado");
    });
  });

  describe("remove", () => {
    it("should return true when pais removed", async () => {
      const pais = new Pais({ id: "BR", nome: "Brasil", codigoISO3: "BRA", codigoONU: 76, codigoDDI: "+55", codigoMoeda: "BRL", defaultLocale: "pt-BR" });
      repository.findById.mockResolvedValue(pais);
      repository.update.mockResolvedValue(pais);

      const result = await service.remove("BR");

      expect(result).toBe(true);
      expect(pais.ativo).toBe(false);
    });

    it("should return false when pais not found", async () => {
      repository.findById.mockResolvedValue(null);

      const result = await service.remove("BR");

      expect(result).toBe(false);
    });
  });
});
