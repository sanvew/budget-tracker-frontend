export interface Pagination {
    pageNum: number,
    pageSize: number,
}

export class DefaultPagination implements Pagination {
    static readonly PAGE_SIZE = 15;
    pageNum: number;
    pageSize: number;

    constructor(pageNum: number, pageSize?: number) {
        this.pageNum = pageNum;
        this.pageSize = pageSize !== undefined ? pageSize : DefaultPagination.PAGE_SIZE;
    }
}
