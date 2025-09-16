-- CreateEnum
CREATE TYPE "public"."app_role" AS ENUM ('foundation_manager', 'school_manager');

-- CreateEnum
CREATE TYPE "public"."distribution_status" AS ENUM ('pending', 'processing', 'completed', 'failed');

-- CreateEnum
CREATE TYPE "public"."institution_status" AS ENUM ('eligible', 'ineligible');

-- CreateEnum
CREATE TYPE "public"."institution_type" AS ENUM ('community_school', 'quilombola', 'indigenous');

-- CreateEnum
CREATE TYPE "public"."validation_status" AS ENUM ('pending', 'approved', 'rejected');

-- CreateTable
CREATE TABLE "public"."distributions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "institution_id" UUID NOT NULL,
    "amount" DECIMAL(15,2) NOT NULL,
    "installment_number" INTEGER NOT NULL,
    "distribution_date" DATE NOT NULL,
    "status" "public"."distribution_status" DEFAULT 'pending',
    "transaction_hash" TEXT,
    "stellar_operation_id" TEXT,
    "approved_by" UUID,
    "approved_at" TIMESTAMPTZ(6),
    "processed_at" TIMESTAMPTZ(6),
    "notes" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "distributions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."foundation_settings" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "setting_key" TEXT NOT NULL,
    "setting_value" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT DEFAULT 'general',
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "foundation_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."institutions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "full_address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT DEFAULT 'Brazil',
    "type" "public"."institution_type" NOT NULL,
    "status" "public"."institution_status" NOT NULL DEFAULT 'eligible',
    "student_count" INTEGER NOT NULL,
    "school_days" INTEGER NOT NULL,
    "unit_value" DECIMAL(10,2) NOT NULL,
    "total_value"       Decimal? @db.Decimal(15, 2),
  "installment_value" Decimal? @db.Decimal(15, 2),
    "stellar_wallet" TEXT,
    "manager_id" UUID,
    "infrastructure_score" INTEGER DEFAULT 0,
    "has_internet" BOOLEAN DEFAULT false,
    "has_computers" BOOLEAN DEFAULT false,
    "has_library" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "institutions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."monthly_metrics" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "institution_id" UUID NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "attendance_rate" DECIMAL(5,2),
    "nutrition_program_participation" DECIMAL(5,2),
    "community_engagement_score" INTEGER,
    "teacher_training_hours" INTEGER DEFAULT 0,
    "eligibility_score" DECIMAL(5,2) DEFAULT 0,
    "validation_status" "public"."validation_status" DEFAULT 'pending',
    "validated_by" UUID,
    "validated_at" TIMESTAMPTZ(6),
    "notes" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "monthly_metrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."profiles" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "encrypted_password" TEXT NOT NULL,
    "role" "public"."app_role" NOT NULL,
    "institution_id" UUID,
    "stellar_wallet" TEXT,
    "permissions" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "avatar_url" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."teachers" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "institution_id" UUID NOT NULL,
    "subject_areas" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "years_experience" INTEGER DEFAULT 0,
    "training_hours" INTEGER DEFAULT 0,
    "certification_level" TEXT,
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "teachers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."donation_details" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "donation_id" UUID NOT NULL,
    "institution_id" UUID NOT NULL,
    "net_amount" DECIMAL(15,2) NOT NULL,

    CONSTRAINT "donation_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."donations" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "donor_identifier" TEXT NOT NULL,
    "total_amount" DECIMAL(15,2) NOT NULL,
    "transaction_hash" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "donations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "foundation_settings_setting_key_key" ON "public"."foundation_settings"("setting_key");

-- CreateIndex
CREATE UNIQUE INDEX "institutions_stellar_wallet_key" ON "public"."institutions"("stellar_wallet");

-- CreateIndex
CREATE UNIQUE INDEX "monthly_metrics_institution_id_month_year_key" ON "public"."monthly_metrics"("institution_id", "month", "year");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_email_key" ON "public"."profiles"("email");

-- CreateIndex
CREATE UNIQUE INDEX "donations_transaction_hash_key" ON "public"."donations"("transaction_hash");

-- AddForeignKey
ALTER TABLE "public"."distributions" ADD CONSTRAINT "distributions_approved_by_fkey" FOREIGN KEY ("approved_by") REFERENCES "public"."profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."distributions" ADD CONSTRAINT "distributions_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "public"."institutions"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."institutions" ADD CONSTRAINT "fk_institutions_manager" FOREIGN KEY ("manager_id") REFERENCES "public"."profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."monthly_metrics" ADD CONSTRAINT "monthly_metrics_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "public"."institutions"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."monthly_metrics" ADD CONSTRAINT "monthly_metrics_validated_by_fkey" FOREIGN KEY ("validated_by") REFERENCES "public"."profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."profiles" ADD CONSTRAINT "profiles_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "public"."institutions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."teachers" ADD CONSTRAINT "teachers_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "public"."institutions"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."donation_details" ADD CONSTRAINT "donation_details_donation_id_fkey" FOREIGN KEY ("donation_id") REFERENCES "public"."donations"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."donation_details" ADD CONSTRAINT "donation_details_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "public"."institutions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
