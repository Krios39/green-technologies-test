import { format } from "date-fns";
import {SupportedDate} from "../types/supproted-dates";
export const formatDateToString = (date: SupportedDate): string => {
    if (!date) return ''

    return format(date, 'dd-MM-yyyy')
}