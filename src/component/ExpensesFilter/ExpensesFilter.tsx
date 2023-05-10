import { FormEvent, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import DatePicker from 'react-datepicker'
import dayjs from 'dayjs';

import { TagSelect, SimpleSelect } from 'component/form';
import { useAppDispatch } from 'hook';
import { fetchExpenses, fetchExpensesCount } from 'store/reducer/expenses';
import { DATEPICKER_INPUT_DATE_FORMAT, QUERY_PARAM_DATE_FORMAT } from 'constant';
import { ExpenseFilter, FilterExpenseType } from 'types';

import './_expenses-filter.scss';
import { formatDate, parseDate } from 'utils/date';

export const ExpensesFilter = () => {
    const dispatch = useAppDispatch()

    const [searchParams, setSearchParams] = useSearchParams();
    const [fromDate, setFromDate] = useState<Date>()
    const [toDate, setToDate] = useState<Date>()
    const [categories, setCategories] = useState<string[]>()
    const [expenseType, setExpenseType] = useState<string>()

    useEffect(() => {
        const expensesFilter = searchParamsToExpenseFilter(searchParams)

        setFromDate(expensesFilter.fromDate)
        setToDate(expensesFilter.toDate)
        setCategories(expensesFilter.categories)
        setExpenseType(expensesFilter.expenseType)
        
        applyFilter(expensesFilter)
    }, [])

    const validateInput = (): boolean => {
        let isValid = true

        if (!dayjs(fromDate).isValid()) {
            // TODO: add modal window or toast
            window.alert('From date is not valid!')
            isValid = false
        }

        if (!dayjs(toDate).isValid()) {
            // TODO: add modal window or toast
            window.alert('To date is not valid!')
            isValid = false
        }

        if (fromDate != null && toDate != null && dayjs(fromDate).isAfter(toDate)) {
            // TODO: add modal window or toast
            window.alert('Invalid to and from dates provided!')
            isValid = false
        }

        return isValid
    }

    const createExpenseFilterFromInput = (): ExpenseFilter => {
        return {categories, fromDate, toDate, expenseType: expenseType as FilterExpenseType}
    }

    const applyFilter = (expenseFilter?: ExpenseFilter) => {
        dispatch(fetchExpenses({filter: expenseFilter}))
        dispatch(fetchExpensesCount({filter: expenseFilter}));
    }

    const searchParamsToExpenseFilter = (searchParams: URLSearchParams): ExpenseFilter => {
        return {
            fromDate: (searchParams.has('from') && searchParams.get('from') !== '') ? parseDate(searchParams.get('from')?.toString()!, QUERY_PARAM_DATE_FORMAT) : undefined,
            toDate: (searchParams.has('to') && searchParams.get('to') !== '') ? parseDate(searchParams.get('to')?.toString()!, QUERY_PARAM_DATE_FORMAT) : undefined,
            categories: (searchParams.has('category') && searchParams.get('category') !== '')
                ? (searchParams.get('category')!.toString().split(','))
                : undefined,
            expenseType: searchParams.has('type') ? searchParams.get('type')!.toString() as FilterExpenseType : undefined
        }
    }

    const updateSearchParamsWithExpenseFilter = (expenseFilter?: ExpenseFilter): void => {
        setSearchParams(prev => {
            if (expenseFilter) {
                if (expenseFilter.fromDate != null) {
                    prev.set('from', formatDate(expenseFilter.fromDate, QUERY_PARAM_DATE_FORMAT))
                } else {
                    prev.delete('from')
                }
                if (expenseFilter.toDate != null) {
                    prev.set('to', formatDate(expenseFilter.toDate, QUERY_PARAM_DATE_FORMAT))
                } else {
                    prev.delete('to')
                }
                if (expenseFilter.categories != null && expenseFilter.categories.length !== 0) {
                    prev.set('category', expenseFilter.categories.join(','))
                } else {
                    prev.delete('category')
                }
                if (expenseFilter.expenseType != null) {
                    prev.set('type', expenseFilter.expenseType)
                } else {
                    prev.delete('type')
                }
            } else {
                prev.delete('from')
                prev.delete('to')
                prev.delete('category')
                prev.delete('type')
            }
            return prev
        })
    }

    // Form input handlers
    const handleClear = () => {
        if (fromDate == null && toDate == null && categories == null && (expenseType == null || expenseType === 'all')) {
            return
        }
        setFromDate(undefined)
        setToDate(undefined)
        setCategories(undefined)
        setExpenseType(undefined)

        applyFilter(undefined)
        updateSearchParamsWithExpenseFilter(undefined)
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (validateInput()) {
            const expenseFilter = createExpenseFilterFromInput()
            applyFilter(expenseFilter)
            updateSearchParamsWithExpenseFilter(expenseFilter)
        } else {
            // TODO: add error toast message
            window.alert('Some fields are not valid')
        }
    }

    // TODO: create separate table 
    const dummyCategories = ["groceries", "sport", "transport"];
    const expensesTypes = [["all", "All"], ["outcome", "Outcome"], ["income", "Income"]]

    return (
        <aside className="card-main expenses-filter">
            <div className="filter-heading">
                <h4>Filter</h4>
                <button className="clear-main-acc-button" onClick={handleClear}><h4>clear</h4></button>
            </div>
            <form className="filter-input" onSubmit={handleSubmit}>
                <div className="date-from">
                    <DatePicker selected={fromDate}
                        onChange={date => setFromDate(date ?? undefined)}
                        selectsStart
                        startDate={fromDate}
                        endDate={toDate}                        
                        isClearable={true}
                        placeholderText='From' 
                        dateFormat={DATEPICKER_INPUT_DATE_FORMAT}
                    />
                </div>
                <div className="date-to">
                    <DatePicker selected={toDate}
                        onChange={date => setToDate(date ?? undefined)}
                        selectsEnd
                        startDate={fromDate}
                        endDate={toDate}                        
                        isClearable={true}
                        placeholderText='To'
                        dateFormat={DATEPICKER_INPUT_DATE_FORMAT}
                    />
                </div>
                <div className="flex-row-break"></div>
                <div className="category">
                    <TagSelect placeholder='Select category(s)' value={categories} onChange={setCategories} whitelist={dummyCategories}/>
                </div>
                <div className="flex-row-break"></div>
                <div className="type">
                    <SimpleSelect placeholder="Select type" value={expenseType} onChange={setExpenseType} options={expensesTypes.map(([value, label]) => {return {value, label}})}/>
                </div>
                {/* TODO: add full text search */}
                <div className="flex-row-break"></div>
                <div className="submit">
                    <button type='submit' className="acc-acc-main-button">Select</button>
                </div>
            </form>
        </aside>
    )
}