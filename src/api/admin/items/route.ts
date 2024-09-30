import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import ItemService from "src/services/item"; "../../../services/item";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const itemService: ItemService =
    req.scope.resolve("itemService");

  const items = await itemService.retrieve_all();

  res.status(200).json({ items });
}
