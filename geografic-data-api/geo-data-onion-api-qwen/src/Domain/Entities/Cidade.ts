/**
 * Entidade que representa uma Cidade no sistema
 */
export class Cidade {
  /**
   * Identificador único (UUID v7)
   */
  id: string;
  
  /**
   * Referência ao estado (EstadoId)
   */
  estadoId: string;
  
  /**
   * Nome da cidade
   */
  nome: string;
  
  /**
   * CEP/Zip local
   */
  codigoPostal?: string;
  
  /**
   * Coordenada para mapas e logística (Latitude)
   */
  latitude?: number;
  
  /**
   * Coordenada para mapas e logística (Longitude)
   */
  longitude?: number;
  
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
   * Relacionamento com Estado
   */
  estado?: any;

  /**
   * Cria uma nova instância de Cidade
   */
  constructor(cidade: Partial<Cidade>) {
    this.id = cidade.id!;
    this.estadoId = cidade.estadoId!;
    this.nome = cidade.nome!;
    this.codigoPostal = cidade.codigoPostal;
    this.latitude = cidade.latitude;
    this.longitude = cidade.longitude;
    this.ativo = cidade.ativo ?? true;
    this.createdAt = cidade.createdAt;
    this.updatedAt = cidade.updatedAt;
    this.estado = cidade.estado;
  }

  /**
   * Desativa a cidade
   */
  public desativar(): void {
    this.ativo = false;
  }

  /**
   * Ativa a cidade
   */
  public ativar(): void {
    this.ativo = true;
  }
}
