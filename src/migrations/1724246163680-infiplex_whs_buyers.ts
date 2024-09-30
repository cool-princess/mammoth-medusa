import { MigrationInterface, QueryRunner } from "typeorm";

export class InfiplexWhsBuyers1724246163680 implements MigrationInterface {
    name = 'InfiplexWhsBuyers1724246163680'
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "infiplex_whs_buyers" ("id" character varying NOT NULL, "sku" varchar, "price" float8, "can_purchase" float8, "inventory" int8, "cost" varchar, "retail_price" varchar, "lead_time" int8, "safety_stock" int8, "reorder_point" varchar, "bin_location" float8, "product_name" varchar, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "infiplex_whs_buyers_pk" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "infiplex_whs_buyers"`);
    }

}
