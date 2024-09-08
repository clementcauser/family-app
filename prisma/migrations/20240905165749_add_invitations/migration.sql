-- CreateTable
CREATE TABLE "invitation" (
    "id" TEXT NOT NULL,
    "familyId" TEXT NOT NULL,
    "guestId" TEXT NOT NULL,

    CONSTRAINT "invitation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "invitation" ADD CONSTRAINT "invitation_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "family"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invitation" ADD CONSTRAINT "invitation_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
