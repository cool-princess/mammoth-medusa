import { TransactionBaseService } from "@medusajs/medusa";
import ItemRepository from "../repositories/item";
import { EntityManager } from "typeorm";
import { AdminItemReq } from "../types/item";

type InjectedDependencies = {
    manager: EntityManager;
    itemRepository: typeof ItemRepository;
};

class ItemService extends TransactionBaseService {
    protected itemRepository_: typeof ItemRepository;

    constructor({ itemRepository }: InjectedDependencies) {
        super(arguments[0]);

        this.itemRepository_ = itemRepository;
    }

    async retrieve(item_id: string): Promise<any | undefined> {
        const itemRepo = this.activeManager_.withRepository(
            this.itemRepository_
        );

        const item = await itemRepo.findOne({
            where: { id: item_id },
        });

        return item;
    }

    async retrieve_all(): Promise<any | undefined> {
        const itemRepo = this.activeManager_.withRepository(
            this.itemRepository_
        );

        const items = await itemRepo.find({
        });

        return items;
    }

    async update(item_id: string, data: AdminItemReq): Promise<any> {
        return await this.atomicPhase_(
            async (transactionManager: EntityManager) => {
                const itemRepository = transactionManager.withRepository(
                    this.itemRepository_
                );

                const item = await this.retrieve(item_id);

                return await itemRepository.save(item);
            }
        );
    }
}

export default ItemService;
