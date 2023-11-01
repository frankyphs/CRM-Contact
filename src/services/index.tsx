import { useContext, useEffect } from "react"
const baseUrl = import.meta.env.VITE_APP_BASE_URL;
import axios, { AxiosResponse } from "axios";
import DataContext from "../store/people-context";
import LandingPage from "../pages/LandingPage";
import OrganizationContext from "../store/organization-context";
import OptionContext from "../store/option-context";
import { addOptionAction } from "../store/OptionProvider";
import { IDataSourceOrganization } from "../data";



const DataPeople: React.FC = (): JSX.Element => {
  const { dispatchData } = useContext(DataContext)
  const { organization, dispatchOrganization } = useContext(OrganizationContext)
  const { dispatchOption } = useContext(OptionContext)

  const fetchDataPeople = async (): Promise<void> => {
    try {
      const config = {
        headers: {
          'tenantId': '8bb615ce-bd25-4700-a683-72d23daeb44d'
        }
      };

      const response: AxiosResponse<any> = await axios.get(
        `${baseUrl}/api/v1/people`,
        config
      );

      if (response.status !== 200) {
        throw new Error("Error fetching template");
      }
      const jsonData: any = await response.data.data;
      dispatchData({ type: "GET", data: jsonData });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataOrganization = async (): Promise<void> => {
    try {
      const config = {
        headers: {
          'tenantId': '8bb615ce-bd25-4700-a683-72d23daeb44d'
        }
      };

      const response: AxiosResponse<any> = await axios.get(
        `${baseUrl}/api/v1/organizations`,
        config
      );

      if (response.status !== 200) {
        throw new Error("Error fetching template");
      }
      const jsonData: any = await response.data.data;
      dispatchOrganization({ type: "GET", data: jsonData });
    } catch (error) {
      console.log(error);
    }
  };

  function convertOrganizationToOptions(organizationData: any) {
    return organizationData.map((organization: IDataSourceOrganization) => ({
      id: organization.id,
      label: organization.name,
    }));
  }

  useEffect(() => {
    fetchDataPeople()
    fetchDataOrganization()
  }, [])

  useEffect(() => {
    const optionsData = convertOrganizationToOptions(organization);
    dispatchOption(addOptionAction(optionsData))
  }, [organization])

  return (
    <LandingPage />
  );
};

export default DataPeople

export const addPeople = async (payload: any): Promise<void> => {
  try {
    const opt = {
      method: "post",
      data: payload,
      headers: {
        'tenantId': '8bb615ce-bd25-4700-a683-72d23daeb44d'
      },
    };
    const response: AxiosResponse<any> = await axios(
      `${baseUrl}/api/v1/people`,
      opt
    );
    if (response.status !== 201) {
      throw new Error("Gagal Add Task");
    }

  } catch (error) {
    console.log(error);
  }
};

// export const fetchDataPeopleById = async (id: string): Promise<void> => {
//   try {
//     const config = {
//       headers: {
//         'tenantId': '8bb615ce-bd25-4700-a683-72d23daeb44d'
//       }
//     };

//     const response: AxiosResponse<any> = await axios.get(
//       `${baseUrl}/api/v1/people/${id}`,
//       config
//     );

//     if (response.status !== 200) {
//       throw new Error("Error fetching template");
//     }
//     const jsonData: any = await response.data.data;
//   } catch (error) {
//     console.log(error);
//   }
// };


export const patchPeople = async (payload: any, id: any): Promise<void> => {
  try {
    const opt = {
      method: "patch",
      data: payload,
      headers: {
        'tenantId': '8bb615ce-bd25-4700-a683-72d23daeb44d'
      },
    };
    const response: AxiosResponse<any> = await axios(
      `${baseUrl}/api/v1/people/${id}`,
      opt
    );
    if (response.status !== 201) {
      throw new Error("Gagal Add Task");
    }

  } catch (error) {
    console.log(error);
  }
};

export const patchOrganization = async (payload: any, id: any): Promise<void> => {
  try {
    const opt = {
      method: "patch",
      data: payload,
      headers: {
        'tenantId': '8bb615ce-bd25-4700-a683-72d23daeb44d'
      },
    };
    const response: AxiosResponse<any> = await axios(
      `${baseUrl}/api/v1/organizations/${id}`,
      opt
    );
    if (response.status !== 201) {
      throw new Error("Gagal Add Task");
    }

  } catch (error) {
    console.log(error);
  }
};