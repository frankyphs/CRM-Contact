import { Text, Subtitle1 } from "@fluentui/react-components"
import { Person28Regular } from "@fluentui/react-icons"
import Form from "../components/Form/Form"
import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
const baseUrl = import.meta.env.VITE_APP_BASE_URL;
const baseUrlLogs = import.meta.env.VITE_APP_BASE_URL_LOGS;

import axios from "axios";
import { Contact, IDataLog } from "../data"

interface IDefaultValue {
  email: string,
  phone: string,
  first_name: string,
  last_name: string,
  // customField: {
  //   // customName: "Kitameraki"
  // },
  nameOrganization: string,
  addressOrganization: string
}

const PeopleDetail = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [jsonData, setJsonData] = useState<any>(null);
  const [jsonDataLog, setJsonDataLog] = useState<any>(null);
  const [defaultValuePeople, setDefaultValuePeople] = useState<IDefaultValue>({
    email: "",
    phone: "",
    first_name: "",
    last_name: "",
    // customField: {
    //   // customName: "Kitameraki"
    // },
    nameOrganization: "",
    addressOrganization: ""
  });


  useEffect(() => {
    if (jsonData) {
      setDefaultValuePeople({
        email: jsonData?.email?.[0]?.value,
        phone: jsonData?.phone?.[0]?.value,
        first_name: jsonData?.firstName,
        last_name: jsonData?.lastName,
        nameOrganization: jsonData?.organization?.name,
        addressOrganization: jsonData?.organization?.address,
      });
    }
  }, [jsonData]);

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
          console.log(response, "hhhhh")
          // if (response.status !== 200) {
          //   console.log("")
          //   navigate("/organizations")
          //   throw new Error("Error fetching template");
          // }

          const jsonData = response.data.data;
          setJsonData(jsonData);
        } catch (error) {
          if (axios.isAxiosError(error)) {
            if (error.message.includes('404')) {
              navigate('/not-found');
            }
          }
          console.log(error);
        }
      }
    };

    const fetchLogById = async () => {
      if (id) {
        try {
          const response = await axios.get(
            `${baseUrlLogs}/api/v1/contactlog/${id}`
          );

          if (response.status !== 200) {
            throw new Error("Error fetching template");
          }
          const jsonData = response.data.data;
          setJsonDataLog(jsonData);
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
  }, [jsonData])



  function formatLogText(logEntry: IDataLog) {
    const { fieldKey, newValue, oldValue } = logEntry.dataChanges[0];
    const logTime = logEntry.logTime

    if (fieldKey === "phone" || fieldKey === "email") {
      if (oldValue === undefined || oldValue == "") {
        return `${logTime} - ${fieldKey} created`;
      } else if (newValue == "") {
        return `${logTime} - ${fieldKey} deleted`;
      } else {
        return `${logTime} - ${fieldKey} updated to ${(newValue as Contact[])[0].value}`;
      }
    } else if (fieldKey === "createdOn") {
      return `${logTime} - People created`;
    }
    else {
      if (oldValue === undefined || oldValue == "") {
        return `${logTime} - ${fieldKey} created`;
      } else if (newValue == undefined) {
        return `${logTime} - ${fieldKey} deleted`;
      }
      else {
        return `${logTime} - ${fieldKey} updated to ${newValue}`;
      }
    }
  }

  const renderedText = jsonDataLog?.map((logEntry: any, index: any) => (
    <Text key={logEntry.id}>
      <div style={{ margin: "3px 0" }}>
        {index + 1}. {formatLogText(logEntry)}
      </div>
    </Text>
  ));


  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", height: "85px", width: "100%", marginBottom: "20px", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", padding: "0 30px", gap: "20px", alignItems: "center" }}>
          <div style={{ width: "35px", height: "35px", borderRadius: "50%", border: "1px solid black", display: "flex", alignItems: "center", justifyContent: "center" }}><Person28Regular /></div>
          {jsonData && (
            <>
              <Text weight="bold">{jsonData.firstName}</Text>
            </>
          )}
        </div>
      </div>
      <div style={{ display: "grid", gap: "20px", gridTemplateColumns: "1fr 1fr" }}>
        <div style={{ width: "500px", height: "100vh" }}>
          <div style={{ margin: "20px 0" }}>
            {defaultValuePeople.first_name && (
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
                    email: defaultValuePeople?.email,
                    phone: defaultValuePeople?.phone,
                    first_name: defaultValuePeople?.first_name,
                    last_name: defaultValuePeople?.last_name,
                    customField: {
                      // customName: "Kitameraki"
                    },

                  }
                }
              />
            )}
          </div>
          <div style={{ margin: "20px 0" }}>
            {defaultValuePeople.first_name && (
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
                    // {
                    //   id: "label",
                    //   label: "Label",
                    //   type: "tags",
                    //   category: "default"
                    // },
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
                    organization: `${defaultValuePeople?.nameOrganization}`,
                    // label: [""],
                    address: `${defaultValuePeople?.addressOrganization}`,
                    customField: {
                      // customName: "Kitameraki"
                    },

                  }
                }
              />
            )}
          </div>
        </div>
        <div style={{ height: "100vh" }}>
          <div style={{ minHeight: "200px", margin: "25px 0" }}>
            <Subtitle1 >History</Subtitle1>
            {renderedText}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PeopleDetail