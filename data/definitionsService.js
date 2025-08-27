import { v4 as uuidv4 } from "uuid";
import { definitionsByLetter } from "./definitions/index.js"; // datos en memoria

export const DefinitionService = {
  // Obtener definiciones por letra
  getDefinitionsByLetter: (letter) => {
    const defs = definitionsByLetter[letter.toUpperCase()];
    return defs || [];
  },

  // Agregar una definición nueva
  addDefinition: (letter, definition, answer) => {
    const id = uuidv4();
    const newDef = { letter, id, definition, answer };

    if (!definitionsByLetter[letter.toUpperCase()]) {
      definitionsByLetter[letter.toUpperCase()] = [];
    }
    definitionsByLetter[letter.toUpperCase()].push(newDef);

    return newDef;
  },

  updateDefinition: (id, { definition, answer }) => {
    for (const letter in definitionsByLetter) {
      const index = definitionsByLetter[letter].findIndex(
        (def) => def.id === id
      );
      if (index !== -1) {
        if (definition !== undefined)
          definitionsByLetter[letter][index].definition = definition;
        if (answer !== undefined)
          definitionsByLetter[letter][index].answer = answer;
        return definitionsByLetter[letter][index];
      }
    }
    return null;
  },

  deleteDefinition: (id) => {
    console.log(definitionsByLetter);
    for (const letter in definitionsByLetter) {
      const index = definitionsByLetter[letter].findIndex(
        (def) => def.id === id
      );
      if (index !== -1) {
        definitionsByLetter[letter].splice(index, 1);
        // Opcional: si el array queda vacío podés eliminar la letra del objeto
        if (definitionsByLetter[letter].length === 0) {
          delete definitionsByLetter[letter];
        }
        return true;
      }
    }
    return false;
  },
};
