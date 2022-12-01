import { MigrationInterface, QueryRunner } from "typeorm";

export class paymentStatusToStatusRename1669811684383 implements MigrationInterface {
    name = 'paymentStatusToStatusRename1669811684383'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "enrolled_records" DROP COLUMN "payment_status"
        `);
        await queryRunner.query(`
            ALTER TABLE "enrolled_records" DROP COLUMN "year_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "enrolled_records"
            ADD "status" character varying NOT NULL DEFAULT 'NP'
        `);
        await queryRunner.query(`
            ALTER TABLE "enrolled_records"
            ALTER COLUMN "increment_id" DROP NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "enrolled_records"
            ALTER COLUMN "increment_id"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "enrolled_records" DROP COLUMN "status"
        `);
        await queryRunner.query(`
            ALTER TABLE "enrolled_records"
            ADD "year_id" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "enrolled_records"
            ADD "payment_status" character varying NOT NULL DEFAULT 'NP'
        `);
    }

}
