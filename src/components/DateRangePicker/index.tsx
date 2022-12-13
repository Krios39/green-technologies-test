import {DatePicker} from "../DatePicker";
import {DateRange} from "../../models/date-range";
import {SupportedDate} from "../../types/supproted-dates";

interface DateRangePickerProps{
    dateRange: DateRange,
    onRangeChange: (range: DateRange) => void
}
export const DateRangePicker = (props: DateRangePickerProps)=>{
    const onChange = (date: [SupportedDate, SupportedDate]) => {
        props.onRangeChange({start: date[0], end: date[1]})
    }

    return(
        <>
            <DatePicker
                minDate={new Date()}
                selected={props.dateRange.start}
                onChange={onChange}
                startDate={props.dateRange.start}
                endDate={props.dateRange.end}
                selectsRange={true}
            />
        </>
    )
}