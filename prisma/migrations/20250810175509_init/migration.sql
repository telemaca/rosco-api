-- CreateTable
CREATE TABLE "public"."Definition" (
    "id" TEXT NOT NULL,
    "letter" TEXT NOT NULL,
    "definition" TEXT NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "Definition_pkey" PRIMARY KEY ("id")
);
