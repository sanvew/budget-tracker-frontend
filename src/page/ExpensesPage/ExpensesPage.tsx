import ExpensesFilter from 'component/ExpensesFilter';
import ExpensesNewRecord from 'component/ExpensesNewRecord';
import ExpensesList from 'component/ExpensesList';

import './_expenses.scss';

type Props = {}

export const ExpensesPage = (props: Props) => {
  return (
    <main className='layout-expenses'>
        <ExpensesFilter/>
        <ExpensesNewRecord/>
        <ExpensesList/>
    </main>
  )
}