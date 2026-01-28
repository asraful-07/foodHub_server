/*
  Warnings:

  - Added the required column `dietaryPreferences` to the `Meal` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DietaryPreference" AS ENUM ('VEG', 'NON_VEG');

-- AlterTable
ALTER TABLE "Meal" ADD COLUMN     "dietaryPreferences" "DietaryPreference" NOT NULL;
