import { MigrationInterface, QueryRunner } from "typeorm";

export class addedSidComponents1669809589567 implements MigrationInterface {
    name = 'addedSidComponents1669809589567'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "enrolled_records"
            ADD "increment_id" SERIAL
        `);
        await queryRunner.query(`
            ALTER TABLE "enrolled_records"
            ADD "year_id" character varying
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "enrolled_records" DROP COLUMN "year_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "enrolled_records" DROP COLUMN "increment_id"
        `);
    }

}
