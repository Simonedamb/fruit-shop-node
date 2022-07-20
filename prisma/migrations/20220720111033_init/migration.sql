-- CreateTable
CREATE TABLE "Fruits" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "genus" VARCHAR(255),
    "image" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "family" VARCHAR(255),
    "order" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" VARCHAR(255),
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" VARCHAR(255),

    CONSTRAINT "Fruits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Nutrition" (
    "Fruits_id" SERIAL NOT NULL,
    "carbohydrates" DECIMAL(65,30) NOT NULL,
    "protein" DECIMAL(65,30) NOT NULL,
    "fath" DECIMAL(65,30) NOT NULL,
    "calories" DECIMAL(65,30) NOT NULL,
    "sugar" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Nutrition_pkey" PRIMARY KEY ("Fruits_id")
);
