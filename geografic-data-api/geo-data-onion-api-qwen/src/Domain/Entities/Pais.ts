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
  códigoISO3: string;
  
  /**
   * Código numérico da ONU
   * @example 76, 840
   */
  códigoONU: number;
  
  /**
   * DDI (Código de discagem)
   * @example "+55", "+1"
   */
  códigoDDI: string;
  
  /**
   * Código da moeda (ISO 4217)
   * @example "BRL", "USD"
   */
  códigoMoeda: string;
  
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
    this.códigoISO3 = pais.códigoISO3!;
    this.códigoONU = pais.códigoONU!;
    this.códigoDDI = pais.códigoDDI!;
    this.códigoMoeda = pais.códigoMoeda!;
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
