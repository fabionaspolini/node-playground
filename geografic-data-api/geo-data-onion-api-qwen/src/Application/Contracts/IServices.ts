import { Pais } from "../../Domain/Entities/Pais";

/**
 * Interface base para serviços de domínio
 * Fornecer contrato para todos os serviços da aplicação
 */
export interface IServices {
  /**
   * Método de inicialização do serviço
   */
  initialize?(): Promise<void>;
}
