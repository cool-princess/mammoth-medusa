import { MigrationInterface, QueryRunner } from "typeorm";

export class BuyersSpecs1724247112829 implements MigrationInterface {
    name = 'BuyersSpecs1724247112829'
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "buyers_specs" ("id" bigserial NOT NULL, "ItemPartNumber" varchar, "SpecificationName" varchar, "SpecificationValue" varchar, "Unit" varchar, "ProductPrimaryReportingCategory" varchar, "ProductID" varchar, "Unit_Abbr" varchar, "CustomerID" varchar, "PartNumber" varchar, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "buyers_specs_pk" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "buyers_specs"`);
    }

}
