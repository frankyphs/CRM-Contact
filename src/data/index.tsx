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

export const dataSourceDummy: IDataSourceBasic[] = [
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
];

export const dataSourceDummyOrganization: IDataSourceBasic[] = [
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



// export const TableComponent = (props: any) => {
//   const [nameValue, setNameValue] = useState(props.data.name);

//   const handleNameChange = (newValue: string) => {
//     setNameValue(newValue);
//     props.onChange(newValue);
//   };

//   return (
//     <div style={{ position: "relative" }}>
//       <NavLink
//         to="/people_detail"
//         style={{
//           marginTop: "5px",
//           backgroundColor: "transparent",
//           position: "absolute",
//           width: "110px",
//           height: "32px",
//           zIndex: "10"
//         }}
//       >
//       </NavLink>
//       <InputField value={nameValue} onChange={handleNameChange} />
//     </div>
//   );
// };


// export const InputNameFix = (props: any) => {
//   const [nameValue, setNameValue] = useState(props.data)

//   const handleNameChange = (newValue: any) => {
//     setNameValue(newValue);
//   };

//   return (
//     <div style={{ position: "relative" }}><NavLink to="/people_detail" style={{ marginTop: "5px", backgroundColor: "transparent", position: "absolute", width: "110px", height: "32px", zIndex: "10" }}>
//     </NavLink><InputField value={nameValue} onChange={handleNameChange} /></div>
//   )
// }


// const YourComponent = () => {
//   const [dataSource, setDataSource] = useState(dataSourceDummy);

//   const handleNameChange = (name:any, newValue:any) => {
//     const updatedDataSource = dataSource.map((data) => {
//       if (data.name === name) {
//         return { ...data, nameValue: newValue };
//       }
//       return data;
//     });
//     setDataSource(updatedDataSource);
//   };

//   return (

//   );
// };


