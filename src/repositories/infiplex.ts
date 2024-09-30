import { dataSource } from "@medusajs/medusa/dist/loaders/database";
import { Infiplex_whs_main } from "../models/infiplex_whs_main";

const InfiplexRepository = dataSource.getRepository(Infiplex_whs_main);

export default InfiplexRepository;
