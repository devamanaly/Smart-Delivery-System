-- CreateTable
CREATE TABLE "delivery_guy" (
    "delivery_guy_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hash_password" TEXT NOT NULL,
    "current_location" TEXT NOT NULL,
    "availability" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "phone" TEXT NOT NULL,
    "date_of_birth" TIMESTAMP(3) NOT NULL,
    "gender" TEXT NOT NULL,
    "national_id_number" TEXT NOT NULL,
    "vehicle_type" TEXT NOT NULL,
    "vehicle_number_plate" TEXT NOT NULL,
    "driving_license_number" TEXT NOT NULL,
    "id_card_url" TEXT,
    "license_doc_url" TEXT,
    "profile_photo_url" TEXT,

    CONSTRAINT "delivery_guy_pkey" PRIMARY KEY ("delivery_guy_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "delivery_guy_email_key" ON "delivery_guy"("email");

-- CreateIndex
CREATE UNIQUE INDEX "delivery_guy_national_id_number_key" ON "delivery_guy"("national_id_number");

-- CreateIndex
CREATE UNIQUE INDEX "delivery_guy_driving_license_number_key" ON "delivery_guy"("driving_license_number");
