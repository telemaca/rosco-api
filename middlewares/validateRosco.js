import { z } from "zod";

export const validate = (schema) => (req, res, next) => {
  const data = {
    body: req.body ?? {},
    params: req.params ?? {},
    query: req.query ?? {},
  };

  const result = schema.safeParse(data);
  if (!result.success) {
    const flattened = z.flattenError(result.error);
    const gatherAllErrors = ({ formErrors = [], fieldErrors = {} }) => {
      const fieldErrorsArray = Object.values(fieldErrors).flat();
      return [...formErrors, ...fieldErrorsArray];
    };

    const allErrors = gatherAllErrors(flattened);
    return res.status(400).json({ errors: allErrors.map((e) => e) });
  }

  next();
};
