import { DEFAULT_EXPENSES_PAGE_SIZE } from "constant";

export interface Pagination {
    pageNum: number,
    pageSize: number,
}

export class ExpensesPagination implements Pagination {
    readonly pageNum: number;
    readonly pageSize: number;

    constructor(pageNum: number, pageSize: number = DEFAULT_EXPENSES_PAGE_SIZE) {
        this.pageNum = pageNum
        this.pageSize = pageSize
    }
}

export const pageFromSearchParams = (searchParams: URLSearchParams): number => {
    const page = searchParams.get('page')?.toString()
    return page != null ? Number(page) : 1 
}

export const pageToSearchParams = (searchParams: URLSearchParams, page?: number): URLSearchParams =>  {
    if (page) {
        searchParams.set('page', page.toString())
    } else {
        searchParams.delete('page')
    }
    return searchParams
}