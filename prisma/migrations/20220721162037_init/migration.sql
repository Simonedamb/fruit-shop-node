-- CreateTable
CREATE TABLE "Fruits" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "genus" VARCHAR(255),
    "image" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "family" VARCHAR(255),
    "order" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" VARCHAR(255),
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" VARCHAR(255),

    CONSTRAINT "Fruits_pkey" PRIMARY KEY ("id")
);
