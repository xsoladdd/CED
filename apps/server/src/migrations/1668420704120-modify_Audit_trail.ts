import { MigrationInterface, QueryRunner } from "typeorm";

export class modifyAuditTrail1668420704120 implements MigrationInterface {
    name = 'modifyAuditTrail1668420704120'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "audit_trail"
                RENAME COLUMN "action_type_id" TO "action_type"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "audit_trail"
                RENAME COLUMN "action_type" TO "action_type_id"
        `);
    }

}
