import { useEffect } from "react";
import useAxios from "./useAxios";

const useQuery = <T>(url: string, useToken: boolean = true) => {
  const { data, error, loading, fetchData } = useAxios(useToken);

  useEffect(() => {
    fetchData<T>(url, "get");
  }, []);

  const refresh = () => {
    fetchData<T>(url, "get");
  };

  return { data: data as T, error, loading, refresh };
};

export default useQuery;
