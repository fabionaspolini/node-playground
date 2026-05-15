-- CreateTable
CREATE TABLE "paises" (
    "id" VARCHAR(2) NOT NULL,
    "nome" TEXT NOT NULL,
    "codigoISO3" VARCHAR(3) NOT NULL,
    "codigoONU" INTEGER NOT NULL,
    "codigoDDI" TEXT NOT NULL,
    "codigoMoeda" VARCHAR(3) NOT NULL,
    "defaultLocale" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "paises_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estados" (
    "id" VARCHAR(6) NOT NULL,
    "paisId" VARCHAR(2) NOT NULL,
    "nome" TEXT NOT NULL,
    "sigla" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "estados_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cidades" (
    "id" UUID NOT NULL,
    "estadoId" VARCHAR(6) NOT NULL,
    "nome" TEXT NOT NULL,
    "codigoPostal" TEXT NOT NULL,
    "latitude" DECIMAL(10,8) NOT NULL,
    "longitude" DECIMAL(11,8) NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "cidades_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "estados" ADD CONSTRAINT "estados_paisId_fkey" FOREIGN KEY ("paisId") REFERENCES "paises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cidades" ADD CONSTRAINT "cidades_estadoId_fkey" FOREIGN KEY ("estadoId") REFERENCES "estados"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
