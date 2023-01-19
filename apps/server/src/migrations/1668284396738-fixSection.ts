import { MigrationInterface, QueryRunner } from "typeorm";

export class fixSection1668284396738 implements MigrationInterface {
    name = 'fixSection1668284396738'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "sections"
            ADD "year_level" character varying NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "sections" DROP COLUMN "year_level"
        `);
    }

}
