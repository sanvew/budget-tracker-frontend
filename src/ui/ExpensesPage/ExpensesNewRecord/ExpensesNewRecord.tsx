import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker'
import dayjs from 'dayjs';

import { DATEPICKER_INPUT_DATE_FORMAT } from 'constant';
import { useAppDispatch, useAppSelector } from 'hook';
import { addExpense } from 'store/reducer/expenses';
import { TagSelect, SimpleSelect } from 'ui/common/form';
import { Expense, ExpenseType } from 'type';

import './_expenses-new-record.scss';
import { addCategory, fetchCategories } from 'store/reducer/category';
import { fetchCurrencies } from 'store/reducer/currency';

type ExpensesRequiredFields = {
    [Key in keyof Omit<Expense, 'id' | 'createDate' | 'updateDate'>]: boolean;
}

export const ExpensesNewRecord = () => {
    const dispatch = useAppDispatch()

    const {categories} = useAppSelector(state => state.categoryReducer)
    const {currencies} = useAppSelector(state => state.currencyReducer)
    const [requiredFields, setRequiredFields] = useState<ExpensesRequiredFields>({} as ExpensesRequiredFields)
    const [date, setDate] = useState<Date>(new Date())
    const [amount, setAmount] = useState<number>()
    const [currency, setCurrency] = useState<string>()
    const [category, setCategory] = useState<string[]>()
    const [expenseType, setExpenseType] = useState<string>('outcome' as ExpenseType)
    const [description, setDescription] = useState<string>()

    useEffect(() => {
        dispatch(fetchCategories())
        dispatch(fetchCurrencies())
    }, [])

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
            reqFields.currencyAlfa = true
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

    const createExpenseRecord = (): Omit<Expense, 'id'> => {
        return {
            date: date,
            createDate: new Date(),
            updateDate: new Date(),
            category: category![0],
            description: description!,
            amount: amount!,
            expenseType: expenseType! as ExpenseType,
            currencyAlfa: currency!
        }
    }

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
            if (!categories.map(c => c.name).includes(category![0])) {
                dispatch(addCategory({name: category![0]}))
                dispatch(fetchCategories())
            }
        } else {
            // TODO: add error toast message
            window.alert('Some fields not valid')
        }
    }

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
                    <SimpleSelect
                        placeholder="CUR" value={currency} onChange={setCurrency} 
                        options={currencies.map(val => {return {value: val.alfa, label: val.alfa}})}
                    />
                    <span className='required-field' hidden={!requiredFields.currencyAlfa}>*must be filled</span>
                </div>
                <div className="flex-row-break"></div>
                <div className="category">
                    <TagSelect 
                        placeholder='Select category' value={category} onChange={setCategory} enforceWhitelist={false} 
                        whitelist={categories.map(c => c.name)} mode='select'
                    />
                    <span className='required-field' hidden={!requiredFields.category}>*must be filled</span>
                </div>
                <div className="flex-row-break"></div>
                <div className="type">
                    <SimpleSelect 
                        value={expenseType} onChange={setExpenseType} 
                        options={expenseTypes.map(([value, label]) => {return {value, label}})}
                    />
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