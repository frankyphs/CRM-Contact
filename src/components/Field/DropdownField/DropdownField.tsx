import {
  Button,
  Dropdown,
  Field,
  Input,
  Option,
  InputOnChangeData,
  TagGroupProps,
  partitionAvatarGroupItems,
  Tag,
  Text,
  Label,
  Caption1,
} from "@fluentui/react-components"
import React, { useState, useEffect } from "react"
import { Search16Filled, Add16Filled, ChevronDown20Regular, Delete16Regular } from "@fluentui/react-icons"
import InactiveReadView from "../CommonComponents/InactiveReadView"
import {
  MultiOptionTags,
  OptionDropdown,
  OptionMultiPersona,
  OptionPersona,
  OptionTags,
  InputValueDropdown,
} from "./OptionsDropdown"
import { CircleColor } from "./CircleColor"
import { generateUniqueId } from "./utils/dropDownField.helper"
import { ActionButtonContainerProps } from "../CommonComponents/utils/commonComponents.interface"
import ActionButtonContainer from "../CommonComponents/ActionButtonContainer"
import { DropDownFieldProps, DropdownOption, PersonaOption, TagOption } from "./utils/dropDownField.interface"

const INITIAL_COLORS = [
  "#FFF3DA",
  "#D0D4CA",
  "#FBECB2",
  "#DFCCFB",
  "#EAD7BB",
  "#B5CB99",
  "#FF6969",
  "#EE9322",
  "#ECEE81",
  "#8CC0DE",
  "#BC7AF9",
]

