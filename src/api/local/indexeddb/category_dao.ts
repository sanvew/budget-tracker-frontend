import { Collection } from "dexie"
import { Category } from "type"
import appIndexedDB, { BudgetTrackingDB } from "./db"

export class CategoryDao {
    readonly #db: BudgetTrackingDB

    constructor(db: BudgetTrackingDB) {
        this.#db = db
    }

    async save(category: Category) {
        await this.#db.category.add(category)
    }

    async remove(id: string) {
        await this.#db.category.delete(id)
    }

    getAll(): Collection<Category, string> {
        return this.#db.category.orderBy('name')
    }
}

export const categoryDao = new CategoryDao(appIndexedDB);