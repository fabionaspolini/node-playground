/**
 * Entidade que representa um país.
 */
export class Pais {
  /**
   * Identificador único, sendo no formato do código ISO 3166-1 alpha-2 (Padrão).
   * Exemplo: "BR", "US"
   */
  id: string;

  /**
   * Nome comum do país.
   * Exemplo: "Brasil"
   */
  nome: string;

  /**
   * Código ISO 3166-1 alpha-3.
   * Exemplo: "BRA"
   */
  codigoISO3: string;

  /**
   * Código numérico da ONU.
   * Exemplo: 076
   */
  codigoONU: number;

  /**
   * DDI (Código de discagem).
   * Exemplo: "+55"
   */
  codigoDDI: string;

  /**
   * Código da moeda (ISO 4217).
   * Exemplo: "BRL"
   */
  codigoMoeda: string;

  /**
   * Idioma principal.
   * Exemplo: "pt-BR", "en-US"
   */
  defaultLocale: string;

  /**
   * Indicador se o registro ainda é válido.
   */
  ativo: boolean;

  constructor(props: Pais) {
    this.id = props.id;
    this.nome = props.nome;
    this.codigoISO3 = props.codigoISO3;
    this.codigoONU = props.codigoONU;
    this.codigoDDI = props.codigoDDI;
    this.codigoMoeda = props.codigoMoeda;
    this.defaultLocale = props.defaultLocale;
    this.ativo = props.ativo ?? true;
  }
}
