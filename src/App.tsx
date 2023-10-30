import { RouterProvider } from "react-router-dom";
import router from "./router";
import OptionProvider from "./store/OptionProvider";
import DataProvider from "./store/PeopleProvider";
import OrganizationProvider from "./store/OrganizationProvider";


function App() {
  return (
    <OrganizationProvider>
      <DataProvider>
        <OptionProvider>
          <RouterProvider router={router} />
        </OptionProvider>
      </DataProvider>
    </OrganizationProvider>
  );
}


export default App




