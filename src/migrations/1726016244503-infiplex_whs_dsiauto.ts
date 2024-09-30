import { MigrationInterface, QueryRunner } from "typeorm";

export class InfiplexWhsDsiauto1726016244503 implements MigrationInterface {
    name = 'InfiplexWhsDsiauto1726016244503'
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "infiplex_whs_dsiauto" ("id" character varying NOT NULL, "sku" varchar, "price" float8, "can_purchase" float8, "inventory" int8, "cost" varchar, "retail_price" varchar, "lead_time" int8, "safety_stock" int8, "reorder_point" varchar, "bin_location" float8, "product_name" varchar, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "infiplex_whs_dsiauto_pk" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "infiplex_whs_dsiauto"`);
    }

}
