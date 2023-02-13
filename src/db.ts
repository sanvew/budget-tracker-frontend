import dayjs from "dayjs";
import Dexie, { Collection } from "dexie";

import { Expense } from "types";

interface Paginataion {
    pageNum: number,
    pageSize: number,
}

class DefaultPagination implements Paginataion {
    static readonly PAGE_SIZE = 15;
    pageNum: number;
    pageSize: number;

    constructor(pageNum: number, pageSize?: number) {
        this.pageNum = pageNum;
        this.pageSize = pageSize !== undefined ? pageSize : DefaultPagination.PAGE_SIZE;
    }
}

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

    getOrderByDate(page?: Paginataion): Collection<Expense, string> {
        let result: Collection<Expense, string>;
        if (page !== undefined) {
            result = this.#db.expenses.orderBy('date').offset((page.pageNum - 1) * (page.pageSize - 1)).limit(page.pageSize);
        } else {
            result = this.#db.expenses.orderBy('date');
        }
        return result;
    }

    getOrderByDateBetween(startDate?: Date, endDate?: Date, page?: Paginataion): Collection<Expense, string> | undefined{
        let result: Collection<Expense, string> | undefined;
        if (startDate !== undefined && endDate !== undefined) {
            if (dayjs(startDate).isSameOrBefore(dayjs(endDate), 'date')) {
                result = this.#db.expenses.where('date').between(endDate, startDate, true, true)
            } else {
                throw new Error(`Invalid dates passed: 'startDate(${startDate})' isn't before 'endDate(${endDate})'`)
            }
        } else if (startDate !== undefined) {
            result = this.#db.expenses.where('date').aboveOrEqual(startDate)
        } else if (endDate !== undefined) {
            result = this.#db.expenses.where('date').belowOrEqual(endDate)
        }
        if (result !== undefined && page !== undefined) {
            result = result.offset(page.pageNum * page.pageSize).limit(page.pageSize)
        }
        return result;
    }

    async count(startDate?: Date, endDate?: Date): Promise<number> {
        let result;
        if (startDate !== undefined && endDate !== undefined) {
            if (dayjs(startDate).isSameOrBefore(dayjs(endDate), 'date')) {
                result = this.#db.expenses.where('date').between(endDate, startDate, true, true).count()
            } else {
                throw new Error(`Invalid dates passed: 'startDate(${startDate})' isn't before 'endDate(${endDate})'`)
            }
        } else if (startDate !== undefined) {
            result = this.#db.expenses.where('date').aboveOrEqual(startDate).count()
        } else if (endDate !== undefined) {
            result = this.#db.expenses.where('date').belowOrEqual(endDate).count()
        } else {
            result = this.#db.expenses.count();
        }
        return result as Promise<number>;
    }
}

const appIndexedDB = new BudgetTrackingDB();

const expensesDao = new ExpenseDao(appIndexedDB);

export {
    DefaultPagination,
    BudgetTrackingDB,
    ExpenseDao,
    appIndexedDB,
    expensesDao
};

export type {
    Paginataion
};

