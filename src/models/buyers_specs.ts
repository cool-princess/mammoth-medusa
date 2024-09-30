import {
    BeforeInsert,
    Column,
    Entity
} from "typeorm";
import { BaseEntity } from "@medusajs/medusa";
import { generateEntityId } from "@medusajs/medusa/dist/utils";

@Entity()
export class Buyers_specs extends BaseEntity {
    @Column({ type: "varchar" })
    ItemPartNumber: String;

    @Column({ type: "varchar" })
    SpecificationName: String;

    @Column({ type: "varchar" })
    SpecificationValue: string;

    @Column({ type: "varchar" })
    Unit: string;

    @Column({ type: "varchar" })
    ProductPrimaryReportingCategory: string;

    @Column({ type: "varchar" })
    ProductID: string;

    @Column({ type: "varchar" })
    Unit_Abbr: string;

    @Column({ type: "varchar" })
    CustomerID: string;

    @Column({ type: "varchar" })
    PartNumber: string;

    @BeforeInsert()
    private beforeInsert(): void {
        this.id = generateEntityId(this.id, "spec");
    }
}