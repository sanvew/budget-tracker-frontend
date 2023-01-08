import { IPSUM_LOREM } from 'utils/constants';
import ExpensesDataTableCell from './ExpensesDataTableCell';
import ExpensesDateTableCell from './ExpensesDateTableCell';

import './_expenses-table.scss';

type Props = {}

export const ExpensesTable = (props: Props) => {
    const randomElement = (arr: Array<any>) => arr[Math.floor(Math.random()*arr.length)]
    const dummyExpenses = Array(11).fill(0)
        .map(() => { return {} as Record<string, any> })
        .map((item) => ({...item, category: randomElement(['Groceries', 'Sport', 'Rent'])}))
        .map((item) => ({...item, description: IPSUM_LOREM}))
        .map((item) => ({...item, amount: Math.round(Math.random() * 1000)}))
        .map((item) => ({...item, expensetype: randomElement(['outcome', 'income'])}))
        .map((item) => ({...item, currency: 'GEL'}))
    console.log(dummyExpenses)

    return (
        <table className="expenses-table">
            <ExpensesDateTableCell date={new Date(Date.now())} />
            { dummyExpenses.map((item) =>
                <ExpensesDataTableCell category={item.category} description={item.description} amount={item.amount} expenseType={item.expensetype} currency={item.currency} />)
            }
        </table>
    )
}