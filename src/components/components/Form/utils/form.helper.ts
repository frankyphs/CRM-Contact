import { FormEditStateType, FormFieldListType, FormValueType } from "../Form"

export const generateRandomId = () => {
  return (Date.now() * Math.floor(Math.random() * (99 - 1) + 1)).toString(36)
}

export const generateEditState = (fieldList: FormFieldListType[]): FormEditStateType => {
  if (!!!fieldList) return {}
  const result: FormEditStateType = {}
  fieldList.forEach((field) => (result[field.id] = false))

  return result
}

export const generateFormValue = (fieldList: FormFieldListType[]): FormValueType => {
  if (!!!fieldList) return { customField: {} }

  const result: FormValueType = { customField: {} }
  fieldList.forEach((field) => {
    if (field.category === "custom") {
      if (!result.customField) {
        result.customField = {}
      }
      result.customField[field.id] = ""
    } else if (field.fieldType === "monetary") {
      result[field.id] = { code: "", amount: 0 }
    } else {
      result[field.id] = ""
    }
  })

  return result
}
