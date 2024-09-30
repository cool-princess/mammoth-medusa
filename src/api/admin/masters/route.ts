import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import MasterService from "src/services/master"; "../../../services/master";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const masterService: MasterService =
    req.scope.resolve("masterService");

  const masters = await masterService.retrieve_all();

  res.status(200).json({ masters });
}
