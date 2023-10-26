import {
  Button,
  Text,
  makeStyles,
  shorthands,
} from "@fluentui/react-components";
import {
  Edit24Filled,
  Settings24Filled,
  ChevronDown24Filled,
  ChevronUp24Filled,
} from "@fluentui/react-icons";
import React, { useState } from "react";
import { generateEditState, generateFormValue } from "./utils/form.helper";
import { BaseFieldProps } from "../Field/utils/field.interface";
import InputField from "../Field/InputField/InputField";
import DateTimeRangeField from "../Field/DateTimeRangeField/DateTimeRangeField";
import MonetaryField from "../Field/MonetaryField/MonetaryField";

interface FormComponentProps extends BaseFieldProps {
  fieldList: FormFieldListType[];
  formValue?: FormValueType;
  formDefaultValue?: FormValueType;
  // styling?: { full_name: , }
}

export type FormFieldListType = {
  id: string;
  label: string;
  category: "default" | "custom";
  fieldType:
  | "text"
  | "number"
  | "date"
  | "datetime-local"
  | "url"
  | "email"
  | "time"
  | "tel"
  | "date-range"
  | "time-range"
  | "datetime-range"
  | "monetary";
};

export type FormValueType = {
  [key: string]: any;
  customField: {
    [key: string]: any;
  };
};

export type FormEditStateType = {
  [key: string]: boolean;
};

