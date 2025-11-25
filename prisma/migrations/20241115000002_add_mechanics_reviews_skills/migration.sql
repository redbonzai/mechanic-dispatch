-- CreateTable
CREATE TABLE "Mechanic" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "bio" TEXT,
    "imageUrl" TEXT,
    "location" TEXT NOT NULL,
    "yearsExperience" INTEGER NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "reviewCount" INTEGER NOT NULL DEFAULT 0,
    "jobsCompleted" INTEGER NOT NULL DEFAULT 0,
    "sinceYear" INTEGER NOT NULL,
    "certifications" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "badges" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Mechanic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MechanicSkill" (
    "id" TEXT NOT NULL,
    "mechanicId" TEXT NOT NULL,
    "skillId" TEXT NOT NULL,

    CONSTRAINT "MechanicSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "rating" INTEGER NOT NULL,
    "reviewerName" TEXT NOT NULL,
    "reviewerLocation" TEXT NOT NULL,
    "reviewText" TEXT NOT NULL,
    "carModel" TEXT NOT NULL,
    "carYear" INTEGER NOT NULL,
    "serviceDescription" TEXT NOT NULL,
    "mechanicId" TEXT NOT NULL,
    "serviceRequestId" TEXT,
    "photoUrls" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Mechanic_slug_key" ON "Mechanic"("slug");
CREATE UNIQUE INDEX "Skill_name_key" ON "Skill"("name");
CREATE UNIQUE INDEX "MechanicSkill_mechanicId_skillId_key" ON "MechanicSkill"("mechanicId", "skillId");
CREATE INDEX "Review_mechanicId_idx" ON "Review"("mechanicId");
CREATE INDEX "Review_rating_idx" ON "Review"("rating");
CREATE INDEX "Review_createdAt_idx" ON "Review"("createdAt");

-- AddForeignKey
ALTER TABLE "MechanicWorkLog" ADD CONSTRAINT "MechanicWorkLog_mechanicId_fkey" FOREIGN KEY ("mechanicId") REFERENCES "Mechanic"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "MechanicSkill" ADD CONSTRAINT "MechanicSkill_mechanicId_fkey" FOREIGN KEY ("mechanicId") REFERENCES "Mechanic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "MechanicSkill" ADD CONSTRAINT "MechanicSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Review" ADD CONSTRAINT "Review_mechanicId_fkey" FOREIGN KEY ("mechanicId") REFERENCES "Mechanic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Review" ADD CONSTRAINT "Review_serviceRequestId_fkey" FOREIGN KEY ("serviceRequestId") REFERENCES "ServiceRequest"("id") ON DELETE SET NULL ON UPDATE CASCADE;

