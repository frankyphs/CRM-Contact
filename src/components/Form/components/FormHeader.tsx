import React, { useContext } from "react"
import { FormContext, FormContextType } from "../Form"
import {
  Edit24Regular,
  ChevronDown24Filled,
  ChevronUp24Filled,
  MoreHorizontal24Regular,
} from "@fluentui/react-icons"

import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Text,
  makeStyles,
  tokens,
} from "@fluentui/react-components"

const createFormHeaderStyles = makeStyles({
  title: {
    color: tokens.colorNeutralForeground1,
  },
  iconTitle: {
    color: tokens.colorNeutralForeground1,
  },
})

const FormHeader = () => {
  const c = createFormHeaderStyles()
  const {
    isFormExpand,
    handleExpandCollapse,
    handleBulkEditState,
    changeFormView,
    currentFormView,
    formLabel,
  } = useContext(FormContext) as FormContextType

  const toggleBulkEdit = () => {
    currentFormView === "DEFAULT" && handleBulkEditState(true)
    currentFormView === "SETTINGS" && handleBulkEditState(false)
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Button
          appearance="subtle"
          className={c.title}
          icon={
            isFormExpand ? (
              <ChevronUp24Filled className={c.iconTitle} />
            ) : (
              <ChevronDown24Filled className={c.iconTitle} />
            )
          }
          onClick={handleExpandCollapse}>
          <Text weight="semibold" size={500}>
            {formLabel}
          </Text>
        </Button>

        <div style={{ display: "flex", alignItems: "center", columnGap: 4, paddingRight: 8 }}>
          {currentFormView === "DEFAULT" && (
            <div>
              <Button onClick={toggleBulkEdit} size="small" appearance="subtle" icon={<Edit24Regular />} />
            </div>
          )}
          <Menu>
            <MenuTrigger>
              <MenuButton size="small" appearance="subtle" icon={<MoreHorizontal24Regular />} />
            </MenuTrigger>
            <MenuPopover>
              <MenuList>
                <MenuItem onClick={() => changeFormView("SETTINGS")}>
                  <Text align="center">Customize fields</Text>
                </MenuItem>
              </MenuList>
            </MenuPopover>
          </Menu>
        </div>
      </div>
    </div>
  )
}

export default FormHeader
