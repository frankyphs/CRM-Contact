import { Text, Subtitle1 } from "@fluentui/react-components"
import { Building32Regular } from "@fluentui/react-icons"
import Form from "../components/Form/Form"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
const baseUrl = import.meta.env.VITE_APP_BASE_URL;
const baseUrlLogs = import.meta.env.VITE_APP_BASE_URL_LOGS;

import axios from "axios";

const OrganizationDetail = () => {
  const { id } = useParams<{ id: string }>()
  const [jsonData, setJsonData] = useState<any>(null);
  const [jsonDataLog, setJsonDataLog] = useState<any>(null);
  const [defaultValueOrganization, setDefaultValueOrganization] = useState<any>({
    name: "",
    address: "",
  });
  useEffect(() => {
    // console.log(jsonData, "..............")
    if (jsonData) {
      setDefaultValueOrganization({
        name: jsonData?.name,
        address: jsonData?.address || "",
      });
    }
  }, [jsonData]);

  useEffect(() => {
    const fetchDataOrganizationById = async () => {
      if (id) {
        try {
          const config = {
            headers: {
              'tenantId': '8bb615ce-bd25-4700-a683-72d23daeb44d'
            }
          };

          const response = await axios.get(
            `${baseUrl}/api/v1/organizations/${id}`,
            config
          );

          if (response.status !== 200) {
            throw new Error("Error fetching template");
          }

          const jsonData = response.data.data;
          setJsonData(jsonData);
        } catch (error) {
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
          setJsonDataLog(jsonData); // Simpan data ke dalam state
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchDataOrganizationById();
    fetchLogById()
  }, [id]);

  function formatLogText(logEntry: any) {
    const { fieldKey, newValue, oldValue } = logEntry.dataChanges[0];
    const logTime = logEntry.logTime

    if (fieldKey === "phone" || fieldKey === "email") {
      if (oldValue === undefined || oldValue == "") {
        return `${logTime} - ${fieldKey} created`;
      } else if (newValue == "") {
        return `${logTime} - ${fieldKey} deleted`;
      } else {
        return `${logTime} - ${fieldKey} updated to ${newValue[0].value}`;
      }
    } else if (fieldKey === "createdOn") {
      return `${logTime} - Organization created`;
    }
    else {
      if (oldValue === undefined || oldValue == "") {
        return `${logTime} - ${fieldKey} created`;
      } else if (newValue == "") {
        return `${logTime} - ${fieldKey} deleted`;
      } else {
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
          <div style={{ width: "35px", height: "35px", borderRadius: "50%", border: "1px solid black", display: "flex", alignItems: "center", justifyContent: "center" }}><Building32Regular /></div>
          {jsonData && (
            <>
              <Text weight="bold">{jsonData.name}</Text>
            </>
          )}
        </div>

      </div>
      <div style={{ display: "flex", gap: "20px" }}>
        <div style={{ width: "500px", height: "100vh" }}>
          <div style={{ margin: "20px 0" }}>
            {defaultValueOrganization.name && (
              <Form
                formLabel="Details"
                fieldList={
                  [
                    {
                      id: "organization",
                      label: "Name",
                      type: "text",
                      category: "default"
                    },
                    {
                      id: "address",
                      label: "Address",
                      type: "text",
                      category: "default"
                    }
                  ]
                }
                defaultValue={
                  {
                    organization: `${defaultValueOrganization?.name}`,
                    address: `${defaultValueOrganization?.address}`,

                    customField: {
                      // customName: "Kitameraki"
                    },
                  }
                }
              />
            )}
          </div>

          <div style={{ minHeight: "200px", margin: "20px 0", padding: "0 12px", display: "flex", flexDirection: "column" }}>
            {jsonData && (
              <>
                <Subtitle1 >{`People(${jsonData.peopleCount})`}</Subtitle1>
              </>
            )}


            {jsonData?.people?.map((el: any) => {
              return <Text>{el.firstName}</Text>
            })}
          </div>
        </div>
        <div style={{ flexGrow: "1", height: "100vh" }}>
          <div style={{ minHeight: "200px", margin: "20px 0" }}>
            <Subtitle1 >History</Subtitle1>
            {renderedText}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrganizationDetail