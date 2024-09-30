import {
    BeforeInsert,
    Column,
    Entity
} from "typeorm";
import { BaseEntity } from "@medusajs/medusa";
import { generateEntityId } from "@medusajs/medusa/dist/utils";

@Entity()
export class Buyers_items extends BaseEntity {
    @Column({ type: "varchar" })
    ItemPartNumber: String;

    @Column({ type: "varchar" })
    ProductID: String;

    @Column({ type: "varchar" })
    ItemShortDescription: string;

    @Column({ type: "int4" })
    ItemShippingWeight: GLint;

    @Column({ type: "varchar" })
    ItemShippingWeightUOM: String;

    @Column({ type: "varchar" })
    ItemUPC: String;

    @Column({ type: "varchar" })
    ItemCountryOfOrigin: string;

    @Column({ type: "varchar" })
    ItemHarmonizedTariffCode: string;

    @Column({ type: "varchar" })
    ProductShortDescription: String;

    @Column({ type: "varchar" })
    ProductMarketingCopy: String;

    @Column({ type: "varchar" })
    ProductCardDescription: string;

    @Column({ type: "varchar" })
    ProductBrand: string;

    @Column({ type: "varchar" })
    ProductCommonUse1: String;

    @Column({ type: "varchar" })
    ProductCommonUse2: String;

    @Column({ type: "varchar" })
    ProductCommonUse3: string;

    @Column({ type: "varchar" })
    ProductCommonUse4: string;

    @Column({ type: "varchar" })
    ProductFeatureBenefit1: String;

    @Column({ type: "varchar" })
    ProductFeatureBenefit2: String;

    @Column({ type: "varchar" })
    ProductFeatureBenefit3: string;

    @Column({ type: "varchar" })
    ProductFeatureBenefit4: string;

    @Column({ type: "varchar" })
    ProductFeatureBenefit5: String;

    @Column({ type: "varchar" })
    ProductFeatureBenefit6: String;

    @Column({ type: "varchar" })
    ProductFeatureBenefit7: string;

    @Column({ type: "varchar" })
    ProductFeatureBenefit8: string;

    @Column({ type: "varchar" })
    ProductFeatureBenefit9: String;

    @Column({ type: "varchar" })
    ProductFeatureBenefit10: String;

    @Column({ type: "varchar" })
    ProductFeatureBenefit11: string;

    @Column({ type: "varchar" })
    ProductFeatureBenefit12: string;

    @Column({ type: "varchar" })
    ProductURLSegment: String;

    @Column({ type: "varchar" })
    ProductPrimaryReportingCategory: String;

    @Column({ type: "varchar" })
    ProductMetaSentence: string;

    @BeforeInsert()
    private beforeInsert(): void {
        this.id = generateEntityId(this.id, "item");
    }
}