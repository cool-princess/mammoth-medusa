import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import DsiautoService from "src/services/dsiauto"; "../../../services/dsiauto";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const dsiautoService: DsiautoService =
    req.scope.resolve("dsiautoService");

  const dsiautos = await dsiautoService.retrieve_all();

  res.status(200).json({ dsiautos });
}
