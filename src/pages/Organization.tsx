import { Button } from "@fluentui/react-components"
import { Add16Filled } from "@fluentui/react-icons"
import { TableV9 } from "../components/Table_V9";
import { useState, useContext } from "react";
import { ISort, ITableV9Column } from "../components/Table_V9/utils/Interface";
import OrganizationContext from "../store/organization-context";
import { addOrganizationAction } from "../store/OrganizationProvider";
import { getColumnsOfOrganization } from "./ColumnConfig";


function useHandleDataChange() {
  const organizationContext = useContext(OrganizationContext)
  const { organization, dispatchOrganization } = organizationContext

  return (id: string, key: string, newValue: string) => {
    const dataIndex = organization.findIndex((item) => item.id === id);
    if (dataIndex !== -1) {
      const updatedDataSource = [...organization];
      updatedDataSource[dataIndex][key] = newValue;
      dispatchOrganization(addOrganizationAction(updatedDataSource))
    }
  }
}

const Organizations = () => {
  // global state
  const handleDataChange = useHandleDataChange()
  const columnsOfOrganization = getColumnsOfOrganization(handleDataChange)

  const [columns, setColumns] = useState<ITableV9Column[]>(columnsOfOrganization);
  const dataContext = useContext(OrganizationContext)
  const { organization } = dataContext

  // sort-table
  const [sort, setSort] = useState<ISort>({
    sortDirection: "ascending",
    sortColumn: "name",
  });

  // group-table
  const [groupBy, setGroupBy] = useState("");
  const onGroupByChange = (newGroupBy?: string) => {
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
          <div>
            <Button appearance="primary" icon={<Add16Filled />}>Person</Button>
          </div>
        </div>

        <div style={{ width: "100%", overflowX: "auto" }}>
          <TableV9
            columns={columns}
            dataSource={organization}
            resizable={false}
            sort={sort}
            onSortChange={onSortChange}
            reorderColumnEnabled={true}
            menuShowColumnEnabled={true}
            menuAddColumnEnabled={true}
            onReorderColumn={onReorderColumn}
            onShowHideColumn={onShowHideColumn}
            groupBy={groupBy}
            onGroupByChange={onGroupByChange}
            menuGroupDataSourceEnabled={true}
          />
        </div>
      </div>
    </>
  )
}

export default Organizations