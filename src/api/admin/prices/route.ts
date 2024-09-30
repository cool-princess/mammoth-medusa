import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import PriceService from "src/services/price"; "../../../services/price";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const priceService: PriceService =
    req.scope.resolve("priceService");

  const prices = await priceService.retrieve_all();

  res.status(200).json({ prices });
}
