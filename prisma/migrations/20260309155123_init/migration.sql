/*
  Warnings:

  - You are about to alter the column `name` on the `Board` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `name` on the `Column` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to drop the column `name` on the `Task` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `Workspace` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - Added the required column `description` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Board" ALTER COLUMN "name" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Column" ALTER COLUMN "name" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "name",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "position" VARCHAR(100) NOT NULL,
ADD COLUMN     "title" VARCHAR(255) NOT NULL,
ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Workspace" ALTER COLUMN "name" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "WorkspaceMember" ALTER COLUMN "updated_at" DROP NOT NULL;
