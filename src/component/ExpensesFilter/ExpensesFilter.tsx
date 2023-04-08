import { DateInput, TagSelect, SimpleSelect } from 'component/form';

import './_expenses-filter.scss';

type Props = {}

export const ExpensesFilter = (props: Props) => {
    const dummyCategories = ["groceries", "sport", "transport"];
    const dummyTypes = [["all", "All"], ["outcome", "Outcome"], ["income", "Income"]]

    return (
        <aside className="card-main expenses-filter">
            <div className="filter-heading">
                <h4>Filter</h4>
                <button className="clear-main-acc-button"><h4>clear</h4></button>
            </div>
            <div className="filter-input">
                <div className="date-from">
                    <DateInput placeholder="From"/>
                </div>
                <div className="date-to">
                    <DateInput placeholder="To"/>
                </div>
                <div className="flex-row-break"></div>
                <div className="category">
                    <TagSelect placeholder='Select category(s)' whitelist={dummyCategories}/>
                </div>
                <div className="flex-row-break"></div>
                <div className="type">
                    <SimpleSelect placeholder="Select type" values={dummyTypes.map(([val, label]) => {return {value: val, label: label}})}/>
                </div>
                <div className="flex-row-break"></div>
                <div className="submit">
                    <button className="acc-acc-main-button">Select</button>
                </div>
            </div>
        </aside>
    )
}