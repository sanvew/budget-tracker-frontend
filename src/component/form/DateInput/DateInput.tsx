import { DEFAULT_DATE_FORMAT } from "constant";
import dayjs from "dayjs";
import { ChangeEvent, FocusEvent } from "react";

type Props = {
    value?: Date,
    name?: string,
    placeholder?: string,
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
}

export const DateInput = ({ name, value, placeholder, onChange}: Props) => {

    const formatDate = (value: string) => dayjs(value).format(DEFAULT_DATE_FORMAT).toString()

    const handleDateFocusIn = (e: FocusEvent<HTMLInputElement>) => {
        e.target.type = 'date';
        e.target.showPicker();
    }

    const handleDateFocusOut = (e: FocusEvent<HTMLInputElement>) => {
        e.target.type = 'text';
    }

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.target.blur();
        e.target.value = formatDate(e.currentTarget.value)
        if (onChange != null) {
            onChange(e)
        }
    }

    return (
        <input name={name} type="text" defaultValue={value != null ? formatDate(value.toString()) : undefined} placeholder={placeholder}
            onChange={handleOnChange}
            onFocus={handleDateFocusIn}
            onBlur={handleDateFocusOut}
        />
    )
}