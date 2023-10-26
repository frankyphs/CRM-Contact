import React, { useState } from 'react';
import {
  ActionButton,
  BaseButton,
  Button,
  Callout,
  DatePicker,
  Dropdown,
  FontIcon,
  IColumn,
  Icon,
  IconButton,
  IDetailsColumnRenderTooltipProps,
  IDropdownOption,
  IIconProps,
  IPersonaProps,
  ITextFieldProps,
  Label,
  mergeStyles,
  SpinButton,
  Stack,
  TextField
} from '@fluentui/react';
import { useId, useBoolean } from '@fluentui/react-hooks';
import { IDetailsHeaderTooltipProps, ITableDataTypes } from '../../utils/Interfaces';
import moment from 'moment';
import PeoplePicker from '../PeoplePicker';

const filterSettingsIcon: IIconProps = { iconName: "FilterSettings" };
const activeFilterIcon: IIconProps = { iconName: "FilterSolid" };

const DetailsHeaderTooltip: React.FunctionComponent<IDetailsHeaderTooltipProps> = ({tooltipProps}) => {
  const filterButtonId = useId("filter-button");

  const headerStyle = mergeStyles({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  });

  const [isMouseOver, {setTrue: mouseEnter, setFalse: mouseLeave}] = useBoolean(false);
  const [isCalloutHidden, {setTrue: hideCallout, setFalse: showCallout, toggle: toggleCallout}] = useBoolean(true);
  const [filterValue, setFilterValue] = React.useState<any>();


  const handleFilterClick = (event: React.MouseEvent<HTMLDivElement | HTMLAnchorElement | HTMLButtonElement | BaseButton | Button | HTMLSpanElement, MouseEvent>) => {
    event.stopPropagation();
    toggleCallout();
  }

  const handleClearFilterClick = (event: React.MouseEvent<HTMLDivElement | HTMLAnchorElement | HTMLButtonElement | BaseButton | Button | HTMLSpanElement, MouseEvent>, column: IColumn) => {
    event.stopPropagation();

    setFilterValue(undefined);
    column.data.onFilterChange(undefined, column);
  }

  const handleSpinButtonChange = (newNumber: string | undefined, column: IColumn) => {
    console.log("on change");
    setFilterValue(newNumber);

    column.data.onFilterChange(newNumber, column);
  }

  const handleDateFilterChange = (date: Date | null | undefined, position: "from" | "to", column: IColumn) => {
    let newFilterValue: {from: Date | null | undefined, to: Date | null | undefined} = {...filterValue};
    if (filterValue?.from !== undefined && filterValue?.to !== undefined) {
      if (position === "from") newFilterValue.from = date;
      else newFilterValue.to = date;
    } else {
      if (position === "from") newFilterValue = {from: date, to: null};
      else newFilterValue = {from: null, to: date};
    }
    setFilterValue(newFilterValue);

    column.data.onFilterChange(newFilterValue, column);
  }

  const handleDateFilterPrefixRender = () => {
    return <FontIcon iconName="Calendar" />;
  }

  const handleDateClearFilterClick = (event: React.MouseEvent<HTMLDivElement | HTMLAnchorElement | HTMLButtonElement | BaseButton | Button | HTMLSpanElement, MouseEvent>, position: "from" | "to", column: IColumn) => {
    event.stopPropagation();

    let newFilterValue: {from: Date | null | undefined, to: Date | null | undefined} = {...filterValue};
    if (position === "from") newFilterValue.from = null;
    else if (position === "to") newFilterValue.to = null;

    console.log(newFilterValue);
    setFilterValue(newFilterValue);

    column.data.onFilterChange(newFilterValue, column);
  }

  const handleDateFilterSuffixRender = (column: IColumn, position: "from" | "to") => {
    return (
      <ActionButton
        iconProps={{iconName: "Clear"}}
        styles={{root: {backGroundColor: "#F3F2F1", height: "85%"}}}
        onClick={event => handleDateClearFilterClick(event, position, column)}
      />
    )
  }

  const handlePeoplePickerChange = (selectedPeoples: IPersonaProps[] | undefined, column: IColumn) => {
    setFilterValue(selectedPeoples!.length > 0 ? selectedPeoples : undefined);

    column.data.onFilterChange(selectedPeoples!.length > 0 ? selectedPeoples : undefined, column);
  }

  const handleDropdownTitleRender = (props: IDropdownOption<any>[] | undefined, defaultRender: ((props?: IDropdownOption<any>[] | undefined) => JSX.Element | null) | undefined, column: IColumn): JSX.Element | null => {
    return (
      <Stack horizontal horizontalAlign='space-between'>
        {defaultRender!(props)}
        <IconButton
          iconProps={{iconName: "Clear"}}
          onClick={event => handleClearFilterClick(event, column)}
        />
      </Stack>
    );
  }

  const handleDropdownChange = (selectedOption: IDropdownOption<any> | undefined, column: IColumn) => {
    setFilterValue(selectedOption?.key);

    column.data.onFilterChange(selectedOption?.key, column);
  }

  const handleTextFilterSuffixRender = (column: IColumn) => {
    if (filterValue) {
      return (
        <ActionButton
          iconProps={{iconName: "Clear"}}
          onClick={event => handleClearFilterClick(event, column)}
        />
      )
    } else {
      return null;
    }
  }

  const handleTextFilterChange = (newValue: string | undefined, column: IColumn) => {
    setFilterValue(newValue ?? "");
    column.data.onFilterChange(newValue, column);
  }

  const renderFilterField = (column: IColumn): JSX.Element => {
    const fieldType: ITableDataTypes = column.data?.renderType;
    switch (fieldType.filterFieldType) {
      case "number":
        return (
          <Stack horizontal verticalAlign="center">
            <SpinButton
              value={filterValue ?? 0}
              onChange={(_, newValue: string | undefined) => handleSpinButtonChange(newValue, column)}
            />
            <ActionButton
              style={filterValue !== undefined ? {visibility: "visible"} : {visibility: "hidden"}}
              iconProps={{iconName: "Clear"}}
              onClick={(event) => handleClearFilterClick(event, column)}
            />
          </Stack>
        );
      case "datepicker":
        return (
          <Stack tokens={{childrenGap: "10px"}}>
            <DatePicker
              label="From"
              value={filterValue?.from ? filterValue.from : undefined}
              onSelectDate={date => handleDateFilterChange(date, "from", column)}
              formatDate={date => moment(date).format("DD MMM yyyy")}
              styles={{icon: filterValue?.from ? {display: "none"} : {display: "block"}}}
              textField={{
                styles: {suffix: {padding: "0 4px"}},
                onRenderPrefix: filterValue?.from ? () => handleDateFilterPrefixRender() : undefined,
                onRenderSuffix: filterValue?.from ? () => handleDateFilterSuffixRender(column, "from") : undefined
              }}
              maxDate={filterValue?.to ? new Date(moment(filterValue?.to.toString()).format("DD MMM yyyy")) : undefined}
            />

            <DatePicker
              label="To"
              value={filterValue?.to ? filterValue.to : undefined}
              onSelectDate={date => handleDateFilterChange(date, "to", column)}
              formatDate={date => moment(date).format("DD MMM yyyy")}
              styles={{icon: filterValue?.to ? {display: "none"} : {display: "block"}}}
              textField={{
                styles: {suffix: {padding: "0 4px"}},
                onRenderPrefix: filterValue?.to ? () => handleDateFilterPrefixRender() : undefined,
                onRenderSuffix: filterValue?.to ? () => handleDateFilterSuffixRender(column, "to") : undefined
              }}
              minDate={filterValue?.from ? new Date(moment(filterValue?.from.toString()).format("DD MMM yyyy")) : undefined}
            />
          </Stack>
        );
      case "peoplepicker":
        return (
          <PeoplePicker
            peopleList={column.data.filterOptions ?? []}
            onChange={selectedPeoples => handlePeoplePickerChange(selectedPeoples, column)}
          />
        );
      case "select.boolean":
        return (
          <Dropdown
            selectedKey={filterValue ?? ""}
            options={[{key: "false", text: "No"}, {key: "true", text: "Yes"}]}
            onRenderTitle={(props, defaultRender) => handleDropdownTitleRender(props, defaultRender, column)}
            onChange={(_, option) => handleDropdownChange(option, column)}
          />
        );
      case "select.string":
        return (
          <Dropdown
            selectedKey={filterValue ?? ""}
            options={column.data.filterOptions ?? []}
            onRenderTitle={(props, defaultRender) => handleDropdownTitleRender(props, defaultRender, column)}
            onChange={(_, option) => handleDropdownChange(option, column)}
          />
        );
      case "text":
      default:
        return (
          <TextField
            styles={{suffix: {padding: 0}}}
            value={filterValue ?? ""}
            onRenderSuffix={() => handleTextFilterSuffixRender(column)}  
            onChange={(_, newValue: string | undefined) => handleTextFilterChange(newValue, column)}
          />
        );
    }
  }

  const isFilterValueFilled = () => {
    if (filterValue) {
      if (typeof filterValue === "object" && !!!Array.isArray(filterValue)) {
        if (filterValue?.from || filterValue?.to) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  return (
    <React.Fragment>
      <span className={headerStyle} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
        {tooltipProps.children}
        {((tooltipProps.column?.data.onFilterChange && isMouseOver) || isFilterValueFilled() || !!!isCalloutHidden) &&
          <IconButton
            id={filterButtonId}
            iconProps={isFilterValueFilled() ? activeFilterIcon : filterSettingsIcon}
            onClick={handleFilterClick}
          />
        }
      </span>
      
      <Callout
        setInitialFocus
        role="dialog"
        target={`#${filterButtonId}`}
        hidden={isCalloutHidden}
        gapSpace={0}
        isBeakVisible={false}
        onDismiss={hideCallout}
        styles={{
          calloutMain: {
            width: "300px",
            padding: "20px 24px",
          }
        }}
      >
        <Stack horizontalAlign="end">
          <IconButton
            iconProps={{iconName: "Cancel"}}
            onClick={hideCallout}
          />
        </Stack>
        <Stack>
          <Label>Filter column by {tooltipProps.column?.name}</Label>
          {renderFilterField(tooltipProps.column!)}
        </Stack>
      </Callout>
    </React.Fragment>
  );
}

export default DetailsHeaderTooltip;