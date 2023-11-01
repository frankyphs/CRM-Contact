import React, { useContext, useState } from "react"
import { FormContext, FormContextType } from "../Form"
import { Button, makeStyles, shorthands } from "@fluentui/react-components"
import { Add16Filled } from "@fluentui/react-icons"
import { DragDropContext, OnDragEndResponder } from "@hello-pangea/dnd"
import { FormFieldType } from "../utils/form.interface"
import { reorderList } from "../utils/form.helper"
import { StrictModeDroppable } from "../components/StrictModeDroppable"
import NewFieldForm from "./NewFieldForm"

import DraggableFieldList from "../components/DraggableFieldList"
import {
  DropdownOption,
  PersonaOption,
  TagOption,
} from "../../Field/DropdownField/utils/dropDownField.interface"

const createFormCustomizeViewStyles = makeStyles({
  draggableContainer: {
    display: "flex",
    flexDirection: "column",
    rowGap: "8px",
  },
  dragItem: {
    ...shorthands.border("1px", "solid ", "#d1d1d1"),
    ...shorthands.paddingInline("8px"),
    ...shorthands.paddingBlock("8px"),
    ...shorthands.borderRadius("4px"),
    columnGap: "8px",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    ...shorthands.paddingBlock("12px", "0px"),
  },
})

const FormCustomizeView = () => {
  const c = createFormCustomizeViewStyles()
  const { internalFieldList, updateFormFieldList, changeFormView, handleBulkEditState } = useContext(
    FormContext
  ) as FormContextType

  const [isCreateNewField, setIsCreateNewField] = useState(false)

  const onDragEnd: OnDragEndResponder = (result) => {
    const { source, destination } = result
    const tempLayout = [...internalFieldList]

    if (!!!destination) return

    const sourceIndex = source.index
    const destIndex = destination.index

    const reorderedFieldList: FormFieldType[] = reorderList(tempLayout, sourceIndex, destIndex)
    updateFormFieldList(reorderedFieldList)
  }

  const onChangeLabel = (fieldId: string, value: string) => {
    const fieldList = internalFieldList.map((field) => {
      if (field.id === fieldId) field.label = value
      return field
    })

    updateFormFieldList(fieldList)
  }

  const onChangeFieldOptions = (
    fieldId: string,
    options: DropdownOption[] | PersonaOption[] | TagOption[]
  ) => {
    const fieldList = internalFieldList.map((field) => {
      if (field.id === fieldId) field.options = options
      return field
    })

    updateFormFieldList(fieldList)
  }

  const addFieldButtonOnClick = () => {
    setIsCreateNewField((prev) => !!!prev)
  }

  const onCancelNewField = () => {
    setIsCreateNewField(false)
  }

  const handleDeleteField = (fieldId: string) => {
    const fieldList = internalFieldList.filter((field) => field.id !== fieldId)
    updateFormFieldList(fieldList)
  }

  const onSaveNewField = (newFieldData: FormFieldType) => {
    const fieldList = [...internalFieldList, newFieldData]

    updateFormFieldList(fieldList)
    setIsCreateNewField(false)
  }

  const handleFormFiledListOnSave = () => {
    changeFormView("DEFAULT")
    handleBulkEditState(false)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        {isCreateNewField ? (
          <NewFieldForm onSave={onSaveNewField} onCancel={onCancelNewField} />
        ) : (
          <>
            <StrictModeDroppable droppableId="ORGANIZE_FORM">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <div className={c.draggableContainer}>
                    {internalFieldList.map((field, index) => (
                      <DraggableFieldList
                        field={field}
                        index={index}
                        key={field.id}
                        onChangeLabel={onChangeLabel}
                        onChangeOptions={onChangeFieldOptions}
                        handleDeleteField={handleDeleteField}
                      />
                    ))}
                  </div>
                  {provided.placeholder}
                </div>
              )}
            </StrictModeDroppable>

            <div className={c.footer}>
              <Button
                onClick={addFieldButtonOnClick}
                icon={<Add16Filled />}
                iconPosition="before"
                appearance="transparent">
                Custom Field
              </Button>
              <Button onClick={handleFormFiledListOnSave} appearance="primary">
                Done
              </Button>
            </div>
          </>
        )}
      </div>
    </DragDropContext>
  )
}

export default FormCustomizeView
