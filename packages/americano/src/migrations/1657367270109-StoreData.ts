import { MigrationInterface, QueryRunner } from "typeorm";

export class StoreData1657367270109 implements MigrationInterface {
    name = 'StoreData1657367270109'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "store_data" (
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedDate" TIMESTAMP,
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "description" text,
                CONSTRAINT "PK_cbfcd869e1c7b299a670b82ea86" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "store_user"
            ADD "storeId" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "store_user"
            ADD CONSTRAINT "FK_1a30fedbf19944300227a05a80c" FOREIGN KEY ("storeId") REFERENCES "store_data"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "store_user" DROP CONSTRAINT "FK_1a30fedbf19944300227a05a80c"
        `);
        await queryRunner.query(`
            ALTER TABLE "store_user" DROP COLUMN "storeId"
        `);
        await queryRunner.query(`
            DROP TABLE "store_data"
        `);
    }

}
