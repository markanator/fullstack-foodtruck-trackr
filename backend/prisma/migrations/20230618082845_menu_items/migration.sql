-- CreateTable
CREATE TABLE "MenuItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" INTEGER,
    "truckId" TEXT NOT NULL,
    "photoId" TEXT,
    CONSTRAINT "MenuItem_truckId_fkey" FOREIGN KEY ("truckId") REFERENCES "Truck" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "MenuItem_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES "Image" ("fileId") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Truck" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "cuisineType" TEXT,
    "description" TEXT,
    "priceRange" TEXT,
    "address" TEXT,
    "phone" TEXT,
    "views" BIGINT DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "photoId" TEXT,
    "ownerId" TEXT NOT NULL,
    CONSTRAINT "Truck_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES "Image" ("fileId") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Truck_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Truck" ("address", "createdAt", "cuisineType", "description", "id", "name", "ownerId", "phone", "photoId", "priceRange", "slug", "updatedAt", "views") SELECT "address", "createdAt", "cuisineType", "description", "id", "name", "ownerId", "phone", "photoId", "priceRange", "slug", "updatedAt", "views" FROM "Truck";
DROP TABLE "Truck";
ALTER TABLE "new_Truck" RENAME TO "Truck";
CREATE UNIQUE INDEX "Truck_id_key" ON "Truck"("id");
CREATE UNIQUE INDEX "Truck_photoId_key" ON "Truck"("photoId");
CREATE TABLE "new_Favorite" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "truckId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Favorite_truckId_fkey" FOREIGN KEY ("truckId") REFERENCES "Truck" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Favorite" ("createdAt", "id", "truckId", "updatedAt", "userId") SELECT "createdAt", "id", "truckId", "updatedAt", "userId" FROM "Favorite";
DROP TABLE "Favorite";
ALTER TABLE "new_Favorite" RENAME TO "Favorite";
CREATE UNIQUE INDEX "Favorite_id_key" ON "Favorite"("id");
CREATE TABLE "new_TruckStop" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "truckId" TEXT NOT NULL,
    "locationId" TEXT,
    CONSTRAINT "TruckStop_truckId_fkey" FOREIGN KEY ("truckId") REFERENCES "Truck" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "TruckStop_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_TruckStop" ("createdAt", "id", "locationId", "truckId", "updatedAt") SELECT "createdAt", "id", "locationId", "truckId", "updatedAt" FROM "TruckStop";
DROP TABLE "TruckStop";
ALTER TABLE "new_TruckStop" RENAME TO "TruckStop";
CREATE UNIQUE INDEX "TruckStop_id_key" ON "TruckStop"("id");
CREATE UNIQUE INDEX "TruckStop_locationId_key" ON "TruckStop"("locationId");
CREATE TABLE "new_Review" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "rating" INTEGER NOT NULL,
    "content" TEXT,
    "truckId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Review_truckId_fkey" FOREIGN KEY ("truckId") REFERENCES "Truck" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Review" ("content", "createdAt", "id", "rating", "truckId", "updatedAt", "userId") SELECT "content", "createdAt", "id", "rating", "truckId", "updatedAt", "userId" FROM "Review";
DROP TABLE "Review";
ALTER TABLE "new_Review" RENAME TO "Review";
CREATE UNIQUE INDEX "Review_id_key" ON "Review"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "MenuItem_id_key" ON "MenuItem"("id");

-- CreateIndex
CREATE UNIQUE INDEX "MenuItem_photoId_key" ON "MenuItem"("photoId");
