import { ChangeEvent, useEffect, useState } from "react"
import DatePicker from 'react-datepicker'
import { Expense, ExpenseType, getExpenseValidFields, isExpenseValid, ExpenseUpdates, ExpenseValidFields } from "types"
import { DATEPICKER_INPUT_DATE_FORMAT } from "constant"
import { useAppDispatch } from "hook/redux"
import { removeExpense, updateExpense } from "store/reducer/expenses"
import { SimpleSelect, TagSelect } from "component/form"
import { ModalWindow } from "component/modal/ModalWindow"
import { ModalHeader } from "component/modal/ModalHeader"
import { ModalBody } from "component/modal/ModalBody"

import './_expense-details.scss'

type Props = {
    expense?: Expense
    show: boolean
    isShown: (shown: boolean) => void 
}

export const ExpenseDetails = ({ expense, show, isShown }: Props) => {
    const dispatch = useAppDispatch()

    const [notEditable, setNotEditable] = useState<boolean>(true)
    const [validFields, setValidFields] = useState<ExpenseValidFields>()

    const [date, setDate] = useState<Date | undefined>(expense?.date)
    const [amount, setAmount] = useState<number | undefined>(expense?.amount)
    const [currency, setCurrency] = useState<string | undefined>(expense?.currency)
    const [category, setCategory] = useState<string[] | undefined>(expense != null ? [expense.category] : undefined)
    const [expenseType, setExpenseType] = useState<string | undefined>(expense?.expenseType)
    const [description, setDescription] = useState<string | undefined>(expense?.description)

    useEffect(() => {
        setFieldFromExpense(expense)
    }, [expense])

    const setFieldFromExpense = (expense?: Expense) => {
        setDate(expense?.date)
        setAmount(expense?.amount)
        setCurrency(expense?.currency)
        setCategory(expense != null ? [expense.category] : undefined)
        setExpenseType(expense?.expenseType)
        setDescription(expense?.description)
    }

    const handleCloseClick = () => {
        if (notEditable) {
            isShown(false)
            setNotEditable(true)
            return
        }
        // TODO: add toast message
        window.alert('Save expense or cancel before closing')
    }

    const handleChangeAmount = (e: ChangeEvent<HTMLInputElement>) => {
        setAmount(parseFloat(e.currentTarget.value))
    }

    const handleChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.currentTarget.value)
    }

    const handleSaveClick = () => {
        const expenseUpdates: ExpenseUpdates = {
            date: date,
            category: category?.[0],
            description: description,
            amount: amount,
            expenseType: expenseType as ExpenseType,
            currency: currency
        }

        const validFields = getExpenseValidFields(expenseUpdates)
        if (isExpenseValid(validFields) && expense != null) {
            dispatch(updateExpense({expense, expenseUpdates}))
            setNotEditable(true)
            setFieldFromExpense({...expense, ...expenseUpdates})
            setValidFields(undefined)
        } else {
            setValidFields(validFields)
        }
    }

    const handleEditClick = () => {
        setNotEditable(false)
    }

    const handleCancelClick = () => {
        setNotEditable(true)
        setFieldFromExpense(expense)
        setValidFields(undefined)
    }

    const handleRemoveClick = () => {
        dispatch(removeExpense(expense!.id))
        isShown(false)
        setNotEditable(true)
        setValidFields(undefined)
    }

    // TODO: create separate table 
    const dummyCurrencies = ["GEL", "RSD", "USD", "EUR", "RUB"]
    // TODO: create separate table 
    const dummyCategories = ["groceries", "sport", "transport"];

    const expenseTypes: [ExpenseType, string][] = [["outcome", "Outcome"], ["income", "Income"]];

    return (
        <ModalWindow show={show}>
            <ModalHeader>
                <h4>Expense details</h4>
                <button className="red-red-red-button close-btn" onClick={handleCloseClick}>X</button>
            </ModalHeader>
            <ModalBody>
                <article className="expense-details">
                    <div className="expense-details-content">
                        <div className="date">
                            <DatePicker selected={date}
                                onChange={date => setDate(date ?? new Date())} placeholderText='Date'
                                dateFormat={DATEPICKER_INPUT_DATE_FORMAT} disabled={notEditable}
                            />
                            <span className='required-field' hidden={validFields?.date ?? true}>*must be filled</span>
                        </div>
                        <div className="flex-row-break"></div>
                        <div className="amount">
                            <input 
                                type="number" step="0.01" placeholder="Amount" value={amount}
                                onChange={handleChangeAmount} disabled={notEditable}
                            />
                            <span className='required-field' hidden={validFields?.amount ?? true}>*must be filled</span>
                        </div>
                        <div className="currency">
                            <SimpleSelect 
                                placeholder="CUR" value={currency} onChange={setCurrency} 
                                options={dummyCurrencies.map(val => {return {value: val, label: val}})} 
                                disabled={notEditable}
                            />
                            <span className='required-field' hidden={validFields?.currency ?? true}>
                                *must be filled
                            </span>
                        </div>
                        <div className="flex-row-break"></div>
                        <div className="type">
                            <SimpleSelect 
                                value={expenseType} onChange={setExpenseType} 
                                options={expenseTypes.map(([value, label]) => {return {value, label}})}
                                disabled={notEditable}
                            />
                            <span className='required-field' hidden={validFields?.expenseType ?? true}>
                                *must be filled
                            </span>
                        </div>
                        <div className="category">
                            <TagSelect 
                                placeholder='Select category' value={category} onChange={setCategory}
                                enforceWhitelist={false} whitelist={dummyCategories} mode='select'
                                disabled={notEditable}
                            />
                            <span className='required-field' hidden={validFields?.category ?? true}>
                                *must be filled
                            </span>
                        </div>
                        <div className="flex-row-break"></div>
                        <div className="comment">
                            <textarea
                                placeholder="Comment..." onChange={handleChangeDescription} value={description}
                                disabled={notEditable}
                            />
                            <span className='required-field' hidden={validFields?.description ?? true}>
                                *must be filled
                            </span>
                        </div>
                        <div className="flex-row-break"></div>
                        <button className="acc-acc-main-button" hidden={notEditable} onClick={handleSaveClick}>
                            Save
                        </button>
                        <button className="main-main-acc-button" hidden={notEditable} onClick={handleCancelClick}>
                            Cancel
                        </button>
                        <button className="clear-main-button ok-btn" hidden={!notEditable} onClick={handleCloseClick}>
                            OK
                        </button>
                        <button 
                            className="acc-acc-main-button edit-btn" hidden={!notEditable} onClick={handleEditClick}
                        >
                            Edit
                        </button>
                        <button className="delete-button remove-btn" hidden={!notEditable} onClick={handleRemoveClick}
                        >
                            Remove
                        </button>
                    </div>
                </article>
            </ModalBody>
        </ModalWindow>
    )
}