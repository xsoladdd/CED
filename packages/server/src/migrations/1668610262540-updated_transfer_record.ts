import { MigrationInterface, QueryRunner } from "typeorm";

export class updatedTransferRecord1668610262540 implements MigrationInterface {
    name = 'updatedTransferRecord1668610262540'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "student" DROP CONSTRAINT "FK_1e7b9ce74d17b055de49a285503"
        `);
        await queryRunner.query(`
            ALTER TABLE "student" DROP CONSTRAINT "REL_1e7b9ce74d17b055de49a28550"
        `);
        await queryRunner.query(`
            ALTER TABLE "student" DROP COLUMN "schoolRecordsId"
        `);
        await queryRunner.query(`
            ALTER TABLE "student_school_record"
            ADD "studentId" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "student_school_record"
            ADD CONSTRAINT "FK_0833d6c699653140efd6a430dfe" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "student_school_record" DROP CONSTRAINT "FK_0833d6c699653140efd6a430dfe"
        `);
        await queryRunner.query(`
            ALTER TABLE "student_school_record" DROP COLUMN "studentId"
        `);
        await queryRunner.query(`
            ALTER TABLE "student"
            ADD "schoolRecordsId" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "student"
            ADD CONSTRAINT "REL_1e7b9ce74d17b055de49a28550" UNIQUE ("schoolRecordsId")
        `);
        await queryRunner.query(`
            ALTER TABLE "student"
            ADD CONSTRAINT "FK_1e7b9ce74d17b055de49a285503" FOREIGN KEY ("schoolRecordsId") REFERENCES "student_school_record"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
