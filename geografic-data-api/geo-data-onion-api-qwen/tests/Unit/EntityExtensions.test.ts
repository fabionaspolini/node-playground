import { EntityExtensions } from "@application/Extensions/EntityExtensions";
import { Pais } from "@domain/Entities/Pais";
import { Estado } from "@domain/Entities/Estado";
import { Cidade } from "@domain/Entities/Cidade";
import { IEstadoCreateRequest } from "@application/Dtos/EstadoDto";

describe("EntityExtensions - Application", () => {
  describe("toPaisResponseDto", () => {
    it("should convert pais entity to response DTO", () => {
      const pais = new Pais({
        id: "BR",
        nome: "Brasil",
        códigoISO3: "BRA",
        códigoONU: 76,
        códigoDDI: "+55",
        códigoMoeda: "BRL",
        defaultLocale: "pt-BR",
        ativo: true,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      const dto = EntityExtensions.toPaisResponseDto(pais);

      expect(dto.id).toBe("BR");
      expect(dto.nome).toBe("Brasil");
      expect(dto.códigoISO3).toBe("BRA");
      expect(dto.códigoONU).toBe(76);
      expect(dto.códigoDDI).toBe("+55");
      expect(dto.códigoMoeda).toBe("BRL");
      expect(dto.defaultLocale).toBe("pt-BR");
      expect(dto.ativo).toBe(true);
      expect(dto.createdAt).toBeDefined();
      expect(dto.updatedAt).toBeDefined();
    });
  });

  describe("toEstadoResponseDto", () => {
    it("should convert estado entity to response DTO", () => {
      const estado = new Estado({
        id: "BR-SP",
        paisId: "BR",
        nome: "São Paulo",
        sigla: "SP",
        tipo: "STATE",
        ativo: true,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      const dto = EntityExtensions.toEstadoResponseDto(estado);

      expect(dto.id).toBe("BR-SP");
      expect(dto.paisId).toBe("BR");
      expect(dto.nome).toBe("São Paulo");
      expect(dto.sigla).toBe("SP");
      expect(dto.tipo).toBe("STATE");
      expect(dto.ativo).toBe(true);
      expect(dto.createdAt).toBeDefined();
      expect(dto.updatedAt).toBeDefined();
    });
  });

  describe("toCidadeResponseDto", () => {
    it("should convert cidade entity to response DTO", () => {
      const cidade = new Cidade({
        id: "123e4567-e89b-12d3-a456-426614174000",
        estadoId: "BR-SP",
        nome: "São Paulo",
        códigoPostal: "01000-000",
        latitude: -23.55052,
        longitude: -46.633308,
        ativo: true,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      const dto = EntityExtensions.toCidadeResponseDto(cidade);

      expect(dto.id).toBe("123e4567-e89b-12d3-a456-426614174000");
      expect(dto.estadoId).toBe("BR-SP");
      expect(dto.nome).toBe("São Paulo");
      expect(dto.códigoPostal).toBe("01000-000");
      expect(dto.latitude).toBe(-23.55052);
      expect(dto.longitude).toBe(-46.633308);
      expect(dto.ativo).toBe(true);
      expect(dto.createdAt).toBeDefined();
      expect(dto.updatedAt).toBeDefined();
    });
  });

  describe("toPaisEntity", () => {
    it("should convert create DTO to pais entity", () => {
      const dto = {
        id: "BR",
        nome: "Brasil",
        códigoISO3: "BRA",
        códigoONU: 76,
        códigoDDI: "+55",
        códigoMoeda: "BRL",
        defaultLocale: "pt-BR",
        ativo: true
      };

      const entity = EntityExtensions.toPaisEntity(dto);

      expect(entity.id).toBe("BR");
      expect(entity.nome).toBe("Brasil");
      expect(entity.ativo).toBe(true);
    });
  });

  describe("toEstadoEntity", () => {
    it("should convert create DTO to estado entity", () => {
      const dto: IEstadoCreateRequest = {
        id: "BR-SP",
        paisId: "BR",
        nome: "São Paulo",
        sigla: "SP",
        tipo: "STATE" as const,
        ativo: true
      };

      const entity = EntityExtensions.toEstadoEntity(dto);

      expect(entity.id).toBe("BR-SP");
      expect(entity.paisId).toBe("BR");
      expect(entity.ativo).toBe(true);
    });
  });

  describe("toCidadeEntity", () => {
    it("should convert create DTO to cidade entity", () => {
      const dto = {
        id: "123e4567-e89b-12d3-a456-426614174000",
        estadoId: "BR-SP",
        nome: "São Paulo",
        códigoPostal: "01000-000",
        latitude: -23.55052,
        longitude: -46.633308,
        ativo: true
      };

      const entity = EntityExtensions.toCidadeEntity(dto);

      expect(entity.id).toBe("123e4567-e89b-12d3-a456-426614174000");
      expect(entity.estadoId).toBe("BR-SP");
      expect(entity.ativo).toBe(true);
    });
  });
});
