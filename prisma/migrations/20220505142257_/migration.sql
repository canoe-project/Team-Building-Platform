/*
  Warnings:

  - A unique constraint covering the columns `[certificate_name]` on the table `certificate` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[program_name]` on the table `program` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[role_name]` on the table `role` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sns_name]` on the table `sns` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tag_name]` on the table `tag` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tech_stack_name]` on the table `tech_stack` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `certificate_certificate_name_key` ON `certificate`(`certificate_name`);

-- CreateIndex
CREATE UNIQUE INDEX `program_program_name_key` ON `program`(`program_name`);

-- CreateIndex
CREATE UNIQUE INDEX `role_role_name_key` ON `role`(`role_name`);

-- CreateIndex
CREATE UNIQUE INDEX `sns_sns_name_key` ON `sns`(`sns_name`);

-- CreateIndex
CREATE UNIQUE INDEX `tag_tag_name_key` ON `tag`(`tag_name`);

-- CreateIndex
CREATE UNIQUE INDEX `tech_stack_tech_stack_name_key` ON `tech_stack`(`tech_stack_name`);
