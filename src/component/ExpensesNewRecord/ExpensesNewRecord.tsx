import { DateInput, TagSelect, SimpleSelect } from 'component/form';

import './_expenses-new-record.scss';

type Props = {}

export const ExpensesNewRecord = (props: Props) => {
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
                    <button className="acc-acc-main-button">Add</button>
                </div>
            </div>
        </aside>
    )
}