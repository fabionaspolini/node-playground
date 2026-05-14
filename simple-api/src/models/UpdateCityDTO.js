/**
 * DTO para atualização de uma cidade
 */
class UpdateCityDTO {
  constructor(name, state) {
    this.name = name;
    this.state = state;
  }

  /**
   * Cria um DTO a partir de um objeto
   * @param {Object} obj - Objeto com dados da cidade
   * @returns {UpdateCityDTO}
   */
  static fromObject(obj) {
    return new UpdateCityDTO(obj.name, obj.state);
  }

  /**
   * Converte para objeto simples, ignorando campos undefined
   * @returns {Object}
   */
  toObject() {
    const result = {};
    if (this.name !== undefined) result.name = this.name;
    if (this.state !== undefined) result.state = this.state;
    return result;
  }
}

module.exports = UpdateCityDTO;

