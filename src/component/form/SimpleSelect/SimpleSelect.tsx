import { ChangeEvent } from "react"
import { BaseInputProps } from "types"

type Entry = {
    value: string,
    label: string,
}

type Props = BaseInputProps<string> & {
    options: Entry[],
    placeholder?: string,
}

export const SimpleSelect = ({ value, onChange, options, placeholder }: Props) => {
    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange(e.currentTarget.value)
    }

    return (
        <select value={value ?? ''} onChange={handleChange}>
            { placeholder ? <option value="" disabled>{placeholder}</option> : '' }
            { options.map(({value, label}) => <option value={value} key={value}>{label}</option>) }
        </select>
    )
} 