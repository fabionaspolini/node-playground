/**
 * DTO para resposta de uma cidade
 */
class CityResponseDTO {
  constructor(id, name, state, createdAt, updatedAt) {
    this.id = id;
    this.name = name;
    this.state = state;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  /**
   * Cria um DTO a partir de uma entidade City do Prisma
   * @param {Object} city - Entidade City do Prisma
   * @returns {CityResponseDTO}
   */
  static fromEntity(city) {
    return new CityResponseDTO(
      city.id,
      city.name,
      city.state,
      city.createdAt,
      city.updatedAt
    );
  }

  /**
   * Converte para objeto simples
   * @returns {Object}
   */
  toObject() {
    return {
      id: this.id,
      name: this.name,
      state: this.state,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

module.exports = CityResponseDTO;

