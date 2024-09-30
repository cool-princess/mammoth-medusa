import { TransactionBaseService } from "@medusajs/medusa";
import BuyersRepository from "../repositories/buyers";
import { EntityManager, IsNull, Not } from "typeorm";
import { AdminBuyersReq } from "../types/buyers";
import { Infiplex_whs_buyers } from "../models/infiplex_whs_buyers";

type InjectedDependencies = {
    manager: EntityManager;
    buyersRepository: typeof BuyersRepository;
};

class BuyersService extends TransactionBaseService {
    protected buyersRepository_: typeof BuyersRepository;

    constructor({ buyersRepository }: InjectedDependencies) {
        super(arguments[0]);

        this.buyersRepository_ = buyersRepository;
    }

    async retrieve(buyers_id: string): Promise<any | undefined> {
        const buyersRepo = this.activeManager_.withRepository(
            this.buyersRepository_
        );

        const buyers = await buyersRepo.findOne({
            where: { id: buyers_id },
        });

        return buyers;
    }

    async retrieve_all(): Promise<any | undefined> {
        const buyersRepo = this.activeManager_.withRepository(
            this.buyersRepository_
        );

        const buyerss = await buyersRepo.find({
        });

        return buyerss;
    }

    async update(buyers_id: string, data: AdminBuyersReq): Promise<any> {
        return await this.atomicPhase_(
            async (transactionManager: EntityManager) => {
                const buyersRepository = transactionManager.withRepository(
                    this.buyersRepository_
                );

                const buyers = await this.retrieve(buyers_id);

                return await buyersRepository.save(buyers);
            }
        );
    }
}

export default BuyersService;
