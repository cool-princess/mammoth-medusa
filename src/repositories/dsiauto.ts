import { dataSource } from "@medusajs/medusa/dist/loaders/database";
import { Infiplex_whs_dsiauto } from "../models/infiplex_whs_dsiauto";

const DsiautoRepository = dataSource.getRepository(Infiplex_whs_dsiauto);

export default DsiautoRepository;
