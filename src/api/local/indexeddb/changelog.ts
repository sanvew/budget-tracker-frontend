import { Transaction } from "dexie"
import { Category, DEFAULT_CATEGORIES, DEFAULT_CURRENCIES } from "type"

export interface IndexedDBChangelog {
    version: number,
    schema: {[tableName: string]: string | null}
    transCallback?: (trans: Transaction) => void | PromiseLike<any>
}

const DB_CHANGELOG: IndexedDBChangelog[] = [
    {
        version: 1.1,
        schema: {
            expenses: 'id, date, createDate, category, expenseType',
            category: 'id, &name',
        },
        transCallback: (trans => {
            const defaultCategories = DEFAULT_CATEGORIES.map(c => ({name: c, id: crypto.randomUUID()} as Category))
            return trans.table('category').bulkAdd(defaultCategories)
        })
    },
    {
        version: 1.2,
        schema: {
            expenses: 'id, date, createDate, category, expenseType',
            category: 'id, &name',
            currency: 'id, &alfa, &numeric',
        },
        transCallback: (trans => {
            const defaultCurrencies = DEFAULT_CURRENCIES.map(c => ({...c, id: crypto.randomUUID()} as Category))
            return trans.table('currency').bulkAdd(defaultCurrencies)
        })
    }
]

export default DB_CHANGELOG