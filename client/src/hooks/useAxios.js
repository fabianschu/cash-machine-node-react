// useFetch.js
import { useState, useEffect } from "react";
import axios from "axios";

const config = {
  baseURL: `${process.env.REACT_APP_SERVER_URL}/api`,
};

const axiosInstance = axios.create(config);

// custom hook for performing GET request
const useAxios = (url, initialValue) => {
  const [data, setData] = useState(initialValue);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async function () {
      try {
        setLoading(true);
        const response = await axiosInstance({
          url,
          method: "get",
        });
        if (response.status === 200) {
          setData(response.data);
        }
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  async function getRequest() {
    try {
      setLoading(true);
      const response = await axiosInstance({
        url: url,
        method: "get",
      });
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function putRequest(payload) {
    const { id } = payload;

    try {
      setLoading(true);
      const response = await axiosInstance({
        url: url + "/" + id,
        method: "put",
        data: payload,
      });
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }

  return [data, loading, getRequest, putRequest];
};

export default useAxios;
