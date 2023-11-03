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
const baseUrl = import.meta.env.VITE_APP_BASE_URL;
import axios, { AxiosResponse } from "axios";
import OrganizationContext from "../store/organization-context";

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

  const handleDataChange = useHandleDataChange()
  const columnsOfPeople = getColumnsOfPeople(handleDataChange)

  const [columns, setColumns] = useState<ITableV9Column[]>(columnsOfPeople);

  const { dispatchData } = useContext(DataContext)
  const { dispatchOrganization } = useContext(OrganizationContext)

  useEffect(() => {
    const fetchDataPeople = async (): Promise<void> => {
      try {
        const config = {
          headers: {
            'tenantId': '8bb615ce-bd25-4700-a683-72d23daeb44d'
          }
        };

        const response: AxiosResponse<any> = await axios.get(
          `${baseUrl}/api/v1/people`,
          config
        );

        if (response.status !== 200) {
          throw new Error("Error fetching template");
        }
        const jsonData: any = await response.data.data;
        dispatchData({ type: "GET", data: jsonData });
      } catch (error) {
        console.log(error);
      }
    };

    const fetchDataOrganization = async (): Promise<void> => {
      try {
        const config = {
          headers: {
            'tenantId': '8bb615ce-bd25-4700-a683-72d23daeb44d'
          }
        };

        const response: AxiosResponse<any> = await axios.get(
          `${baseUrl}/api/v1/organizations`,
          config
        );

        if (response.status !== 200) {
          throw new Error("Error fetching template");
        }
        const jsonData: any = await response.data.data;
        dispatchOrganization({ type: "GET", data: jsonData });
      } catch (error) {
        console.log(error);
      }
    };

    fetchDataPeople()
    fetchDataOrganization()
  }, [])


  // sort-table
  const [sort, setSort] = useState<ISort>({
    sortDirection: "ascending",
    sortColumn: "name",
  });

  // group-table
  const [groupBy, setGroupBy] = useState("");
  const onGroupByChange = (_?: string, newGroupBy?: string) => {
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