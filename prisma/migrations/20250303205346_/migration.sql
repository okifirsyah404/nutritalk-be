-- AlterTable
ALTER TABLE "Consultation" ALTER COLUMN "trId" SET DEFAULT generate_custom_id('TR');

-- AlterTable
ALTER TABLE "GastrointestinalRecord" ALTER COLUMN "diarrhea" SET DEFAULT false,
ALTER COLUMN "constipation" SET DEFAULT false,
ALTER COLUMN "vomit" SET DEFAULT false,
ALTER COLUMN "nausea" SET DEFAULT false,
ALTER COLUMN "bloating" SET DEFAULT false,
ALTER COLUMN "swallowingDisorder" SET DEFAULT false,
ALTER COLUMN "chewingDisorder" SET DEFAULT false,
ALTER COLUMN "suckingDisorder" SET DEFAULT false;
