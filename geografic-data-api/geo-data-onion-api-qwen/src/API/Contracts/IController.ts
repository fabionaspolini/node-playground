/**
 * Interface base para Controllers
 * Fornecer contrato para todos os controllers da API
 */
export interface IController {
  /**
   * Inicializa as rotas do controller
   * @param router - Router do Express
   */
  initialize?(router: any): void;
}
