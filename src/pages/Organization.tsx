import { Button } from "@fluentui/react-components"
import { Add16Filled } from "@fluentui/react-icons"
import { TableV9 } from "../components/Table_V9";
import { useState, useContext } from "react";
import { ISort, ITableV9Column } from "../components/Table_V9/utils/Interface";
import { IDataSourceBasic } from "../data";
import { dataSourceDummyOrganization } from "../data";
import OptionContext from "../store/option-context";
import { InputText } from "../input/InputText";
import { InputDropdown } from "../input/InputDropdown";



function getLabelFromId(id: string) {
  const optionContext = useContext(OptionContext);
  const { options } = optionContext;
  const option = options.find(option => option.id === id);
  return option ? option.label : id;
}

const Organizations = () => {
  const columnsOfPeople = [
    {
      key: "organization",
      label: "Name",
      dataIndex: "organization",
      minWidth: 200,
      compare: (a: IDataSourceBasic, b: IDataSourceBasic) => {
        return (a.organization ?? "").localeCompare(b.organization ?? "");
      },
      onRenderDataSource: (data: IDataSourceBasic) => {
        if (data.organization !== undefined) {
          return (
            <InputText
              data={data.organization}
              onChange={(newName: string) => handleDataChange(data.id, "organization", newName)}
              type="text"
              onClickNavRouter={true}
            />
          );
        } else {
          return null;
        }
      },
    },
    {
      key: "label",
      label: "Label",
      dataIndex: "label",
      compare: (a: IDataSourceBasic, b: IDataSourceBasic) => {
        const labelA = getLabelFromId(a.label || "");
        const labelB = getLabelFromId(b.label || "");
        return labelA.localeCompare(labelB);
      },
      minWidth: 250,
      onRenderDataSource: (data: IDataSourceBasic) => {
        if (data.label !== undefined) {
          return (
            <InputDropdown
              type="tags"
              data={data.label}
              onChange={(newName: string) => handleDataChange(data.id, "label", newName)}
            />
          );
        } else {
          return null;
        }
      },
    },
    {
      key: "address",
      label: "Address",
      dataIndex: "address",
      minWidth: 200,
      compare: (a: any, b: any) => {
        return a.address.localeCompare(b.address);
      },
      onRenderDataSource: (data: IDataSourceBasic) => {
        if (data.address !== undefined) {
          return (
            <InputText
              data={data.address}
              onChange={(newName: string) => handleDataChange(data.id, "address", newName)}
              type="text"
            />
          );
        } else {
          return null
        }
      },
    },
    {
      key: "people",
      label: "People",
      minWidth: 200,
      dataIndex: "people",
      compare: (a: any, b: any) => {
        return a.people.localeCompare(b.people);
      },
      onRenderDataSource: (data: IDataSourceBasic) => {
        if (data.people !== undefined) {
          return (
            <InputText
              data={data.people}
              onChange={(newName: string) => handleDataChange(data.id, "people", newName)}
              type="text"
            />
          );
        } else {
          return
        }
      },
    },
  ];

  const [columns, setColumns] = useState<ITableV9Column[]>(columnsOfPeople);
  const [dataSource, setDataSource] = useState<IDataSourceBasic[]>(dataSourceDummyOrganization);
  const [sort, setSort] = useState<ISort>({
    sortDirection: "ascending",
    sortColumn: "name",
  });
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

  //
  const onReorderColumn = (
    newColumns?: ITableV9Column[],
  ) => {
    newColumns && setColumns(newColumns);
  };

  // function update data source
  const handleDataChange = (id: string, key: string, newValue: string) => {
    const dataIndex = dataSource.findIndex((item) => item.id === id);
    if (dataIndex !== -1) {
      const updatedDataSource = [...dataSource];
      updatedDataSource[dataIndex][key] = newValue;
      setDataSource(updatedDataSource);
    }
  };

  return (
    <>
      <div style={{ padding: "20px 40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <Button appearance="primary" icon={<Add16Filled />}>Person</Button>
          </div>
        </div>

        <div style={{ width: "100%", overflowX: "clip" }}>
          <TableV9
            columns={columns}
            dataSource={dataSource}
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