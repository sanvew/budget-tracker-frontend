import dayjs from "dayjs"

export const ALL_EXPENSE_TYPE = ['outcome', 'income'] as const
export type ExpenseType = typeof ALL_EXPENSE_TYPE[number]

export interface Expense {
    id: string,
    date: Date,
    createDate: Date,
    updateDate: Date,
    category: string,
    description: string,
    amount: number,
    expenseType: ExpenseType,
    currency: string
}

export type ExpenseUpdates = Partial<Omit<Expense, 'id' | 'createDate' | 'updateDate'>>

export type ExpenseValidFields = {[Key in keyof ExpenseUpdates]: boolean}

export const getValidatedExpenseUpdates = (original: Expense, updated: ExpenseUpdates): ExpenseUpdates => {
    return Object.entries(updated)
        .filter(([, val]) => val != null)
        .reduce((output, [key, val]) => {
            if ((original as any)[key] !== val) {
                Object.assign(output, {[key]: val})
            }
            return output 
        }, {} as ExpenseUpdates)
}

export const isExpenseUpdated = (original: Expense, updated: ExpenseUpdates): boolean => {
    return Object.entries(updated)
        .filter(([, val]) => val != null)
        .find(([key, val]) => (original as any)[key] !== val) != null ? true : false 
}

export const getExpenseValidFields = (expense: ExpenseUpdates): ExpenseValidFields => {
    let expenseValidFields: ExpenseValidFields = {} as ExpenseValidFields

    if (dayjs(expense.date).isValid()) {
        expenseValidFields.date = true
    } else {
        expenseValidFields.date = false
    }

    if (expense.amount != null && !isNaN(expense.amount)) {
        expenseValidFields.amount = true
    } else {
        expenseValidFields.amount = false 
    }
    // TODO: check for valid currency
    if (expense.currency != null && expense.currency.trim() !== '') {
        expenseValidFields.currency = true
    } else {
        expenseValidFields.currency = false
    }

    if (expense.category != null && expense.category.trim() !== '') {
        expenseValidFields.category = true
    } else {
        expenseValidFields.category = false
    }

    if (expense.expenseType != null && ALL_EXPENSE_TYPE.includes(expense.expenseType)) {
        expenseValidFields.expenseType = true
    } else {
        expenseValidFields.expenseType = false
    }

    if (expense.description != null && expense.description.trim() !== '') {
        expenseValidFields.description = true
    } else {
        expenseValidFields.description = false
    }

    return expenseValidFields
}

export const isExpenseValid = (expenseValidFields: ExpenseValidFields): boolean => {
    return Object.values(expenseValidFields).find(val => !val) == null ? true : false
}