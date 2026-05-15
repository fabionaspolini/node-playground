/**
 * Entidade que representa uma cidade.
 */
export class Cidade {
  /**
   * Identificador único (UUID).
   */
  id: string;

  /**
   * Referência a Estado.
   */
  estadoId: string;

  /**
   * Nome da cidade.
   */
  nome: string;

  /**
   * CEP/Zip local.
   */
  codigoPostal: string;

  /**
   * Coordenada para mapas e logística.
   */
  latitude: number;

  /**
   * Coordenada para mapas e logística.
   */
  longitude: number;

  /**
   * Indicador se o registro ainda é válido.
   */
  ativo: boolean;

  constructor(props: Cidade) {
    this.id = props.id;
    this.estadoId = props.estadoId;
    this.nome = props.nome;
    this.codigoPostal = props.codigoPostal;
    this.latitude = props.latitude;
    this.longitude = props.longitude;
    this.ativo = props.ativo ?? true;
  }
}
