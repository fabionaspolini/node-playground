import { Pais } from "@domain/Entities/Pais";
import { Estado } from "@domain/Entities/Estado";
import { Cidade } from "@domain/Entities/Cidade";

describe("Entities - Domain", () => {
  describe("Pais", () => {
    it("should create a pais entity", () => {
      const pais = new Pais({
        id: "BR",
        nome: "Brasil",
        codigoISO3: "BRA",
        codigoONU: 76,
        codigoDDI: "+55",
        codigoMoeda: "BRL",
        defaultLocale: "pt-BR"
      });

      expect(pais.id).toBe("BR");
      expect(pais.nome).toBe("Brasil");
      expect(pais.codigoISO3).toBe("BRA");
      expect(pais.ativo).toBe(true); // default
    });

    it("should deactivate a pais", () => {
      const pais = new Pais({
        id: "BR",
        nome: "Brasil",
        codigoISO3: "BRA",
        codigoONU: 76,
        codigoDDI: "+55",
        codigoMoeda: "BRL",
        defaultLocale: "pt-BR"
      });

      pais.desativar();

      expect(pais.ativo).toBe(false);
    });

    it("should activate a pais", () => {
      const pais = new Pais({
        id: "BR",
        nome: "Brasil",
        codigoISO3: "BRA",
        codigoONU: 76,
        codigoDDI: "+55",
        codigoMoeda: "BRL",
        defaultLocale: "pt-BR",
        ativo: false
      });

      pais.ativar();

      expect(pais.ativo).toBe(true);
    });
  });

  describe("Estado", () => {
    it("should create an estado entity", () => {
      const estado = new Estado({
        id: "BR-SP",
        paisId: "BR",
        nome: "São Paulo",
        sigla: "SP",
        tipo: "STATE"
      });

      expect(estado.id).toBe("BR-SP");
      expect(estado.paisId).toBe("BR");
      expect(estado.nome).toBe("São Paulo");
      expect(estado.sigla).toBe("SP");
      expect(estado.tipo).toBe("STATE");
      expect(estado.ativo).toBe(true); // default
    });

    it("should deactivate an estado", () => {
      const estado = new Estado({
        id: "BR-SP",
        paisId: "BR",
        nome: "São Paulo",
        sigla: "SP",
        tipo: "STATE"
      });

      estado.desativar();

      expect(estado.ativo).toBe(false);
    });
  });

  describe("Cidade", () => {
    it("should create a cidade entity", () => {
      const cidade = new Cidade({
        id: "123e4567-e89b-12d3-a456-426614174000",
        estadoId: "BR-SP",
        nome: "São Paulo",
        codigoPostal: "01000-000",
        latitude: -23.55052,
        longitude: -46.633308
      });

      expect(cidade.id).toBe("123e4567-e89b-12d3-a456-426614174000");
      expect(cidade.estadoId).toBe("BR-SP");
      expect(cidade.nome).toBe("São Paulo");
      expect(cidade.ativo).toBe(true); // default
    });

    it("should deactivate a cidade", () => {
      const cidade = new Cidade({
        id: "123e4567-e89b-12d3-a456-426614174000",
        estadoId: "BR-SP",
        nome: "São Paulo"
      });

      cidade.desativar();

      expect(cidade.ativo).toBe(false);
    });
  });
});
