import {
  Caption1,
  Field,
  FieldProps,
  Input,
  InputOnChangeData,
  InputProps,
  Label,
  makeStyles,
  Text,
} from "@fluentui/react-components"
import { BaseFieldProps, FieldEventProps } from "../utils/field.interface"
import ActionButtonContainer from "../CommonComponents/ActionButtonContainer"
import {
  ActionButtonContainerProps,
  InactiveReadViewProps,
} from "../CommonComponents/utils/commonComponents.interface"
import { useMemo, useRef, useState } from "react"
import { isValidDateTimeValue, formatDateTimeByType } from "./utils/dateTimeRangeField.helper"
import InactiveReadView from "../CommonComponents/InactiveReadView"
import React from "react"
import { DateTimeRangeFieldProps, DateTimeRangeFieldValueType } from "./utils/dateTimeRangeField.interface"

const createDateTimeRangeFieldStyles = makeStyles({
  wrapperStyles: {
    display: "flex",
    columnGap: "8px",
    // justifyContent: "space-between",
  },
  actionButtonOnBottom: {
    marginTop: "6px",
  },
  wrapperActiveStyles: {
    display: "flex",
    columnGap: "8px",
    alignItems: "center",
    // flexGrow: 1,
  },
})

const DateTimeRangeField: React.FC<DateTimeRangeFieldProps> = (props) => {
  const c = createDateTimeRangeFieldStyles()
  const {
    labelPosition = "top",
    actionButtonPosition = "bottom",
    size = "medium",
    type = "time-range",
  } = props

  const inputType = type === "datetime-range" ? "datetime-local" : type === "date-range" ? "date" : "time"

  const [isEditInternal, setIsEditInternal] = useState<boolean | undefined>(props.isEditing)
  const [internalValue, setInternalValue] = useState<DateTimeRangeFieldValueType>(
    props.defaultValue || { start: "", end: "" }
  )
  const [originalValue, setOriginalValue] = useState<DateTimeRangeFieldValueType>(
    props.value || props.defaultValue || { start: "", end: "" }
  )
  const [internalValidationMessage, setInternalValidationMessage] = useState<string | undefined>(
    props.validationMessage
  )
  const [isSaveDisabled, setIsSaveDisabled] = useState<boolean>(false)

  const IS_EDIT_MODE = props.isEditing === undefined ? isEditInternal : props.isEditing

  const inputStartRef = useRef(null)

  const memoizedValue = useMemo(() => {
    const memoized = props.value || internalValue
    return memoized
  }, [props.value, internalValue])

  const formatRenderStart = formatDateTimeByType(memoizedValue?.start, type, props.formatString)
  const formatRenderEnd = formatDateTimeByType(memoizedValue?.end, type, props.formatString)

  const handleIsEditing = () => {
    setIsSaveDisabled(true)

    props.isEditing === undefined && setIsEditInternal(true)
    props.onEditButtonClick && props.onEditButtonClick()

    setTimeout(() => {
      const inputComponent = inputStartRef?.current as HTMLInputElement | null
      inputComponent && inputComponent.focus()
    }, 0)
  }

  const handleOnBlur = () => {
    if (props.saveOnBlur) {
      setTimeout(() => {
        handleOnSave()
      }, 300)
    }
  }

  const handleOnKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (ev) => {
    const keyPressed = ev.key

    const enterPressed = keyPressed === "Enter"
    const escapePressed = keyPressed === "Escape"

    if (props.saveOnEnter && enterPressed) handleOnSave()
    if ((props.saveOnEnter || props.saveOnBlur) && escapePressed) handleOnCancel()
  }

  const handleEditOnClickEnabled = () => props.editOnClickEnabled && handleIsEditing()

  const handleDefaultValidation = (value: DateTimeRangeFieldValueType): boolean => {
    return isValidDateTimeValue(value.start, value.end, type)
  }

  const handleOnValidate = (value: DateTimeRangeFieldValueType) => {
    let isValidValue = false

    isValidValue = handleDefaultValidation(value)

    if (props.onValidate) {
      const getValidationMessage = props.onValidate(value)

      if (getValidationMessage) {
        setInternalValidationMessage(getValidationMessage)
        isValidValue = false
      } else {
        setInternalValidationMessage("")
      }
    }

    setIsSaveDisabled(!!!isValidValue)

    trackValidationState(!!!isValidValue)
  }

  const trackValidationState = (currentSaveDisabled: boolean) => {
    props.currentValidationState && props.currentValidationState(currentSaveDisabled)
  }

  const handleOnChangeStart = (_event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
    setIsSaveDisabled(false)

    const value = { ...memoizedValue, start: data.value }

    handleOnValidate(value)

    props.onChange && props.onChange(value)
    !!!props.value && setInternalValue(value)
  }

  const handleOnChangeEnd = (_event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
    setIsSaveDisabled(false)

    const value = { ...memoizedValue, end: data.value }

    handleOnValidate(value)

    props.onChange && props.onChange(value)
    !!!props.value && setInternalValue(value)
  }

  const handleOnSave = () => {
    if (isSaveDisabled) return

    setOriginalValue(memoizedValue)
    props.onSave && props.onSave(memoizedValue)

    props.isEditing === undefined && setIsEditInternal(false)
  }

  const handleOnCancel = () => {
    props.onCancel && props.onCancel(originalValue)
    !!!props.value && setInternalValue(originalValue)

    props.isEditing === undefined && setIsEditInternal(false)

    setInternalValidationMessage("")
    setIsSaveDisabled(false)
  }

  const inactiveReadViewProps: InactiveReadViewProps = {
    defaultValue: `${formatRenderStart} - ${formatRenderEnd}`,
    disabled: props.disabled,
    onClick: handleEditOnClickEnabled,
    openActionButton: handleIsEditing,
    size: size,
  }

  const commonInputProps: InputProps = {
    appearance: props.appearance,
    type: inputType,
    onBlur: handleOnBlur,
    onKeyDown: handleOnKeyDown,
    step: props.step,
    size: size,
  }

  const inputStartProps: InputProps = {
    ...commonInputProps,
    value: memoizedValue.start,
    min: props.minRange,
    max: memoizedValue.end,
    onChange: handleOnChangeStart,
  }

  const inputEndProps: InputProps = {
    ...commonInputProps,
    min: memoizedValue.start,
    max: props.maxRange,
    value: memoizedValue.end,
    onChange: handleOnChangeEnd,
  }

  const actionButtonProps: ActionButtonContainerProps = {
    saveDisabled: isSaveDisabled,
    disabled: props.disabled,
    onSave: handleOnSave,
    onCancel: handleOnCancel,
    size: size,
    saveLabel: typeof props.label === "object" ? props.label.saveLabel : "Save",
    cancelLabel: typeof props.label === "object" ? props.label.cancelLabel : "Cancel",
  }

  const fieldProps: FieldProps = {
    className: props.className, // temp
    style: props.style, // temp
    validationMessage: internalValidationMessage,
    as: "div",
    required: props.required,
    orientation: labelPosition === "left" ? "horizontal" : "vertical",
    label: {
      children: (
        <Label disabled={props.disabled} weight="semibold" size={size}>
          {typeof props.label === "object" ? props.label?.label : props.label}
        </Label>
      ),
    },
    hint: {
      children: (
        <>
          <Caption1>{props.description}</Caption1>
          {!!!props.hideActionButtons && IS_EDIT_MODE && actionButtonPosition === "bottom" && (
            <ActionButtonContainer {...actionButtonProps} className={c.actionButtonOnBottom} />
          )}
        </>
      ),
    },
  }

  return (
    <Field {...fieldProps}>
      <div className={c.wrapperStyles}>
        {!!!IS_EDIT_MODE ? (
          <InactiveReadView {...inactiveReadViewProps} />
        ) : (
          <div className={c.wrapperActiveStyles}>
            <Input {...inputStartProps} ref={inputStartRef} />
            <Text>-</Text>
            <Input {...inputEndProps} />
          </div>
        )}

        {!!!props.hideActionButtons && IS_EDIT_MODE && actionButtonPosition === "right" && (
          <ActionButtonContainer {...actionButtonProps} />
        )}
      </div>
    </Field>
  )
}

export default DateTimeRangeField
