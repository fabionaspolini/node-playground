/**
 * Entidade que representa um Estado/Unidade Federativa no sistema
 */
export class Estado {
  /**
   * Identificador único (ISO 3166-2)
   * @example "BR-SP", "BR-SC", "US-AK"
   */
  id: string;
  
  /**
   * Referência ao país (PaisId)
   */
  paisId: string;
  
  /**
   * Nome do estado
   * @example "São Paulo", "Santa Catarina", "Alaska"
   */
  nome: string;
  
  /**
   * Sigla nacional do estado (Código ISO 3166-2 sem a parte inicial do país)
   * @example "SP", "SC", "AK"
   */
  sigla: string;
  
  /**
   * Tipo da subdivisão no país
   */
  tipo: "STATE" | "PROVINCE" | "DEPARTMENT" | "DISTRICT";
  
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
   * Relacionamento com País
   */
  pais?: any;
  
  /**
   * Relacionamento com Cidades deste estado
   */
  cidades?: any[];

  /**
   * Cria uma nova instância de Estado
   */
  constructor(estado: Partial<Estado>) {
    this.id = estado.id!;
    this.paisId = estado.paisId!;
    this.nome = estado.nome!;
    this.sigla = estado.sigla!;
    this.tipo = estado.tipo!;
    this.ativo = estado.ativo ?? true;
    this.createdAt = estado.createdAt;
    this.updatedAt = estado.updatedAt;
    this.pais = estado.pais;
    this.cidades = estado.cidades;
  }

  /**
   * Desativa o estado
   */
  public desativar(): void {
    this.ativo = false;
  }

  /**
   * Ativa o estado
   */
  public ativar(): void {
    this.ativo = true;
  }
}
