import {
  Button, Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
} from "@fluentui/react-components"
import { Add16Filled } from "@fluentui/react-icons"
import { TableV9 } from "../components/Table_V9";
import { useState, useContext, useEffect } from "react";
import { ISort, ITableV9Column } from "../components/Table_V9/utils/Interface";
import DataContext from "../store/people-context";
import { getColumnsOfPeople } from "./ColumnConfig";
import Form from "../components/Form/Form";
import { patchPeople } from "../services";
import { IDataSourcePeople } from "../data";

function useHandleDataChange() {
  const dataContext = useContext(DataContext)
  const { data } = dataContext
  const [datum, setDatum] = useState<IDataSourcePeople[]>()

  useEffect(() => {
    setDatum(data)
  }, [data])

  return (id: string, key: string, newValue: string) => {
    const dataIndex = datum?.findIndex((item) => item.id === id);
    if (dataIndex !== -1) {
      console.log(id, key, newValue)
      let dataUpdated = ""
      if (key === "phone" || key === "email") {
        dataUpdated = JSON.stringify({
          [key]: [{ value: newValue }],
        });
      } else if (key === "organization") {
        dataUpdated = JSON.stringify({
          organizationId: newValue,
        });
      } else {
        dataUpdated = JSON.stringify({
          [key]: newValue,
        });
      }
      patchPeople(dataUpdated, id)
    }
  }
}

const People = () => {
  // global state
  const dataContext = useContext(DataContext);
  const { data } = dataContext;

  // Memastikan data telah dimuat sebelum menggunakan handleDataChange
  const handleDataChange = useHandleDataChange()
  const columnsOfPeople = getColumnsOfPeople(handleDataChange)

  const [columns, setColumns] = useState<ITableV9Column[]>(columnsOfPeople);

  // sort-table
  const [sort, setSort] = useState<ISort>({
    sortDirection: "ascending",
    sortColumn: "name",
  });


  // group-table
  const [groupBy, setGroupBy] = useState("name");
  const onGroupByChange = (newGroupBy?: string) => {
    newGroupBy && setGroupBy(newGroupBy);
  };

  // sortColumn
  const onSortChange = (sort?: ISort) => {
    setSort({
      sortColumn: sort?.sortColumn,
      sortDirection: sort?.sortDirection,
    });
  };

  // drag and drop column 
  const onReorderColumn = (
    newColumns?: ITableV9Column[],
  ) => {
    newColumns && setColumns(newColumns);
  };

  // show hide column
  const onShowHideColumn = (newColumns?: ITableV9Column[]) => {
    newColumns && setColumns(newColumns);
  };

  return (
    <>
      <div style={{ padding: "20px 40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Dialog>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="primary" icon={<Add16Filled />}>Person</Button>
            </DialogTrigger>
            <DialogSurface>
              <DialogBody>
                <DialogTitle>Add People</DialogTitle>
                <DialogContent>
                  <Button>Simpannnnnnn</Button>
                  <Form
                    formLabel="Details"
                    fieldList={
                      [
                        {
                          id: "first_name",
                          label: "First Name",
                          type: "text",
                          category: "default"
                        },
                        {
                          id: "last_name",
                          label: "Last Name",
                          type: "text",
                          category: "default"
                        },
                        {
                          id: "organization",
                          label: "Organization",
                          type: "text",
                          category: "default"
                        },
                        {
                          id: "label",
                          label: "Tag",
                          type: "tags",
                          category: "default"
                        },
                        {
                          id: "email",
                          label: "Email",
                          type: "email",
                          category: "default"
                        },
                        {
                          id: "phone",
                          label: "Phone",
                          type: "tel",
                          category: "default"
                        },
                      ]
                    }
                    defaultValue={
                      {
                        customField: {
                          // customName: "Kitameraki"
                        },

                      }
                    }
                  />
                </DialogContent>
                <DialogActions>
                  <DialogTrigger disableButtonEnhancement>
                    <Button appearance="secondary">Cancel</Button>
                  </DialogTrigger>
                  <Button appearance="primary">Save</Button>
                </DialogActions>
              </DialogBody>
            </DialogSurface>
          </Dialog>
        </div>
        {/* {JSON.stringify(data)} */}


        <div style={{ width: "100%", overflowX: "auto" }}>
          <TableV9
            columns={columns}
            dataSource={data}
            resizable={true}
            loading={data.length > 0 ? false : true}
            sort={sort}
            onSortChange={onSortChange}
            reorderColumnEnabled={true}
            menuShowColumnEnabled={data.length > 0 ? true : false}
            onReorderColumn={onReorderColumn}
            onShowHideColumn={onShowHideColumn}
            groupBy={groupBy}
            onGroupByChange={onGroupByChange}
            menuGroupDataSourceEnabled={data.length > 0 ? true : false}

          />
        </div>
      </div>
    </>
  )
}

export default People