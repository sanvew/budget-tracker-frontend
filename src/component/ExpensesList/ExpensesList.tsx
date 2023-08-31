import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ExpensesTable from 'component/ExpensesTable';
import { fetchExpenses } from 'store/reducer/expenses';
import { useAppDispatch, useAppSelector } from 'hook';
import { DEFAULT_EXPENSES_PAGE_SIZE, MAX_PAGES, MAX_PAGES_SEQ_DISPLAYED } from 'constant';
import { EMPTY_FILTER, ExpenseFilter, ExpensesPagination, isExpenseFilterEqual, pageToSearchParams } from 'types';
import './_expenses-list.scss';


export const ExpensesList = () => {
    const dispatch = useAppDispatch()

    const {totalCount, filter, page} = useAppSelector(state => state.expensesReducer)
    const [, setSearchParams] = useSearchParams()
    const [totalPages, setTotalPages] = useState<number>()
    const [pagesNavigationElements, setPagesNavigationElements] = useState<JSX.Element[]>() 

    useEffect(() => {
        const totalUnlimited = Math.floor(totalCount / (page?.pageSize ?? DEFAULT_EXPENSES_PAGE_SIZE) + 1)
        setTotalPages(totalUnlimited > MAX_PAGES ? MAX_PAGES : totalUnlimited)
    }, [totalCount, page])

    useEffect(() => {
        if (totalPages != null) {
            const selectedPage = page?.pageNum ?? 1
            setSearchParams(prev => pageToSearchParams(prev, selectedPage))

            if (totalPages <= MAX_PAGES_SEQ_DISPLAYED) {
                setPagesNavigationElements(genPageSequence(totalPages, (i) => i + 1, selectedPage)) 
            } else {
                const MAX_MARGINAL_TAIL = 5;
                const MAX_TAIL = 2;

                if (selectedPage <= MAX_MARGINAL_TAIL + 1) {
                    const navBegin = genPageSequence(selectedPage + MAX_TAIL, (i) => i + 1, selectedPage)
                    const navEnd = genPageSequence(MAX_TAIL, (i) => totalPages - i).reverse()

                    setPagesNavigationElements([...navBegin, <span key={'...'}>...</span>, ...navEnd])
                } else if (selectedPage >= totalPages - MAX_MARGINAL_TAIL) {
                    const navBegin = genPageSequence(MAX_TAIL, (i) => i + 1)
                    const navEnd = genPageSequence(
                        (totalPages - selectedPage + 1) + MAX_TAIL, (i) => totalPages - i, selectedPage
                    ).reverse()

                    setPagesNavigationElements([...navBegin, <span key={'...'}>...</span>, ...navEnd])
                } else {
                    const navBegin = genPageSequence(MAX_TAIL, (i) => i + 1)
                    const navMiddle = genPageSequence(
                        MAX_TAIL*2 + 1, (i) => (selectedPage - MAX_TAIL) + i, selectedPage
                    )
                    const navEnd = genPageSequence(MAX_TAIL, (i) => totalPages - i).reverse()

                    setPagesNavigationElements([
                        ...navBegin, <span key={'...1'}>...</span>, ...navMiddle, <span key={'...2'}>...</span>,
                        ...navEnd
                    ])
                }
            } 
        }
    }, [page, totalPages])

    const genPageSequence = (
        elemCount: number, numerationFn: (index: number) => number, selectedPage?: number
    ): JSX.Element[] => {
        return Array(elemCount).fill(1)
            .map((_, i) => {
                const curPage = numerationFn(i) 
                return <span
                    className={`clear-main-button ${(selectedPage === curPage) ? 'pressed' : ''}`} key={curPage}
                    onClick={() => { if (selectedPage !== curPage) gotoPage(curPage, filter)}}
                >
                        {curPage}
                </span>
            })
    }

    const gotoPage = (page: number, expenseFilter?: ExpenseFilter) => {
        setSearchParams(prev => pageToSearchParams(prev, page))
        dispatch(fetchExpenses({filter: expenseFilter, page: new ExpensesPagination(page)}))
    }

    const gotoNextPage = (page?: number) => {
        if (page != null && page !== 1) gotoPage(page - 1, filter)
    }

    const gotoPrevPage = (page?: number) => {
        if (page != null && page !== totalPages) gotoPage(page + 1, filter)
    }

    return (
        <section className="card-main expenses-list">
            <div className="list-heading">
                <h4>Expenses/Earnings</h4>
                { !isExpenseFilterEqual(filter, EMPTY_FILTER) 
                    ? <h5>Found {totalCount} results</h5>
                    : ''
                }
            </div>
            <ExpensesTable/>
            { (totalPages != null && totalPages > 1) 
                ?
                    <nav className="expenses-list-paging">
                        <span className={`clear-main-button ${page?.pageNum === 1 ? 'disabled' : ''}`} 
                            onClick={() => gotoNextPage(page?.pageNum)}
                        >
                            &lt;
                        </span>
                        {pagesNavigationElements}
                        <span className={`clear-main-button ${page?.pageNum === totalPages ? 'disabled' : ''}`}
                            onClick={() => gotoPrevPage(page?.pageNum)}
                        >
                            &gt;
                        </span>
                    </nav>
                : ''
            }
        </section>
    )
}