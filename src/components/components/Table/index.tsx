import React from 'react';
import {
  DetailsHeader,
  DetailsList,
  DetailsListLayoutMode,
  FontIcon,
  IColumn,
  IColumnDragDropDetails,
  IContextualMenuItem,
  IDetailsColumnRenderTooltipProps, 
  IDetailsHeaderProps, 
  IDetailsRowProps, 
  IconButton, 
  Persona, 
  PersonaSize, 
  SelectionMode,  
  Stack,  
  Toggle,  
  TooltipHost,  
  initializeIcons,
} from '@fluentui/react';
import DetailsHeaderTooltip from './DetailsHeaderTooltip';
import { ITableColumn, ITableDataTypes, ITableProps, IUser } from '../../utils/Interfaces';
import { JSONSchema7 } from '../../utils/SchemaInterface';
import moment from 'moment';

initializeIcons();
const Table: React.FunctionComponent<ITableProps> = props => {
  const [columns, setColumns] = React.useState<IColumn[]>([]);
  const [columnSettings, setColumnSettings] = React.useState<IContextualMenuItem[]>([]);

  const [sort, setSort] = React.useState<string>();
  const [order, setOrder] = React.useState<"desc" | "asc">();

  const settingButtonStyle: any = {
    position: "absolute",
    top: "16px",
    right: 0,
    zIndex: 1,
    backgroundColor: "white",
    padding: "5px 0"
  };

  const handleColumnClick = React.useCallback((event: React.MouseEvent<HTMLElement, MouseEvent>, column: IColumn) => {
    setSort(column.key);

    let newOrder: "desc" | "asc" = "desc";
    if (sort === column.key && order === "desc") newOrder = "asc";
    else newOrder = "desc";

    setOrder(newOrder);

    column.data.onSortClick(newOrder, column);
  }, [sort, order]);

  const handleColumnRender = (row: any, index: number | undefined, column: IColumn | undefined) => {
    if (column?.data?.onRenderCell) {
      return column.data.onRenderCell(row, column);
    } else {
      if (column?.data?.renderType) {
        switch (column.data.renderType.cellType) {
          case "string":
          case "number":
          case "integer":
            return <Stack key={column.key + index} horizontalAlign={column.data.textAlign ?? "start"}>{row[column.fieldName!]?.toString()}</Stack>
          case "string.date":
            return <Stack key={column.key + index} horizontalAlign={column.data.textAlign ?? "start"}>{moment(row[column.fieldName!]).format("DD MMM yyyy")}</Stack>
          case "boolean":
            return (
              <Stack key={column.key + index} horizontalAlign={column.data.textAlign ?? "start"}>
                <FontIcon iconName={row[column.fieldName!] ? "Checkmark" : "Cancel"} style={row[column.fieldName!] ? {color: "green"} : {color: "red"}} />
              </Stack>
            );
          case "array.string":
            if (Array.isArray(row[column.fieldName!])) {
              return <Stack key={column.key + index} horizontalAlign={column.data.textAlign ?? "start"}>{row[column.fieldName!].join(", ")}</Stack>;
            } else {
              return <Stack key={column.key + index} horizontalAlign={column.data.textAlign ?? "start"}>{row[column.fieldName!]}</Stack>
            }
          case "array.date":
            if (Array.isArray(row[column.fieldName!])) {
              return <Stack key={column.key + index} horizontalAlign={column.data.textAlign ?? "start"}>{row[column.fieldName!].map((date: string) => moment(date).format("DD MMM yyyy")).join(", ")}</Stack>
            } else {
              return <Stack key={column.key + index} horizontalAlign={column.data.textAlign ?? "start"}>{moment(row[column.fieldName!]).format("DD MMM yyyy")}</Stack>
            }
          case "array.persona":
            if (Array.isArray(row[column.fieldName!])) {
              return (
                <Stack key={column.key + index} horizontal horizontalAlign={column.data.textAlign ?? "text"}>
                  {row[column.fieldName!].map((user: IUser) => (
                    <TooltipHost key={user.id} content={user.name}>
                      <Persona hidePersonaDetails
                        id={user.id}
                        key={user.id}
                        size={PersonaSize.size24}
                        text={user.name}
                        secondaryText={user.email}
                      />
                    </TooltipHost>
                  ))}
                </Stack>
              )
            }
          case "persona":
            return (
              <Stack key={column.key + index} horizontalAlign={column.data.textAlign ?? "start"}>
                <Persona hidePersonaDetails
                  id={row[column.fieldName!]?.id}
                  key={row[column.fieldName!]?.id}
                  size={PersonaSize.size24}
                  text={row[column.fieldName!]?.name}
                  secondaryText={row[column.fieldName!]?.email}
                />
              </Stack>
            );
          default:
            return null;
        }
      } else {
        return null;
      }
    }
  }

  const handleColumnSettingRender = (item: IContextualMenuItem) => {
    const toggleStyles = {root: {margin: 0}};
    
    return (
      <Stack
        horizontal
        horizontalAlign="space-between"
        verticalAlign="center"
        tokens={{childrenGap: "10px"}}
        style={{padding: "8px 15px"}}
      >
        <div>{item.text}</div>
        <Toggle
          onText="On"
          offText="Off"
          checked={item.data.checked}
          styles={toggleStyles}
          onChange={(_, checked: boolean | undefined) => { props.onColumnToggle!(checked ?? true, item.data.column) }}
          onClick={() => {console.log(" toggle clicked ")}}
        />
      </Stack>
    )
  }

  const handleRenderDetailsHeader = (headerProps: IDetailsHeaderProps | undefined) => {
    return (
      <DetailsHeader
        {...headerProps!}
        onRenderColumnHeaderTooltip={handleRenderColumnHeaderTooltip}
      />
    );
  }

  const handleRenderColumnHeaderTooltip = (tooltipProps: IDetailsColumnRenderTooltipProps | undefined) => {
    return <DetailsHeaderTooltip tooltipProps={tooltipProps!}  />
  }

  const handleColumnResize = (column: IColumn | undefined, newWidth: number | undefined) => {
    props.onColumnResize!(newWidth!, column!);
  }

  const handleRenderRow = (rowProps?: IDetailsRowProps | undefined, defaultRender?: ((props?: IDetailsRowProps | undefined) => JSX.Element | null) | undefined): JSX.Element | null => {
    return (
      <div key={rowProps?.id} onDoubleClick={() => props.onRowDoubleClick!(rowProps?.item)}>
        {defaultRender!(rowProps)}
      </div>
    );
  }

  const handleColumnDrop = (dragDropDetails: IColumnDragDropDetails) => {
    const column: IColumn = columns[dragDropDetails.draggedIndex];
    props.onColumnDrop!(dragDropDetails, column);
  }

  const getTypeFromSchema = (column: ITableColumn, schema: JSONSchema7): ITableDataTypes => {
    if (column.fieldName && !!!column.onRenderCell) {
      let schemaProperty: any = schema.properties![column.fieldName];

      switch (schemaProperty.type) {
        case "string":
          if (schemaProperty["format"]) {
            if (schemaProperty["format"] === "date") return {cellType: "string.date", filterFieldType: "datepicker"};
            else if (schemaProperty["format"] === "date-time") return {cellType: "string.date", filterFieldType: "datepicker"};
          } else if (Array.isArray(schemaProperty["enum"]) && schemaProperty["enum"].length > 0) {
            return {cellType: "string", filterFieldType: "select.string"};
          } else {
            return {cellType: "string", filterFieldType: "text"};
          }
        case "number":
        case "integer":
          return {cellType: "string", filterFieldType: "number"};
        case "boolean":
          return {cellType: "boolean", filterFieldType: "select.boolean"};
        case "array":
          switch (schemaProperty.items?.type) {
            case "string": 
              if (schemaProperty["format"] && schemaProperty["format"] === "date") {
                return {cellType: "array.date", filterFieldType: "datepicker"};
              } else if (Array.isArray(schemaProperty["enum"]) && schemaProperty["enum"].length > 0) {
                return {cellType: "array.string", filterFieldType: "select.string"};
              } else {
                return {cellType: "array.string", filterFieldType: "text"};
              }
            default:
              const typeRef: string | undefined = schemaProperty["items"]["$ref"];
              if (typeRef) {
                const objectType: string = typeRef.split("/")[2];

                if (objectType === "User") return {cellType: "array.persona", filterFieldType: "peoplepicker"};
                else return {cellType: "array.string", filterFieldType: "peoplepicker"};
              } else {
                return {cellType: "array.string", filterFieldType: "text"};
              }
          }
        default:
          const typeRef: string | undefined = schemaProperty["$ref"];
          if (typeRef) {
            const objectType: string = typeRef.split("/")[2];

            if (objectType === "User") return {cellType: "persona", filterFieldType: "peoplepicker"};
            else return {cellType: "string", filterFieldType: "text"};
          } else {
            return {cellType: "string", filterFieldType: "text"};
          }
      } 
    } else {
      return {cellType: "string", filterFieldType: "text"};
    }
  }

  React.useEffect(() => {
    let processedColumns: IColumn[] = [];
    let processedColumnSettings: IContextualMenuItem[] = [];

    for (const column of props.columns) {
      let processedColumn: IColumn = {} as IColumn;

      if (column.hidden === undefined || column.hidden === false) {
        processedColumn = {
          key: column.key,
          name: column.name,
          fieldName: column.fieldName,
          minWidth: column.minWidth ?? 0,
          isSorted: sort === column.key,
          isSortedDescending: sort === column.key && order === "desc",
          onColumnClick: column.onSortClick ? handleColumnClick : undefined,
          data: {
            onSortClick: column.onSortClick,
            onFilterChange: column.onFilterChange,
            onRenderCell: column.onRenderCell,
            renderType: props.schema ? getTypeFromSchema(column, props.schema) : {cellType: "string", filterFieldType: "text"},
            filterOptions: column.filterOptions,
            textAlign: column.textAlign
          },
          styles: {
            cellTitle: {
              justifyContent: "center",
              width: "100%"
            }
          },
          onRender: handleColumnRender,
          isResizable: props.onColumnResize ? true : false
        };

        processedColumns.push(processedColumn);
      }
      
      if (props.onColumnToggle && column.toggleable) {
        processedColumnSettings.push({
          key: column.key,
          text: column.name,
          onRender: handleColumnSettingRender,
          data: {
            checked: column.hidden ? false : true,
            column: processedColumn
          }
        });
      }
    }

    setColumns(processedColumns);
    setColumnSettings(processedColumnSettings);
  }, [props.columns, sort, order]);

  return (
    <div style={{position: "relative"}}>
      <DetailsList compact
        layoutMode={DetailsListLayoutMode.justified}
        selectionMode={SelectionMode.none}
        columns={columns}
        items={props.items}
        onRenderDetailsHeader={handleRenderDetailsHeader}
        onColumnResize={props.onColumnResize ? handleColumnResize : undefined}
        columnReorderOptions={
          props.onColumnDrop ?
          { 
            frozenColumnCountFromStart: 0,
            frozenColumnCountFromEnd: 0,
            onColumnDrop: handleColumnDrop
          }
          :
          undefined
        }
        onRenderRow={props.onRowDoubleClick ? handleRenderRow : undefined}
      />
      
      {columnSettings.length > 0 &&
        <div style={settingButtonStyle}>
          <IconButton
            menuProps={{
              items: columnSettings,
              directionalHintFixed: true
            }}
            iconProps={{iconName: "Settings"}}
          />
        </div>
      }
    </div>
  );
}

export default Table;