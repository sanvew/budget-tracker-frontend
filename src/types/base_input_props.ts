export type BaseInputProps<T> = {
    value: T | undefined,
    onChange: (value: T) => void 
    disabled?: boolean
}