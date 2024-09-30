import { dataSource } from "@medusajs/medusa/dist/loaders/database";
import { Buyers_specs } from "../models/buyers_specs";

const SpecRepository = dataSource.getRepository(Buyers_specs);

export default SpecRepository;
