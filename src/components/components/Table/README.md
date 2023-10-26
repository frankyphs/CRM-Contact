# Table
A table is a component used to display a list of data. Each column can have different values and types.

## How to use
### Basic
```typescript
  const Main: React.FunctionComponent = (props) => {
    const schema = {
      type: "object",
      properties: {
        id : {
          type: "string"
        },
        name: {
          type: "string"
        },
        age: {
          type: "integer"
        }
      }
    }

    const columns = [{
      key: "id",
      name: "ID",
      fieldName: "id"
    }, {
      key: "name",
      name: "Name",
      fieldName: "name"
    }, {
      key: "age",
      name: "Age",
      fieldName: "age"
    }];

    const items = [{
      id: "1",
      name: "Alex",
      age: 20
    }, {
      id: "2",
      name: "Aaron",
      age: 35
    }];

    return (
      <Table
        schema={schema}
        columns={columns}
        items={items}
      />
    )
  }
```

## Table Props
- `schema: JSONSchema7` : A JSON Schema for table render type based on.
- `items: any[]` : Items to be rendered in table.
- `column: IColumn[]` : Set which columns to render based on the item.
- `theme: string` : Theme for the table.
- `onColumnResize: (newWidth: number, column: IColumn) => void` : Callback for when user resized the column. Defining it allows table column to resize.
- `onColumnDrop?: (dragDropDetails: IColumnDragDropDetails, column: IColumn) => void` : Callback for when user reordered a column. Defining it allows table column to be drag-n-dropped.
- `onColumnToggle?: (state: boolean, column: IColumn) => void` : Callback for when user toggling column visibility. Defining it allows table to have a dropdown to toggle the visibility of columns,
- `onRowDoubleClick?: (row: any, column: IColumn) => any` : Callback for when user double clicks row.