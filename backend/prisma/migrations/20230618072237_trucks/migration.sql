-- CreateTable
CREATE TABLE "Truck" (
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
    CONSTRAINT "Truck_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "latitude" REAL,
    "longitude" REAL,
    "arriveAt" DATETIME,
    "departAt" DATETIME,
    "duration" INTEGER
);

-- CreateTable
CREATE TABLE "TruckStop" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "truckId" TEXT NOT NULL,
    "locationId" TEXT,
    CONSTRAINT "TruckStop_truckId_fkey" FOREIGN KEY ("truckId") REFERENCES "Truck" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TruckStop_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Truck_id_key" ON "Truck"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Truck_photoId_key" ON "Truck"("photoId");

-- CreateIndex
CREATE UNIQUE INDEX "Location_id_key" ON "Location"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TruckStop_id_key" ON "TruckStop"("id");
