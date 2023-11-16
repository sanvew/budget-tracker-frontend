import { CELL_DATE_FORMAT } from "constant";
import { formatDate } from "utils/date";

type Props = {
    date: Date,
}

const DateTableCell = ({ date }: Props) => {
    return (
        <tr className="date-row">
            <td colSpan={3}>{formatDate(date, CELL_DATE_FORMAT)}</td>
        </tr>
    )
}

export default DateTableCell;