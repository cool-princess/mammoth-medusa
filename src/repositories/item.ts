import { dataSource } from "@medusajs/medusa/dist/loaders/database";
import { Buyers_items } from "../models/buyers_items";

const ItemRepository = dataSource.getRepository(Buyers_items);

export default ItemRepository;
