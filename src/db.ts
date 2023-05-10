import dayjs from "dayjs";
import Dexie, { Collection } from "dexie";

import { Expense, ExpenseFilter, Pagination } from "types";

class BudgetTrackingDB extends Dexie {
    static readonly #DB_NAME = 'budgetTracking';

    expenses!: Dexie.Table<Expense, string>

    constructor() {
        super(BudgetTrackingDB.#DB_NAME)
        this.version(1).stores({
            expenses: 'id, date, createDate, category, expenseType',
        })
    }
}

class ExpenseDao {
    #db: BudgetTrackingDB
    constructor(db: BudgetTrackingDB) {
        this.#db = db
    }

    async save(expense: Expense) {
        await this.#db.expenses.add(expense)
    }

    getOrderByDate(page?: Pagination): Collection<Expense, string> {
        return page != null ? this.#pagination(this.#db.expenses.orderBy('date'), page) : this.#db.expenses.toCollection()
    }

    getAll(expenseFilter?: ExpenseFilter, page?: Pagination): Collection<Expense, string> {
        let result: Collection<Expense, string> = this.#db.expenses.toCollection()
        if (expenseFilter != null) {
            if (expenseFilter.fromDate != null || expenseFilter.toDate != null) {
                result = this.#filteredByDate(expenseFilter.fromDate, expenseFilter.toDate)
            }
            if (expenseFilter.categories != null && expenseFilter.categories.length !== 0 ) {
                result = result.filter(val => expenseFilter.categories!.includes(val.category))
            }
            if (expenseFilter.expenseType != null && expenseFilter.expenseType !== 'all') {
                result = result.filter(val => val.expenseType === expenseFilter.expenseType)
            }
        } else {
            result = this.#db.expenses.orderBy('date')
        }
        result = result.reverse()
        return page != null ? this.#pagination(result, page) : result
    }

    async count(expenseFilter?: ExpenseFilter): Promise<number> {
        return this.getAll(expenseFilter).count() as Promise<number>;
    }

    #pagination(collection: Collection<Expense, string>, page: Pagination) {
        return collection.offset((page.pageNum - 1) * (page.pageSize - 1)).limit(page.pageSize)
    }

    #filteredByDate(startDate?: Date, endDate?: Date): Collection<Expense, string> {
        let result: Collection<Expense, string> = this.#db.expenses.toCollection()
        if (startDate != null && endDate != null) {
            if (dayjs(startDate).isSameOrBefore(dayjs(endDate), 'date')) {
                result = this.#db.expenses.where('date').between(
                    dayjs(startDate).startOf('day').toDate(),
                    dayjs(endDate).endOf('day').toDate(),
                    true, true
                )
            } else {
                throw new Error(`Invalid dates passed: 'startDate(${startDate})' isn't before 'endDate(${endDate})'`)
            }
        } else if (startDate != null) {
            result = this.#db.expenses.where('date').aboveOrEqual(dayjs(startDate).startOf('day').toDate())
        } else if (endDate != null) {
            result = this.#db.expenses.where('date').belowOrEqual(dayjs(endDate).endOf('day').toDate())
        }
        return result
    } 
}

const appIndexedDB = new BudgetTrackingDB();

export const expensesDao = new ExpenseDao(appIndexedDB);