import {
    BeforeInsert,
    Column,
    Entity
} from "typeorm";
import { BaseEntity } from "@medusajs/medusa";
import { generateEntityId } from "@medusajs/medusa/dist/utils";

@Entity()
export class Buyers_price_list extends BaseEntity {
    @Column({ type: "varchar" })
    ItemPartNumber: String;

    @Column({ type: "varchar" })
    Description: String;

    @Column({ type: "varchar" })
    "Weight (lbs)": string;

    @Column({ type: "varchar" })
    ProductCode: string;

    @Column({ type: "varchar" })
    "Combine For Discount": String;

    @Column({ type: "varchar" })
    MinOrderQty: String;

    @Column({ type: "varchar" })
    SellInMultOfQty: string;

    @Column({ type: "varchar" })
    LastPriceAdjDate: string;

    @Column({ type: "varchar" })
    UPC: String;

    @Column({ type: "varchar" })
    ListPrice: String;

    @Column({ type: "varchar" })
    BreakQty01: string;

    @Column({ type: "varchar" })
    Amount01: string;

    @Column({ type: "varchar" })
    BreakQty02: String;

    @Column({ type: "varchar" })
    Amount02: String;

    @Column({ type: "varchar" })
    BreakQty03: string;

    @Column({ type: "varchar" })
    Amount03: string;

    @Column({ type: "varchar" })
    BreakQty04: String;

    @Column({ type: "varchar" })
    Amount04: String;

    @Column({ type: "varchar" })
    BreakQty05: string;

    @Column({ type: "varchar" })
    Amount05: string;

    @Column({ type: "varchar" })
    BreakQty06: String;

    @Column({ type: "varchar" })
    Amount06: String;

    @Column({ type: "varchar" })
    BreakQty07: string;

    @Column({ type: "varchar" })
    Amount07: string;

    @Column({ type: "varchar" })
    BreakQty08: String;

    @Column({ type: "varchar" })
    Amount08: String;

    @Column({ type: "varchar" })
    BreakQty09: string;

    @Column({ type: "varchar" })
    Amount09: string;

    @Column({ type: "varchar" })
    BreakQty10: String;

    @Column({ type: "varchar" })
    Amount10: String;

    @Column({ type: "varchar" })
    BreakQty11: string;

    @Column({ type: "varchar" })
    Amount11: string;

    @BeforeInsert()
    private beforeInsert(): void {
        this.id = generateEntityId(this.id, "price");
    }
}