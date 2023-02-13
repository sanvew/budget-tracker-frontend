import { useEffect } from 'react';

import { Expense } from 'types';
import ExpenseTableCell from './ExpenseTableCell';
import DateTableCell from './DateTableCell';
import { useAppDispatch, useAppSelector } from 'hook';
import { fetchExpenses } from 'store/reducer/expenses';

import './_expenses-table.scss';
import React from 'react';

export const ExpensesTable = () => {
    const dispatch = useAppDispatch()
    const {expenses, fetchError: error, isLoading} = useAppSelector(state => state.expensesReducer)

    useEffect(() => {
        dispatch(fetchExpenses())
    }, [])

    const expensesGroupByDate = Object.entries(
        expenses.reduce((dateGroup, expense) => {
            const date = expense.date.toISOString().split('T')[0];
            if (!(date in dateGroup)) {
                dateGroup[date] = [];
            }
            dateGroup[date].push(expense);
            return dateGroup;
        }, {} as {[date: string]: Expense[]})
    )
    .map(([dateString, expensesByDate]) => {
        const date = new Date(dateString)
        return (
            <React.Fragment key={dateString}>
                <DateTableCell date={date} />
                { expensesByDate.map((item) =>
                    <ExpenseTableCell key={item.id} category={item.category} description={item.description} amount={item.amount} expenseType={item.expenseType} currency={item.currency} />
                )}
            </React.Fragment>
        )
    })

    // TODO: add styling for error, loading and 'no data found'
    return (
        <>
            { error && <h1>{error}</h1> }
            { isLoading && <h1>loading data...</h1> }
            { !isLoading && expenses.length > 0
                ? 
                    <table className="expenses-table">
                    <tbody>
                        { expensesGroupByDate }
                    </tbody>
                    </table>
                :
                    <h1>No data found</h1>
            }
        </>
    )
}