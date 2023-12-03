import { Collection } from "dexie"
import { Currency } from "type"
import appIndexedDB, { BudgetTrackingDB } from "./db"

export class CurrencyDao {
    readonly #db: BudgetTrackingDB

    constructor(db: BudgetTrackingDB) {
        this.#db = db
    }

    async save(currency: Currency) {
        await this.#db.currency.add(currency)
    }

    async remove(id: string) {
        await this.#db.currency.delete(id)
    }

    getAll(): Collection<Currency, string> {
        return this.#db.currency.orderBy('alfa')
    }
}

export const currencyDao = new CurrencyDao(appIndexedDB);