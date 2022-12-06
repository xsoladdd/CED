import { MigrationInterface, QueryRunner } from "typeorm";

export class addStatus1670334658033 implements MigrationInterface {
    name = 'addStatus1670334658033'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "sections"
            ADD "status" boolean NOT NULL DEFAULT true
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "sections" DROP COLUMN "status"
        `);
    }

}
