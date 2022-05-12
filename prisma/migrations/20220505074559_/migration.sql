/*
  Warnings:

  - You are about to drop the column `imgae_url` on the `program` table. All the data in the column will be lost.
  - You are about to drop the column `tech_stack_image_uri` on the `tech_stack` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `article` MODIFY `viewCount` INTEGER NOT NULL DEFAULT 0,
    MODIFY `likeCount` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `certificate` MODIFY `description` TEXT NULL,
    MODIFY `image_url` CHAR(100) NULL;

-- AlterTable
ALTER TABLE `contest` MODIFY `create_at` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `contest_article` MODIFY `constest_image_url` CHAR(100) NULL;

-- AlterTable
ALTER TABLE `corporate_type` MODIFY `description` TEXT NULL;

-- AlterTable
ALTER TABLE `professtion` MODIFY `image_url` CHAR(100) NULL;

-- AlterTable
ALTER TABLE `profile` MODIFY `view_count` INTEGER NOT NULL DEFAULT 0,
    MODIFY `like_count` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `program` DROP COLUMN `imgae_url`,
    ADD COLUMN `image_url` CHAR(100) NULL,
    MODIFY `description` TEXT NULL;

-- AlterTable
ALTER TABLE `resume` MODIFY `resume_url` CHAR(100) NULL;

-- AlterTable
ALTER TABLE `sns` MODIFY `sns_url` CHAR(100) NULL,
    MODIFY `image_url` CHAR(100) NULL;

-- AlterTable
ALTER TABLE `team_article` MODIFY `team_image_url` CHAR(100) NULL;

-- AlterTable
ALTER TABLE `tech_stack` DROP COLUMN `tech_stack_image_uri`,
    ADD COLUMN `tech_stack_image_url` CHAR(100) NULL,
    MODIFY `tech_stack_description` TEXT NULL;
