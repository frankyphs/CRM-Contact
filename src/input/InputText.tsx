import { useEffect, useState } from "react"
import { IValueComponent } from "../utils/Interfaces"
import { NavLink } from "react-router-dom"
import InputField from "../components/Field/InputField/InputField"

export const InputText = (props: IValueComponent) => {
  const [value, setValue] = useState(props.data)
  const [cancelData, setCancelData] = useState("")

  useEffect(() => {
    setCancelData(props.data)
  }, [])

  useEffect(() => {
    setValue(props.data)
  }, [props.data])

  const handleNameChange = (newValue: string) => {
    setValue(newValue);
  };

  const handleSave = (newValue: string) => {
    props.onChange(newValue)
  }

  const handleCancel = () => {
    setValue(cancelData)
  }

  return (
    <>
      <div style={{ position: "relative" }}>
        {props.onClickNavRouter ? (
          <NavLink
            to="/people_detail"
            style={{
              marginTop: "5px",
              backgroundColor: "transparent",
              position: "absolute",
              width: "110px",
              height: "32px",
              zIndex: "10",
            }}
          ></NavLink>
        ) : null}
        <InputField type={props.type} value={value} onChange={handleNameChange} onSave={handleSave} onCancel={handleCancel} />
      </div>
    </>
  )
}