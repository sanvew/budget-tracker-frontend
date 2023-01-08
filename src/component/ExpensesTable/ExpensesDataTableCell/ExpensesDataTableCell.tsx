type Props = {
    category: string,
    description: string,
    amount: number,
    expenseType: 'outcome' | 'income',
    currency: string,
}

export const ExpensesDataTableCell = ({ category, description, amount, expenseType, currency}: Props) => {
    const amountSign = expenseType === 'outcome' ? '-' : '+';
    const amountClass = expenseType === 'outcome' ? 'outcome-value' : 'income-value';

    return (
        <tr className="data-row">
            <td className="category">{category}</td>
            <td className="description">{description}</td>
            <td className="amount"><span className={amountClass}>{amountSign}{amount}</span> {currency}</td>
        </tr>
    )
}