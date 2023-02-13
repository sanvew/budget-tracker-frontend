import { DateInput, TagSelect, SimpleSelect } from 'component/form';
import { useAppDispatch } from 'hook';
import { addExpense } from 'store/reducer/expenses';

import './_expenses-new-record.scss';

type Props = {}

// TODO: add toast message for result of add Record
export const ExpensesNewRecord = (props: Props) => {
    const dispatch = useAppDispatch()


    const submit = () => {
        // TODO: dispatch actual data
        dispatch(
            addExpense({
                id: crypto.randomUUID(),
                date: new Date(Date.now()),
                createDate: new Date(Date.now()),
                updateDate: new Date(Date.now()),
                category: 'new cat2',
                description: 'another description',
                amount: 1377,
                expenseType: 'income',
                currency: 'GEL'
            })
        )
    }


    const dummyCurrencies = [["gel", "GEL"], ["usd", "USD"], ["eur", "EUR"], ["rub", "RUB"]]
    const dummyCategories = ["groceries", "sport", "transport"];
    const dummyTypes: [string, string, boolean?][] = [["outcome", "Outcome"], ["income", "Income"]];
    
    return (
        <aside className='card-main expenses-new-record'>
            <h4>New record</h4>
            <div className="new-record-input">
                <div className="date">
                    <DateInput placeholder="Date" />
                </div>
                <div className="flex-row-break"></div>
                <div className="amount">
                    <input type="number" placeholder="Amount" name="amount"/>
                </div>
                <div className="currency">
                    <SimpleSelect placeholder="CUR" values={dummyCurrencies.map(([val, label]) => {return {value: val, label: label}})} />
                </div>
                <div className="flex-row-break"></div>
                <div className="category">
                    <TagSelect placeholder='Select category' whitelist={dummyCategories} mode='select' />
                </div>
                <div className="flex-row-break"></div>
                <div className="type">
                    <SimpleSelect values={dummyTypes.map(([val, label, sel]) => {return {value: val, label: label, selected: sel}})} />
                </div>
                <div className="flex-row-break"></div>
                <div className="comment">
                    <textarea placeholder="Comment..."></textarea>
                </div>
                <div className="flex-row-break"></div>
                <div className="submit">
                    <button className="acc-acc-main-button" onClick={submit}>Add</button>
                </div>
            </div>
        </aside>
    )
}