import { Request, Response } from "express";
import { CidadeUseCase } from "../../application/use-cases/cidade-use-case";

export class CidadeController {
  constructor(private readonly useCase: CidadeUseCase) {}

  async create(req: Request, res: Response) {
    try {
      const result = await this.useCase.create(req.body);
      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const result = await this.useCase.update(req.params.id as string, req.body);
      return res.json(result);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await this.useCase.delete(req.params.id as string);
      return res.status(204).send();
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const result = await this.useCase.getById(req.params.id as string);
      if (!result) return res.status(404).json({ message: "Cidade não encontrada" });
      return res.json(result);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const result = await this.useCase.list(req.query);
      return res.json(result);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
