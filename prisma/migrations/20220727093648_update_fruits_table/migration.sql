/*
  Warnings:

  - Changed the type of `price` on the `Fruits` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Fruits" DROP COLUMN "price",
ADD COLUMN     "price" DECIMAL(5,2) NOT NULL;
