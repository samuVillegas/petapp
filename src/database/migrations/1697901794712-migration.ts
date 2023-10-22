import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1697901794712 implements MigrationInterface {
    name = 'Migration1697901794712'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "last_connection"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "last_connection" TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "last_connection"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "last_connection" TIMESTAMP`);
    }

}
