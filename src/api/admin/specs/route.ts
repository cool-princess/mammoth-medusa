import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import SpecService from "src/services/spec"; "../../../services/spec";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const specService: SpecService =
    req.scope.resolve("specService");

  const specs = await specService.retrieve_all();

  res.status(200).json({ specs });
}
