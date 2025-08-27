import express from "express";
import { logger } from "./logger.js";
import { errorHandler } from "./errorHandler.js";
import { validateApiKey } from "./middlewares/validateApiKey.js";
import definitionsRouter from "./routes/definitions.js";

const app = express();
const PORT = process.env.PORT || 8443;

app.use(express.json());
app.use(logger);
app.use(errorHandler);

app.use("/definitions", validateApiKey, definitionsRouter);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
