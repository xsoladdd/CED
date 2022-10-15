import { MigrationInterface, QueryRunner } from "typeorm";

export class StoreUserProfilePeromission1657364175192 implements MigrationInterface {
    name = 'StoreUserProfilePeromission1657364175192'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "cat" (
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedDate" TIMESTAMP,
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "firstName" character varying NOT NULL,
                "lastName" character varying NOT NULL,
                "age" integer NOT NULL,
                CONSTRAINT "PK_7704d5c2c0250e4256935ae31b4" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "store_accounts" (
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedDate" TIMESTAMP,
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "create" boolean NOT NULL DEFAULT false,
                "delete" boolean NOT NULL DEFAULT false,
                "update" boolean NOT NULL DEFAULT false,
                "view" boolean NOT NULL DEFAULT false,
                "permissionId" uuid,
                CONSTRAINT "REL_148c02770bac2a113e6684b185" UNIQUE ("permissionId"),
                CONSTRAINT "PK_4f316038ef53df4116534e3fdda" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "permissions" (
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedDate" TIMESTAMP,
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "store_user_profile" (
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedDate" TIMESTAMP,
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "firstName" character varying NOT NULL,
                "middleName" character varying,
                "lastName" character varying NOT NULL,
                "mobileNumber" character varying NOT NULL,
                "landlineNumber" character varying,
                "address" text NOT NULL,
                CONSTRAINT "PK_1cc1e28ff0e91f539b7a9f30f1b" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "store_user" (
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedDate" TIMESTAMP,
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "email" character varying NOT NULL,
                "password" character varying NOT NULL,
                "is_active" boolean NOT NULL DEFAULT true,
                "is_first_time_loggedin" boolean NOT NULL DEFAULT true,
                "profile_id" uuid,
                "permissionId" uuid,
                CONSTRAINT "UQ_dcf61b0d5a5a0fb32a6b0a27dfb" UNIQUE ("email"),
                CONSTRAINT "REL_1cc1e28ff0e91f539b7a9f30f1" UNIQUE ("profile_id"),
                CONSTRAINT "REL_35b397ede255351d586551f63a" UNIQUE ("permissionId"),
                CONSTRAINT "PK_1bb8bf0dd65b3e8298ef79640b7" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "store" (
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedDate" TIMESTAMP,
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "create" boolean NOT NULL DEFAULT false,
                "delete" boolean NOT NULL DEFAULT false,
                "update" boolean NOT NULL DEFAULT false,
                "view" boolean NOT NULL DEFAULT false,
                CONSTRAINT "PK_f3172007d4de5ae8e7692759d79" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "store_accounts"
            ADD CONSTRAINT "FK_148c02770bac2a113e6684b1857" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "store_user"
            ADD CONSTRAINT "FK_1cc1e28ff0e91f539b7a9f30f1b" FOREIGN KEY ("profile_id") REFERENCES "store_user_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "store_user"
            ADD CONSTRAINT "FK_35b397ede255351d586551f63a8" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "store_user" DROP CONSTRAINT "FK_35b397ede255351d586551f63a8"
        `);
        await queryRunner.query(`
            ALTER TABLE "store_user" DROP CONSTRAINT "FK_1cc1e28ff0e91f539b7a9f30f1b"
        `);
        await queryRunner.query(`
            ALTER TABLE "store_accounts" DROP CONSTRAINT "FK_148c02770bac2a113e6684b1857"
        `);
        await queryRunner.query(`
            DROP TABLE "store"
        `);
        await queryRunner.query(`
            DROP TABLE "store_user"
        `);
        await queryRunner.query(`
            DROP TABLE "store_user_profile"
        `);
        await queryRunner.query(`
            DROP TABLE "permissions"
        `);
        await queryRunner.query(`
            DROP TABLE "store_accounts"
        `);
        await queryRunner.query(`
            DROP TABLE "cat"
        `);
    }

}
