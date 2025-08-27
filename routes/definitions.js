import express from "express";
import { z } from "zod";
import { validate } from "../middlewares/validateRosco.js";
import { DefinitionService } from "../data/definitionsService.js";
import { letters } from "../data/validLetters.js";
import {
  createDefinitionSchema,
  updateDefinitionSchema,
  deleteDefinitionSchema,
} from "../schemas/definitionSchemas.js";
import { prisma } from "../prisma.js";

const router = express.Router();

router.get("/rosco", async (req, res) => {
  try {
    const definitions = await Promise.all(
      letters.map(async (letter) => {
        const count = await prisma.definition.count({
          where: { letter },
        });

        if (count === 0) return null;

        const skip = Math.floor(Math.random() * count);

        const randomDef = await prisma.definition.findFirst({
          where: { letter },
          skip,
        });

        return randomDef;
      })
    );

    const filtered = definitions.filter(Boolean);

    res.json(filtered);
  } catch (error) {
    console.error("Error fetching rosco definitions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", validate(createDefinitionSchema), async (req, res) => {
  try {
    const { letter, definition, answer } = req.body;

    const newDef = await prisma.definition.create({
      data: {
        letter: letter.toUpperCase(),
        definition,
        answer,
      },
    });

    res.status(201).json(newDef);
  } catch (error) {
    console.error("Error creating definition:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", validate(updateDefinitionSchema), async (req, res) => {
  const { id } = req.params;
  const { definition, answer } = req.body;

  try {
    const updated = await prisma.definition.update({
      where: { id },
      data: {
        definition,
        answer,
      },
    });
    res.json(updated);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Definition not found" });
    }
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.delete("/:id", validate(deleteDefinitionSchema), async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.definition.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Definition not found" });
    }
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
