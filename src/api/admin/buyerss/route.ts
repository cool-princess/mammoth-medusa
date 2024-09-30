import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import BuyersService from "src/services/buyers"; "../../../services/buyers";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const buyersService: BuyersService =
    req.scope.resolve("buyersService");

  const buyerss = await buyersService.retrieve_all();

  res.status(200).json({ buyerss });
}
