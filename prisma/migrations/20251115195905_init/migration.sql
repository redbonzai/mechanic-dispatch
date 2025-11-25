-- AlterEnum
ALTER TYPE "ServiceRequestStatus" ADD VALUE 'FINALIZED';

-- AlterTable
ALTER TABLE "ServiceRequest" ADD COLUMN     "finalAmountCents" INTEGER,
ADD COLUMN     "finalPaymentIntentId" TEXT,
ADD COLUMN     "stripeCustomerId" TEXT,
ADD COLUMN     "stripePaymentMethodId" TEXT;

-- CreateTable
CREATE TABLE "MechanicWorkLog" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "serviceRequestId" TEXT NOT NULL,
    "mechanicName" TEXT NOT NULL,
    "hoursWorkedMinutes" INTEGER NOT NULL,
    "payoutPercentage" INTEGER NOT NULL,
    "notes" TEXT,

    CONSTRAINT "MechanicWorkLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MechanicWorkLog" ADD CONSTRAINT "MechanicWorkLog_serviceRequestId_fkey" FOREIGN KEY ("serviceRequestId") REFERENCES "ServiceRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
