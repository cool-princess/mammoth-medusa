import { dataSource } from "@medusajs/medusa/dist/loaders/database";
import { Buyers_price_list } from "../models/buyers_price_list";

const PriceRepository = dataSource.getRepository(Buyers_price_list);

export default PriceRepository;
