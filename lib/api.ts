import axios from "axios";

export interface IUserData {
  firstName: string;
  lastName: string;
}

export const initialState = {
  isLoading: false,
  isSuccess: false,
  hasError: false,
  message: "",
};

interface State {
  isLoading: boolean;
  isSuccess: boolean;
  hasError: boolean;
  message: string;
}

type Action =
  | { type: "LOADING" }
  | { type: "SUCCESS"; data: IUserData }
  | { type: "FAILURE"; error: any };

function errorMessageHandler(errorResponse) {
  switch (errorResponse.status) {
    case 404:
      return errorResponse.statusText;
    case 400:
      return errorResponse.data;
    case 500:
      return "Internal server error";
    default:
      return "Something went wrong";
  }
}

export function createUserReducer(state: State, action: Action) {
  switch (action.type) {
    case "LOADING": {
      return {
        isLoading: true,
        isSuccess: false,
        hasError: false,
        message: "",
      };
    }
    case "SUCCESS": {
      const { firstName, lastName } = action.data;
      return {
        isLoading: false,
        isSuccess: true,
        hasError: false,
        message: `${firstName} ${lastName} was created 🎉`,
      };
    }
    case "FAILURE": {
      return {
        isLoading: false,
        isSuccess: false,
        hasError: true,
        message: errorMessageHandler(action.error.response),
      };
    }
    default: {
      return state;
    }
  }
}

export async function createUser(dispatch, userData: IUserData) {
  dispatch({ type: "LOADING" });
  try {
    const capitalizedUserData: IUserData = {
      firstName: userData.firstName.toUpperCase(),
      lastName: userData.lastName.toUpperCase(),
    };
    const { data } = await axios.post("/api/create_user", capitalizedUserData);
    dispatch({ type: "SUCCESS", data });
  } catch (error) {
    dispatch({ type: "FAILURE", error });
  }
}
