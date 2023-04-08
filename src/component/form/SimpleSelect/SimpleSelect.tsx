import { ChangeEvent } from "react"

type Entry = {
    value: string,
    label: string,
    selected?: boolean, 
}

type Props = {
    values: Entry[],
    name?: string,
    placeholder?: string,
    onChange?: (e: ChangeEvent<HTMLSelectElement>) => void
}

export const SimpleSelect = ({ values, name, placeholder, onChange }: Props) => {
    return (
        <select name={name} onChange={onChange}>
            { placeholder ? <option value="" disabled selected>{placeholder}</option> : '' }
            { values.map(({value, label, selected}) => { return <option value={value} selected={selected}>{label}</option> }) }
        </select>
    )
} 