-- CreateTable
CREATE TABLE "Favourite" (
    "id" TEXT NOT NULL,
    "boardId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Favourite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Favourite_userId_boardId_key" ON "Favourite"("userId", "boardId");

-- AddForeignKey
ALTER TABLE "Favourite" ADD CONSTRAINT "Favourite_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;
