import { ChangeEvent, FormEvent, useRef } from 'react';
import dayjs, { Dayjs } from 'dayjs';

import { DateInput, TagSelect, SimpleSelect } from 'component/form';
import { useAppDispatch } from 'hook';
import { fetchExpenses, fetchExpensesCount } from 'store/reducer/expenses';
import { DEFAULT_DATE_FORMAT } from 'constant';
import { ExpenseFilter, ExpenseType } from 'types';

import './_expenses-filter.scss';

export const ExpensesFilter = () => {
    const dispatch = useAppDispatch()

    const formRef = useRef<HTMLFormElement>(null)

    const validateInput = (formData: FormData): boolean => {
        let isValid = true
        let dateFrom: Dayjs | undefined, dateTo: Dayjs | undefined

        if (formData.has('dateFrom') && formData.get('dateFrom') !== '' && !dayjs(formData.get('dateFrom')?.toString(), DEFAULT_DATE_FORMAT).isValid()) {
            dateFrom = dayjs(formData.get('dateFrom')?.toString(), DEFAULT_DATE_FORMAT)
            // TODO: add modal window or toast
            window.alert('From date is not valid!')
            isValid = false
        }

        if (formData.has('dateTo') && formData.get('dateTo') !== '' && !dayjs(formData.get('dateTo')?.toString(), DEFAULT_DATE_FORMAT).isValid()) {
            dateTo = dayjs(formData.get('dateTo')?.toString(), DEFAULT_DATE_FORMAT)
            // TODO: add modal window or toast
            window.alert('To date is not valid!')
            isValid = false
        }

        if (dateFrom != null && dateTo != null && dateFrom.isAfter(dateTo)) {
            // TODO: add modal window or toast
            window.alert('Invalid to and from dates provided!')
            isValid = false
        }

        return isValid
    }

    const formDataToExpenseFilter = (formData: FormData): ExpenseFilter => {
        return {
            fromDate: (formData.has('dateFrom') && formData.get('dateFrom') !== '') ? dayjs(formData.get('dateFrom')?.toString(), DEFAULT_DATE_FORMAT).toDate() : undefined,
            toDate: (formData.has('dateTo') && formData.get('dateTo') !== '') ? dayjs(formData.get('dateTo')?.toString(), DEFAULT_DATE_FORMAT).toDate() : undefined,
            categories: (formData.has('category') && formData.get('category') !== '') ?  (JSON.parse(formData.get('category')!.toString()) as {value: string}[]).reduce((acc, val) => {acc.push(val.value); return acc}, new Array<string>()) : undefined,
            expenseType: formData.has('expenseType') ? formData.get('expenseType')!.toString() as 'all' & ExpenseType : undefined
        }
    }

    // Form input handlers
    const handleClearClick = () => {
        formRef.current?.reset()
        formRef.current?.requestSubmit()
    }

    const handleChangeDateFrom = (e: ChangeEvent<HTMLInputElement>) => {
        const formData = new FormData(formRef.current!)

        if (formData.has('dateTo')) {
            const dateTo = dayjs(formData.get('dateTo')!.toString(), DEFAULT_DATE_FORMAT)
            if (dateTo.isBefore(dayjs(e.currentTarget.value, DEFAULT_DATE_FORMAT))) {
                const datToInput = formRef.current?.querySelector('.date-to')?.firstChild as HTMLInputElement
                datToInput.value = ''
                // TODO: add error toast message
            }   
        }
    }

    const handleChangeDateTo = (e: ChangeEvent<HTMLInputElement>) => {
        const formData = new FormData(formRef.current!)

        if (formData.has('dateFrom')) {
            const dateFrom = dayjs(formData.get('dateFrom')!.toString(), DEFAULT_DATE_FORMAT)
            if (dateFrom.isAfter(dayjs(e.currentTarget.value, DEFAULT_DATE_FORMAT))) {
                const dateFromInput = formRef.current?.querySelector('.date-from')?.firstChild as HTMLInputElement
                dateFromInput.value = ''
                // TODO: add error toast message
            }   
        }
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)

        if (validateInput(formData)) {
            // TODO: update page searchParams based on filters
            const expensesFilter = formDataToExpenseFilter(formData)
            dispatch(fetchExpenses({filter: expensesFilter}))
            dispatch(fetchExpensesCount({filter: expensesFilter}))
        } else {
            // TODO: add error toast message
            window.alert('Some fields are not valid')
        }
    }

    // TODO: create separate table 
    const dummyCategories = ["groceries", "sport", "transport"];
    // TODO: create separate table 
    const dummyTypes = [["all", "All"], ["outcome", "Outcome"], ["income", "Income"]]

    return (
        <aside className="card-main expenses-filter">
            <div className="filter-heading">
                <h4>Filter</h4>
                <button className="clear-main-acc-button" onClick={handleClearClick}><h4>clear</h4></button>
            </div>
            <form className="filter-input" onSubmit={handleSubmit} ref={formRef}>
                <div className="date-from">
                    <DateInput name="dateFrom" placeholder="From" onChange={handleChangeDateFrom}/>
                </div>
                <div className="date-to">
                    <DateInput name="dateTo" placeholder="To" onChange={handleChangeDateTo}/>
                </div>
                <div className="flex-row-break"></div>
                <div className="category">
                    <TagSelect name="category" placeholder='Select category(s)' whitelist={dummyCategories}/>
                </div>
                <div className="flex-row-break"></div>
                <div className="type">
                    <SimpleSelect name="expenseType" placeholder="Select type" values={dummyTypes.map(([val, label]) => {return {value: val, label: label}})}/>
                </div>
                <div className="flex-row-break"></div>
                <div className="submit">
                    <button className="acc-acc-main-button">Select</button>
                </div>
            </form>
        </aside>
    )
}