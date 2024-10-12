-- DropForeignKey
ALTER TABLE "Board" DROP CONSTRAINT "Board_organisationId_fkey";

-- AddForeignKey
ALTER TABLE "Board" ADD CONSTRAINT "Board_organisationId_fkey" FOREIGN KEY ("organisationId") REFERENCES "Organisation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
