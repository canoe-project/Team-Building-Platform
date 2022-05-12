-- CreateTable
CREATE TABLE `accounts` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `provider_account_id` VARCHAR(191) NOT NULL,
    `refresh_token` VARCHAR(191) NULL,
    `access_token` VARCHAR(191) NULL,
    `expires_at` INTEGER NULL,
    `token_type` VARCHAR(191) NULL,
    `scope` VARCHAR(191) NULL,
    `id_token` VARCHAR(191) NULL,
    `session_state` VARCHAR(191) NULL,
    `oauth_token_secret` VARCHAR(191) NULL,
    `oauth_token` VARCHAR(191) NULL,

    INDEX `accounts_user_id_fkey`(`user_id`),
    UNIQUE INDEX `accounts_provider_provider_account_id_key`(`provider`, `provider_account_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sessions` (
    `id` VARCHAR(191) NOT NULL,
    `session_token` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `sessions_session_token_key`(`session_token`),
    INDEX `sessions_user_id_fkey`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `verificationtokens` (
    `identifier` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `verificationtokens_token_key`(`token`),
    UNIQUE INDEX `verificationtokens_identifier_token_key`(`identifier`, `token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `email_verified` DATETIME(3) NULL,
    `name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NULL,
    `image` VARCHAR(191) NULL,
    `address_1` VARCHAR(191) NULL,
    `address_2` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `manager` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `manager_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `citizens` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `citizens_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `profile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `citizens_id` INTEGER NOT NULL,
    `profession_id` INTEGER NULL,
    `view_count` INTEGER NOT NULL,
    `like_count` INTEGER NOT NULL,
    `content` TEXT NULL,

    UNIQUE INDEX `profile_citizens_id_key`(`citizens_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sns` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sns_name` CHAR(50) NOT NULL,
    `sns_url` CHAR(100) NOT NULL,
    `image_url` CHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `resume` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `profile_id` INTEGER NOT NULL,
    `resume_name` CHAR(50) NOT NULL,
    `resume_url` CHAR(100) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `resume_profile_id_fkey`(`profile_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `professtion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `profession_name` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `image_url` CHAR(100) NOT NULL,

    UNIQUE INDEX `professtion_profession_name_key`(`profession_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_interest_professtion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `citizens_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tech_stack` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tech_stack_name` CHAR(50) NOT NULL,
    `tech_stack_description` TEXT NOT NULL,
    `tech_stack_image_uri` CHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `certificate` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `citizens_id` INTEGER NULL,
    `classification_id` INTEGER NULL,
    `authority_id` INTEGER NULL,
    `certificate_name` CHAR(50) NOT NULL,
    `description` TEXT NOT NULL,
    `image_url` CHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `classification` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `classification_name` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,

    UNIQUE INDEX `classification_classification_name_key`(`classification_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `authority` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `authority_name` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,

    UNIQUE INDEX `authority_authority_name_key`(`authority_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `program` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `program_name` CHAR(50) NOT NULL,
    `description` TEXT NOT NULL,
    `imgae_url` CHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `team` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `contest_name` CHAR(200) NOT NULL,
    `prize` INTEGER NOT NULL,
    `content` TEXT NOT NULL,
    `end_period` DATE NOT NULL,
    `start_period` DATE NOT NULL,
    `create_at` DATE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `corporate_type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `corporate_name` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,

    UNIQUE INDEX `corporate_type_corporate_name_key`(`corporate_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `article` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `published` BOOLEAN NOT NULL DEFAULT false,
    `viewCount` INTEGER NOT NULL,
    `likeCount` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `content` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `article_id` INTEGER NOT NULL,
    `title` CHAR(200) NOT NULL,
    `body` TEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `content_article_id_key`(`article_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `article_id` INTEGER NOT NULL,
    `body` TEXT NOT NULL,
    `likeCount` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `comment_article_id_fkey`(`article_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notice_article` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `article_id` INTEGER NOT NULL,
    `manager_id` INTEGER NOT NULL,

    UNIQUE INDEX `notice_article_article_id_key`(`article_id`),
    INDEX `notice_article_manager_id_fkey`(`manager_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `answer_article` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `article_id` INTEGER NOT NULL,
    `manager_id` INTEGER NOT NULL,

    UNIQUE INDEX `answer_article_article_id_key`(`article_id`),
    INDEX `answer_article_manager_id_fkey`(`manager_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `question_article` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `article_id` INTEGER NOT NULL,
    `citizens_id` INTEGER NOT NULL,

    UNIQUE INDEX `question_article_article_id_key`(`article_id`),
    INDEX `question_article_citizens_id_fkey`(`citizens_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contest_article` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `article_id` INTEGER NOT NULL,
    `citizens_id` INTEGER NOT NULL,
    `contest_id` INTEGER NOT NULL,
    `constest_image_url` CHAR(100) NOT NULL,

    UNIQUE INDEX `contest_article_article_id_key`(`article_id`),
    INDEX `contest_article_citizens_id_fkey`(`citizens_id`),
    INDEX `contest_article_contest_id_fkey`(`contest_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `team_article` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `article_id` INTEGER NOT NULL,
    `citizens_id` INTEGER NOT NULL,
    `team_id` INTEGER NOT NULL,
    `contest_id` INTEGER NOT NULL,
    `team_image_url` CHAR(100) NOT NULL,

    UNIQUE INDEX `team_article_article_id_key`(`article_id`),
    INDEX `team_article_citizens_id_fkey`(`citizens_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `free_article` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `article_id` INTEGER NOT NULL,
    `citizens_id` INTEGER NOT NULL,

    UNIQUE INDEX `free_article_article_id_key`(`article_id`),
    INDEX `free_article_citizens_id_fkey`(`citizens_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `thread` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `article_id` INTEGER NOT NULL,
    `citizens_id` INTEGER NOT NULL,

    UNIQUE INDEX `thread_article_id_key`(`article_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `report` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `article_id` INTEGER NULL,
    `content` TEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `report_article_id_fkey`(`article_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tag` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tag_name` CHAR(50) NOT NULL,
    `description` TEXT NOT NULL,
    `tag_color` CHAR(6) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `review` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `project_score` TINYINT NOT NULL,
    `performance_satisfaction_score` TINYINT NOT NULL,
    `communication_skills_score` TINYINT NOT NULL,
    `compliance_with_the_schedule_score` TINYINT NOT NULL,
    `activeness_score` TINYINT NOT NULL,
    `professionalism_score` TINYINT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `role_name` CHAR(50) NOT NULL,
    `description` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CitizensToProgram` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CitizensToProgram_AB_unique`(`A`, `B`),
    INDEX `_CitizensToProgram_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CitizensTotechStack` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CitizensTotechStack_AB_unique`(`A`, `B`),
    INDEX `_CitizensTotechStack_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CitizensToProfession` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CitizensToProfession_AB_unique`(`A`, `B`),
    INDEX `_CitizensToProfession_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CitizensToTeam` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CitizensToTeam_AB_unique`(`A`, `B`),
    INDEX `_CitizensToTeam_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CitizensToRole` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CitizensToRole_AB_unique`(`A`, `B`),
    INDEX `_CitizensToRole_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ProfileToSNS` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ProfileToSNS_AB_unique`(`A`, `B`),
    INDEX `_ProfileToSNS_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ProfileToReview` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ProfileToReview_AB_unique`(`A`, `B`),
    INDEX `_ProfileToReview_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ProfessionToTeam` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ProfessionToTeam_AB_unique`(`A`, `B`),
    INDEX `_ProfessionToTeam_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ProfessionTotechStack` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ProfessionTotechStack_AB_unique`(`A`, `B`),
    INDEX `_ProfessionTotechStack_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ProfessionToProgram` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ProfessionToProgram_AB_unique`(`A`, `B`),
    INDEX `_ProfessionToProgram_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ProfessionToUserInterestProfession` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ProfessionToUserInterestProfession_AB_unique`(`A`, `B`),
    INDEX `_ProfessionToUserInterestProfession_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CertificateToCitizens` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CertificateToCitizens_AB_unique`(`A`, `B`),
    INDEX `_CertificateToCitizens_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CertificateToContest` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CertificateToContest_AB_unique`(`A`, `B`),
    INDEX `_CertificateToContest_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CertificateToTeam` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CertificateToTeam_AB_unique`(`A`, `B`),
    INDEX `_CertificateToTeam_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CertificateTotechStack` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CertificateTotechStack_AB_unique`(`A`, `B`),
    INDEX `_CertificateTotechStack_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CertificateToProfession` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CertificateToProfession_AB_unique`(`A`, `B`),
    INDEX `_CertificateToProfession_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ProgramToTeam` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ProgramToTeam_AB_unique`(`A`, `B`),
    INDEX `_ProgramToTeam_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ProgramTotechStack` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ProgramTotechStack_AB_unique`(`A`, `B`),
    INDEX `_ProgramTotechStack_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_TeamTotechStack` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_TeamTotechStack_AB_unique`(`A`, `B`),
    INDEX `_TeamTotechStack_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_TeamToThread` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_TeamToThread_AB_unique`(`A`, `B`),
    INDEX `_TeamToThread_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ContestToCorporateType` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ContestToCorporateType_AB_unique`(`A`, `B`),
    INDEX `_ContestToCorporateType_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ContestToProgram` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ContestToProgram_AB_unique`(`A`, `B`),
    INDEX `_ContestToProgram_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ContestTotechStack` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ContestTotechStack_AB_unique`(`A`, `B`),
    INDEX `_ContestTotechStack_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ContestToProfession` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ContestToProfession_AB_unique`(`A`, `B`),
    INDEX `_ContestToProfession_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ContestToProfile` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ContestToProfile_AB_unique`(`A`, `B`),
    INDEX `_ContestToProfile_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ContestToTeam` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ContestToTeam_AB_unique`(`A`, `B`),
    INDEX `_ContestToTeam_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ContestToTag` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ContestToTag_AB_unique`(`A`, `B`),
    INDEX `_ContestToTag_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ArticleToTag` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ArticleToTag_AB_unique`(`A`, `B`),
    INDEX `_ArticleToTag_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_TagToTeam` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_TagToTeam_AB_unique`(`A`, `B`),
    INDEX `_TagToTeam_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_RoleToTeam` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_RoleToTeam_AB_unique`(`A`, `B`),
    INDEX `_RoleToTeam_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `accounts` ADD CONSTRAINT `accounts_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sessions` ADD CONSTRAINT `sessions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `manager` ADD CONSTRAINT `manager_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `citizens` ADD CONSTRAINT `citizens_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `profile` ADD CONSTRAINT `profile_citizens_id_fkey` FOREIGN KEY (`citizens_id`) REFERENCES `citizens`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resume` ADD CONSTRAINT `resume_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_interest_professtion` ADD CONSTRAINT `user_interest_professtion_citizens_id_fkey` FOREIGN KEY (`citizens_id`) REFERENCES `citizens`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `certificate` ADD CONSTRAINT `certificate_classification_id_fkey` FOREIGN KEY (`classification_id`) REFERENCES `classification`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `certificate` ADD CONSTRAINT `certificate_authority_id_fkey` FOREIGN KEY (`authority_id`) REFERENCES `authority`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `content` ADD CONSTRAINT `content_article_id_fkey` FOREIGN KEY (`article_id`) REFERENCES `article`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `comment_article_id_fkey` FOREIGN KEY (`article_id`) REFERENCES `article`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notice_article` ADD CONSTRAINT `notice_article_manager_id_fkey` FOREIGN KEY (`manager_id`) REFERENCES `manager`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notice_article` ADD CONSTRAINT `notice_article_article_id_fkey` FOREIGN KEY (`article_id`) REFERENCES `article`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `answer_article` ADD CONSTRAINT `answer_article_manager_id_fkey` FOREIGN KEY (`manager_id`) REFERENCES `manager`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `answer_article` ADD CONSTRAINT `answer_article_article_id_fkey` FOREIGN KEY (`article_id`) REFERENCES `article`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `question_article` ADD CONSTRAINT `question_article_citizens_id_fkey` FOREIGN KEY (`citizens_id`) REFERENCES `citizens`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `question_article` ADD CONSTRAINT `question_article_article_id_fkey` FOREIGN KEY (`article_id`) REFERENCES `article`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `contest_article` ADD CONSTRAINT `contest_article_citizens_id_fkey` FOREIGN KEY (`citizens_id`) REFERENCES `citizens`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `contest_article` ADD CONSTRAINT `contest_article_contest_id_fkey` FOREIGN KEY (`contest_id`) REFERENCES `contest`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `contest_article` ADD CONSTRAINT `contest_article_article_id_fkey` FOREIGN KEY (`article_id`) REFERENCES `article`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `team_article` ADD CONSTRAINT `team_article_citizens_id_fkey` FOREIGN KEY (`citizens_id`) REFERENCES `citizens`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `team_article` ADD CONSTRAINT `team_article_team_id_fkey` FOREIGN KEY (`team_id`) REFERENCES `team`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `team_article` ADD CONSTRAINT `team_article_contest_id_fkey` FOREIGN KEY (`contest_id`) REFERENCES `contest`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `team_article` ADD CONSTRAINT `team_article_article_id_fkey` FOREIGN KEY (`article_id`) REFERENCES `article`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `free_article` ADD CONSTRAINT `free_article_citizens_id_fkey` FOREIGN KEY (`citizens_id`) REFERENCES `citizens`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `free_article` ADD CONSTRAINT `free_article_article_id_fkey` FOREIGN KEY (`article_id`) REFERENCES `article`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `thread` ADD CONSTRAINT `thread_citizens_id_fkey` FOREIGN KEY (`citizens_id`) REFERENCES `citizens`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `thread` ADD CONSTRAINT `thread_article_id_fkey` FOREIGN KEY (`article_id`) REFERENCES `article`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `report` ADD CONSTRAINT `report_article_id_fkey` FOREIGN KEY (`article_id`) REFERENCES `article`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CitizensToProgram` ADD CONSTRAINT `_CitizensToProgram_A_fkey` FOREIGN KEY (`A`) REFERENCES `citizens`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CitizensToProgram` ADD CONSTRAINT `_CitizensToProgram_B_fkey` FOREIGN KEY (`B`) REFERENCES `program`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CitizensTotechStack` ADD CONSTRAINT `_CitizensTotechStack_A_fkey` FOREIGN KEY (`A`) REFERENCES `citizens`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CitizensTotechStack` ADD CONSTRAINT `_CitizensTotechStack_B_fkey` FOREIGN KEY (`B`) REFERENCES `tech_stack`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CitizensToProfession` ADD CONSTRAINT `_CitizensToProfession_A_fkey` FOREIGN KEY (`A`) REFERENCES `citizens`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CitizensToProfession` ADD CONSTRAINT `_CitizensToProfession_B_fkey` FOREIGN KEY (`B`) REFERENCES `professtion`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CitizensToTeam` ADD CONSTRAINT `_CitizensToTeam_A_fkey` FOREIGN KEY (`A`) REFERENCES `citizens`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CitizensToTeam` ADD CONSTRAINT `_CitizensToTeam_B_fkey` FOREIGN KEY (`B`) REFERENCES `team`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CitizensToRole` ADD CONSTRAINT `_CitizensToRole_A_fkey` FOREIGN KEY (`A`) REFERENCES `citizens`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CitizensToRole` ADD CONSTRAINT `_CitizensToRole_B_fkey` FOREIGN KEY (`B`) REFERENCES `role`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProfileToSNS` ADD CONSTRAINT `_ProfileToSNS_A_fkey` FOREIGN KEY (`A`) REFERENCES `profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProfileToSNS` ADD CONSTRAINT `_ProfileToSNS_B_fkey` FOREIGN KEY (`B`) REFERENCES `sns`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProfileToReview` ADD CONSTRAINT `_ProfileToReview_A_fkey` FOREIGN KEY (`A`) REFERENCES `profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProfileToReview` ADD CONSTRAINT `_ProfileToReview_B_fkey` FOREIGN KEY (`B`) REFERENCES `review`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProfessionToTeam` ADD CONSTRAINT `_ProfessionToTeam_A_fkey` FOREIGN KEY (`A`) REFERENCES `professtion`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProfessionToTeam` ADD CONSTRAINT `_ProfessionToTeam_B_fkey` FOREIGN KEY (`B`) REFERENCES `team`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProfessionTotechStack` ADD CONSTRAINT `_ProfessionTotechStack_A_fkey` FOREIGN KEY (`A`) REFERENCES `professtion`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProfessionTotechStack` ADD CONSTRAINT `_ProfessionTotechStack_B_fkey` FOREIGN KEY (`B`) REFERENCES `tech_stack`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProfessionToProgram` ADD CONSTRAINT `_ProfessionToProgram_A_fkey` FOREIGN KEY (`A`) REFERENCES `professtion`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProfessionToProgram` ADD CONSTRAINT `_ProfessionToProgram_B_fkey` FOREIGN KEY (`B`) REFERENCES `program`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProfessionToUserInterestProfession` ADD CONSTRAINT `_ProfessionToUserInterestProfession_A_fkey` FOREIGN KEY (`A`) REFERENCES `professtion`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProfessionToUserInterestProfession` ADD CONSTRAINT `_ProfessionToUserInterestProfession_B_fkey` FOREIGN KEY (`B`) REFERENCES `user_interest_professtion`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CertificateToCitizens` ADD CONSTRAINT `_CertificateToCitizens_A_fkey` FOREIGN KEY (`A`) REFERENCES `certificate`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CertificateToCitizens` ADD CONSTRAINT `_CertificateToCitizens_B_fkey` FOREIGN KEY (`B`) REFERENCES `citizens`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CertificateToContest` ADD CONSTRAINT `_CertificateToContest_A_fkey` FOREIGN KEY (`A`) REFERENCES `certificate`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CertificateToContest` ADD CONSTRAINT `_CertificateToContest_B_fkey` FOREIGN KEY (`B`) REFERENCES `contest`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CertificateToTeam` ADD CONSTRAINT `_CertificateToTeam_A_fkey` FOREIGN KEY (`A`) REFERENCES `certificate`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CertificateToTeam` ADD CONSTRAINT `_CertificateToTeam_B_fkey` FOREIGN KEY (`B`) REFERENCES `team`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CertificateTotechStack` ADD CONSTRAINT `_CertificateTotechStack_A_fkey` FOREIGN KEY (`A`) REFERENCES `certificate`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CertificateTotechStack` ADD CONSTRAINT `_CertificateTotechStack_B_fkey` FOREIGN KEY (`B`) REFERENCES `tech_stack`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CertificateToProfession` ADD CONSTRAINT `_CertificateToProfession_A_fkey` FOREIGN KEY (`A`) REFERENCES `certificate`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CertificateToProfession` ADD CONSTRAINT `_CertificateToProfession_B_fkey` FOREIGN KEY (`B`) REFERENCES `professtion`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProgramToTeam` ADD CONSTRAINT `_ProgramToTeam_A_fkey` FOREIGN KEY (`A`) REFERENCES `program`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProgramToTeam` ADD CONSTRAINT `_ProgramToTeam_B_fkey` FOREIGN KEY (`B`) REFERENCES `team`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProgramTotechStack` ADD CONSTRAINT `_ProgramTotechStack_A_fkey` FOREIGN KEY (`A`) REFERENCES `program`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProgramTotechStack` ADD CONSTRAINT `_ProgramTotechStack_B_fkey` FOREIGN KEY (`B`) REFERENCES `tech_stack`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TeamTotechStack` ADD CONSTRAINT `_TeamTotechStack_A_fkey` FOREIGN KEY (`A`) REFERENCES `team`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TeamTotechStack` ADD CONSTRAINT `_TeamTotechStack_B_fkey` FOREIGN KEY (`B`) REFERENCES `tech_stack`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TeamToThread` ADD CONSTRAINT `_TeamToThread_A_fkey` FOREIGN KEY (`A`) REFERENCES `team`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TeamToThread` ADD CONSTRAINT `_TeamToThread_B_fkey` FOREIGN KEY (`B`) REFERENCES `thread`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ContestToCorporateType` ADD CONSTRAINT `_ContestToCorporateType_A_fkey` FOREIGN KEY (`A`) REFERENCES `contest`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ContestToCorporateType` ADD CONSTRAINT `_ContestToCorporateType_B_fkey` FOREIGN KEY (`B`) REFERENCES `corporate_type`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ContestToProgram` ADD CONSTRAINT `_ContestToProgram_A_fkey` FOREIGN KEY (`A`) REFERENCES `contest`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ContestToProgram` ADD CONSTRAINT `_ContestToProgram_B_fkey` FOREIGN KEY (`B`) REFERENCES `program`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ContestTotechStack` ADD CONSTRAINT `_ContestTotechStack_A_fkey` FOREIGN KEY (`A`) REFERENCES `contest`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ContestTotechStack` ADD CONSTRAINT `_ContestTotechStack_B_fkey` FOREIGN KEY (`B`) REFERENCES `tech_stack`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ContestToProfession` ADD CONSTRAINT `_ContestToProfession_A_fkey` FOREIGN KEY (`A`) REFERENCES `contest`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ContestToProfession` ADD CONSTRAINT `_ContestToProfession_B_fkey` FOREIGN KEY (`B`) REFERENCES `professtion`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ContestToProfile` ADD CONSTRAINT `_ContestToProfile_A_fkey` FOREIGN KEY (`A`) REFERENCES `contest`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ContestToProfile` ADD CONSTRAINT `_ContestToProfile_B_fkey` FOREIGN KEY (`B`) REFERENCES `profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ContestToTeam` ADD CONSTRAINT `_ContestToTeam_A_fkey` FOREIGN KEY (`A`) REFERENCES `contest`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ContestToTeam` ADD CONSTRAINT `_ContestToTeam_B_fkey` FOREIGN KEY (`B`) REFERENCES `team`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ContestToTag` ADD CONSTRAINT `_ContestToTag_A_fkey` FOREIGN KEY (`A`) REFERENCES `contest`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ContestToTag` ADD CONSTRAINT `_ContestToTag_B_fkey` FOREIGN KEY (`B`) REFERENCES `tag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ArticleToTag` ADD CONSTRAINT `_ArticleToTag_A_fkey` FOREIGN KEY (`A`) REFERENCES `article`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ArticleToTag` ADD CONSTRAINT `_ArticleToTag_B_fkey` FOREIGN KEY (`B`) REFERENCES `tag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TagToTeam` ADD CONSTRAINT `_TagToTeam_A_fkey` FOREIGN KEY (`A`) REFERENCES `tag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TagToTeam` ADD CONSTRAINT `_TagToTeam_B_fkey` FOREIGN KEY (`B`) REFERENCES `team`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_RoleToTeam` ADD CONSTRAINT `_RoleToTeam_A_fkey` FOREIGN KEY (`A`) REFERENCES `role`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_RoleToTeam` ADD CONSTRAINT `_RoleToTeam_B_fkey` FOREIGN KEY (`B`) REFERENCES `team`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
