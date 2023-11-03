import {
  Caption1,
  Field,
  FieldProps,
  Input,
  InputOnChangeData,
  InputProps,
  Label,
  Select,
  SelectOnChangeData,
  SelectProps,
  makeStyles,
  shorthands,
} from "@fluentui/react-components"
import ActionButtonContainer from "../CommonComponents/ActionButtonContainer"
import {
  ActionButtonContainerProps,
  InactiveReadViewProps,
} from "../CommonComponents/utils/commonComponents.interface"
import InactiveReadView from "../CommonComponents/InactiveReadView"
import { useMemo, useRef, useState } from "react"
// import "./utils/MonetaryField.styles.css"
import { CurrencyObjectType, MonetaryFieldProps, MonetaryValueType } from "./utils/monetaryField.interface"
import { formatCurrency } from "./utils/monetaryField.helper"
import { currencyList } from "./utils/currencyList"
import React from "react"

const createMonetaryClassName = makeStyles({
  wrapperStyles: {
    display: "flex",
    columnGap: "8px",
    justifyContent: "space-between",
  },
  actionButtonOnBottom: {
    marginTop: "6px",
  },
  inputField: {
    width: "100%",
    flexGrow: 1,
  },
  wrapperActiveStyles: {
    display: "flex",
    columnGap: "8px",
    alignItems: "center",
    flexGrow: 1,
  },
  inputSlot: {
    width: "100%",
  },
  selectSlot: {
    width: "100%",
    ...shorthands.overflow("hidden"),
    textOverflow: "ellipsis",
  },
  inputContainer: { width: "60%" },
  selectContainer: { width: "40%", marginRight: "4px" },
})

const MonetaryField: React.FC<MonetaryFieldProps> = (props) => {
  const c = createMonetaryClassName()

  const {
    labelPosition = "top",
    actionButtonPosition = "bottom",
    size = "medium",
    defaultCurrencyCode = "USD",
  } = props

  const [isEditInternal, setIsEditInternal] = useState<boolean | undefined>(props.isEditing)
  const [internalValue, setInternalValue] = useState<MonetaryValueType>(
    props.defaultValue || { code: defaultCurrencyCode, amount: 0 }
  )
  const [originalValue, setOriginalValue] = useState<MonetaryValueType>(
    props.value || props.defaultValue || { code: defaultCurrencyCode, amount: 0 }
  )
  const [internalValidationMessage, setInternalValidationMessage] = useState<string | undefined>(
    props.validationMessage
  )
  const [isSaveDisabled, setIsSaveDisabled] = useState<boolean>(false)

  const IS_EDIT_MODE = props.isEditing === undefined ? isEditInternal : props.isEditing

  const inputRef = useRef(null)

  const memoizedValue = useMemo(() => {
    if (props.value && !!!props.value?.code) return { ...props.value, code: defaultCurrencyCode }
    else if (internalValue && !!!internalValue.code) return { ...internalValue, code: defaultCurrencyCode }
    else return props.value || internalValue
  }, [props.value, internalValue])

  const handleIsEditing = () => {
    setIsSaveDisabled(true)

    props.isEditing === undefined && setIsEditInternal(true)
    props.onEditButtonClick && props.onEditButtonClick()

    setTimeout(() => {
      const inputComponent = inputRef?.current as HTMLInputElement | null
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

  const handleOnValidate = (value: any) => {
    if (props.onValidate === undefined) return

    const getValidationMessage = props.onValidate(value)
    setInternalValidationMessage(getValidationMessage)
    setIsSaveDisabled(!!!!getValidationMessage)

    trackValidationState(!!!!getValidationMessage)
  }

  const trackValidationState = (currentSaveDisabled: boolean) => {
    props.currentValidationState && props.currentValidationState(currentSaveDisabled)
  }

  const handleOnChangeAmount = (_event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
    setIsSaveDisabled(false)

    const value = { ...memoizedValue, amount: Number(data.value) }

    handleOnValidate(value)

    props.onChange && props.onChange(value)
    !!!props.value && setInternalValue(value)
  }

  const handleOnChangeCurrency = (_event: React.ChangeEvent<HTMLSelectElement>, data: SelectOnChangeData) => {
    setIsSaveDisabled(false)

    const value = { ...memoizedValue, code: data.value }

    props.onChange && props.onChange(value)
    setInternalValue(value)
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
    defaultValue: formatCurrency(memoizedValue.amount),
    disabled: props.disabled,
    contentBefore: { children: memoizedValue.amount > 0 ? <>{memoizedValue.code}</> : <></> },
    onClick: handleEditOnClickEnabled,
    openActionButton: handleIsEditing,
    size: props.size,
  }

  const inputComponentProps: InputProps = {
    appearance: props.appearance,
    placeholder: props.placeholder,
    className: c.inputField,
    input: { className: c.inputSlot },
    type: "number",
    size: size,
    onChange: handleOnChangeAmount,
    onBlur: handleOnBlur,
    onKeyDown: handleOnKeyDown,
    value: String(memoizedValue.amount),
    disabled: props.disabled,
  }

  const selectComponentProps: SelectProps = {
    appearance: props.appearance,
    disabled: props.disabled,
    select: { className: c.selectSlot },
    onChange: handleOnChangeCurrency,
    value: memoizedValue.code,
    size: size,
  }

  const actionButtonProps: ActionButtonContainerProps = {
    saveDisabled: isSaveDisabled,
    disabled: props.disabled,
    onSave: handleOnSave,
    onCancel: handleOnCancel,
    size: size,
    saveLabel: typeof props.label === "object" ? props.label?.saveLabel : "Save",
    cancelLabel: typeof props.label === "object" ? props.label?.cancelLabel : "Cancel",
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
            <div className={c.inputContainer}>
              <Input {...inputComponentProps} ref={inputRef} />
            </div>
            <div className={c.selectContainer}>
              <Select {...selectComponentProps}>
                {currencyList.map((currency: CurrencyObjectType, index: number) => (
                  <option key={index} value={currency.code}>{`${currency.name} (${currency.code})`}</option>
                ))}
              </Select>
            </div>
          </div>
        )}

        {!!!props.hideActionButtons && IS_EDIT_MODE && actionButtonPosition === "right" && (
          <ActionButtonContainer {...actionButtonProps} />
        )}
      </div>
    </Field>
  )
}

export default MonetaryField
