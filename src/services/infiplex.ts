import { TransactionBaseService } from "@medusajs/medusa";
import InfiplexRepository from "../repositories/infiplex";
import { EntityManager, IsNull, Not } from "typeorm";
import { AdminInfiplexReq } from "../types/infiplex";

type InjectedDependencies = {
    manager: EntityManager;
    infiplexRepository: typeof InfiplexRepository;
};

class InfiplexService extends TransactionBaseService {
    protected infiplexRepository_: typeof InfiplexRepository;

    constructor({ infiplexRepository }: InjectedDependencies) {
        super(arguments[0]);

        this.infiplexRepository_ = infiplexRepository;
    }

    async retrieve(infiplex_id: string): Promise<any | undefined> {
        const infiplexRepo = this.activeManager_.withRepository(
            this.infiplexRepository_
        );

        const infiplex = await infiplexRepo.findOne({
            where: { id: infiplex_id },
        });

        return infiplex;
    }

    async retrieve_all(): Promise<any | undefined> {
        const infiplexRepo = this.activeManager_.withRepository(
            this.infiplexRepository_
        );

        const infiplexs = await infiplexRepo.find({
        });

        return infiplexs;
    }

    async update(infiplex_id: string, data: AdminInfiplexReq): Promise<any> {
        return await this.atomicPhase_(
            async (transactionManager: EntityManager) => {
                const infiplexRepository = transactionManager.withRepository(
                    this.infiplexRepository_
                );

                const infiplex = await this.retrieve(infiplex_id);

                return await infiplexRepository.save(infiplex);
            }
        );
    }
}

export default InfiplexService;
