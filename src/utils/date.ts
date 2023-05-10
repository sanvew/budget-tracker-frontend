import dayjs from "dayjs"
import { DEFAULT_DATE_FORMAT } from "constant"

export const parseDate = (date: string, dateFormat?: string): Date => {
    return dateFormat != null ? dayjs(date, dateFormat).toDate() : dayjs(date).toDate()
}

export const formatDate = (date: Date, formatTemplate: string = DEFAULT_DATE_FORMAT): string => {
    return dayjs(date).format(formatTemplate)
}