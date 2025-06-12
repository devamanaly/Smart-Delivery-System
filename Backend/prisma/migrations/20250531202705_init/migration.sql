-- CreateTable
CREATE TABLE "merchant" (
    "merchant_id" SERIAL NOT NULL,
    "business_name" TEXT NOT NULL,
    "owner_phone" TEXT NOT NULL,
    "business_address" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "business_type" TEXT NOT NULL,
    "business_category" TEXT NOT NULL,
    "business_description" TEXT,
    "opening_hours" TEXT NOT NULL,
    "closing_hours" TEXT NOT NULL,
    "owner_full_name" TEXT NOT NULL,
    "role_in_business" TEXT NOT NULL,
    "owner_national_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "merchant_pkey" PRIMARY KEY ("merchant_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "merchant_email_key" ON "merchant"("email");
