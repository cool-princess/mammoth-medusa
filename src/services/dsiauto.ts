import { TransactionBaseService } from "@medusajs/medusa";
import DsiautoRepository from "../repositories/dsiauto";
import { EntityManager, IsNull, Not } from "typeorm";
import { AdminDsiautoReq } from "../types/dsiauto";

type InjectedDependencies = {
    manager: EntityManager;
    dsiautoRepository: typeof DsiautoRepository;
};

class DsiautoService extends TransactionBaseService {
    protected dsiautoRepository_: typeof DsiautoRepository;

    constructor({ dsiautoRepository }: InjectedDependencies) {
        super(arguments[0]);

        this.dsiautoRepository_ = dsiautoRepository;
    }

    async retrieve(dsiauto_id: string): Promise<any | undefined> {
        const dsiautoRepo = this.activeManager_.withRepository(
            this.dsiautoRepository_
        );

        const dsiauto = await dsiautoRepo.findOne({
            where: { id: dsiauto_id },
        });

        return dsiauto;
    }

    async retrieve_all(): Promise<any | undefined> {
        const dsiautoRepo = this.activeManager_.withRepository(
            this.dsiautoRepository_
        );

        const dsiautos = await dsiautoRepo.find({
        });

        return dsiautos;
    }

    async update(dsiauto_id: string, data: AdminDsiautoReq): Promise<any> {
        return await this.atomicPhase_(
            async (transactionManager: EntityManager) => {
                const dsiautoRepository = transactionManager.withRepository(
                    this.dsiautoRepository_
                );

                const dsiauto = await this.retrieve(dsiauto_id);

                return await dsiautoRepository.save(dsiauto);
            }
        );
    }
}

export default DsiautoService;
