import dayjs from "dayjs"
import { Collection } from "dexie"
import { EMPTY_FILTER, Expense, ExpenseFilter, ExpenseUpdates, isExpenseFilterEqual, Pagination } from "type"
import appIndexedDB, { BudgetTrackingDB } from "./db"

class ExpenseDao {
    readonly #db: BudgetTrackingDB
    constructor(db: BudgetTrackingDB) {
        this.#db = db
    }

    async save(expense: Expense) {
        await this.#db.expenses.add(expense)
    }

    getOrderByDate(page?: Pagination): Collection<Expense, string> {
        return page != null
            ? this.#pagination(this.#db.expenses.orderBy('date'), page)
            : this.#db.expenses.toCollection()
    }

    getAll(expenseFilter?: ExpenseFilter, page?: Pagination): Collection<Expense, string> {
        let result: Collection<Expense, string>
        if (expenseFilter != null && !isExpenseFilterEqual(expenseFilter, EMPTY_FILTER)) {
            if (expenseFilter.fromDate != null || expenseFilter.toDate != null) {
                result = this.#filteredByDate(expenseFilter.fromDate, expenseFilter.toDate)
            }
            if (expenseFilter.categories != null && expenseFilter.categories.length !== 0 ) {
                result = this.#db.expenses.orderBy('date')
                    .filter(val => expenseFilter.categories!.find(cat => val.category.startsWith(cat)) != null)
            }
            if (expenseFilter.expenseType != null && expenseFilter.expenseType !== 'all') {
                result = this.#db.expenses.orderBy('date')
                    .filter(val => val.expenseType === expenseFilter.expenseType)
            }
        } else {
            result = this.#db.expenses.orderBy('date')
        }
        result = result!.reverse()
        return page != null ? this.#pagination(result, page) : result
    }

    async getById(expenseId: string): Promise<Expense | undefined> {
        return await this.#db.expenses.get(expenseId)
    }

    async update(expenseId: string, expenseUpdates: ExpenseUpdates): Promise<number> {
        return await this.#db.expenses.update(expenseId, {...expenseUpdates, updateDate: new Date()})
    }

    async remove(expenseId: string): Promise<void> {
        await this.#db.expenses.delete(expenseId)
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

export const expensesDao = new ExpenseDao(appIndexedDB);