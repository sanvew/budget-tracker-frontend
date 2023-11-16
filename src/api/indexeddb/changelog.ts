import { Transaction } from "dexie"
import { Category, DEFAULT_CATEGORIES } from "type"

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
            console.log(defaultCategories)
            return trans.table('category').bulkAdd(defaultCategories)
        })
    }
]

export default DB_CHANGELOG