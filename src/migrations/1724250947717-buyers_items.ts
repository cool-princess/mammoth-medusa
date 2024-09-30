import { MigrationInterface, QueryRunner } from "typeorm";

export class BuyersItems1724250947717 implements MigrationInterface {
    name = 'BuyersItems1724250947717'
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "buyers_items" ("id" bigserial NOT NULL, "ItemPartNumber" varchar, "ProductID" varchar, "ItemShortDescription" varchar, "ItemShippingWeight" int4, "ItemShippingWeightUOM" varchar, "ItemUPC" varchar, "ItemCountryOfOrigin" varchar, "ItemHarmonizedTariffCode" varchar, "ProductShortDescription" varchar, "ProductMarketingCopy" varchar, "ProductCardDescription" varchar, "ProductBrand" varchar, "ProductCommonUse1" varchar, "ProductCommonUse2" varchar, "ProductCommonUse3" varchar, "ProductCommonUse4" varchar, "ProductFeatureBenefit1" varchar, "ProductFeatureBenefit2" varchar, "ProductFeatureBenefit3" varchar, "ProductFeatureBenefit4" varchar, "ProductFeatureBenefit5" varchar, "ProductFeatureBenefit6" varchar, "ProductFeatureBenefit7" varchar, "ProductFeatureBenefit8" varchar, "ProductFeatureBenefit9" varchar, "ProductFeatureBenefit10" varchar, "ProductFeatureBenefit11" varchar, "ProductFeatureBenefit12" varchar, "ProductURLSegment" varchar, "ProductPrimaryReportingCategory" varchar, "ProductMetaSentence" varchar, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "buyers_items_pk" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "buyers_items"`);
    }

}
