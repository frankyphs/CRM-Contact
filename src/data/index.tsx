export interface IDataSourceBasic {
  id: string
  name?: string
  organization?: string
  email?: string
  phone?: string
  label?: string
  address?: string
  people?: string
  [key: string]: string | undefined;
}

export type KeyValuePair = {
  [x: string]: any;
};

export type Contact = {
  label: string;
  value: string;
  primary: boolean;
};

export type IDataSourceOrganization = {
  id: string,
  name: string,
  address: string,
  createdOn: string,
  updatedOn: string,
  ownerId: string,
  creatorId: string,
  tenantId: string,
  instanceId: string,
  customFields: {
    // officeName-id: string
  }
}

export type IDataSourcePeople = {
  id: string;
  phone: Contact[];
  email: Contact[];
  firstName: string;
  lastName: string;
  createdOn: string;
  updatedOn: string;
  ownerId: string;
  creatorId: string;
  organizationId?: string;
  instanceId?: string;
  tenantId: string;
  customFields: KeyValuePair;
  organization: IDataSourceOrganization;
};

export const defaultOption = [
  { id: "1", label: "religion", data: { color: "#FFF3DA" } },
  { id: "2", label: "education", data: { color: "#DFCCFB" } },
  { id: "3", label: "politic" },
  { id: "4", label: "social", data: { color: "#BC7AF9" } },
  { id: "5", label: "heritage" },
  { id: "6", label: "technology", data: { color: "#FF6969" } },
  { id: "7", label: "economy", data: { color: "#EE9322" } },
  { id: "8", label: "criminal" },
]

export const defaultOrganization = [
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
]

export const defaultPeople = [

  {
    id: "1",
    name: "Alpha",
    organization: "PT.AAA",
    email: "aaa@gmail.com",
    phone: "1111-1111",
    label: "3"
  },
  {
    id: "2",
    name: "Charlie",
    organization: "PT.BBB",
    email: "bbb@gmail.com",
    phone: "2222-2222",
    label: "2"
  },
  {
    id: "3",
    name: "Beta",
    organization: "LTD.ZZZ",
    email: "zzz@gmail.com",
    phone: "9999-1111",
    label: "5"
  },
  {
    id: "4",
    name: "Gama",
    organization: "CV.YYY",
    email: "yyy@gmail.com",
    phone: "8888-1111",
    label: "4"
  },
  {
    id: "5",
    name: "Delta",
    organization: "PT.BAA",
    email: "baa@gmail.com",
    phone: "5555-1111",
    label: "1"
  },
  {
    id: "6",
    name: "Roger",
    organization: "PT.BCA",
    email: "bca@gmail.com",
    phone: "5555-0000",
    label: "7"
  },
  {
    id: "7",
    name: "Fanta",
    organization: "PT.BAC",
    email: "bac@gmail.com",
    phone: "5555-9999",
    label: "8"
  },
  {
    id: "8",
    name: "Yankis",
    organization: "PT.CAB",
    email: "cab@gmail.com",
    phone: "5555-8888",
    label: "6"
  },
]






