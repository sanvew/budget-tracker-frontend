type Entry = {
    value: string,
    label: string,
    selected?: boolean, 
}

type Props = {
    values: Entry[],
    placeholder?: string, 
}

export const SimpleSelect = ({ values, placeholder }: Props) => {
    return (
        <select>
            { placeholder ? <option value="" disabled selected>{placeholder}</option> : '' }
            { values.map(({value, label, selected}) => { return <option value={value} selected={selected}>{label}</option> }) }
        </select>
    )
}