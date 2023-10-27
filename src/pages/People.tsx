import { Button } from "@fluentui/react-components"
import { Add16Filled } from "@fluentui/react-icons"
import InputField from "../components/Field/InputField/InputField";
import DropdownField from "../components/Field/DropdownField/DropdownField";
import { TableV9 } from "../components/Table_V9";
import { useEffect, useState, useContext } from "react";

import { ISort, ITableV9Column } from "../components/Table_V9/utils/Interface";
import { IDataSourceBasic, OptionsLabel, dataSourceDummy } from "../data";

import OptionContext from "../store/option-context";
import { addOptionAction } from "../store/OptionProvider";


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

  const optionContext = useContext(OptionContext);
  const { options, dispatchOption } = optionContext;

  useEffect(() => {
    setCancelData(props.data)
  }, [])

  useEffect(() => {
    setNameValue([props.data])
  }, [props.data])

  // if user delete an options on row 2, and the deleted options is on row 1, the row 1 automatically have undefined label
  useEffect(() => {
    if (!options.some(option => option.id === nameValue[0])) {
      props.onChange("")
    }
  }, [options]);

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
    dispatchOption(addOptionAction(newValue));
  };

  const handleOnClear = () => {
    setNameValue([""])
  }

  const handleOnDeleteTag = (newValue: any) => {
    setNameValue(newValue)
  }

  return (
    <DropdownField type={props.type} selectedOptions={nameValue} onChange={handleNameChange} options={options} onSave={handleSave} onCancel={handleCancel} onOptionChange={handleOptionChange} onClear={handleOnClear} onDeleteTag={handleOnDeleteTag} />
  )
}

function getLabelFromId(id: any) {
  const option = OptionsLabel.find(option => option.id === id);
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
        return <InputName data={data.name} onChange={(newName: string) => handleDataChange(data.id, "name", newName)} type="text" />;
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
      key: "organization",
      label: "Organization",
      dataIndex: "organization",
      minWidth: 250,
      compare: (a: any, b: any) => {
        return a.organization.localeCompare(b.organization);
      },
      onRenderDataSource: (data: IDataSourceBasic) => {
        return <InputName data={data.organization} onChange={(newName: string) => handleDataChange(data.id, "organization", newName)} type="text" />
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
        return <InputName data={data.email} onChange={(newName: string) => handleDataChange(data.id, "email", newName)} type="email" />
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
        return <InputName data={data.phone} onChange={(newName: string) => handleDataChange(data.id, "phone", newName)} type="text" />
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