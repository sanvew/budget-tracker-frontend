import Dexie from "dexie";

import { Currency, Expense } from "type";
import { Category } from "type/category";
import DB_CHANGELOG, { IndexedDBChangelog } from "./changelog";

export class BudgetTrackingDB extends Dexie {
    static readonly #DB_NAME = 'budgetTracking';

    expenses!: Dexie.Table<Expense, string>
    category!: Dexie.Table<Category, string>
    currency!: Dexie.Table<Currency, string>

    constructor(changeLogs: IndexedDBChangelog[]) {
        super(BudgetTrackingDB.#DB_NAME)
        changeLogs.forEach((({version, schema, transCallback}) => {
            const v = this.version(version).stores(schema)
            transCallback != null && v.upgrade(transCallback) 
        }))
    }
}

const appIndexedDB = new BudgetTrackingDB(DB_CHANGELOG);
export default appIndexedDB