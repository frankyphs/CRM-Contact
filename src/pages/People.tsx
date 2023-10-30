import { Button } from "@fluentui/react-components"
import { Add16Filled } from "@fluentui/react-icons"
import { TableV9 } from "../components/Table_V9";
import { useState, useContext } from "react";
import { ISort, ITableV9Column } from "../components/Table_V9/utils/Interface";
import DataContext from "../store/people-context";
import { addDataAction } from "../store/PeopleProvider"
import { getColumnsOfPeople } from "./ColumnConfig";

function useHandleDataChange() {
  const dataContext = useContext(DataContext)
  const { data, dispatchData } = dataContext

  return (id: string, key: string, newValue: string) => {
    const dataIndex = data.findIndex((item) => item.id === id);
    if (dataIndex !== -1) {
      const updatedDataSource = [...data];
      updatedDataSource[dataIndex][key] = newValue;
      dispatchData(addDataAction(updatedDataSource))
    }
  }
}

const People = () => {
  // global state
  const handleDataChange = useHandleDataChange()
  const columnsOfPeople = getColumnsOfPeople(handleDataChange)

  const [columns, setColumns] = useState<ITableV9Column[]>(columnsOfPeople);
  const dataContext = useContext(DataContext)
  const { data } = dataContext

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
          <div>
            <Button appearance="primary" icon={<Add16Filled />}>Person</Button>
          </div>
        </div>

        <div style={{ width: "100%", overflowX: "auto" }}>
          <TableV9
            columns={columns}
            dataSource={data}
            resizable={true}
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

export default People