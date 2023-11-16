import { isEqual } from 'lodash';
import { QUERY_PARAM_DATE_FORMAT } from "constant";
import { formatDate, parseDate } from "utils/date";
import { ExpenseType } from "./expense";

export type FilterExpenseType = 'all' | ExpenseType

export interface ExpenseFilter {
    fromDate?: Date,
    toDate?: Date,
    categories?: string[],
    expenseType?: FilterExpenseType
}

export const EMPTY_FILTER: Readonly<ExpenseFilter> = {
    fromDate: undefined, 
    toDate: undefined,
    categories: undefined,
    expenseType: undefined,
}

export const isExpenseFilterEqual = (o1?: ExpenseFilter, o2?: ExpenseFilter): boolean => {
    if (isEqual(o1, EMPTY_FILTER)) o1 = undefined
    if (isEqual(o2, EMPTY_FILTER)) o2 = undefined
    return isEqual(o1, o2)
}

export const expenseFilterToSearchParams = (searchParams: URLSearchParams, filter?: ExpenseFilter) => {
    if (filter) {
        if (filter.fromDate != null) {
            searchParams.set('from', formatDate(filter.fromDate, QUERY_PARAM_DATE_FORMAT))
        } else {
            searchParams.delete('from')
        }
        if (filter.toDate != null) {
            searchParams.set('to', formatDate(filter.toDate, QUERY_PARAM_DATE_FORMAT))
        } else {
            searchParams.delete('to')
        }
        if (filter.categories != null && filter.categories.length !== 0) {
            searchParams.set('category', filter.categories.join(','))
        } else {
            searchParams.delete('category')
        }
        if (filter.expenseType != null) {
            searchParams.set('type', filter.expenseType)
        } else {
            searchParams.delete('type')
        }
    } else {
        searchParams.delete('from')
        searchParams.delete('to')
        searchParams.delete('category')
        searchParams.delete('type')
    }
    return searchParams
}

export const expenseFilterFromSearchParams = (searchParams: URLSearchParams): ExpenseFilter => {
    return {
        fromDate: (searchParams.has('from') && searchParams.get('from') !== '') 
            ? parseDate(searchParams.get('from')?.toString()!, QUERY_PARAM_DATE_FORMAT) 
            : undefined,
        toDate: (searchParams.has('to') && searchParams.get('to') !== '') 
            ? parseDate(searchParams.get('to')?.toString()!, QUERY_PARAM_DATE_FORMAT) 
            : undefined,
        categories: (searchParams.has('category') && searchParams.get('category') !== '')
            ? (searchParams.get('category')!.toString().split(','))
            : undefined,
        expenseType: searchParams.has('type') ? searchParams.get('type')!.toString() as FilterExpenseType : undefined
    }
}