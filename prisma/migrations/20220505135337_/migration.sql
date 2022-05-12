/*
  Warnings:

  - You are about to drop the column `resume_url` on the `resume` table. All the data in the column will be lost.
  - You are about to drop the column `tech_stack_description` on the `tech_stack` table. All the data in the column will be lost.
  - You are about to drop the column `tech_stack_image_url` on the `tech_stack` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `resume` DROP COLUMN `resume_url`,
    ADD COLUMN `image_url` CHAR(100) NULL;

-- AlterTable
ALTER TABLE `tech_stack` DROP COLUMN `tech_stack_description`,
    DROP COLUMN `tech_stack_image_url`,
    ADD COLUMN `description` TEXT NULL,
    ADD COLUMN `image_url` CHAR(100) NULL;
