import React, { createContext, useState } from "react"
import { FormFieldType, FormProps, FormValueType } from "./utils/form.interface"
import FormHeader from "./components/FormHeader"
import FormDefaultView from "./view/FormDefaultView"
import FormCustomizeView from "./view/FormCustomizeView"

export type FormContextType = {
  internalFieldList: FormFieldType[]
  internalValue: FormValueType
  formLabel: string
  isFormExpand: boolean
  isFormBulkEdit: boolean
  currentFormView: "DEFAULT" | "SETTINGS"
  handleExpandCollapse: () => void
  handleBulkEditState: (value: boolean) => void
  updateFormValue: (value: FormValueType) => void
  updateFormFieldList: (value: FormFieldType[]) => void
  changeFormView: (value: "DEFAULT" | "SETTINGS") => void
}

export const FormContext = createContext<FormContextType | null>(null)

const Form: React.FC<FormProps> = (props) => {
  const [internalFieldList, setInternalFieldList] = useState(props.fieldList)
  const [internalValue, setInternalValue] = useState<FormValueType>(
    props.defaultValue || props.defaultValue || { customField: {} }
  )

  const [isFormExpand, setIsFormExpand] = useState(true)
  const [isFormBulkEdit, setIsFormBulkEdit] = useState(false)
  const [currentFormView, setCurrentFormView] = useState<"DEFAULT" | "SETTINGS">("DEFAULT")

  // const memoizedFormValue = useMemo(() => {
  //   const value: FormValueType = props.value || internalValue
  //   return value
  // }, [props.value, internalValue])

  const updateFormValue = (value: FormValueType) => {
    setInternalValue(value)
  }

  const updateFormFieldList = (value: FormFieldType[]) => {
    setInternalFieldList(value)
  }

  const handleExpandCollapse = () => {
    setIsFormExpand((prev) => !!!prev)
  }

  const handleBulkEditState = (value: boolean) => {
    setIsFormBulkEdit(value)
  }

  const changeFormView = (value: "DEFAULT" | "SETTINGS") => {
    setCurrentFormView(value)
  }

  return (
    <FormContext.Provider
      value={{
        internalFieldList,
        internalValue,
        formLabel: props.formLabel || 'Form',
        isFormExpand,
        isFormBulkEdit,
        updateFormFieldList,
        updateFormValue,
        handleExpandCollapse,
        handleBulkEditState,
        currentFormView,
        changeFormView,
      }}>
      <FormHeader />
      {isFormExpand && (
        <div style={{ paddingInline: 12, paddingBlock: 12}}>
          {currentFormView === "DEFAULT" && <FormDefaultView />}
          {currentFormView === "SETTINGS" && <FormCustomizeView />}
        </div>
      )}
    </FormContext.Provider>
  )
}

export default Form
