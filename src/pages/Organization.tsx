import { Button } from "@fluentui/react-components"
import { Add16Filled } from "@fluentui/react-icons"
import InputField from "../components/Field/InputField/InputField";
import DropdownField from "../components/Field/DropdownField/DropdownField";
import { TableV9 } from "../components/Table_V9";
import { useEffect, useState } from "react";
import { ISort, ITableV9Column } from "../components/Table_V9/utils/Interface";
import { IOptionsDropdown, IOptionsPersona, IOptionsTag } from "../components/Field/utils/field.interface";
import { OptionsLabel } from "../data";
import { IDataSourceBasic } from "../data";

export const tesOptions = [
  { id: "1", label: "religion", data: { color: "#FFF3DA" } },
  { id: "2", label: "education", data: { color: "#DFCCFB" } },
  { id: "3", label: "politic" },
  { id: "4", label: "social", data: { color: "#BC7AF9" } },
  { id: "5", label: "heritage" },
  { id: "6", label: "technology", data: { color: "#FF6969" } },
  { id: "7", label: "economy", data: { color: "#EE9322" } },
  { id: "8", label: "criminal" },
];

export const dataSourceDummy: IDataSourceBasic[] = [
  {
    id: "1",
    address: "Jalan Alpha",
    organization: "PT.Alpha",
    people: "10",
    label: "3"
  },
  {
    id: "2",
    address: "Jalan Gama",
    organization: "PT.BBB",
    people: "11",
    label: "2"
  },
  {
    id: "3",
    address: "Jalan Beta",
    organization: "LTD.ZZZ",
    people: "9",
    label: "5"
  },
  {
    id: "4",
    address: "Jalan Charli",
    organization: "CV.YYY",
    people: "8",
    label: "4"
  },
];

export const InputName = (props: any) => {
  const [nameValue, setNameValue] = useState(props.data)
  const [cancelData, setCancelData] = useState("")

  useEffect(() => {
    setCancelData(props.data)
  }, [])

  useEffect(() => {
    setNameValue(props.data)
  }, [props.data])

  const handleNameChange = (newValue: any) => {
    setNameValue(newValue);
  };

  const handleSave = (newValue: any) => {
    props.onChange(newValue)
  }

  const handleCancel = () => {
    setNameValue(cancelData)
  }

  return (
    <InputField type={props.type} value={nameValue} onChange={handleNameChange} onSave={handleSave} onCancel={handleCancel} />
  )
}

export const InputDropdown = (props: any) => {
  const [nameValue, setNameValue] = useState([props.data])
  const [cancelData, setCancelData] = useState<string>()
  const [options, setOptions] = useState<IOptionsPersona[] | IOptionsDropdown[] | IOptionsTag[]>(OptionsLabel)

  useEffect(() => {
    setCancelData(props.data)
  }, [])

  useEffect(() => {
    setNameValue([props.data])
  }, [props.data])

  const handleNameChange = (newValue: any) => {
    setNameValue(newValue);
  };

  const handleSave = (newValue: any) => {
    props.onChange(newValue[0])
    setCancelData(newValue[0])
  }

  const handleCancel = () => {
    setNameValue([cancelData])
  }

  const handleOptionChange = (newValue: any) => {
    setOptions(newValue)
  }

  return (
    <DropdownField type={props.type} selectedOptions={nameValue} onChange={handleNameChange} options={options} onSave={handleSave} onCancel={handleCancel} onOptionChange={handleOptionChange} />
  )
}

function getLabelFromId(id: any) {
  const option = tesOptions.find(option => option.id === id);
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
        return <InputName data={data.organization} onChange={(newName: string) => handleDataChange(data.id, "organization", newName)} type="text" />;
      },
    },
    {
      key: "label",
      label: "Label",
      dataIndex: "label",
      compare: (a: IDataSourceBasic, b: IDataSourceBasic) => {
        const labelA = getLabelFromId(a.label);
        const labelB = getLabelFromId(b.label);
        return labelA.localeCompare(labelB);
      },
      minWidth: 250,
      onRenderDataSource: (data: IDataSourceBasic) => {
        return <InputDropdown type="tags" data={data.label} onChange={(newName: string) => handleDataChange(data.id, "label", newName)} />;;
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
        return <InputName data={data.address} onChange={(newName: string) => handleDataChange(data.id, "address", newName)} type="text" />
      },
    },
    {
      key: "people",
      label: "People",
      minWidth: 200,
      dataIndex: "people",
      compare: (a: any, b: any) => {
        return a.email.localeCompare(b.email);
      },
      onRenderDataSource: (data: IDataSourceBasic) => {
        return <InputName data={data.people} onChange={(newName: string) => handleDataChange(data.id, "people", newName)} type="text" />
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

        <div style={{ width: "100%", overflowX: "auto" }}>
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