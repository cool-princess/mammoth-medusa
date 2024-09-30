import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import BrandService from "src/services/brand"; "../../../services/brand";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const brandService: BrandService =
    req.scope.resolve("brandService");

  const brands = await brandService.retrieve_all();

  res.status(200).json({ brands });
}
