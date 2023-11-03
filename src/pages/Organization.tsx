import {
  Button, Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
} from "@fluentui/react-components"
import { useEffect } from "react"
import { Add16Filled } from "@fluentui/react-icons"
import { TableV9 } from "../components/Table_V9";
import { useState, useContext } from "react";
import { ISort, ITableV9Column } from "../components/Table_V9/utils/Interface";
import OrganizationContext from "../store/organization-context";
import { getColumnsOfOrganization } from "./ColumnConfig";
import Form from "../components/Form/Form";
import { patchOrganization } from "../services";
import { IDataSourceOrganization } from "../data";
const baseUrl = import.meta.env.VITE_APP_BASE_URL;
import axios, { AxiosResponse } from "axios";

function useHandleDataChange() {
  const organizationContext = useContext(OrganizationContext)
  const { organization } = organizationContext
  const [datum, setDatum] = useState<IDataSourceOrganization[]>()
  useEffect(() => {
    setDatum(organization)
  }, [organization])

  return (id: string, key: string, newValue: string) => {
    const dataIndex = datum?.findIndex((item) => item.id === id);
    if (dataIndex !== -1) {
      let dataUpdated = {
        [key]: newValue
      };
      patchOrganization(dataUpdated, id)
    }
  }
}

const Organizations = () => {
  // global state
  const handleDataChange = useHandleDataChange()
  const columnsOfOrganization = getColumnsOfOrganization(handleDataChange)

  const [columns, setColumns] = useState<ITableV9Column[]>(columnsOfOrganization);
  const organizationContext = useContext(OrganizationContext)
  const { organization } = organizationContext

  const { dispatchOrganization } = useContext(OrganizationContext)

  useEffect(() => {
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

  // sort function
  const onSortChange = (sort?: ISort) => {
    setSort({
      sortColumn: sort?.sortColumn,
      sortDirection: sort?.sortDirection,
    });
  };

  // show hide column
  const onShowHideColumn = (newColumns?: ITableV9Column[]) => {
    newColumns && setColumns(newColumns);
  };

  // drag and drop column 
  const onReorderColumn = (
    newColumns?: ITableV9Column[],
  ) => {
    newColumns && setColumns(newColumns);
  };

  return (
    <>
      <div style={{ padding: "20px 40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Dialog>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="primary" icon={<Add16Filled />}>Organization</Button>
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
                          id: "organization",
                          label: "Name",
                          type: "text",
                          category: "default"
                        },
                        {
                          id: "address",
                          label: "Address",
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
                          id: "people",
                          label: "People",
                          type: "text",
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
            dataSource={organization}
            resizable={false}
            loading={organization.length > 0 ? false : true}
            sort={sort}
            onSortChange={onSortChange}
            reorderColumnEnabled={true}
            menuShowColumnEnabled={organization.length > 0 ? true : false}
            onReorderColumn={onReorderColumn}
            onShowHideColumn={onShowHideColumn}
            groupBy={groupBy}
            onGroupByChange={onGroupByChange}
            menuGroupDataSourceEnabled={organization.length > 0 ? true : false}
          />
        </div>
      </div>
    </>
  )
}

export default Organizations