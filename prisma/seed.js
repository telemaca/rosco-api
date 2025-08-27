import pkg from "@prisma/client";
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

async function main() {
  await prisma.definition.createMany({
    data: [
      {
        letter: "A",
        definition: "Sala donde se dan clases en los centros docentes",
        answer: "aula",
      },
      {
        letter: "A",
        definition: "Apariencia de las personas y los objetos a la vista",
        answer: "aspecto",
      },
      {
        letter: "B",
        definition: "Instrumento para escribir",
        answer: "bolígrafo",
      },
      {
        letter: "B",
        definition: "Lugar donde se guardan libros",
        answer: "biblioteca",
      },
      {
        letter: "C",
        definition: "Sentido moral o ético propios de una persona.",
        answer: "conciencia",
      },
      {
        letter: "C",
        definition: "Acción de producir algo nuevo o de la nada",
        answer: "crear",
      },
    ],
  });
}

main()
  .then(() => {
    console.log("Seed completado");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
