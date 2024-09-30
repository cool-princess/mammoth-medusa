import {
    BeforeInsert,
    Column,
    Entity
} from "typeorm";
import { BaseEntity } from "@medusajs/medusa";
import { generateEntityId } from "@medusajs/medusa/dist/utils";

@Entity()
export class Infiplex_whs_main extends BaseEntity {
    @Column({ type: "varchar" })
    sku: String;

    @Column({ type: "float8" })
    price: GLfloat;

    @Column({ type: "float8" })
    can_purchase: GLfloat;

    @Column({ type: "int8"})
    inventory: GLint

    @Column({ type: "varchar" })
    cost: String

    @Column({ type: "varchar" })
    retail_price: String

    @Column({ type: "int8" })
    lead_time: GLint

    @Column({ type: "int8" })
    safety_stock: GLint

    @Column({ type: "varchar" })
    reorder_point: String

    @Column({ type: "float8" })
    bin_location: GLfloat

    @Column({ type: "varchar" })
    product_name: String

    @BeforeInsert()
    private beforeInsert(): void {
        this.id = generateEntityId(this.id, "infiplex");
    }
}