import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import People from "../pages/People";
import Organizations from "../pages/Organization";
import PeopleDetail from "../pages/PeopleDetail";
import OrganizationDetail from "../pages/OrganizationDetail";


const router = createBrowserRouter([
  {
    path: "",
    element: <LandingPage />,
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
        path: "/people_detail",
        element: <PeopleDetail />,
      },
      {
        path: "/organization_detail",
        element: <OrganizationDetail />,
      },
    ],
  },
]);

export default router;
