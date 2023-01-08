import { dateByParts } from "utils/date";

type Props = {
    date: Date,
}

export const ExpensesDateTableCell = ({ date }: Props) => {
    const mapppedDate = dateByParts({ day: '2-digit', month: 'long',  year: 'numeric'}, date); 
    return (
        <tr className="date-row">
            <td colSpan={3}>{mapppedDate.day} {mapppedDate.month} {mapppedDate.year}</td>
        </tr>
    )
}