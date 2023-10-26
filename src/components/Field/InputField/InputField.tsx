import {
  Caption1,
  Field,
  FieldProps,
  Input,
  InputOnChangeData,
  InputProps,
  Label,
  makeStyles,
} from "@fluentui/react-components";
import {
  ActionButtonContainerProps,
  InactiveReadViewProps,
} from "../CommonComponents/utils/commonComponents.interface";
import InactiveReadView from "../CommonComponents/InactiveReadView";
import ActionButtonContainer from "../CommonComponents/ActionButtonContainer";
import { useMemo, useRef, useState } from "react";
import { isValidEmail, isValidUrl } from "./utils/inputField.helper";
import { InputFieldProps } from "./utils/inputField.interface";
import React from "react";

const createInputFieldStyles = makeStyles({
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
});

const InputField: React.FC<InputFieldProps> = (props) => {
  const c = createInputFieldStyles();

  const {
    labelPosition = "top",
    actionButtonPosition = "bottom",
    size = "medium",
    validateOn = "save",
  } = props;

  const [isEditInternal, setIsEditInternal] = useState<boolean | undefined>(
    props.isEditing,
  );
  const [internalValue, setInternalValue] = useState<string>(
    props.defaultValue || "",
  );
  const [originalValue, setOriginalValue] = useState<string>(
    props.value || props.defaultValue || "",
  );
  const [internalValidationMessage, setInternalValidationMessage] = useState<
    string | undefined
  >(props.validationMessage);
  const [isSaveDisabled, setIsSaveDisabled] = useState<boolean>(false);

  const IS_EDIT_MODE =
    props.isEditing === undefined ? isEditInternal : props.isEditing;

  const inputRef = useRef(null);

  const memoizedValue = useMemo(() => {
    const memoized: string = props.value || internalValue || "";
    return memoized;
  }, [props.value, internalValue]);

  const handleIsEditing = () => {
    setIsSaveDisabled(true);

    props.isEditing === undefined && setIsEditInternal(true);
    props.onEditButtonClick && props.onEditButtonClick();

    // Trigger focus at Input
    setTimeout(() => {
      const inputComponent = inputRef?.current as HTMLInputElement | null;
      inputComponent && inputComponent.focus();
    }, 0);
  };

  const handleOnBlur = () => {
    if (props.saveOnBlur) {
      setTimeout(() => {
        handleOnSave();
      }, 300);
    }
  };

  const handleOnKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (
    event,
  ) => {
    const keyPressed = event.key;

    const enterPressed = keyPressed === "Enter";
    const escapePressed = keyPressed === "Escape";

    if (props.saveOnEnter && enterPressed) handleOnSave();
    if ((props.saveOnEnter || props.saveOnBlur) && escapePressed)
      handleOnCancel();
  };

  const handleEditOnClickEnabled = () => {
    props.editOnClickEnabled && handleIsEditing();
  };

  const handleDefaultValidation = (value: string): boolean => {
    const checkEmail: boolean = isValidEmail(value);
    const checkUrl: boolean = isValidUrl(value);

    let defaultValidationMessage: string = "";
    let disableSave: boolean = false;

    if (props.type === "email" && !!!checkEmail && value.length > 0) {
      defaultValidationMessage = "Please enter a valid email address";
      disableSave = true;
    } else if (props.type === "url" && !!!checkUrl && value.length > 0) {
      defaultValidationMessage = "Please enter a valid Url";
      disableSave = true;
    }

    setInternalValidationMessage(defaultValidationMessage);
    setIsSaveDisabled(disableSave);

    trackValidationState(disableSave);

    return disableSave;
  };

  const handleOnValidate = (value: string): string | undefined => {
    if (props.onValidate === undefined) return;

    const validationMessage = props.onValidate(value);

    setInternalValidationMessage(validationMessage);
    setIsSaveDisabled(!!validationMessage);

    trackValidationState(!!validationMessage);

    return validationMessage;
  };

  const trackValidationState = (currentSaveDisabled: boolean) => {
    props.currentValidationState &&
      props.currentValidationState(currentSaveDisabled);
  };

  const handleOnChange = (
    _event: React.ChangeEvent<HTMLInputElement>,
    data: InputOnChangeData,
  ) => {
    setIsSaveDisabled(false);

    if (validateOn === "change") handleOnValidate(data.value);
    else if (validateOn === "save") setInternalValidationMessage("");

    props.onChange && props.onChange(data.value);
    !!!props.value && setInternalValue(data.value);
  };

  const handleOnSave = () => {
    const validType = handleDefaultValidation(memoizedValue);
    const message = handleOnValidate(memoizedValue);

    if (!!!validType && !!!message) {
      setOriginalValue(memoizedValue);
      props.onSave && props.onSave(memoizedValue);

      props.isEditing === undefined && setIsEditInternal(false);
    }
  };

  const handleOnCancel = () => {
    props.onCancel && props.onCancel(originalValue);
    !!!props.value && setInternalValue(originalValue);

    props.isEditing === undefined && setIsEditInternal(false);

    setInternalValidationMessage("");
    setIsSaveDisabled(false);
  };

  const inactiveReadViewProps: InactiveReadViewProps = {
    contentAfter: props.contentAfter,
    contentBefore: props.contentBefore,
    disabled: props.disabled,
    onClick: handleEditOnClickEnabled,
    defaultValue: memoizedValue,
    openActionButton: handleIsEditing,
    size: props.size,
  };

  const inputComponentProps: InputProps = {
    contentAfter: props.contentAfter,
    contentBefore: props.contentBefore,
    disabled: props.disabled,
    className: c.inputField,
    size: props.size,
    type: props.type,
    value: memoizedValue,
    onBlur: handleOnBlur,
    onChange: handleOnChange,
    onKeyDown: handleOnKeyDown,
    placeholder: props.placeholder,
    appearance: props.appearance,
  };

  const actionButtonProps: ActionButtonContainerProps = {
    saveDisabled: isSaveDisabled,
    disabled: props.disabled,
    onSave: handleOnSave,
    onCancel: handleOnCancel,
    size: size,
    saveLabel:
      typeof props.label === "object" ? props.label?.saveLabel : "Save",
    cancelLabel:
      typeof props.label === "object" ? props.label?.cancelLabel : "Cancel",
    className: c.actionButtonOnBottom,
  };

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
          {!!!props.hideActionButtons &&
            IS_EDIT_MODE &&
            actionButtonPosition === "bottom" && (
              <ActionButtonContainer {...actionButtonProps} />
            )}
        </>
      ),
    },
  };

  return (
    <Field {...fieldProps}>
      <div className={c.wrapperStyles}>
        {!!!IS_EDIT_MODE ? (
          <InactiveReadView {...inactiveReadViewProps} />
        ) : (
          <Input ref={inputRef} {...inputComponentProps} />
        )}

        {!!!props.hideActionButtons &&
          IS_EDIT_MODE &&
          actionButtonPosition === "right" && (
            <ActionButtonContainer {...actionButtonProps} />
          )}
      </div>
    </Field>
  );
};

export default InputField;
