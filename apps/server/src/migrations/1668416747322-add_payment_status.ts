import { MigrationInterface, QueryRunner } from "typeorm";

export class addPaymentStatus1668416747322 implements MigrationInterface {
    name = 'addPaymentStatus1668416747322'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "enrolled_records"
            ADD "payment_status" character varying NOT NULL DEFAULT 'NP'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "enrolled_records" DROP COLUMN "payment_status"
        `);
    }

}
