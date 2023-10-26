import { BaseFieldProps, FieldEventProps } from "../../utils/field.interface"

export type MonetaryValueType = {
  code?: string | undefined
  amount: number
}

export type CurrencyObjectType = {
  name: string
  symbol: string
  symbolNative: string
  decimalDigits: number
  rounding: number
  code: string
  namePlural: string
}

export interface MonetaryFieldProps extends BaseFieldProps, FieldEventProps<MonetaryValueType> {
  placeholder?: string
  value?: MonetaryValueType
  defaultValue?: MonetaryValueType
  defaultCurrencyCode?: string
  appearance?: "outline" | "underline" | "filled-darker" | "filled-lighter"
}
