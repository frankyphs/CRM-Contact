import { IDataSourceBasic } from "../data";
import { InputText } from "../input/InputText";
import { getLabelFromId } from "../helper";
import { InputDropdown } from "../input/InputDropdown";

export interface IDataChange {
  (id: string, key: string, newValue: string): void;
}

export const getColumnsOfPeople = (handleDataChange: IDataChange) => ([
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
            typeInput="people"
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
]);

export const getColumnsOfOrganization = (handleDataChange: IDataChange) => ([
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
            typeInput="organization"
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
])