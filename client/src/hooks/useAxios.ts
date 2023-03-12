import { useReducer } from "react";
import axios, { AxiosError } from "axios";
import { useAuth } from "./useAuth";

interface State<T> {
  loading: boolean;
  error?: any | null;
  data?: T | null;
}

type Action<T> =
  | { type: "AXIOS" }
  | { type: "AXIOS_SUCCESS"; payload: T }
  | { type: "AXIOS_ERROR"; payload: any };

const reducer = <T>(state: State<T>, action: Action<T>): State<T> => {
  switch (action.type) {
    case "AXIOS":
      return {
        loading: true,
        error: null,
        data: null,
      };
    case "AXIOS_SUCCESS":
      return {
        loading: false,
        error: null,
        data: action.payload,
      };
    case "AXIOS_ERROR":
      return {
        loading: false,
        error: action.payload,
        data: null,
      };
    default:
      throw new Error("Unhandled action type");
  }
};

type Methods = "get" | "post" | "put" | "delete";

const useAxios = (useToken: boolean = false) => {
  const { token } = useAuth();
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    error: null,
    data: null,
  });

  const fetchData = async <T>(url: string, method: Methods, data?: any) => {
    dispatch({ type: "AXIOS" });
    try {
      const response = await axios.request<T>({
        url,
        method,
        data,
        headers: {
          Authorization: useToken ? `Bearer ${token}` : "",
        },
      });
      dispatch({ type: "AXIOS_SUCCESS", payload: response.data });

      return { data: response.data, error: null };
    } catch (e: unknown) {
      dispatch({
        type: "AXIOS_ERROR",
        payload:
          e instanceof AxiosError ? e.response?.data : "Something went wrong",
      });

      return {
        data: null,
        error:
          e instanceof AxiosError ? e.response?.data : "Something went wrong",
      };
    }
  };

  return { ...state, fetchData };
};

export default useAxios;
