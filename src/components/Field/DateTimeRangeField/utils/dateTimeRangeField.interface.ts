import { BaseFieldProps, FieldEventProps } from "../../utils/field.interface";

export interface DateTimeRangeFieldProps
  extends BaseFieldProps,
    FieldEventProps<DateTimeRangeFieldValueType> {
  type?: "date-range" | "time-range" | "datetime-range";
  value?: DateTimeRangeFieldValueType;
  defaultValue?: DateTimeRangeFieldValueType;
  minRange?: string;
  maxRange?: string;
  step?: number;
  formatString?: string;
  appearance?:
    | "outline"
    | "underline"
    | "filled-darker"
    | "filled-lighter"
    | "filled-darker-shadow"
    | "filled-lighter-shadow";
}

export type DateTimeRangeFieldValueType = {
  start: string;
  end: string;
};
