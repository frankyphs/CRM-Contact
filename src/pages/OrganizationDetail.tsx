import { Text, Button } from "@fluentui/react-components"
import { Building32Regular } from "@fluentui/react-icons"
import DropdownField from "../components/Field/DropdownField/DropdownField"
import Form from "../components/Form/Form"

const OrganizationDetail = () => {
  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", height: "85px", width: "100%", marginBottom: "20px", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", padding: "0 30px", gap: "20px", alignItems: "center" }}>
          <div style={{ width: "35px", height: "35px", borderRadius: "50%", border: "1px solid black", display: "flex", alignItems: "center", justifyContent: "center" }}><Building32Regular /></div>
          <Text>Name</Text>
          <DropdownField type="tags" />
        </div>
        <div style={{ display: "flex", padding: "0 30px", gap: "20px", alignItems: "center" }}>
          <div style={{ width: "35px", height: "35px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}><Building32Regular /></div>
          <Text>Name</Text>
          <Button style={{ backgroundColor: "#36802D", color: "#fff" }}>Add new deal</Button>
        </div>
      </div>
      <div style={{ display: "flex", gap: "20px" }}>
        <div style={{ width: "500px", height: "100vh" }}>
          <div style={{ margin: "20px 0" }}>
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
                  }
                ]
              }
              defaultValue={
                {
                  organization: "test",
                  label: [""],
                  address: "Jalan Permata",
                  customField: {
                    // customName: "Kitameraki"
                  },
                }
              }
            />
          </div>

          <div style={{ minHeight: "200px", margin: "20px 0" }}>
            <Form
              formLabel="People"
              fieldList={
                [
                  {
                    id: "name",
                    label: "name",
                    type: "text",
                    category: "default"
                  },
                ]
              }
              defaultValue={
                {
                  name: "Kari Athokas",
                  customField: {
                    // customName: "Kitameraki"
                  },

                }
              }
            />
          </div>
        </div>
        <div style={{ flexGrow: "1", height: "100vh" }}>
          <div style={{ minHeight: "200px", border: "1px solid red", margin: "20px 0" }}>
            History
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrganizationDetail