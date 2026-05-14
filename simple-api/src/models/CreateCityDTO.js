/**
 * DTO para criação de uma nova cidade
 */
class CreateCityDTO {
  constructor(name, state) {
    this.name = name;
    this.state = state;
  }

  /**
   * Cria um DTO a partir de um objeto
   * @param {Object} obj - Objeto com dados da cidade
   * @returns {CreateCityDTO}
   */
  static fromObject(obj) {
    return new CreateCityDTO(obj.name, obj.state);
  }

  /**
   * Converte para objeto simples
   * @returns {Object}
   */
  toObject() {
    return {
      name: this.name,
      state: this.state,
    };
  }
}

module.exports = CreateCityDTO;

