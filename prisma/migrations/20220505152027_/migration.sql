/*
  Warnings:

  - You are about to drop the `_CertificateToCitizens` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CertificateToContest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CertificateToProfession` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CertificateToTeam` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CertificateToTechStack` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `certificate` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_CertificateToCitizens` DROP FOREIGN KEY `_CertificateToCitizens_A_fkey`;

-- DropForeignKey
ALTER TABLE `_CertificateToCitizens` DROP FOREIGN KEY `_CertificateToCitizens_B_fkey`;

-- DropForeignKey
ALTER TABLE `_CertificateToContest` DROP FOREIGN KEY `_CertificateToContest_A_fkey`;

-- DropForeignKey
ALTER TABLE `_CertificateToContest` DROP FOREIGN KEY `_CertificateToContest_B_fkey`;

-- DropForeignKey
ALTER TABLE `_CertificateToProfession` DROP FOREIGN KEY `_CertificateToProfession_A_fkey`;

-- DropForeignKey
ALTER TABLE `_CertificateToProfession` DROP FOREIGN KEY `_CertificateToProfession_B_fkey`;

-- DropForeignKey
ALTER TABLE `_CertificateToTeam` DROP FOREIGN KEY `_CertificateToTeam_A_fkey`;

-- DropForeignKey
ALTER TABLE `_CertificateToTeam` DROP FOREIGN KEY `_CertificateToTeam_B_fkey`;

-- DropForeignKey
ALTER TABLE `_CertificateToTechStack` DROP FOREIGN KEY `_CertificateToTechStack_A_fkey`;

-- DropForeignKey
ALTER TABLE `_CertificateToTechStack` DROP FOREIGN KEY `_CertificateToTechStack_B_fkey`;

-- DropForeignKey
ALTER TABLE `certificate` DROP FOREIGN KEY `certificate_authority_id_fkey`;

-- DropForeignKey
ALTER TABLE `certificate` DROP FOREIGN KEY `certificate_classification_id_fkey`;

-- DropTable
DROP TABLE `_CertificateToCitizens`;

-- DropTable
DROP TABLE `_CertificateToContest`;

-- DropTable
DROP TABLE `_CertificateToProfession`;

-- DropTable
DROP TABLE `_CertificateToTeam`;

-- DropTable
DROP TABLE `_CertificateToTechStack`;

-- DropTable
DROP TABLE `certificate`;

-- CreateTable
CREATE TABLE `certification` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `citizens_id` INTEGER NULL,
    `classification_id` INTEGER NULL,
    `authority_id` INTEGER NULL,
    `certificate_name` CHAR(50) NOT NULL,
    `description` TEXT NULL,
    `image_url` CHAR(100) NULL,

    UNIQUE INDEX `certification_certificate_name_key`(`certificate_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CertificationToCitizens` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CertificationToCitizens_AB_unique`(`A`, `B`),
    INDEX `_CertificationToCitizens_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CertificationToContest` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CertificationToContest_AB_unique`(`A`, `B`),
    INDEX `_CertificationToContest_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CertificationToTeam` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CertificationToTeam_AB_unique`(`A`, `B`),
    INDEX `_CertificationToTeam_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CertificationToTechStack` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CertificationToTechStack_AB_unique`(`A`, `B`),
    INDEX `_CertificationToTechStack_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CertificationToProfession` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CertificationToProfession_AB_unique`(`A`, `B`),
    INDEX `_CertificationToProfession_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `certification` ADD CONSTRAINT `certification_classification_id_fkey` FOREIGN KEY (`classification_id`) REFERENCES `classification`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `certification` ADD CONSTRAINT `certification_authority_id_fkey` FOREIGN KEY (`authority_id`) REFERENCES `authority`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CertificationToCitizens` ADD CONSTRAINT `_CertificationToCitizens_A_fkey` FOREIGN KEY (`A`) REFERENCES `certification`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CertificationToCitizens` ADD CONSTRAINT `_CertificationToCitizens_B_fkey` FOREIGN KEY (`B`) REFERENCES `citizens`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CertificationToContest` ADD CONSTRAINT `_CertificationToContest_A_fkey` FOREIGN KEY (`A`) REFERENCES `certification`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CertificationToContest` ADD CONSTRAINT `_CertificationToContest_B_fkey` FOREIGN KEY (`B`) REFERENCES `contest`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CertificationToTeam` ADD CONSTRAINT `_CertificationToTeam_A_fkey` FOREIGN KEY (`A`) REFERENCES `certification`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CertificationToTeam` ADD CONSTRAINT `_CertificationToTeam_B_fkey` FOREIGN KEY (`B`) REFERENCES `team`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CertificationToTechStack` ADD CONSTRAINT `_CertificationToTechStack_A_fkey` FOREIGN KEY (`A`) REFERENCES `certification`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CertificationToTechStack` ADD CONSTRAINT `_CertificationToTechStack_B_fkey` FOREIGN KEY (`B`) REFERENCES `tech_stack`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CertificationToProfession` ADD CONSTRAINT `_CertificationToProfession_A_fkey` FOREIGN KEY (`A`) REFERENCES `certification`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CertificationToProfession` ADD CONSTRAINT `_CertificationToProfession_B_fkey` FOREIGN KEY (`B`) REFERENCES `professtion`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
