import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ExpensesFilter from 'component/ExpensesFilter';
import ExpensesNewRecord from 'component/ExpensesNewRecord';
import ExpensesList from 'component/ExpensesList';
import { useAppDispatch } from 'hook';
import { expenseFilterFromSearchParams, ExpensesPagination, pageFromSearchParams } from 'types';
import { fetchExpenses, fetchExpensesCount } from 'store/reducer/expenses';

import './_expenses.scss';

export const ExpensesPage = () => {
    const dispatch = useAppDispatch()

    const [searchParams, ] = useSearchParams();

    useEffect(() => {
        const expenseFilter = expenseFilterFromSearchParams(searchParams)
        const page = pageFromSearchParams(searchParams)
        dispatch(fetchExpenses({filter: expenseFilter, page: new ExpensesPagination(page)}))
        dispatch(fetchExpensesCount({filter: expenseFilter}))
    }, [])

    return (
        <main className='layout-expenses'>
            <ExpensesFilter/>
            <ExpensesNewRecord/>
            <ExpensesList/>
        </main>
    )
}