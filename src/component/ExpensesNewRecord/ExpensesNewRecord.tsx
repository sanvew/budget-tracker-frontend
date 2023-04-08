import { ChangeEvent, FormEvent, useState } from 'react';
import dayjs from 'dayjs';
import { BaseTagData } from "@yaireo/tagify";

import { DEFAULT_DATE_FORMAT } from 'constant';
import { useAppDispatch } from 'hook';
import { addExpense } from 'store/reducer/expenses';
import { DateInput, TagSelect, SimpleSelect } from 'component/form';
import { Expense } from 'types';

import './_expenses-new-record.scss';

type ExpensesRequiredFields = {
    [Key in keyof Omit<Expense, 'id' | 'createDate' | 'updateDate'>]: boolean;
}

export const ExpensesNewRecord = () => {
    const dispatch = useAppDispatch()

    const [requiredFields, setRequiredFields] = useState<ExpensesRequiredFields>({} as ExpensesRequiredFields)

    const validateInput = (formData: FormData): boolean => {
        let isValid = true
        let reqFields: ExpensesRequiredFields = {} as ExpensesRequiredFields

        if (!formData.has('date') && !dayjs(formData.get('date')?.toString()).isValid()) {
            reqFields.date = true
            isValid = false
        }
        if (!formData.has('amount') || isNaN(parseFloat(formData.get('amount')!.toString()))) {
            reqFields.amount = true
            isValid = false
        }
        // TODO: check for valid currency
        if (!formData.has('currency') || formData.get('currency') === '') {
            reqFields.currency = true
            isValid = false
        }
        if (!formData.has('category') || formData.get('category') === '') {
            reqFields.category = true
            isValid = false
        }
        if (!formData.has('expenseType') || !['outcome', 'income'].includes(formData.get('expenseType') as string)) {
            reqFields.expenseType = true
            isValid = false
        }
        if (!formData.has('description') || formData.get('description') === '') {
            reqFields.description = true
            isValid = false
        }
        setRequiredFields(prevState => ({
            ...prevState,
            ...reqFields
        }))

        return isValid
    }

    const formDataToExpenseRecord = (formData: FormData): Expense => {
        return {
            id: crypto.randomUUID(),
            date: dayjs(formData.get('date')!.toString(), DEFAULT_DATE_FORMAT).toDate(),
            createDate: new Date(),
            updateDate: new Date(),
            category: JSON.parse(formData.get('category')!.toString())[0]['value'],
            description: formData.get('description')!.toString(),
            amount: Number(formData.get('amount')!.toString()),
            expenseType: formData.get('expenseType')!.toString() === 'outcome' ? 'outcome' : 'income',
            currency: formData.get('currency')!.toString()
        }
    }

    // Form input handlers
    const handleChangeAmount = (e: ChangeEvent<HTMLInputElement>) => {
        const val = e.currentTarget.value
        setRequiredFields(prevState => ({
            ...prevState,
            amount: isNaN(parseFloat(val))
        }))
    }

    const handleChangeCurrency = (e: ChangeEvent<HTMLSelectElement>) => {
        const val = e.currentTarget.value
        setRequiredFields(prevState => ({
            ...prevState,
            currency: val === ''
        }))
    }

    const handleChangeCategory = (e: CustomEvent<Tagify.ChangeEventData<BaseTagData>>) => {
        setRequiredFields(prevState => ({
            ...prevState,
            category: e.detail.value === ''
        }))
    }

    const handleChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const val = e.currentTarget.value
        setRequiredFields(prevState => ({
            ...prevState,
            description: val === ''
        }))
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        if (validateInput(formData)) {
            // TODO: add toast message for new record 
            dispatch(addExpense(formDataToExpenseRecord(formData)))
        } else {
            // TODO: add error toast message
            window.alert('Some fields not valid')
        }
    }

    // TODO: create separate table 
    const dummyCurrencies = ["GEL", "USD", "EUR", "RUB"]
    // TODO: create separate table 
    const dummyCategories = ["groceries", "sport", "transport"];

    const expenseTypes: [string, string, boolean?][] = [["outcome", "Outcome", true], ["income", "Income"]];
    
    return (
        <aside className='card-main expenses-new-record'>
            <h4>New record</h4>
            <form className="new-record-input" onSubmit={handleSubmit}>
                <div className="date">
                    <DateInput name='date' value={new Date()} placeholder="Date"/>
                    <span className='required-field' hidden={!requiredFields.date}>*must be filled</span>
                </div>
                <div className="flex-row-break"></div>
                <div className="amount">
                    <input name='amount' type="number" placeholder="Amount" onChange={handleChangeAmount}/>
                    <span className='required-field' hidden={!requiredFields.amount}>*must be filled</span>
                </div>
                <div className="currency">
                    <SimpleSelect name='currency' placeholder="CUR" values={dummyCurrencies.map(val => {return {value: val, label: val}})} onChange={handleChangeCurrency}/>
                    <span className='required-field' hidden={!requiredFields.currency}>*must be filled</span>
                </div>
                <div className="flex-row-break"></div>
                <div className="category">
                    <TagSelect name='category' placeholder='Select category' enforceWhitelist={false} whitelist={dummyCategories} mode='select' onChange={handleChangeCategory}/>
                    <span className='required-field' hidden={!requiredFields.category}>*must be filled</span>
                </div>
                <div className="flex-row-break"></div>
                <div className="type">
                    <SimpleSelect name='expenseType' values={expenseTypes.map(([val, label, sel]) => {return {value: val, label: label, selected: sel}})}/>
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