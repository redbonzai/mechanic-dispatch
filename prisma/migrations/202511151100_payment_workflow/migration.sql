CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Add new columns for Stripe workflow
ALTER TABLE "ServiceRequest"
  ADD COLUMN "finalAmountCents" INTEGER,
  ADD COLUMN "finalPaymentIntentId" TEXT,
  ADD COLUMN "stripeCustomerId" TEXT,
  ADD COLUMN "stripePaymentMethodId" TEXT;

-- Extend enum with FINALIZED state if it doesn't already exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_enum
    WHERE enumlabel = 'FINALIZED'
      AND enumtypid = 'ServiceRequestStatus'::regtype
  ) THEN
    ALTER TYPE "ServiceRequestStatus" ADD VALUE 'FINALIZED';
  END IF;
END$$;

-- Create mechanic work log table
CREATE TABLE "MechanicWorkLog" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "serviceRequestId" TEXT NOT NULL,
  "mechanicName" TEXT NOT NULL,
  "hoursWorkedMinutes" INTEGER NOT NULL,
  "payoutPercentage" INTEGER NOT NULL,
  "notes" TEXT,
  CONSTRAINT "MechanicWorkLog_serviceRequestId_fkey"
    FOREIGN KEY ("serviceRequestId")
    REFERENCES "ServiceRequest"("id")
    ON DELETE CASCADE
);

