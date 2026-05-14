const express = require('express');
const { PrismaClient } = require('@prisma/client');
// const { PrismaClient } = require('../../generated/prisma');
const CreateCityDTO = require('../models/CreateCityDTO');
const UpdateCityDTO = require('../models/UpdateCityDTO');
const CityResponseDTO = require('../models/CityResponseDTO');

const router = express.Router();
const prisma = new PrismaClient();

/**
 * POST /cities - Criar uma nova cidade
 */
router.post('/', async (req, res) => {
  try {
    // Validar dados de entrada
    if (!req.body.name || !req.body.state) {
      return res.status(400).json({
        error: 'Nome e UF são obrigatórios',
      });
    }

    // Converter para DTO
    const createCityDTO = CreateCityDTO.fromObject(req.body);

    // Criar cidade no banco de dados
    const city = await prisma.city.create({
      data: createCityDTO.toObject(),
    });

    // Converter resposta para DTO
    const responseDTO = CityResponseDTO.fromEntity(city);

    return res.status(201).json(responseDTO.toObject());
  } catch (error) {
    console.error('Erro ao criar cidade:', error);
    return res.status(500).json({
      error: 'Erro ao criar cidade',
    });
  }
});

/**
 * GET /cities - Listar todas as cidades
 */
router.get('/', async (req, res) => {
  try {
    const cities = await prisma.city.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    // Converter todas as cidades para DTOs de resposta
    const responseDTOs = cities.map((city) => CityResponseDTO.fromEntity(city));

    return res.status(200).json(responseDTOs.map((dto) => dto.toObject()));
  } catch (error) {
    console.error('Erro ao listar cidades:', error);
    return res.status(500).json({
      error: 'Erro ao listar cidades',
    });
  }
});

/**
 * GET /cities/:id - Obter uma cidade por ID
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const city = await prisma.city.findUnique({
      where: { id },
    });

    if (!city) {
      return res.status(404).json({
        error: 'Cidade não encontrada',
      });
    }

    // Converter para DTO
    const responseDTO = CityResponseDTO.fromEntity(city);

    return res.status(200).json(responseDTO.toObject());
  } catch (error) {
    console.error('Erro ao obter cidade:', error);
    return res.status(500).json({
      error: 'Erro ao obter cidade',
    });
  }
});

/**
 * PUT /cities/:id - Atualizar uma cidade
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validar se a cidade existe
    const existingCity = await prisma.city.findUnique({
      where: { id },
    });

    if (!existingCity) {
      return res.status(404).json({
        error: 'Cidade não encontrada',
      });
    }

    // Converter para DTO
    const updateCityDTO = UpdateCityDTO.fromObject(req.body);

    // Atualizar cidade no banco de dados
    const updatedCity = await prisma.city.update({
      where: { id },
      data: updateCityDTO.toObject(),
    });

    // Converter resposta para DTO
    const responseDTO = CityResponseDTO.fromEntity(updatedCity);

    return res.status(200).json(responseDTO.toObject());
  } catch (error) {
    console.error('Erro ao atualizar cidade:', error);
    return res.status(500).json({
      error: 'Erro ao atualizar cidade',
    });
  }
});

/**
 * DELETE /cities/:id - Deletar uma cidade
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validar se a cidade existe
    const existingCity = await prisma.city.findUnique({
      where: { id },
    });

    if (!existingCity) {
      return res.status(404).json({
        error: 'Cidade não encontrada',
      });
    }

    // Deletar cidade do banco de dados
    const deletedCity = await prisma.city.delete({
      where: { id },
    });

    // Converter resposta para DTO
    const responseDTO = CityResponseDTO.fromEntity(deletedCity);

    return res.status(200).json({
      message: 'Cidade deletada com sucesso',
      city: responseDTO.toObject(),
    });
  } catch (error) {
    console.error('Erro ao deletar cidade:', error);
    return res.status(500).json({
      error: 'Erro ao deletar cidade',
    });
  }
});

module.exports = router;

