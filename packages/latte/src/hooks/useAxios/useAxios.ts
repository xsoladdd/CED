// useAxios hook (first draft)

import { useState } from "react";
import { useEffectOnce } from "../useEffectOnce";
import { axiosInstance } from "./helper";
import { IaxiosError } from "./types";

const useAxios = (url: string) => {
  const [response, setResponse] = useState({});
  const [error, setError] = useState<IaxiosError>({});
  const [loading, setloading] = useState(true);

  const fetchData = () => {
    axiosInstance()
      .get(url)
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err: IaxiosError) => {
        setError(err);
      })
      .finally(() => {
        setloading(false);
      });
  };

  useEffectOnce(() => {
    let fetch = true;
    if (fetch) {
      fetchData();
    }
    return () => {
      fetch = false;
    };
  });

  // custom hook returns value
  return { response, error, loading };
};

export default useAxios;
