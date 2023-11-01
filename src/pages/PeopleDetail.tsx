import { Text } from "@fluentui/react-components"
import { Person28Regular } from "@fluentui/react-icons"
import Form from "../components/Form/Form"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
// import { fetchDataPeopleById } from "../services"
const baseUrl = import.meta.env.VITE_APP_BASE_URL;
const baseUrlLogs = import.meta.env.VITE_APP_BASE_URL_LOGS;

import axios from "axios";


const PeopleDetail = () => {
  const { id } = useParams<{ id: string }>()

  const [jsonData, setJsonData] = useState<any>(null);
  const [jsonDataLog, setJsonDataLog] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const config = {
            headers: {
              'tenantId': '8bb615ce-bd25-4700-a683-72d23daeb44d'
            }
          };

          const response = await axios.get(
            `${baseUrl}/api/v1/people/${id}`,
            config
          );

          if (response.status !== 200) {
            throw new Error("Error fetching template");
          }

          const jsonData = response.data.data;
          setJsonData(jsonData); // Simpan data ke dalam state
        } catch (error) {
          console.log(error);
        }
      }
    };

    const fetchLogById = async () => {
      if (id) {
        try {
          // const config = {
          //   headers: {
          //     'tenantId': '8bb615ce-bd25-4700-a683-72d23daeb44d'
          //   }
          // };

          const response = await axios.get(
            `${baseUrlLogs}/api/v1/contactlog/${id}`
          );

          if (response.status !== 200) {
            throw new Error("Error fetching template");
          }

          const jsonData = response.data.data;
          setJsonDataLog(jsonData); // Simpan data ke dalam state
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchData();
    fetchLogById()
  }, [id]);

  useEffect(() => {
    console.log(jsonData)
  }, [])

  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", height: "85px", width: "100%", marginBottom: "20px", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", padding: "0 30px", gap: "20px", alignItems: "center" }}>
          <div style={{ width: "35px", height: "35px", borderRadius: "50%", border: "1px solid black", display: "flex", alignItems: "center", justifyContent: "center" }}><Person28Regular /></div>
          {jsonData && (
            <Text weight="bold">{jsonData.firstName}</Text>
          )}
          {/* <DropdownField type="tags" /> */}
        </div>
      </div>
      <div style={{ display: "grid", gap: "20px", gridTemplateColumns: "1fr 1fr" }}>
        <div style={{ width: "500px", height: "100vh" }}>
          <div style={{ margin: "20px 0" }}>
            <Form
              formLabel="Details"
              fieldList={
                [
                  {
                    id: "email",
                    label: "Email",
                    type: "email",
                    category: "default"
                  },
                  {
                    id: "phone",
                    label: "Phone",
                    type: "tel",
                    category: "default"
                  },
                  {
                    id: "first_name",
                    label: "First Name",
                    type: "text",
                    category: "default"
                  },
                  {
                    id: "last_name",
                    label: "Last Name",
                    type: "text",
                    category: "default"
                  }
                ]
              }
              defaultValue={
                {
                  email: "test",
                  phone: "1111-1111",
                  first_name: "Katri",
                  last_name: "Athokas",
                  customField: {
                    // customName: "Kitameraki"
                  },

                }
              }
            />
          </div>
          <div style={{ margin: "20px 0" }}>
            <Form
              formLabel="Organizations"
              fieldList={
                [
                  {
                    id: "organization",
                    label: "Name",
                    type: "text",
                    category: "default"
                  },
                  {
                    id: "label",
                    label: "Label",
                    type: "tags",
                    category: "default"
                  },
                  {
                    id: "address",
                    label: "Address",
                    type: "text",
                    category: "default"
                  },
                ]
              }
              defaultValue={
                {
                  organization: "Kitameraki",
                  label: [""],
                  address: "Yogyakarta",
                  customField: {
                    // customName: "Kitameraki"
                  },

                }
              }
            />
          </div>
        </div>
        <div style={{ height: "100vh" }}>
          <div style={{ minHeight: "200px", border: "1px solid red", margin: "20px 0" }}>
            {JSON.stringify(jsonDataLog)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PeopleDetail