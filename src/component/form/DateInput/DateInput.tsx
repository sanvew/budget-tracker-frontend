import { useState, ChangeEvent, FocusEvent } from "react";

type Props = {
    value?: Date,
    placeholder?: string,
    min?: Date,
    max?: Date,
}

export const DateInput = ({ value, placeholder, min, max }: Props) => {

    const [date, setDate] = useState<Date | null>(() => value!);

    const handleDateFocusIn = (e: FocusEvent<HTMLInputElement>) => {
        e.target.type = 'date';
        e.target.showPicker();
    }

    const handleDateFocusOut = (e: FocusEvent<HTMLInputElement>) => {
        e.target.type = 'text';
    }

    const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        setDate(() => e.target.valueAsDate!);
        e.target.blur();
    }

    return (
        <input type="text" value={date?.toString()} placeholder={placeholder}
            min={min?.toDateString()} max={max?.toDateString()}
            onChange={handleDateChange}
            onFocus={handleDateFocusIn}
            onBlur={handleDateFocusOut}
        />
    )
}