/*
  Warnings:

  - You are about to drop the column `playerId` on the `GamePlayer` table. All the data in the column will be lost.
  - Added the required column `userId` to the `GamePlayer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GamePlayer" DROP CONSTRAINT "GamePlayer_playerId_fkey";

-- AlterTable
ALTER TABLE "GamePlayer" DROP COLUMN "playerId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "GamePlayer" ADD CONSTRAINT "GamePlayer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
