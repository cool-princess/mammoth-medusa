import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { EntityManager } from "typeorm";
import BrandService from "src/services/brand";import { AdminBrandReq } from "src/types/brand";
 "../../../services/brand";

 export async function POST(req: MedusaRequest, res: MedusaResponse) {
    const brandService: BrandService =
      req.scope.resolve("brandService");
      
    const manager: EntityManager = req.scope.resolve("manager");
  
    const status = await manager.transaction(async (transactionManager) => {
      return await brandService
        .withTransaction(transactionManager)
        .create(req.body as AdminBrandReq);
    });
  
    res.status(200).json({ status });
}