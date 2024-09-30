import { dataSource } from "@medusajs/medusa/dist/loaders/database";
import { Infiplex_whs_buyers } from "../models/infiplex_whs_buyers";

const BuyersRepository = dataSource.getRepository(Infiplex_whs_buyers);

export default BuyersRepository;
