/*
  Warnings:

  - Added the required column `gin_id` to the `Checkin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Checkin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Checkin" ADD COLUMN     "gin_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Checkin" ADD CONSTRAINT "Checkin_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Checkin" ADD CONSTRAINT "Checkin_gin_id_fkey" FOREIGN KEY ("gin_id") REFERENCES "gyms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
