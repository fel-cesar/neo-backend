-- CreateTable
CREATE TABLE "Cnpj" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "blocked" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cnpj_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cnpj_value_key" ON "Cnpj"("value");
