import { dateByParts } from "utils/date";

type Props = {
    date: Date,
}

const DateTableCell = ({ date }: Props) => {
    const mappedDate = dateByParts({ day: '2-digit', month: 'long',  year: 'numeric'}, date); 
    return (
        <tr className="date-row">
            <td colSpan={3}>{mappedDate.day} {mappedDate.month} {mappedDate.year}</td>
        </tr>
    )
}

export default DateTableCell;