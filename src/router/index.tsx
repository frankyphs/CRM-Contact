import { createBrowserRouter } from "react-router-dom";
// import LandingPage from "../pages/LandingPage";
import People from "../pages/People";
import Organizations from "../pages/Organization";
import PeopleDetail from "../pages/PeopleDetail";
import OrganizationDetail from "../pages/OrganizationDetail";
import DataPeople from "../services";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  {
    path: "",
    element: <DataPeople />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <People />,
      },
      {
        path: "/organizations",
        element: <Organizations />,
      },
      {
        path: `/people_detail/:id`,
        element: <PeopleDetail />,
      },
      {
        path: "/organization_detail/:id",
        element: <OrganizationDetail />,
      },
    ],
  },
]);

export default router;
