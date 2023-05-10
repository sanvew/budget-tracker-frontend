import React from 'react';
import dayjs from 'dayjs';

import ExpenseTableCell from './ExpenseTableCell';
import DateTableCell from './DateTableCell';
import { useAppSelector } from 'hook';
import { Expense } from 'types';
import { DEFAULT_DATE_FORMAT } from 'constant';

import './_expenses-table.scss';

export const ExpensesTable = () => {
    const {expenses, fetchError: error, isLoading} = useAppSelector(state => state.expensesReducer)

    const expensesGroupByDate = Object.entries(
        expenses.reduce((dateGroup, expense) => {
            const date = dayjs(expense.date).format(DEFAULT_DATE_FORMAT);
            if (!(date in dateGroup)) {
                dateGroup[date] = [];
            }
            dateGroup[date].push(expense);
            return dateGroup;
        }, {} as {[date: string]: Expense[]})
    )
    .map(([dateString, expensesByDate]) => {
        const date = dayjs(dateString, DEFAULT_DATE_FORMAT).toDate()
        return (
            <React.Fragment key={dateString}>
                <DateTableCell date={date}/>
                { expensesByDate.map((item) =>
                    <ExpenseTableCell key={item.id} category={item.category} description={item.description} amount={item.amount} expenseType={item.expenseType} currency={item.currency}/>
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