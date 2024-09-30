import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import InfiplexService from "src/services/infiplex"; "../../../services/infiplex";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const infiplexService: InfiplexService =
    req.scope.resolve("infiplexService");

  const infiplexs = await infiplexService.retrieve_all();

  res.status(200).json({ infiplexs });
}
