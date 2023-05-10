import { ChangeEvent, FormEvent, useState } from 'react';
import DatePicker from 'react-datepicker'
import dayjs from 'dayjs';

import { useAppDispatch } from 'hook';
import { addExpense } from 'store/reducer/expenses';
import { TagSelect, SimpleSelect } from 'component/form';
import { Expense, ExpenseType } from 'types';

import './_expenses-new-record.scss';
import { DATEPICKER_INPUT_DATE_FORMAT } from 'constant';

type ExpensesRequiredFields = {
    [Key in keyof Omit<Expense, 'id' | 'createDate' | 'updateDate'>]: boolean;
}

export const ExpensesNewRecord = () => {
    const dispatch = useAppDispatch()

    const [requiredFields, setRequiredFields] = useState<ExpensesRequiredFields>({} as ExpensesRequiredFields)
    const [date, setDate] = useState<Date>(new Date())
    const [amount, setAmount] = useState<number>()
    const [currency, setCurrency] = useState<string>()
    const [category, setCategory] = useState<string[]>()
    const [expenseType, setExpenseType] = useState<string>('outcome' as ExpenseType)
    const [description, setDescription] = useState<string>()

    const validateInput = (): boolean => {
        let isValid = true
        let reqFields: ExpensesRequiredFields = {} as ExpensesRequiredFields

        if (!dayjs(date).isValid()) {
            reqFields.date = true
            isValid = false
        }
        if (isNaN(amount!)) {
            reqFields.amount = true
            isValid = false
        }
        // TODO: check for valid currency
        if (currency == null || currency === '') {
            reqFields.currency = true
            isValid = false
        }
        if (category == null) {
            reqFields.category = true
            isValid = false
        }
        if (expenseType == null || !['outcome', 'income'].includes(expenseType)) {
            reqFields.expenseType = true
            isValid = false
        }
        if (description == null || description === '') {
            reqFields.description = true
            isValid = false
        }
        setRequiredFields(prevState => ({
            ...prevState,
            ...reqFields
        }))

        return isValid
    }

    const createExpenseRecord = (): Expense => {
        return {
            id: crypto.randomUUID(),
            date: date,
            createDate: new Date(),
            updateDate: new Date(),
            category: category![0],
            description: description!,
            amount: amount!,
            expenseType: expenseType! as ExpenseType,
            currency: currency!
        }
    }

    // Form input handlers
    const handleChangeAmount = (e: ChangeEvent<HTMLInputElement>) => {
        setAmount(parseFloat(e.currentTarget.value))
    }

    const handleChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.currentTarget.value)
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (validateInput()) {
            // TODO: add toast message for new record 
            dispatch(addExpense(createExpenseRecord()))
        } else {
            // TODO: add error toast message
            window.alert('Some fields not valid')
        }
    }

    // TODO: create separate table 
    const dummyCurrencies = ["GEL", "USD", "EUR", "RUB"]
    // TODO: create separate table 
    const dummyCategories = ["groceries", "sport", "transport"];

    const expenseTypes: [ExpenseType, string][] = [["outcome", "Outcome"], ["income", "Income"]];
    
    return (
        <aside className='card-main expenses-new-record'>
            <h4>New record</h4>
            <form className="new-record-input" onSubmit={handleSubmit}>
                <div className="date">
                    <DatePicker selected={date}
                        onChange={date => setDate(date ?? new Date())}
                        placeholderText='Date' 
                        dateFormat={DATEPICKER_INPUT_DATE_FORMAT}
                    />
                    <span className='required-field' hidden={!requiredFields.date}>*must be filled</span>
                </div>
                <div className="flex-row-break"></div>
                <div className="amount">
                    <input type="number" step="0.01" placeholder="Amount" onChange={handleChangeAmount}/>
                    <span className='required-field' hidden={!requiredFields.amount}>*must be filled</span>
                </div>
                <div className="currency">
                    <SimpleSelect placeholder="CUR" value={currency} onChange={setCurrency} options={dummyCurrencies.map(val => {return {value: val, label: val}})}/>
                    <span className='required-field' hidden={!requiredFields.currency}>*must be filled</span>
                </div>
                <div className="flex-row-break"></div>
                <div className="category">
                    <TagSelect placeholder='Select category' value={category} onChange={setCategory} enforceWhitelist={false} whitelist={dummyCategories} mode='select'/>
                    <span className='required-field' hidden={!requiredFields.category}>*must be filled</span>
                </div>
                <div className="flex-row-break"></div>
                <div className="type">
                    <SimpleSelect value={expenseType} onChange={setExpenseType} options={expenseTypes.map(([value, label]) => {return {value, label}})}/>
                    <span className='required-field' hidden={!requiredFields.expenseType}>*must be filled</span>
                </div>
                <div className="flex-row-break"></div>
                <div className="comment">
                    <textarea name="description" placeholder="Comment..." onChange={handleChangeDescription}/>
                    <span className='required-field' hidden={!requiredFields.description}>*must be filled</span>
                </div>
                <div className="flex-row-break"></div>
                <div className="submit">
                    <button type="submit" className="acc-acc-main-button">Add</button>
                </div>
            </form>
        </aside>
    )
}