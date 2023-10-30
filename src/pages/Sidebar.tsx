import { NavLink } from "react-router-dom";
import { Person28Regular, Building32Regular, Person28Filled, Building32Filled } from "@fluentui/react-icons";
// import * as React from "react";
import {
  makeStyles,
  shorthands,
  Tab,
  TabList,
} from "@fluentui/react-components";

const useStyles = makeStyles({
  root: {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    ...shorthands.padding("20px", "20px"),
    rowGap: "10px",
    width: "max-content"
  },
});

const activeStyle = makeStyles({
  root: {
    color: "#0F6CBD",
  },
});



export const Sidebar = (props: any) => {
  const styles = useStyles();
  const styleActive = activeStyle()
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className={styles.root} style={!props.isOpen ? { display: "none" } : { display: "block" }}>
        <TabList vertical>
          <Tab value="tab1">
            <NavLink to="/" style={{ textDecoration: 'none', color: '#333' }}>
              {({ isActive }) => (
                <div style={{
                  display: "flex", justifyContent: "left", alignItems: "center", height: "40px",
                  width: "200px", gap: "10px"
                }}>
                  {isActive && (
                    <>
                      <Person28Filled className={isActive ? styleActive.root : undefined} /> People
                    </>
                  )}
                  {!isActive && (
                    <>
                      <Person28Regular /> People
                    </>
                  )}
                </div>
              )}
            </NavLink>
          </Tab>
          <Tab value="tab2" ><NavLink to="/organizations" style={{ textDecoration: 'none', color: '#333' }}>
            {({ isActive }) => (
              <div style={{
                display: "flex", justifyContent: "left", alignItems: "center", height: "40px",
                width: "200px", gap: "10px"
              }}>
                {isActive && (
                  <>
                    <Building32Filled className={isActive ? styleActive.root : undefined} /> Organization
                  </>
                )}
                {!isActive && (
                  <>
                    <Building32Regular /> Organization
                  </>
                )}
              </div>
            )}
          </NavLink></Tab>
        </TabList>
      </div>
    </div>
  );
};

export default Sidebar;