const createFormStyles = makeStyles({
  container: {
    ...shorthands.border("1px", "solid", "blue"),
    display: "flex",
    width: "100%",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

const FormDev: React.FC<FormComponentProps> = (props) => {
  const c = createFormStyles();

  const [isExpand, setIsExpand] = useState(true);
  const [isBulkEdit, setIsBulkEdit] = useState(false);

  const [internalFieldList] = useState<
    FormFieldListType[]
  >(props.fieldList);
  const [internalFormValue, setInternalFormValue] = useState<FormValueType>(
    props.formValue || (() => generateFormValue(props.fieldList)),
  );

  const [originalFormValue, setOriginalFormValue] = useState<FormValueType>(
    props.formValue || (() => generateFormValue(props.fieldList)),
  );

  const [isFieldEdit, setIsFieldEdit] = useState<FormEditStateType | undefined>(
    () => generateEditState(props.fieldList),
  );

  const toggleFormExpansion = () => {
    setIsExpand((prevState) => !prevState);
  };

  const handleFieldEditClick = (fieldId: string) => {
    setIsFieldEdit({ ...isFieldEdit, [fieldId]: true });
  };

  const updateFormFieldValue = (id: string, fieldValue: any): FormValueType => {
    const updateCustomField = { ...internalFormValue.customField };
    updateCustomField[id] = fieldValue;

    const updatedDefaultFieldValue = {
      ...internalFormValue,
      [id]: fieldValue,
      customField: updateCustomField,
    };

    return updatedDefaultFieldValue;
  };

  // const handleOnValidate = (fieldId: string, currentValue: any): string | undefined => {
  //   console.log(currentValue)
  //   return
  // }

  const handleOnChange = (fieldId: string, currentValue: any) => {
    const updatedValue = updateFormFieldValue(fieldId, currentValue);
    setInternalFormValue(updatedValue);
  };

  const handleOnCancel = (fieldId: string, _currentValue: any) => {
    // const updatedValue = updateFormFieldValue(fieldId, currentValue)
    // setInternalFormValue(updatedValue)

    setIsFieldEdit({ ...isFieldEdit, [fieldId]: false });
  };

  const handleOnSave = (fieldId: string, currentValue: any) => {
    const updatedValue = updateFormFieldValue(fieldId, currentValue);

    setOriginalFormValue(updatedValue);
    setIsFieldEdit({ ...isFieldEdit, [fieldId]: false });
  };

  // ---------- FORM CONTROL ---------- //

  const updateEditState = (value: boolean): FormEditStateType => {
    const updated: FormEditStateType = { ...isFieldEdit };
    for (const fieldId in updated) {
      updated[fieldId] = value;
    }

    return updated;
  };

  const toggleBulkEdit = () => {
    const updatedEditState = updateEditState(true);
    setIsFieldEdit(updatedEditState);
    setIsBulkEdit(true);
  };

  const onCancelBulkEdit = () => {
    console.log("cancel");
    setInternalFormValue(originalFormValue);

    const updatedEditState = updateEditState(false);
    setIsFieldEdit(updatedEditState);
    setIsBulkEdit(false);
  };

  const onSaveBulkEdit = () => {
    setOriginalFormValue(internalFormValue);

    const updatedEditState = updateEditState(false);
    setIsFieldEdit(updatedEditState);
    setIsBulkEdit(false);
  };

  const renderField = (field: FormFieldListType) => {
    const commonFieldProps = {
      label: field.label,
      hideActionButtons: isBulkEdit,
      isEditing: isFieldEdit?.[field.id],
      value:
        internalFormValue?.[field.id] ||
        internalFormValue?.customField?.[field.id],
      onClickEditButton: () => handleFieldEditClick(field.id),
      onSave: (value: any) => handleOnSave(field.id, value),
      onCancel: (value: any) => handleOnCancel(field.id, value),
      onChange: (value: any) => handleOnChange(field.id, value),
      // onValidate: (value: any) => handleOnValidate(field.id, value)
    };

    switch (field.fieldType) {
      case "monetary":
        return <MonetaryField {...commonFieldProps} />;

      case "date-range":
      case "time-range":
      case "datetime-range":
        return (
          <DateTimeRangeField {...commonFieldProps} type={field.fieldType} />
        );

      case "text":
      case "number":
      case "email":
      case "url":
      case "tel":
      case "date":
      case "time":
      case "datetime-local":
        return <InputField {...commonFieldProps} type={field.fieldType} />;
    }
  };

  return (
    <section className={c.container}>
      <section style={{ border: "1px solid red", width: "30%" }}>
        <FormHeader
          isExpand={isExpand}
          title="FORM PERSON"
          onClickBulkEdit={toggleBulkEdit}
          onClickTitle={toggleFormExpansion}
        />

        <div>
          {isExpand &&
            internalFieldList &&
            internalFieldList.map((field) => (
              <div key={field.id}>{renderField(field)}</div>
            ))}
        </div>

        <FormFooter
          isExpand={isExpand}
          isBulkEdit={isBulkEdit}
          onCancelBulkEdit={onCancelBulkEdit}
          onSaveBulkEdit={onSaveBulkEdit}
        />
      </section>
      {/* <div>
        INTERNAL VALUE
        <pre>{JSON.stringify(internalFormValue, undefined, 4)}</pre>
      </div>
      <div>
        ORIGINAL VALUE
        <pre>{JSON.stringify(originalFormValue, undefined, 4)}</pre>
      </div> */}
    </section>
  );
};

export default FormDev;

interface FormHeaderProps {
  isExpand: boolean;
  onClickTitle?: () => void;
  onClickBulkEdit?: () => void;
  onClickOptions?: () => void;
  title: string;
}

const FormHeader: React.FC<FormHeaderProps> = (props) => {
  const c = createFormStyles();
  return (
    <div className={c.header}>
      <Button
        appearance="subtle"
        icon={props.isExpand ? <ChevronUp24Filled /> : <ChevronDown24Filled />}
        onClick={props.onClickTitle}
      >
        <Text weight="semibold" size={500}>
          {props.title}
        </Text>
      </Button>
      <div>
        {/* HEADER_MENU */}
        <Button
          onClick={props.onClickBulkEdit}
          size="small"
          appearance="subtle"
          icon={<Edit24Filled />}
        />
        <Button
          onClick={props.onClickOptions}
          size="small"
          appearance="subtle"
          icon={<Settings24Filled />}
        />
      </div>
    </div>
  );
};

interface FormFooterProps {
  isExpand: boolean;
  isBulkEdit: boolean;
  onSaveBulkEdit: () => void;
  onCancelBulkEdit: () => void;
}

const FormFooter: React.FC<FormFooterProps> = (props) => {
  return (
    <>
      {props.isExpand && props.isBulkEdit && (
        <div style={{ marginTop: 12 }}>
          <Button onClick={props.onSaveBulkEdit} appearance="primary">
            Save Form
          </Button>
          <Button onClick={props.onCancelBulkEdit} style={{ marginLeft: 4 }}>
            Cancel
          </Button>
        </div>
      )}
    </>
  );
};
