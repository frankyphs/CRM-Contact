import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import React from "react";
import {
  Button,
  Text
} from "@fluentui/react-components";
import { NavigationLayout, ContentLayout } from "../components/Layout";
import { CaretRight24Regular, CaretLeft24Regular } from "@fluentui/react-icons";


function LandingPage() {
  const [isOpen, setIsOpen] = React.useState(true)
  return (
    <>
      <div style={{ display: "flex" }}>
        <NavigationLayout content={
          <ContentLayout
            header={<div style={{ display: "flex", gap: "10px", alignItems: "center", marginLeft: "20px" }}>
              <Button icon={!isOpen ?
                <CaretRight24Regular />
                : <CaretLeft24Regular />} style={{ padding: "0 0", width: "40px", height: "30px" }} onClick={() => setIsOpen(!isOpen)}>
              </Button>
              <Text weight="bold">Contacts/People</Text>
            </div>}
            main={
              <div style={{ display: "flex", height: "100%" }}>
                <Sidebar isOpen={isOpen} />
                <div style={{ flex: "1", overflow: "auto" }}>
                  <Outlet />
                </div>
              </div>
            }
          />} />

      </div>
    </>
  );
}

export default LandingPage;