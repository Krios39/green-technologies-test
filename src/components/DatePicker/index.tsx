import ReactDatePicker, {ReactDatePickerProps} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const DatePicker =
    <
        CustomModifierNames extends string = never,
        WithRange extends boolean | undefined = undefined
    >
    (props: ReactDatePickerProps<CustomModifierNames, WithRange>) => {
        return <ReactDatePicker {...props}/>
    }