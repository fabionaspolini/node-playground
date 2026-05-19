-- CreateTable
CREATE TABLE "cidades" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "estado" TEXT NOT NULL,

    CONSTRAINT "cidades_pkey" PRIMARY KEY ("id")
);
