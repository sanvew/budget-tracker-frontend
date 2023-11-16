import React, { useState } from 'react';
import dayjs from 'dayjs';

import { useAppSelector } from 'hook';
import { Expense } from 'type';
import { DEFAULT_DATE_FORMAT } from 'constant';
import ExpenseTableCell from './ExpenseTableCell';
import DateTableCell from './DateTableCell';
import ExpenseDetails from 'ui/ExpensesPage/ExpenseDetails';

import './_expenses-table.scss';

export const ExpensesTable = () => {
    const {expenses, error, isLoading} = useAppSelector(state => state.expensesReducer)

    const [selectedExpense, setSelectedExpense] = useState<Expense | undefined>()
    const [showExpenseDetails, setShowExpenseDetails] = useState<boolean>(false)

    const handleExpenseTableCell = (expense: Expense) => {
        setSelectedExpense(expense)
        setShowExpenseDetails(true)
    }

    const callbackIsExpenseDetailsShown = (shown: boolean) => {
        setShowExpenseDetails(shown)
    }

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
                    <ExpenseTableCell key={item.id} expense={item} onClick={handleExpenseTableCell}/>
                )}
            </React.Fragment>
        )
    })

    // TODO: add styling for error, loading and 'no data found'
    return (
        <>
            { error.fetch && <h1>{error.fetch}</h1> }
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
            <ExpenseDetails
                expense={selectedExpense} show={showExpenseDetails} isShown={callbackIsExpenseDetailsShown}
            />
        </>
    )
}