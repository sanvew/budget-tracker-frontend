import { Expense } from "types";

type Props = {
    expense: Expense
    onClick: (expense: Expense) => void
}

const ExpenseTableCell = ({expense, onClick}: Props) => {
    const amountSign = expense.expenseType === 'outcome' ? '-' : '+';
    const amountClass = expense.expenseType === 'outcome' ? 'outcome-value' : 'income-value';

    return (
        <tr className="data-row" onClick={() => onClick(expense)}>
            <td className="category">{expense.category}</td>
            <td className="description">{expense.description}</td>
            <td className="amount">
                <span className={amountClass}>{amountSign}{expense.amount}</span> {expense.currency}
            </td>
        </tr>
    )
}

export default ExpenseTableCell;