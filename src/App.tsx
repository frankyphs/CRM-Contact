import { RouterProvider } from "react-router-dom";
import router from "./router";
import OptionProvider from "./store/OptionProvider";

function App() {
  return (
    <OptionProvider>
      <RouterProvider router={router} />
    </OptionProvider>
  );
}


export default App




