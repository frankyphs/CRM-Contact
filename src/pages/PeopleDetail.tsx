import { Text } from "@fluentui/react-components"
import { Person28Regular } from "@fluentui/react-icons"
import DropdownField from "../components/Field/DropdownField/DropdownField"

const PeopleDetail = () => {
  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", height: "85px", width: "100%", border: "1px solid red", marginBottom: "20px", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", padding: "0 30px", gap: "20px", alignItems: "center" }}>
          <div style={{ width: "35px", height: "35px", borderRadius: "50%", border: "1px solid black", display: "flex", alignItems: "center", justifyContent: "center" }}><Person28Regular /></div>
          <Text weight="bold">Katri Athokas</Text>
          <DropdownField type="tags" />
        </div>
      </div>
      <div style={{ display: "flex", gap: "20px" }}>
        <div style={{ width: "500px", height: "100vh" }}>
          <div style={{ minHeight: "200px", border: "1px solid red", margin: "20px 0" }}>
            Detail
          </div>

          <div style={{ minHeight: "200px", border: "1px solid red", margin: "20px 0" }}>
            Organization
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

export default PeopleDetail