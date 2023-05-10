import ExpensesTable from 'component/ExpensesTable';
import { useAppSelector } from 'hook';
import './_expenses-list.scss';

export const ExpensesList = () => {
    const {totalCount} = useAppSelector(state => state.expensesReducer)

    return (
        <section className="card-main expenses-list">
            <div className="list-heading">
                <h4>Expenses/Earnings</h4>
                <h5>Found {totalCount} results</h5>
            </div>
            <ExpensesTable/>
            <nav className="expenses-list-paging">
                <a className="clear-main-button" href="#">&lt;</a>
                <a className="clear-main-button" href="#">1</a>
                <a className="clear-main-button pressed" >2</a>
                <a className="clear-main-button" href="#">3</a>
                <a>...</a>
                <a className="clear-main-button" href="#">7</a>
                <a className="clear-main-button" href="#">&gt;</a>
            </nav>
        </section>
    )
}