const DropdownField = (props: DropDownFieldProps) => {
  const { labelPosition = "top", actionButtonPosition = "bottom", size = "medium" } = props

  const [selectedOptions, setSelectedOptions] = useState<string[]>(props.defaultSelectedOptions || [])
  const [cancelData, setCancelData] = React.useState<string[]>([])
  const [value, setValue] = React.useState<string>("")
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>("")
  const [objectSingle, setObjectSingle] = useState<DropdownOption>()
  const [objectSelectedOption, setObjectSelectedOption] = useState<DropdownOption[]>([])
  const [nameForPersona, setNameForPersona] = React.useState<string[]>([])

  const [internalOptions, setInternalOptions] = React.useState<
    DropdownOption[] | PersonaOption[] | TagOption[]
  >([])

  // state for label value while adding option
  const [addOptionValue, setAddOptionValue] = useState<string>("")

  // state for trigger add option mode
  const [isOptionAddOpen, setIsOptionAddOpen] = React.useState<boolean>(false)

  // state for trigger edit option mode
  const [isOptionEditOpen, setIsOptionEditOpen] = React.useState<boolean>(false)

  // color value while adding option
  const [selectedColor, setSelectedColor] = useState<string | null>(null)

  // avatar value while adding option
  const [avatarUrlValue, setAvatarUrlValue] = useState<string>("")

  // object value selected option for edit option
  const [dataEditOption, setDataEditOption] = React.useState<DropdownOption | PersonaOption | TagOption>()

  // label value while editing option
  const [editValue, setEditValue] = React.useState<string>("")

  // avatar value while editing option
  const [editAvatarImage, setEditAvatarImage] = React.useState<string>("")

  // useEffect(() => {
  //   console.log(selectedOptions, "ini local")
  //   console.log(props.selectedOptions, "ini dari parent")
  // }, [selectedOptions, props.selectedOptions])

  useEffect(() => {
    dataEditOption && setEditValue(dataEditOption.label)
    //@ts-ignore
    props.type === "persona" && dataEditOption && setEditAvatarImage(dataEditOption?.data?.icon || "")
    //@ts-ignore
    props.type === "tags" && dataEditOption && setSelectedColor(dataEditOption?.data?.color)
  }, [dataEditOption])

  useEffect(() => {
    getTextForTextField(props.selectedOptions || selectedOptions, props.options || internalOptions)
    setObjectSelectedOption(getSelectedObjects(props.selectedOptions || selectedOptions))
  }, [props.selectedOptions, selectedOptions, props.options, internalOptions])

  useEffect(() => {
    props.isEditing !== undefined && setIsEditing(props.isEditing)
  }, [props.isEditing])

  function getTextForTextField(selectedOptions: string[], options: DropdownOption[]) {
    const selectedTexts = selectedOptions?.map((value: string | number) => {
      const selectedOption = options.find((option) => option.id === value)
      setObjectSingle(selectedOption)
      return selectedOption ? selectedOption.label : ""
    })
    const filteredSelectedTexts = selectedTexts.filter((text) => text !== "")
    setNameForPersona(filteredSelectedTexts)
    return filteredSelectedTexts ? setValue(filteredSelectedTexts.join(", ")) : ""
  }

  // code for multitag, returning an array of object from selectedOptions
  function getSelectedObjects(selectedOptionIds: string[]): DropdownOption[] {
    const optionsToUse = props.options || internalOptions
    return selectedOptionIds
      ?.map((id) => {
        return optionsToUse.find((option) => option.id === id)
      })
      .filter((option) => option !== undefined) as DropdownOption[]
  }

  // onChange while selected options
  const onOptionSelect = (_: any, data: any) => {
    const selectedItems = data.selectedOptions
    if (!!!props.selectedOptions) {
      setSelectedOptions(selectedItems)
    }
    props.onChange && props.onChange(selectedItems)
  }

  // save selected option
  const handleSaveClick = () => {
    // !!!props.isEditing !== undefined && setIsEditing(props.isEditing)
    props.isEditing !== undefined && setIsEditing(props.isEditing)
    props.isEditing === undefined && setIsEditing(false)
    setCancelData(props.selectedOptions || selectedOptions)
    props.onSave && props.onSave(props.selectedOptions || selectedOptions)
  }

  // cancel selected option
  const handleCancelClick = () => {
    // !!!props.isEditing !== undefined && props.isEditing && setIsEditing(props.isEditing)
    props.isEditing !== undefined && setIsEditing(props.isEditing)
    props.isEditing === undefined && setIsEditing(false)
    if (!!!props.selectedOptions) {
      setSelectedOptions(cancelData)
    }
    props.onCancel && props.onCancel(cancelData)
  }

  // clear all the selected option
  const handleClearClick = (event: any) => {
    props.onChange && props.selectedOptions && props.onClear ? props.onClear([]) : setSelectedOptions([])
    event.stopPropagation()
  }

  // event to change from Inactive to Active Field
  const handleEditClick = () => {
    props.onEditButtonClick && props.onEditButtonClick()
    !!!props.isEditing !== undefined && props.isEditing && setIsEditing(props.isEditing)
    setIsEditing(true)
  }

  // onChange while searching option
  const onChangeSearch = (_e: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
    setSearchValue(data.value)
  }

  // remove Multi Tag while isEdit true
  const removeItem: TagGroupProps["onDismiss"] = (_e, { value }) => {
    props.selectedOptions && props.onDeleteTag
      ? props.onDeleteTag([...props.selectedOptions].filter((tag) => tag !== value))
      : setSelectedOptions([...selectedOptions].filter((tag) => tag !== value))
  }

  // Array of string, name of selected persona
  const partitionedItems = partitionAvatarGroupItems({ items: nameForPersona })

  // onChange label/value while adding option
  const onChangeAddOption = (_: any, data: InputOnChangeData) => {
    setAddOptionValue(data.value)
  }

  // trigger for editing option
  const onClickEditOption = (ev: any, data: DropdownOption | PersonaOption | TagOption) => {
    ev.stopPropagation()
    setDataEditOption(data)
    setIsOptionEditOpen(true)
  }

  // onChange avatar while editing option
  const onChangeAvatarImage = (_: any, data: InputOnChangeData) => {
    setAvatarUrlValue(data.value)
  }

  // onChange label/value while editing option
  const onChangeEditOption = (_: any, data: InputOnChangeData) => {
    setEditValue(data.value)
  }

  // onChange avatar while editing option
  const onChangEditAvatarImage = (_: any, data: InputOnChangeData) => {
    setEditAvatarImage(data.value)
  }

  // selected color while add option
  const handleColorClick = (color: string | null) => {
    if (color === selectedColor) {
      setSelectedColor(null)
    } else {
      setSelectedColor(color)
    }
  }

  // handle save while editing option
  const handleSaveEditOption = () => {
    const optionsToUse = props.options || internalOptions
    const updatedOptions = optionsToUse.map((option) => {
      if (dataEditOption && option.id === dataEditOption.id) {
        if (props.type === "dropdown") {
          return { ...option, label: editValue }
        } else if (props.type === "persona") {
          return { ...option, label: editValue, data: { icon: editAvatarImage } }
        } else if (props.type === "tags") {
          return { ...option, label: editValue, data: { color: selectedColor } }
        }
      }
      return option
    })

    props.onOptionChange && updatedOptions && props.onOptionChange(updatedOptions)
    setIsOptionEditOpen(false)
  }

  // handle delete option while editing option
  const handleDeleteOption = () => {
    if (dataEditOption) {
      const optionsToUse = props.options || internalOptions
      const updatedOptions = optionsToUse.filter((option) => option.id !== dataEditOption.id)
      if (props.onOptionChange) {
        props.onOptionChange(updatedOptions)
      } else {
        setInternalOptions(updatedOptions)
      }
      setIsOptionEditOpen(false)
    }
  }

  const actionButtonProps: ActionButtonContainerProps = {
    // saveDisabled: isSaveDisabled,
    disabled: props.disabled,
    onSave: handleSaveClick,
    onCancel: handleCancelClick,
    size: size,
    saveLabel: typeof props.label === "object" ? props.label?.saveLabel : "Save" || "Save",
    cancelLabel: typeof props.label === "object" ? props.label?.cancelLabel : "Cancel" || "Cancel",
  }

  return (
    <>
      <div>
        <Field
          style={props.style}
          className={props.className}
          as="div"
          required={props.required}
          size={props.size ? props.size : "medium"}
          label={
            <Label disabled={props.disabled} weight="semibold" size={size}>
              {typeof props.label === "object" ? props.label?.label : props.label}
            </Label>
          }
          orientation={labelPosition === "left" ? "horizontal" : "vertical"}
          hint={{
            children: (
              <>
                <Caption1>{props.description}</Caption1>
                {isEditing && actionButtonPosition === "bottom" && (
                  <ActionButtonContainer
                    {...actionButtonProps}
                    style={{ display: "flex", gap: "6px", marginTop: "6px" }}
                  />
                )}
              </>
            ),
          }}>
          {isEditing && (
            <div
              style={{
                display: "flex",
                columnGap: "8px",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
              <Dropdown
                style={{ width: "100%" }}
                disabled={props.disabled}
                onOptionSelect={onOptionSelect}
                multiselect={props.multiSelect}
                selectedOptions={props.selectedOptions || selectedOptions}
                value={value}
                placeholder={props.placeholder || "Select Options"}
                // render option
                //@ts-ignore
                button={
                  (props.selectedOptions && props.selectedOptions?.length > 0) || selectedOptions?.length > 0
                    ? {
                        children: (_, propsInput) => (
                          <button {...propsInput}>
                            {props.type === "tags" && !props.multiSelect && objectSingle ? (
                              <OptionTags option={objectSingle} size={props.size} isDropdownOption={true} />
                            ) : props.type === "persona" && !!!props.multiSelect && objectSingle ? (
                              <>
                                <OptionPersona
                                  option={objectSingle}
                                  size={props.size}
                                  isDropdownOption={true}
                                />
                              </>
                            ) : props.type === "tags" && props.multiSelect && objectSelectedOption ? (
                              <MultiOptionTags
                                selectedOptions={objectSelectedOption}
                                onTagClick={removeItem}
                                isEditing={isEditing === true || props.isEditing === true}
                                size={props.size}
                              />
                            ) : props.type === "persona" && props.multiSelect && partitionedItems ? (
                              <>
                                <OptionMultiPersona partitionedItems={partitionedItems} size={props.size} />
                              </>
                            ) : !objectSingle ? (
                              <div></div>
                            ) : (
                              <>{propsInput.value}</>
                            )}
                            <>
                              <ChevronDown20Regular style={{ color: "#686868" }} />
                            </>
                          </button>
                        ),
                      }
                    : undefined
                }>
                {/* render option normally */}
                {!isOptionAddOpen && !isOptionEditOpen ? (
                  <>
                    <Input
                      value={searchValue}
                      onClick={(ev) => {
                        ev.stopPropagation()
                      }}
                      placeholder={props.placeholderSearch || "Search..."}
                      onChange={onChangeSearch}
                      contentBefore={<Search16Filled />}
                      type="search"
                    />
                    <div style={{ maxHeight: "200px", overflowY: "auto" }}>
                      {(props.options || internalOptions) &&
                        (props.options || internalOptions)
                          .filter((option) => option.label?.toLowerCase().includes(searchValue.toLowerCase()))
                          .map((filteredOption) => (
                            <Option
                              text={filteredOption.label}
                              value={filteredOption.id}
                              key={filteredOption.id}>
                              {props.type === "dropdown" && (
                                <OptionDropdown
                                  option={filteredOption}
                                  size={props.size}
                                  onClickEdit={onClickEditOption}
                                />
                              )}
                              {props.type === "persona" && (
                                <OptionPersona
                                  option={filteredOption}
                                  size={props.size}
                                  onClickEdit={onClickEditOption}
                                />
                              )}
                              {props.type === "tags" && (
                                <OptionTags
                                  option={filteredOption}
                                  size={props.size}
                                  onClickEdit={onClickEditOption}
                                />
                              )}
                            </Option>
                          ))}
                    </div>
                    <Button
                      icon={<Add16Filled />}
                      onClick={() => {
                        setIsOptionAddOpen(true)
                      }}>
                      {props.addText || "Add New Option"}
                    </Button>
                    <Button onClick={handleClearClick}>{props.clearText || "Clear"}</Button>
                  </>
                ) : // render option while add option
                isOptionAddOpen && !isOptionEditOpen ? (
                  <>
                    <Label
                      style={{
                        backgroundColor: "#F5F7F8",
                        margin: "0 -4px",
                        padding: "10px 20px 10px 5px",
                        fontWeight: "bold",
                      }}>
                      Add Option
                    </Label>
                    <Text>Name</Text>
                    <Input
                      value={addOptionValue}
                      onClick={(ev) => {
                        ev.stopPropagation()
                      }}
                      onChange={onChangeAddOption}
                      type="text"
                      style={{ margin: "5px 0" }}
                    />
                    {props.type === "tags" && (
                      <>
                        <div style={{ display: "flex", alignItems: "center", borderRadius: "3px" }}>
                          <Text>Color</Text>
                        </div>
                        <div>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                            {INITIAL_COLORS.map((color, index) => (
                              <CircleColor
                                key={index}
                                color={color}
                                selected={color === selectedColor}
                                onClick={() => handleColorClick(color)}
                              />
                            ))}
                          </div>
                          <div style={{ margin: "20px 0 10px 0" }}>
                            {!selectedColor && addOptionValue && (
                              <Tag appearance="brand">{addOptionValue}</Tag>
                            )}
                            {selectedColor && addOptionValue && (
                              <Tag appearance="brand" style={{ backgroundColor: `${selectedColor}` }}>
                                {addOptionValue}
                              </Tag>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                    {props.type === "persona" && (
                      <>
                        <Text>Avatar URL </Text>
                        <Input
                          value={avatarUrlValue}
                          onClick={(ev) => {
                            ev.stopPropagation()
                          }}
                          onChange={onChangeAvatarImage}
                          type="text"
                          style={{ margin: "5px 0" }}
                        />
                      </>
                    )}
                    <div style={{ display: "flex", justifyContent: "end", margin: "10px 0" }}>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3px" }}>
                        <Button
                          onClick={() => {
                            setIsOptionAddOpen(false)
                            setAddOptionValue("")
                            setSelectedColor(null)
                          }}
                          appearance="secondary">
                          Cancel
                        </Button>
                        <Button
                          disabled={addOptionValue.trim() === ""}
                          onClick={() => {
                            let newOption
                            // @ts-ignore
                            if (props.type === "tags") {
                              newOption = {
                                id: generateUniqueId() as string,
                                key: generateUniqueId(),
                                label: addOptionValue as string,
                                data: { color: selectedColor },
                              } as TagOption
                            }
                            if (props.type === "persona") {
                              newOption = {
                                id: generateUniqueId() as string,
                                key: generateUniqueId(),
                                label: addOptionValue as string,
                                data: { icon: avatarUrlValue },
                              } as PersonaOption
                            }
                            if (props.type === "dropdown") {
                              newOption = {
                                id: generateUniqueId() as string,
                                key: generateUniqueId(),
                                label: addOptionValue as string,
                              }
                            }

                            newOption &&
                              (props.onOptionChange
                                ? props.onOptionChange([...(props.options || internalOptions), newOption])
                                : setInternalOptions([...(props.options || internalOptions), newOption]))

                            setIsOptionAddOpen(false)
                            setAddOptionValue("")
                            setSelectedColor(null)
                          }}
                          appearance="primary">
                          Save
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  //  rendeer option while edit option
                  <>
                    <Label
                      style={{
                        backgroundColor: "#F5F7F8",
                        margin: "0 -4px",
                        padding: "10px 20px 10px 5px",
                        fontWeight: "bold",
                      }}>
                      Edit Option
                    </Label>
                    <Text>Name</Text>
                    <Input
                      onClick={(ev) => {
                        ev.stopPropagation()
                      }}
                      value={editValue}
                      onChange={onChangeEditOption}
                      style={{ margin: "5px 0 5px 0 " }}></Input>
                    {props.type === "persona" && (
                      <>
                        <Text>Avatar URL</Text>
                        <Input
                          onClick={(ev) => {
                            ev.stopPropagation()
                          }}
                          value={editAvatarImage}
                          onChange={onChangEditAvatarImage}
                          style={{ margin: "5px 0 10px 0 " }}></Input>
                      </>
                    )}
                    {props.type === "tags" && (
                      <>
                        <div style={{ display: "flex", alignItems: "center", borderRadius: "3px" }}>
                          <Text>Color</Text>
                        </div>
                        <div>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                            {INITIAL_COLORS.map((color, index) => (
                              <CircleColor
                                key={index}
                                color={color}
                                selected={color === selectedColor}
                                onClick={() => handleColorClick(color)}
                              />
                            ))}
                          </div>
                          <div style={{ margin: "20px 0 10px 0" }}>
                            {!selectedColor && editValue && <Tag appearance="brand">{editValue}</Tag>}
                            {selectedColor && editValue && (
                              <Tag appearance="brand" style={{ backgroundColor: `${selectedColor}` }}>
                                {editValue}
                              </Tag>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        margin: "10px 0",
                        alignItems: "center",
                      }}>
                      <div
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "5px",
                          justifyContent: "center",
                          alignItems: "center",
                          display: "flex",
                        }}
                        onMouseEnter={(event) => {
                          event.currentTarget.style.backgroundColor = "#e0e0e0"
                        }}
                        onMouseLeave={(event) => {
                          event.currentTarget.style.backgroundColor = "transparent"
                        }}>
                        <Delete16Regular onClick={handleDeleteOption} />
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3px" }}>
                        <Button appearance="secondary" onClick={() => setIsOptionEditOpen(false)}>
                          Cancel
                        </Button>
                        <Button
                          disabled={editValue.trim() === ""}
                          appearance="primary"
                          onClick={handleSaveEditOption}>
                          Save
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </Dropdown>
              {actionButtonPosition === "right" && <ActionButtonContainer {...actionButtonProps} />}
            </div>
          )}
          {!!!isEditing && (
            <div style={{ display: "flex" }}>
              <InactiveReadView
                disabled={props.disabled}
                size={props.size ? props.size : "medium"}
                defaultValue={value}
                input={{
                  children: () => {
                    return props.type === "dropdown" &&
                      ((props.selectedOptions?.length ?? 0) > 0 || (selectedOptions?.length ?? 0) > 0) ? (
                      <InputValueDropdown saveDropdown={value} />
                    ) : props.type === "tags" &&
                      props.multiSelect &&
                      ((props.selectedOptions?.length ?? 0) > 0 || (selectedOptions?.length ?? 0) > 0) ? (
                      <MultiOptionTags
                        selectedOptions={objectSelectedOption}
                        isEditing={props.isEditing || isEditing}
                        size={props.size}
                      />
                    ) : props.type === "tags" &&
                      objectSingle &&
                      !!!props.multiSelect &&
                      ((props.selectedOptions?.length ?? 0) > 0 || (selectedOptions?.length ?? 0) > 0) ? (
                      <OptionTags option={objectSingle} size={props.size} isDropdownOption={true} />
                    ) : props.type === "persona" &&
                      objectSingle &&
                      !!!props.multiSelect &&
                      ((props.selectedOptions?.length ?? 0) > 0 || (selectedOptions?.length ?? 0) > 0) ? (
                      <OptionPersona option={objectSingle} size={props.size} isDropdownOption={true} />
                    ) : props.type === "persona" &&
                      props.multiSelect &&
                      ((props.selectedOptions?.length ?? 0) > 0 || (selectedOptions?.length ?? 0) > 0) ? (
                      <OptionMultiPersona partitionedItems={partitionedItems} size={props.size} />
                    ) : (
                      <div />
                    )
                  },
                }}
                openActionButton={handleEditClick}
              />
            </div>
          )}
        </Field>
      </div>
    </>
  )
}

export default DropdownField
