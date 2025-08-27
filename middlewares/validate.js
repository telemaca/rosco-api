import { ZodError, z } from "zod";

export const validate =
  (schemas = {}) =>
  (req, res, next) => {
    // schemas = { body?: z.Schema, params?: z.Schema, query?: z.Schema }
    try {
      // Valida solo lo que tenga schema definido
      if (schemas.body) schemas.body.parse(req.body);
      if (schemas.params) schemas.params.parse(req.params);
      if (schemas.query) schemas.query.parse(req.query);

      next();
    } catch (err) {
      const flattened = z.flattenError(err);

      const gatherAllErrors = ({ formErrors = [], fieldErrors = {} }) => {
        const fieldErrorsArray = Object.values(fieldErrors).flat();
        return [...formErrors, ...fieldErrorsArray];
      };

      const allErrors = gatherAllErrors(flattened);

      if (err instanceof ZodError) {
        return res.status(400).json({
          success: false,
          errors: allErrors.map((e) => e), // array de mensajes
        });
      }
      next(err);
    }
  };
