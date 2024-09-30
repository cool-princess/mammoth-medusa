import { TransactionBaseService } from "@medusajs/medusa";
import MasterRepository from "../repositories/master";
import { EntityManager } from "typeorm";
import { AdminMasterReq } from "../types/master";

type InjectedDependencies = {
    manager: EntityManager;
    masterRepository: typeof MasterRepository;
};

class MasterService extends TransactionBaseService {
    protected masterRepository_: typeof MasterRepository;

    constructor({ masterRepository }: InjectedDependencies) {
        super(arguments[0]);

        this.masterRepository_ = masterRepository;
    }

    async retrieve(master_id: string): Promise<any | undefined> {
        const masterRepo = this.activeManager_.withRepository(
            this.masterRepository_
        );

        const master = await masterRepo.findOne({
            where: { id: master_id },
        });

        return master;
    }

    async retrieve_all(): Promise<any | undefined> {
        const masterRepo = this.activeManager_.withRepository(
            this.masterRepository_
        );

        const masters = await masterRepo.find({
        });

        return masters;
    }

    async update(master_id: string, data: AdminMasterReq): Promise<any> {
        return await this.atomicPhase_(
            async (transactionManager: EntityManager) => {
                const masterRepository = transactionManager.withRepository(
                    this.masterRepository_
                );

                const master = await this.retrieve(master_id);

                return await masterRepository.save(master);
            }
        );
    }
}

export default MasterService;
