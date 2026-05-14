/**
 * Entidade que representa um País no sistema
 */
export class Pais {
  /**
   * Identificador único do país (ISO 3166-1 alpha-2)
   * @example "BR", "US"
   */
  id: string;
  
  /**
   * Nome comum do país
   * @example "Brasil", "Estados Unidos"
   */
  nome: string;
  
  /**
   * Código ISO 3166-1 alpha-3
   * @example "BRA", "USA"
   */
  codigoISO3: string;
  
  /**
   * Código numérico da ONU
   * @example 76, 840
   */
  codigoONU: number;
  
  /**
   * DDI (Código de discagem)
   * @example "+55", "+1"
   */
  codigoDDI: string;
  
  /**
   * Código da moeda (ISO 4217)
   * @example "BRL", "USD"
   */
  codigoMoeda: string;
  
  /**
   * Idioma principal
   * @example "pt-BR", "en-US"
   */
  defaultLocale: string;
  
  /**
   * Indicador se o registro ainda é válido
   * @default true
   */
  ativo: boolean;
  
  /**
   * Data de criação do registro
   */
  createdAt?: Date;
  
  /**
   * Data da última atualização
   */
  updatedAt?: Date;
  
  /**
   * Relacionamento com Estados deste país
   */
  estados?: any[];

  /**
   * Cria uma nova instância de Pais
   */
  constructor(pais: Partial<Pais>) {
    this.id = pais.id!;
    this.nome = pais.nome!;
    this.codigoISO3 = pais.codigoISO3!;
    this.codigoONU = pais.codigoONU!;
    this.codigoDDI = pais.codigoDDI!;
    this.codigoMoeda = pais.codigoMoeda!;
    this.defaultLocale = pais.defaultLocale!;
    this.ativo = pais.ativo ?? true;
    this.createdAt = pais.createdAt;
    this.updatedAt = pais.updatedAt;
    this.estados = pais.estados;
  }

  /**
   * Desativa o país
   */
  public desativar(): void {
    this.ativo = false;
  }

  /**
   * Ativa o país
   */
  public ativar(): void {
    this.ativo = true;
  }
}
