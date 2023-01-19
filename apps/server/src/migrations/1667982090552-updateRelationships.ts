import { MigrationInterface, QueryRunner } from "typeorm";

export class updateRelationships1667982090552 implements MigrationInterface {
    name = 'updateRelationships1667982090552'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "audit_trail"
            ADD "employeeId" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "student_parent_guardian"
            ALTER COLUMN "middle_name" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "audit_trail"
            ADD CONSTRAINT "FK_b999b584aa74a553ead4ff7e666" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "audit_trail" DROP CONSTRAINT "FK_b999b584aa74a553ead4ff7e666"
        `);
        await queryRunner.query(`
            ALTER TABLE "student_parent_guardian"
            ALTER COLUMN "middle_name"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "audit_trail" DROP COLUMN "employeeId"
        `);
    }

}
