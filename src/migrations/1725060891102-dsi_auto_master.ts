import { MigrationInterface, QueryRunner } from "typeorm";

export class DsiAutoMaster1725060891102 implements MigrationInterface {

    name = 'DsiAutoMaster1725060891102'
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "dsi_auto_master" ("id" bigserial NOT NULL, "Manufacturer" varchar, "Sku" varchar, "ManufacturerPartNumber" varchar, "Name" varchar, "ShortDescription" varchar, "UPC Code" int8, "Price" float8, "Quoted $" float8, "Weight" GLint, "Weight x16" GLint, "Length" GLint, "Width" GLint, "Height" GLint, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "dsi_auto_master_pk" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "dsi_auto_master"`);
    }

}
