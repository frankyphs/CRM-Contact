import {
  DropdownOption,
  PersonaOption,
  TagOption,
} from "../../Field/DropdownField/utils/dropDownField.interface"
import { FormFieldEditState, FormFieldType, FormFieldValidationState, FormValueType } from "./form.interface"

export const generateRandomId = (prefix?: string, suffix?: string) => {
  const randomId = (Date.now() * Math.floor(Math.random() * (99 - 1) + 1)).toString(36) 
  return `${prefix || ''}${randomId}${suffix || ''}`;
}

export const generateFieldState = (fieldList: FormFieldType[], value: boolean) => {
  if (!!!fieldList) return {}
  const result: FormFieldEditState | FormFieldValidationState = {}
  fieldList.forEach((field) => (result[field.id] = value))

  return result
}

export const generateFormValue = (fieldList: FormFieldType[]): FormValueType => {
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

export const reorderList = (arr: any[], sourceIndex: number, destIndex: number): any[] => {
  const result = [...arr]
  const [removedData] = result.splice(sourceIndex, 1)
  result.splice(destIndex, 0, removedData)

  return result
}

export const getFieldOptionsId = (options: DropdownOption[] | PersonaOption[] | TagOption[] | undefined) => {
  if (!!!options) return []
  return options?.map((options) => options.id)
}

const dropdownOptions: DropdownOption[] = [
  {
    id: "option_org",
    label: "Organization",
  },
  {
    id: "option_person",
    label: "Person",
  },
  {
    id: "option_hot-lead",
    label: "Hot Lead",
  },
  {
    id: "option_cold-lead",
    label: "Cold Lead",
  },
]
// const roleOptions: DropdownOption[] = [
//   {
//     id: "role_knight",
//     label: "Knight",
//   },
//   {
//     id: "role_assasins",
//     label: "Assasins",
//   },
//   {
//     id: "role_paladin",
//     label: "Paladin",
//   },
//   {
//     id: "role_wizard",
//     label: "Wizard",
//   },
//   {
//     id: "role_priest",
//     label: "Priest",
//   },
// ]

// const raceOptions: TagOption[] = [
//   {
//     id: "tag_demon",
//     label: "Demon",
//   },
//   {
//     id: "tag_fish",
//     label: "Fish",
//   },
//   {
//     id: "tag_human",
//     label: "Human",
//   },
//   {
//     id: "tag_dragon",
//     label: "Dragon",
//   },
// ]

export const DUMMY_FORM_LIST: FormFieldType[] = [
  { id: "full_name", label: "Full Name", type: "text", category: "default" },
  {
    id: "category_label",
    label: "Dropdown",
    type: "dropdown",
    category: "custom",
    options: dropdownOptions,
  },
  // {
  //   id: "race_label",
  //   label: "Race",
  //   type: "tags",
  //   category: "default",
  //   options: raceOptions,
  //   multiSelect: true
  // },
  // {
  //   id: "role_label",
  //   label: "Role",
  //   type: "dropdown",
  //   category: "custom",
  //   options: roleOptions,
  //   multiSelect: true
  // },
  { id: "email", label: "Email", type: "email", category: "default" },
  { id: "phone_number", label: "Phone Number", type: "tel", category: "default" },
  { id: "cash_value", label: "Cash Value", type: "monetary", category: "default" },
  { id: "dob", label: "Date of Birth", type: "date", category: "custom" },
  {
    id: "working_hours",
    label: "Working Hours",
    type: "time-range",
    category: "custom",
  },
]

export const DUMMY_FORM_VALUE: FormValueType = {
  full_name: "Brian J. Payne",
  email: "brian.payne@outlook.com",
  category_label: ["option_person"],
  // race_label: ["tag_dragon", 'tag_demon'],
  // role_label: ["role_paladin"],
  phone_number: "520-544-0863",
  cash_value: { code: "USD", amount: 5000 },
  customField: {
    dob: "1993-01-01",
    working_hours: { start: "09:00", end: "09:10" },
  },
}
