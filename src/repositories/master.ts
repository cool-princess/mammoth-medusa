import { dataSource } from "@medusajs/medusa/dist/loaders/database";
import { Dsi_auto_master } from "../models/dsi_auto_master";

const MasterRepository = dataSource.getRepository(Dsi_auto_master);

export default MasterRepository;
