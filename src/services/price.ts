import { TransactionBaseService } from "@medusajs/medusa";
import PriceRepository from "../repositories/price";
import { EntityManager } from "typeorm";
import { AdminPriceReq } from "../types/price";

type InjectedDependencies = {
    manager: EntityManager;
    priceRepository: typeof PriceRepository;
};

class PriceService extends TransactionBaseService {
    protected priceRepository_: typeof PriceRepository;

    constructor({ priceRepository }: InjectedDependencies) {
        super(arguments[0]);

        this.priceRepository_ = priceRepository;
    }

    async retrieve(price_id: string): Promise<any | undefined> {
        const priceRepo = this.activeManager_.withRepository(
            this.priceRepository_
        );

        const price = await priceRepo.findOne({
            where: { id: price_id },
        });

        return price;
    }

    async retrieve_all(): Promise<any | undefined> {
        const priceRepo = this.activeManager_.withRepository(
            this.priceRepository_
        );

        const prices = await priceRepo.find({
        });

        return prices;
    }

    async update(price_id: string, data: AdminPriceReq): Promise<any> {
        return await this.atomicPhase_(
            async (transactionManager: EntityManager) => {
                const priceRepository = transactionManager.withRepository(
                    this.priceRepository_
                );

                const price = await this.retrieve(price_id);

                return await priceRepository.save(price);
            }
        );
    }
}

export default PriceService;
