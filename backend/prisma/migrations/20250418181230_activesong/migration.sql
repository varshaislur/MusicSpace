/*
  Warnings:

  - Added the required column `updatedAt` to the `Space` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Space" ADD COLUMN     "activeSongId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Space" ADD CONSTRAINT "Space_activeSongId_fkey" FOREIGN KEY ("activeSongId") REFERENCES "Song"("id") ON DELETE SET NULL ON UPDATE CASCADE;
