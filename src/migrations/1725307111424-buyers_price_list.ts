import { MigrationInterface, QueryRunner } from "typeorm";

export class BuyersPriceList1725307111424 implements MigrationInterface {
    name = 'BuyersPriceList1725307111424'
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "buyers_price_list" ("id" bigserial NOT NULL, "ItemPartNumber" varchar, "Description" varchar, "Weight (lbs)" varchar, "ProductCode" varchar, "Combine For Discount" varchar, "MinOrderQty" varchar, "SellInMultOfQty" varchar, "LastPriceAdjDate" varchar, "UPC" varchar, "ListPrice" varchar, "BreakQty01" varchar, "Amount01" varchar, "BreakQty02" varchar, "Amount02" varchar, "BreakQty03" varchar, "Amount03" varchar, "BreakQty04" varchar, "Amount04" varchar, "BreakQty05" varchar, "Amount05" varchar, "BreakQty06" varchar, "Amount06" varchar, "BreakQty07" varchar, "Amount07" varchar, "BreakQty08" varchar, "Amount08" varchar, "BreakQty09" varchar, "Amount09" varchar, "BreakQty10" varchar, "Amount10" varchar, "BreakQty11" varchar, "Amount11" varchar, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "buyers_price_list_pk" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "buyers_items"`);
    }

}
