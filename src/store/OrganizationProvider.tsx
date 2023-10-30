import { useReducer } from "react";
import OrganizationContext from "./organization-context";
import { IDataSourceBasic } from "../data";
import { defaultOrganization } from "../data";

export interface OrganizationState {
  organization: IDataSourceBasic[]
}

export interface Action<T> {
  type: string;
  data: T
}

export interface ProviderProps {
  children: React.ReactNode;
}

const defaultOrganizationState = {
  organization: defaultOrganization
};

const organizationReducer: React.Reducer<OrganizationState, Action<IDataSourceBasic[]>> = (
  state: OrganizationState = defaultOrganizationState,
  action: Action<IDataSourceBasic[]>
): OrganizationState => {
  if (action.type === "GET") {
    return {
      ...state,
      organization: action.data,
    };
  } else if (action.type === "ADD") {
    return {
      ...state,
      organization: action.data,
    };
  }

  return defaultOrganizationState;
};

export const addOrganizationAction = (data: IDataSourceBasic[]) => ({
  type: "ADD",
  data,
});

const OrganizationProvider: React.FC<ProviderProps> = ({ children }) => {
  const [organizationState, dipatchOrganizationAction] = useReducer(
    organizationReducer,
    defaultOrganizationState
  );

  const organizationContext = {
    organization: organizationState.organization,
    dispatchOrganization: dipatchOrganizationAction,
  };

  return (
    <OrganizationContext.Provider value={organizationContext}>{children}</OrganizationContext.Provider>
  );
};

export default OrganizationProvider;
