// useFetch.js
import { useState, useEffect } from "react";
import axios from "axios";

const config = {
  baseURL: `${process.env.REACT_APP_SERVER_URL}/api`,
};

const axiosInstance = axios.create(config);

const useAxios = (url, initialValue) => {
  const [data, setData] = useState(initialValue);
  const [loading, setLoading] = useState(true);
  const [changeData, setChangeData] = useState(false);

  const axiosRequest = function (method) {
    return async function (payload) {
      let id;
      if (payload) {
        id = payload.id;
      }
      try {
        setLoading(true);
        if (method !== "get") {
          setChangeData(true);
        }
        const response = await axiosInstance({
          url: id ? url + "/" + id : url,
          method,
          data: payload,
        });
        if (response.status === 200 && method === "get") {
          setData(response.data);
        } else if (response.status === 200 && method !== "get") {
          setChangeData(false);
        }
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    };
  };

  const postRequest = axiosRequest("post");
  const putRequest = axiosRequest("put");
  const deleteRequest = axiosRequest("delete");

  useEffect(() => {
    if (!changeData) {
      const getRequest = axiosRequest("get");
      getRequest();
    }
  }, [changeData]);

  return [data, loading, postRequest, putRequest, deleteRequest];
};

export default useAxios;
