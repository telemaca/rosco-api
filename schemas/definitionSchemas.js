import { z } from "zod";

const createDefinitionSchema = z.object({
  body: z.object({
    letter: z
      .string()
      .regex(/^[a-zA-ZnÑ]$/, "Letter must be a single alphabetic character"),
    definition: z
      .string("Falta definición")
      .min(1, { message: "Definition cannot be empty" }),
    answer: z
      .string("Falta answer")
      .min(1, { message: "Answer cannot be empty" }),
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

const idSchema = z.uuid("Invalid UUID format");

const updateDefinitionSchema = z.object({
  params: z.object({
    id: idSchema,
  }),
  body: z
    .object({
      definition: z.string().optional(),
      answer: z.string().optional(),
    })
    .refine(
      (data) => data.definition !== undefined || data.answer !== undefined,
      {
        message: "At least one of 'definition' or 'answer' must be provided",
        path: [],
      }
    ),
  query: z.object({}).optional(),
});

const deleteDefinitionSchema = z.object({
  params: z.object({
    id: idSchema,
  }),
  body: z.object({}).optional(),
  query: z.object({}).optional(),
});

export {
  createDefinitionSchema,
  updateDefinitionSchema,
  deleteDefinitionSchema,
};
