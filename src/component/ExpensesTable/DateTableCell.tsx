import dayjs from "dayjs";

type Props = {
    date: Date,
}

const DateTableCell = ({ date }: Props) => {
    return (
        <tr className="date-row">
            <td colSpan={3}>{dayjs(date).format('DD MMMM YYYY')}</td>
        </tr>
    )
}

export default DateTableCell;