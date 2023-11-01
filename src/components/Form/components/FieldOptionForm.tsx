import { Button, Input, Label, makeStyles, shorthands } from "@fluentui/react-components"
import { Add16Filled, Delete24Regular } from "@fluentui/react-icons"
import React, { useState } from "react"
import {
  DropdownOption,
  PersonaOption,
  TagOption,
} from "../../Field/DropdownField/utils/dropDownField.interface"
import { generateRandomId } from "../utils/form.helper"

export interface FieldOptionFormProps {
  listOptions: DropdownOption[] | PersonaOption[] | TagOption[]
  onSave: (value: DropdownOption[] | PersonaOption[] | TagOption[]) => void
}

const createFieldOptionFormStyles = makeStyles({
  container: {
    // ...shorthands.border("1px", "solid"),
    ...shorthands.borderRadius("4px"),
    ...shorthands.padding("8px"),
  },
  labelContainer: {
    ...shorthands.marginBlock("0px", "8px"),
  },
  optionsContainer: {
    ...shorthands.borderTop("1px"),
    ...shorthands.borderBottom("1px"),
    // ...shorthands.padding("8px"),
  },
  optionListWrapper: {
    display: "flex",
    flexDirection: "column",
    rowGap: "4px",
  },
  optionList: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    columnGap: "4px",
  },
  footerContainer: {
    ...shorthands.paddingBlock("12px", "0px"),
    // paddingRight: "8px",
    display: "flex",
    justifyContent: "space-between",
  },
  alignCenter: {
    textAlign: "center",
  },
  inputFlexGrow: {
    flexGrow: 1,
  },
})

const FieldOptionForm: React.FC<FieldOptionFormProps> = (props) => {
  const c = createFieldOptionFormStyles()
  const [options, setOptions] = useState<DropdownOption[] | PersonaOption[] | TagOption[]>(
    props.listOptions || []
  )

  const addOption = () => {
    const updatedOptions = [...options, { id: generateRandomId("option_"), label: "" }]
    setOptions(updatedOptions)
  }

  const onChangeOption = (optionId: string, optionLabel: string) => {
    const updatedOptions = options.map((option) => {
      if (option.id === optionId) {
        option.label = optionLabel
      }
      return option
    })

    setOptions(updatedOptions)
  }

  const deleteOption = (optionId: string) => {
    const updatedOptions = options.filter((option) => option.id !== optionId)
    setOptions(updatedOptions)
  }

  const onSaveDropdownOptions = () => {
    props.onSave && props.onSave(options)
  }

  return (
    <div className={c.container}>
      <div className={c.labelContainer}>
        <Label weight="semibold" size="large">
          Dropdown Option
        </Label>
      </div>
      <div className={c.optionsContainer}>
        <div className={c.optionListWrapper}>
          {options.length < 1 && <div className={c.alignCenter}>Empty Options</div>}

          {options.map((option) => (
            <div key={option.id} className={c.optionList}>
              <Input
                className={c.inputFlexGrow}
                defaultValue={option.label}
                onChange={(_ev, data) => option.id && onChangeOption(option.id, data.value)}
              />
              <div>
                <Button
                  appearance="subtle"
                  onClick={() => option.id && deleteOption(option.id)}
                  icon={<Delete24Regular />}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={c.footerContainer}>
        <Button onClick={addOption} appearance="transparent" icon={<Add16Filled />}>
          Add Option
        </Button>

        <Button onClick={onSaveDropdownOptions} appearance="primary">
          Save
        </Button>
      </div>
    </div>
  )
}

export default FieldOptionForm
