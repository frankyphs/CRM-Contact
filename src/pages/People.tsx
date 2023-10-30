import { Button } from "@fluentui/react-components"
import { Add16Filled } from "@fluentui/react-icons"
import { TableV9 } from "../components/Table_V9";
import { useEffect, useState, useContext } from "react";
import { ISort, ITableV9Column } from "../components/Table_V9/utils/Interface";
import { IDataSourceBasic, dataSourceDummy } from "../data";
import OptionContext from "../store/option-context";
import { InputText } from "../input/InputText";
import { InputDropdown } from "../input/InputDropdown";

function getLabelFromId(id: string) {
  const optionContext = useContext(OptionContext);
  const { options } = optionContext;
  const option = options.find(option => option.id === id);
  return option ? option.label : id;
}

const People = () => {
  const columnsOfPeople = [
    {
      key: "name",
      label: "Name",
      dataIndex: "name",
      minWidth: 250,
      compare: (a: IDataSourceBasic, b: IDataSourceBasic) => {
        return (a.name ?? "").localeCompare(b.name ?? "");
      },
      onRenderDataSource: (data: IDataSourceBasic) => {
        if (data.name !== undefined) {
          return (
            <InputText
              data={data.name}
              onChange={(newName: string) => handleDataChange(data.id, "name", newName)}
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
              onChange={(newLabel: string) => handleDataChange(data.id, "label", newLabel)}
            />
          );
        } else {
          return null;
        }
      },
    },
    {
      key: "organization",
      label: "Organization",
      dataIndex: "organization",
      minWidth: 250,
      compare: (a: any, b: any) => {
        return a.organization.localeCompare(b.organization);
      },
      onRenderDataSource: (data: IDataSourceBasic) => {
        if (data.organization !== undefined) {
          return (
            <InputText
              data={data.organization}
              onChange={(newName: string) => handleDataChange(data.id, "organization", newName)}
              type="text"
            />
          );
        } else {
          return null;
        }
      },
    },
    {
      key: "email",
      label: "Email",
      minWidth: 250,
      dataIndex: "email",
      compare: (a: any, b: any) => {
        return a.email.localeCompare(b.email);
      },
      onRenderDataSource: (data: IDataSourceBasic) => {
        if (data.email !== undefined) {
          return (
            <InputText
              data={data.email}
              onChange={(newEmail: string) => handleDataChange(data.id, "email", newEmail)}
              type="email"
            />
          );
        } else {
          return null;
        }
      },
    },
    {
      key: "phone",
      label: "Phone",
      dataIndex: "phone",
      minWidth: 250,
      width: 250,
      compare: (a: any, b: any) => {
        return a.phone.localeCompare(b.phone);
      },
      onRenderDataSource: (data: IDataSourceBasic) => {
        if (data.phone !== undefined) {
          return (
            <InputText
              data={data.phone}
              onChange={(newPhone: string) => handleDataChange(data.id, "phone", newPhone)}
              type="text"
            />
          );
        } else {
          return null;
        }
      },
    },
  ];

  const [columns, setColumns] = useState<ITableV9Column[]>(columnsOfPeople);
  const [dataSource, setDataSource] = useState<IDataSourceBasic[]>(dataSourceDummy);
  const [sort, setSort] = useState<ISort>({
    sortDirection: "ascending",
    sortColumn: "name",
  });
  const [groupBy, setGroupBy] = useState("");
  const onGroupByChange = (newGroupBy?: string) => {
    newGroupBy && setGroupBy(newGroupBy);
  };


  useEffect(() => {
    console.log(dataSource, "ini data source")
  }, [dataSource])

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

        <div style={{ width: "100%", overflowX: "auto" }}>
          <TableV9
            columns={columns}
            dataSource={dataSource}
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