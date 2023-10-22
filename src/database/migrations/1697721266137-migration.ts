import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1697721266137 implements MigrationInterface {
    name = 'Migration1697721266137'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("email" character varying(100) NOT NULL, "password" character varying(100) NOT NULL, "name" character varying(50) NOT NULL, "address" character varying(255) NOT NULL, "last_connection" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT 'NOW()', "updated_at" TIMESTAMP NOT NULL DEFAULT 'NOW()', CONSTRAINT "PK_97672ac88f789774dd47f7c8be3" PRIMARY KEY ("email"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
