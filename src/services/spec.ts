import { TransactionBaseService } from "@medusajs/medusa";
import SpecRepository from "../repositories/spec";
import { EntityManager } from "typeorm";
import { AdminSpecReq } from "../types/spec";

type InjectedDependencies = {
    manager: EntityManager;
    specRepository: typeof SpecRepository;
};

class SpecService extends TransactionBaseService {
    protected specRepository_: typeof SpecRepository;

    constructor({ specRepository }: InjectedDependencies) {
        super(arguments[0]);

        this.specRepository_ = specRepository;
    }

    async retrieve(spec_id: string): Promise<any | undefined> {
        const specRepo = this.activeManager_.withRepository(
            this.specRepository_
        );

        const spec = await specRepo.findOne({
            where: { id: spec_id },
        });

        return spec;
    }

    async retrieve_all(): Promise<any | undefined> {
        const specRepo = this.activeManager_.withRepository(
            this.specRepository_
        );

        const specs = await specRepo.find({
        });

        return specs;
    }

    async update(spec_id: string, data: AdminSpecReq): Promise<any> {
        return await this.atomicPhase_(
            async (transactionManager: EntityManager) => {
                const specRepository = transactionManager.withRepository(
                    this.specRepository_
                );

                const spec = await this.retrieve(spec_id);

                return await specRepository.save(spec);
            }
        );
    }
}

export default SpecService;
