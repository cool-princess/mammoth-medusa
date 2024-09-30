import {
    BeforeInsert,
    Column,
    Entity
} from "typeorm";
import { BaseEntity } from "@medusajs/medusa";
import { generateEntityId } from "@medusajs/medusa/dist/utils";

@Entity()
export class Dsi_auto_master extends BaseEntity {
    @Column({ type: "varchar" })
    Manufacturer: String;

    @Column({ type: "varchar" })
    Sku: String;

    @Column({ type: "varchar" })
    ManufacturerPartNumber: string;

    @Column({ type: "varchar" })
    Name: string;

    @Column({ type: "varchar"})
    ShortDescription: string

    @Column({ type: "int8" })
    "UPC Code": GLint

    @Column({ type: "float8" })
    Price: GLfloat

    @Column({ type: "float8" })
    "Quoted $": GLfloat

    @Column({ type: "int4" })
    Weight: GLint

    @Column({ type: "int4" })
    "Weight x16": GLint

    @Column({ type: "int4" })
    Length: GLint

    @Column({ type: "int4" })
    Width: GLint

    @Column({ type: "int4" })
    Height: GLint

    @BeforeInsert()
    private beforeInsert(): void {
        this.id = generateEntityId(this.id, "master");
    }
}