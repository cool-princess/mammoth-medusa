import {
    BeforeInsert,
    Column,
    Entity
} from "typeorm";
import { BaseEntity } from "@medusajs/medusa";
import { generateEntityId } from "@medusajs/medusa/dist/utils";

@Entity()
export class Brand extends BaseEntity {
    @Column({ type: "date" })
    created_at: Date;

    @Column({ type: "date" })
    updated_at: Date;

    @Column({ type: "varchar" })
    name: string;

    @Column({ type: "text", nullable: true })
    logo: string | null

    @Column({ type: "int", nullable: true })
    product_count: number | null

    @BeforeInsert()
    private beforeInsert(): void {
        this.id = generateEntityId(this.id, "brand");
    }
}