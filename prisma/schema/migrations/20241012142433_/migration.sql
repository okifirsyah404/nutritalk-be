-- DropForeignKey
ALTER TABLE "ConsultationMeta" DROP CONSTRAINT "ConsultationMeta_nutritionistId_fkey";

-- DropForeignKey
ALTER TABLE "ConsultationReview" DROP CONSTRAINT "ConsultationReview_transactionId_fkey";

-- DropForeignKey
ALTER TABLE "ConsultationTime" DROP CONSTRAINT "ConsultationTime_transactionId_fkey";

-- DropForeignKey
ALTER TABLE "Credit" DROP CONSTRAINT "Credit_patientId_fkey";

-- DropForeignKey
ALTER TABLE "CreditHistory" DROP CONSTRAINT "CreditHistory_creditId_fkey";

-- DropForeignKey
ALTER TABLE "MedicalRecord" DROP CONSTRAINT "MedicalRecord_medicalRecordKeyId_fkey";

-- DropForeignKey
ALTER TABLE "Nutritionist" DROP CONSTRAINT "Nutritionist_accountId_fkey";

-- DropForeignKey
ALTER TABLE "Nutritionist" DROP CONSTRAINT "Nutritionist_profileId_fkey";

-- DropForeignKey
ALTER TABLE "Occupation" DROP CONSTRAINT "Occupation_nutritionistId_fkey";

-- DropForeignKey
ALTER TABLE "Patient" DROP CONSTRAINT "Patient_accountId_fkey";

-- DropForeignKey
ALTER TABLE "Patient" DROP CONSTRAINT "Patient_medicalRecordKeyId_fkey";

-- DropForeignKey
ALTER TABLE "Patient" DROP CONSTRAINT "Patient_profileId_fkey";

-- DropForeignKey
ALTER TABLE "PatientDetail" DROP CONSTRAINT "PatientDetail_medicalRecordKeyId_fkey";

-- DropForeignKey
ALTER TABLE "Price" DROP CONSTRAINT "Price_nutritionistId_fkey";

-- DropForeignKey
ALTER TABLE "RegistrationCertificate" DROP CONSTRAINT "RegistrationCertificate_nutritionistId_fkey";

-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_nutritionistId_fkey";

-- DropForeignKey
ALTER TABLE "ScheduleTime" DROP CONSTRAINT "ScheduleTime_scheduleId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_nutritionistId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_patientId_fkey";

-- DropForeignKey
ALTER TABLE "TransactionPayment" DROP CONSTRAINT "TransactionPayment_transactionId_fkey";

-- DropForeignKey
ALTER TABLE "TransactionPrice" DROP CONSTRAINT "TransactionPrice_transactionId_fkey";

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_medicalRecordKeyId_fkey" FOREIGN KEY ("medicalRecordKeyId") REFERENCES "MedicalRecordKey"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Credit" ADD CONSTRAINT "Credit_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreditHistory" ADD CONSTRAINT "CreditHistory_creditId_fkey" FOREIGN KEY ("creditId") REFERENCES "Credit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientDetail" ADD CONSTRAINT "PatientDetail_medicalRecordKeyId_fkey" FOREIGN KEY ("medicalRecordKeyId") REFERENCES "MedicalRecordKey"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalRecord" ADD CONSTRAINT "MedicalRecord_medicalRecordKeyId_fkey" FOREIGN KEY ("medicalRecordKeyId") REFERENCES "MedicalRecordKey"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nutritionist" ADD CONSTRAINT "Nutritionist_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nutritionist" ADD CONSTRAINT "Nutritionist_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsultationMeta" ADD CONSTRAINT "ConsultationMeta_nutritionistId_fkey" FOREIGN KEY ("nutritionistId") REFERENCES "Nutritionist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegistrationCertificate" ADD CONSTRAINT "RegistrationCertificate_nutritionistId_fkey" FOREIGN KEY ("nutritionistId") REFERENCES "Nutritionist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Occupation" ADD CONSTRAINT "Occupation_nutritionistId_fkey" FOREIGN KEY ("nutritionistId") REFERENCES "Nutritionist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Price" ADD CONSTRAINT "Price_nutritionistId_fkey" FOREIGN KEY ("nutritionistId") REFERENCES "Nutritionist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_nutritionistId_fkey" FOREIGN KEY ("nutritionistId") REFERENCES "Nutritionist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleTime" ADD CONSTRAINT "ScheduleTime_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_nutritionistId_fkey" FOREIGN KEY ("nutritionistId") REFERENCES "Nutritionist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsultationTime" ADD CONSTRAINT "ConsultationTime_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionPrice" ADD CONSTRAINT "TransactionPrice_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionPayment" ADD CONSTRAINT "TransactionPayment_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsultationReview" ADD CONSTRAINT "ConsultationReview_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;
