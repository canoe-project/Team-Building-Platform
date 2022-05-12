/*
  Warnings:

  - You are about to drop the `_CertificateTotechStack` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CitizensTotechStack` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ContestTotechStack` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProfessionTotechStack` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProgramTotechStack` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TeamTotechStack` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_CertificateTotechStack` DROP FOREIGN KEY `_CertificateTotechStack_A_fkey`;

-- DropForeignKey
ALTER TABLE `_CertificateTotechStack` DROP FOREIGN KEY `_CertificateTotechStack_B_fkey`;

-- DropForeignKey
ALTER TABLE `_CitizensTotechStack` DROP FOREIGN KEY `_CitizensTotechStack_A_fkey`;

-- DropForeignKey
ALTER TABLE `_CitizensTotechStack` DROP FOREIGN KEY `_CitizensTotechStack_B_fkey`;

-- DropForeignKey
ALTER TABLE `_ContestTotechStack` DROP FOREIGN KEY `_ContestTotechStack_A_fkey`;

-- DropForeignKey
ALTER TABLE `_ContestTotechStack` DROP FOREIGN KEY `_ContestTotechStack_B_fkey`;

-- DropForeignKey
ALTER TABLE `_ProfessionTotechStack` DROP FOREIGN KEY `_ProfessionTotechStack_A_fkey`;

-- DropForeignKey
ALTER TABLE `_ProfessionTotechStack` DROP FOREIGN KEY `_ProfessionTotechStack_B_fkey`;

-- DropForeignKey
ALTER TABLE `_ProgramTotechStack` DROP FOREIGN KEY `_ProgramTotechStack_A_fkey`;

-- DropForeignKey
ALTER TABLE `_ProgramTotechStack` DROP FOREIGN KEY `_ProgramTotechStack_B_fkey`;

-- DropForeignKey
ALTER TABLE `_TeamTotechStack` DROP FOREIGN KEY `_TeamTotechStack_A_fkey`;

-- DropForeignKey
ALTER TABLE `_TeamTotechStack` DROP FOREIGN KEY `_TeamTotechStack_B_fkey`;

-- DropTable
DROP TABLE `_CertificateTotechStack`;

-- DropTable
DROP TABLE `_CitizensTotechStack`;

-- DropTable
DROP TABLE `_ContestTotechStack`;

-- DropTable
DROP TABLE `_ProfessionTotechStack`;

-- DropTable
DROP TABLE `_ProgramTotechStack`;

-- DropTable
DROP TABLE `_TeamTotechStack`;

-- CreateTable
CREATE TABLE `_CitizensToTechStack` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CitizensToTechStack_AB_unique`(`A`, `B`),
    INDEX `_CitizensToTechStack_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ProfessionToTechStack` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ProfessionToTechStack_AB_unique`(`A`, `B`),
    INDEX `_ProfessionToTechStack_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CertificateToTechStack` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CertificateToTechStack_AB_unique`(`A`, `B`),
    INDEX `_CertificateToTechStack_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ProgramToTechStack` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ProgramToTechStack_AB_unique`(`A`, `B`),
    INDEX `_ProgramToTechStack_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_TeamToTechStack` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_TeamToTechStack_AB_unique`(`A`, `B`),
    INDEX `_TeamToTechStack_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ContestToTechStack` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ContestToTechStack_AB_unique`(`A`, `B`),
    INDEX `_ContestToTechStack_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_CitizensToTechStack` ADD CONSTRAINT `_CitizensToTechStack_A_fkey` FOREIGN KEY (`A`) REFERENCES `citizens`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CitizensToTechStack` ADD CONSTRAINT `_CitizensToTechStack_B_fkey` FOREIGN KEY (`B`) REFERENCES `tech_stack`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProfessionToTechStack` ADD CONSTRAINT `_ProfessionToTechStack_A_fkey` FOREIGN KEY (`A`) REFERENCES `professtion`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProfessionToTechStack` ADD CONSTRAINT `_ProfessionToTechStack_B_fkey` FOREIGN KEY (`B`) REFERENCES `tech_stack`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CertificateToTechStack` ADD CONSTRAINT `_CertificateToTechStack_A_fkey` FOREIGN KEY (`A`) REFERENCES `certificate`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CertificateToTechStack` ADD CONSTRAINT `_CertificateToTechStack_B_fkey` FOREIGN KEY (`B`) REFERENCES `tech_stack`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProgramToTechStack` ADD CONSTRAINT `_ProgramToTechStack_A_fkey` FOREIGN KEY (`A`) REFERENCES `program`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProgramToTechStack` ADD CONSTRAINT `_ProgramToTechStack_B_fkey` FOREIGN KEY (`B`) REFERENCES `tech_stack`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TeamToTechStack` ADD CONSTRAINT `_TeamToTechStack_A_fkey` FOREIGN KEY (`A`) REFERENCES `team`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TeamToTechStack` ADD CONSTRAINT `_TeamToTechStack_B_fkey` FOREIGN KEY (`B`) REFERENCES `tech_stack`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ContestToTechStack` ADD CONSTRAINT `_ContestToTechStack_A_fkey` FOREIGN KEY (`A`) REFERENCES `contest`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ContestToTechStack` ADD CONSTRAINT `_ContestToTechStack_B_fkey` FOREIGN KEY (`B`) REFERENCES `tech_stack`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
