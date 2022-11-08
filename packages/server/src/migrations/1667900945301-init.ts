import { MigrationInterface, QueryRunner } from "typeorm";

export class init1667900945301 implements MigrationInterface {
    name = 'init1667900945301'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "global_vars" (
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_date" TIMESTAMP,
                "id" SERIAL NOT NULL,
                "identifier" character varying NOT NULL,
                "value" character varying NOT NULL,
                "title" character varying NOT NULL,
                CONSTRAINT "PK_7916609f03891ca1aa35b842382" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "cat" (
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_date" TIMESTAMP,
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "firstName" character varying NOT NULL,
                "lastName" character varying NOT NULL,
                "age" integer NOT NULL,
                CONSTRAINT "PK_7704d5c2c0250e4256935ae31b4" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "sections" (
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_date" TIMESTAMP,
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                CONSTRAINT "PK_f9749dd3bffd880a497d007e450" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "audit_trail" (
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_date" TIMESTAMP,
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "timestamp" character varying NOT NULL,
                "description" text NOT NULL,
                "action_type_id" character varying NOT NULL,
                CONSTRAINT "PK_91aade8e45ada93f7dc98ca7ced" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "employee" (
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_date" TIMESTAMP,
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "role" character varying NOT NULL,
                "status" integer NOT NULL DEFAULT '1',
                "employee_id" character varying NOT NULL,
                "password" character varying NOT NULL,
                "partial_password" character varying,
                CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "student_address" (
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_date" TIMESTAMP,
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "no" character varying,
                "street" character varying,
                "subdiv" character varying,
                "barangay" character varying NOT NULL,
                "city" character varying NOT NULL,
                "province" character varying NOT NULL,
                "region" character varying NOT NULL,
                "zip" character varying NOT NULL,
                CONSTRAINT "PK_80c67d4f34e198c99bdcdfc0d42" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "student_parent_guardian" (
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_date" TIMESTAMP,
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "first_name" character varying NOT NULL,
                "middle_name" character varying NOT NULL,
                "last_name" character varying NOT NULL,
                "contact_number" character varying NOT NULL,
                "email" character varying NOT NULL,
                "type" character varying NOT NULL,
                "studentId" uuid,
                CONSTRAINT "PK_775da47efdac63c3ea3981d3669" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "student_requirements" (
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_date" TIMESTAMP,
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "has_form_137" boolean NOT NULL DEFAULT false,
                "has_psa" boolean NOT NULL DEFAULT false,
                "has_parent_marriage_contract" boolean NOT NULL DEFAULT false,
                "has_report_card" boolean NOT NULL DEFAULT false,
                "has_report_of_rating" boolean NOT NULL DEFAULT false,
                "has_good_moral" boolean NOT NULL DEFAULT false,
                "has_school_government_recognition" boolean NOT NULL DEFAULT false,
                "has_baptismal" boolean NOT NULL DEFAULT false,
                CONSTRAINT "PK_4c18210250a3234d012ac5498db" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "student_school_record" (
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_date" TIMESTAMP,
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "sy_graduated" character varying NOT NULL,
                "school_name" character varying NOT NULL,
                "type" character varying NOT NULL,
                CONSTRAINT "PK_bf6cd810719d54003b9e3c163bb" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "student_transfer_record" (
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_date" TIMESTAMP,
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "sy_entered" character varying NOT NULL,
                "sy_exit" character varying NOT NULL,
                "studentId" uuid,
                CONSTRAINT "PK_523c9c90d03b7b828db352ccc7d" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "student" (
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_date" TIMESTAMP,
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "LRN" character varying NOT NULL,
                "first_name" character varying NOT NULL,
                "middle_name" character varying,
                "last_name" character varying NOT NULL,
                "gender" character varying NOT NULL,
                "birthday" character varying,
                "contact_number" character varying,
                "email" character varying,
                "addressId" uuid,
                "requirementsId" uuid,
                "schoolRecordsId" uuid,
                CONSTRAINT "REL_c2ca6fb2f9e61b88ec084b265f" UNIQUE ("addressId"),
                CONSTRAINT "REL_a40929cfc96e48430ffc92585e" UNIQUE ("requirementsId"),
                CONSTRAINT "REL_1e7b9ce74d17b055de49a28550" UNIQUE ("schoolRecordsId"),
                CONSTRAINT "PK_3d8016e1cb58429474a3c041904" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "enrolled_records" (
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_date" TIMESTAMP,
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "SY" character varying NOT NULL,
                "grade_level_id" character varying NOT NULL,
                "section_id" character varying NOT NULL,
                "studentId" uuid,
                CONSTRAINT "PK_c4afea31671a1ccd47cb249aed4" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "employee" DROP COLUMN "role"
        `);
        await queryRunner.query(`
            ALTER TABLE "employee" DROP COLUMN "status"
        `);
        await queryRunner.query(`
            ALTER TABLE "employee" DROP COLUMN "employee_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "employee" DROP COLUMN "password"
        `);
        await queryRunner.query(`
            ALTER TABLE "employee" DROP COLUMN "partial_password"
        `);
        await queryRunner.query(`
            ALTER TABLE "employee"
            ADD "role" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "employee"
            ADD "status" integer NOT NULL DEFAULT '1'
        `);
        await queryRunner.query(`
            ALTER TABLE "employee"
            ADD "employee_id" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "employee"
            ADD "password" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "employee"
            ADD "partial_password" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "employee"
            ADD "first_name" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "employee"
            ADD "middle_name" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "employee"
            ADD "last_name" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "student_parent_guardian"
            ADD CONSTRAINT "FK_e294f502636e980fe26a16ee833" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "student_transfer_record"
            ADD CONSTRAINT "FK_74b42bfe5ebdb5d9e125e59b087" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "student"
            ADD CONSTRAINT "FK_c2ca6fb2f9e61b88ec084b265ff" FOREIGN KEY ("addressId") REFERENCES "student_address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "student"
            ADD CONSTRAINT "FK_a40929cfc96e48430ffc92585e4" FOREIGN KEY ("requirementsId") REFERENCES "student_requirements"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "student"
            ADD CONSTRAINT "FK_1e7b9ce74d17b055de49a285503" FOREIGN KEY ("schoolRecordsId") REFERENCES "student_school_record"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "enrolled_records"
            ADD CONSTRAINT "FK_9534cd2e506a47b7775a22796dd" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "enrolled_records" DROP CONSTRAINT "FK_9534cd2e506a47b7775a22796dd"
        `);
        await queryRunner.query(`
            ALTER TABLE "student" DROP CONSTRAINT "FK_1e7b9ce74d17b055de49a285503"
        `);
        await queryRunner.query(`
            ALTER TABLE "student" DROP CONSTRAINT "FK_a40929cfc96e48430ffc92585e4"
        `);
        await queryRunner.query(`
            ALTER TABLE "student" DROP CONSTRAINT "FK_c2ca6fb2f9e61b88ec084b265ff"
        `);
        await queryRunner.query(`
            ALTER TABLE "student_transfer_record" DROP CONSTRAINT "FK_74b42bfe5ebdb5d9e125e59b087"
        `);
        await queryRunner.query(`
            ALTER TABLE "student_parent_guardian" DROP CONSTRAINT "FK_e294f502636e980fe26a16ee833"
        `);
        await queryRunner.query(`
            ALTER TABLE "employee" DROP COLUMN "last_name"
        `);
        await queryRunner.query(`
            ALTER TABLE "employee" DROP COLUMN "middle_name"
        `);
        await queryRunner.query(`
            ALTER TABLE "employee" DROP COLUMN "first_name"
        `);
        await queryRunner.query(`
            ALTER TABLE "employee" DROP COLUMN "partial_password"
        `);
        await queryRunner.query(`
            ALTER TABLE "employee" DROP COLUMN "password"
        `);
        await queryRunner.query(`
            ALTER TABLE "employee" DROP COLUMN "employee_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "employee" DROP COLUMN "status"
        `);
        await queryRunner.query(`
            ALTER TABLE "employee" DROP COLUMN "role"
        `);
        await queryRunner.query(`
            ALTER TABLE "employee"
            ADD "partial_password" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "employee"
            ADD "password" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "employee"
            ADD "employee_id" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "employee"
            ADD "status" integer NOT NULL DEFAULT '1'
        `);
        await queryRunner.query(`
            ALTER TABLE "employee"
            ADD "role" character varying NOT NULL
        `);
        await queryRunner.query(`
            DROP TABLE "enrolled_records"
        `);
        await queryRunner.query(`
            DROP TABLE "student"
        `);
        await queryRunner.query(`
            DROP TABLE "student_transfer_record"
        `);
        await queryRunner.query(`
            DROP TABLE "student_school_record"
        `);
        await queryRunner.query(`
            DROP TABLE "student_requirements"
        `);
        await queryRunner.query(`
            DROP TABLE "student_parent_guardian"
        `);
        await queryRunner.query(`
            DROP TABLE "student_address"
        `);
        await queryRunner.query(`
            DROP TABLE "employee"
        `);
        await queryRunner.query(`
            DROP TABLE "audit_trail"
        `);
        await queryRunner.query(`
            DROP TABLE "sections"
        `);
        await queryRunner.query(`
            DROP TABLE "cat"
        `);
        await queryRunner.query(`
            DROP TABLE "global_vars"
        `);
    }

}
