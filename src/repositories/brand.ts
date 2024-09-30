import { dataSource } from "@medusajs/medusa/dist/loaders/database";
import { Brand } from "../models/brand";

const BrandRepository = dataSource.getRepository(Brand);

export default BrandRepository;
