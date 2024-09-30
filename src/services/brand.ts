import { TransactionBaseService } from "@medusajs/medusa";
import BrandRepository from "../repositories/brand";
import { EntityManager, IsNull, Not } from "typeorm";
import { AdminBrandReq } from "../types/brand";
import { Brand } from "../models/brand";

type InjectedDependencies = {
    manager: EntityManager;
    brandRepository: typeof BrandRepository;
};

class BrandService extends TransactionBaseService {
    protected brandRepository_: typeof BrandRepository;

    constructor({ brandRepository }: InjectedDependencies) {
        super(arguments[0]);

        this.brandRepository_ = brandRepository;
    }

    async retrieve(brand_id: string): Promise<any | undefined> {
        const brandRepo = this.activeManager_.withRepository(
            this.brandRepository_
        );

        const brand = await brandRepo.findOne({
            where: { id: brand_id },
        });

        return brand;
    }

    async retrieve_all(): Promise<any | undefined> {
        const brandRepo = this.activeManager_.withRepository(
            this.brandRepository_
        );

        const brands = await brandRepo.find({
        });

        return brands;
    }

    async update(brand_id: string, data: AdminBrandReq): Promise<Brand> {
        return await this.atomicPhase_(
            async (transactionManager: EntityManager) => {
                const brandRepository = transactionManager.withRepository(
                    this.brandRepository_
                );

                const brand = await this.retrieve(brand_id);

                brand.logo = data?.logo 

                return await brandRepository.save(brand);
            }
        );
    }

    async create(data: AdminBrandReq): Promise<Brand> {
        const brandRepo = this.activeManager_.withRepository(
            this.brandRepository_
        );
        const brand = await brandRepo.create();
        const count = await brandRepo.findAndCount();
        const newCharCode = count[1] + 1;
        brand.id = newCharCode.toString();
        brand.name = data.name;
        brand.product_count = 0; 
        brand.logo = data.logo;

        return await brandRepo.save(brand);
    }
}

export default BrandService;
