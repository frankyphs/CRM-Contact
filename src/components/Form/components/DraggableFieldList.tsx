import {
  Body1Strong,
  Button,
  Menu,
  MenuButton,
  MenuPopover,
  MenuTrigger,
  makeStyles,
  shorthands,
  tokens,
} from "@fluentui/react-components"
import { Draggable } from "@hello-pangea/dnd"
import { Delete24Regular, ReOrderDotsVertical24Regular, List24Filled } from "@fluentui/react-icons"
import { FormFieldType } from "../utils/form.interface"
import React, { useState } from "react"
import {
  DropdownOption,
  PersonaOption,
  TagOption,
} from "../../Field/DropdownField/utils/dropDownField.interface"
import InputField from "../../Field/InputField/InputField"
import FieldOptionForm from "./FieldOptionForm"

interface DraggableFieldListProps {
  field: FormFieldType
  index: number
  onChangeLabel?: (fieldId: string, value: string) => void
  onChangeOptions?: (fieldId: string, value: DropdownOption[] | PersonaOption[] | TagOption[]) => void
  handleDeleteField?: (fieldId: string) => void
}

const createDraggableFieldListStyles = makeStyles({
  dragItem: {
    ...shorthands.border("1px", "solid ", tokens.colorNeutralStroke1),
    ...shorthands.paddingInline("8px"),
    ...shorthands.paddingBlock("8px"),
    ...shorthands.borderRadius("4px"),
    ":hover": {
      ...shorthands.border("1px", "solid ", tokens.colorNeutralStroke1Hover),
    },
    ":active": {},
  },
})

const DraggableFieldList: React.FC<DraggableFieldListProps> = (props) => {
  const c = createDraggableFieldListStyles()

  const [tempLabel, setTempLabel] = useState<string>(props.field.label)

  const onChange = (value: string) => {
    setTempLabel(value)
  }

  const onCancelLabel = (value: string) => {
    setTempLabel(value)
  }

  const onSaveLabel = (value: string) => {
    props.onChangeLabel && props.onChangeLabel(props.field.id, value)
  }

  const onSaveOption = (value: DropdownOption[] | PersonaOption[] | TagOption[]) => {
    props.onChangeOptions && props.onChangeOptions(props.field.id, value)
  }

  return (
    <Draggable draggableId={props.field.id} index={props.index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={c.dragItem}
          style={{
            ...provided.draggableProps.style,
            backgroundColor: snapshot.isDragging ? tokens.colorNeutralBackground1Selected : "",
          }}>
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                columnGap: 4,
              }}>
              <Button appearance="transparent" size="small" icon={<ReOrderDotsVertical24Regular />} />

              <div style={{ flexGrow: 1, border: "" }}>
                {props.field.category === "default" ? (
                  <div style={{ display: "flex", alignItems: "center", minHeight: "34px" }}>
                    <Body1Strong>{props.field.label}</Body1Strong>
                  </div>
                ) : (
                  <>
                    <InputField
                      onChange={onChange}
                      onCancel={onCancelLabel}
                      onSave={onSaveLabel}
                      style={{ flexGrow: 1, display: "block" }}
                      defaultValue={tempLabel}
                      customRenderInput={{ children: () => <Body1Strong>{props.field.label}</Body1Strong> }}
                      hideActionButtons
                      editOnClickEnabled
                      saveOnEnter
                    />
                  </>
                )}
              </div>

              {props.field.category == "custom" && (
                <div style={{ display: "flex", columnGap: 4 }}>
                  {props.field.options && (
                    <div>
                      <Menu>
                        <MenuTrigger disableButtonEnhancement>
                          <MenuButton appearance="subtle" size="small" icon={<List24Filled />} />
                        </MenuTrigger>
                        <MenuPopover>
                          <FieldOptionForm listOptions={props.field.options} onSave={onSaveOption} />
                        </MenuPopover>
                      </Menu>
                    </div>
                  )}
                  <div>
                    <Button
                      onClick={() => props.handleDeleteField && props.handleDeleteField(props.field.id)}
                      appearance="subtle"
                      size="small"
                      icon={<Delete24Regular />}
                    />
                  </div>
                </div>
              )}
            </div>
          </>
        </div>
      )}
    </Draggable>
  )
}

export default DraggableFieldList
