/*
  Warnings:

  - A unique constraint covering the columns `[userId,jobId]` on the table `Applicant` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Applicant_userId_jobId_key" ON "Applicant"("userId", "jobId");
