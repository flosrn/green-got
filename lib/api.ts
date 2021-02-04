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
    case 500:
      return errorResponse.data;
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
      console.log(action);
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

export async function submitHandler(dispatch, userData: IUserData) {
  dispatch({ type: "LOADING" });
  try {
    const { data } = await axios.post("/api/create_user", userData);
    dispatch({ type: "SUCCESS", data });
  } catch (error) {
    dispatch({ type: "FAILURE", error });
  }
}
