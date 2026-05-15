/**
 * Entidade que representa um estado.
 */
export class Estado {
  /**
   * Identificador único, sendo no formato do código ISO 3166-2.
   * Exemplo: "BR-SP", "BR-SC", "BR-PR", "US-AK"
   */
  id: string;

  /**
   * Referência a entidade Pais.
   */
  paisId: string;

  /**
   * Nome do estado.
   * Exemplo: "São Paulo", "Santa Catarina", "Paraná", "Alaska"
   */
  nome: string;

  /**
   * Sigla nacional do estado (Código ISO 3166-2 sem a parte inicial do país).
   * Exemplo: "SP", "SC", "PR", "AK"
   */
  sigla: string;

  /**
   * Tipo da subdivisão no país.
   * Exemplo: "STATE", "PROVINCE", "DEPARTMENT", "DISTRICT"
   */
  tipo: string;

  /**
   * Indicador se o registro ainda é válido.
   */
  ativo: boolean;

  constructor(props: Estado) {
    this.id = props.id;
    this.paisId = props.paisId;
    this.nome = props.nome;
    this.sigla = props.sigla;
    this.tipo = props.tipo;
    this.ativo = props.ativo ?? true;
  }
}
