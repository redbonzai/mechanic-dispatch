-- CreateEnum
CREATE TYPE "ServiceRequestStatus" AS ENUM ('PENDING', 'AUTHORIZED', 'CAPTURED', 'CANCELLED', 'FAILED');

-- CreateTable
CREATE TABLE "ServiceRequest" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "addressLine1" TEXT NOT NULL,
    "addressLine2" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "country" TEXT NOT NULL DEFAULT 'US',
    "vehicleMake" TEXT NOT NULL,
    "vehicleModel" TEXT NOT NULL,
    "vehicleYear" INTEGER NOT NULL,
    "amountCents" INTEGER NOT NULL DEFAULT 6000,
    "stripePaymentIntentId" TEXT,
    "status" "ServiceRequestStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "ServiceRequest_pkey" PRIMARY KEY ("id")
);

