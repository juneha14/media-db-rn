import { useCallback, useEffect, useState } from "react";
import { Endpoint, EndpointParamList, fetchRequest } from "../api/service";
import { convertToCamelCase } from "../utils";

interface FetchResponse<T> {
  isLoading: boolean;
  isRefreshing: boolean;
  error?: string;
  data?: T;
  refresh: () => void;
}

export function useFetch<Response, T extends Endpoint = Endpoint>(
  endpoint: T,
  params: EndpointParamList[T]
): FetchResponse<Response> {
  // Since `params` is an object, it will create a new reference every time this hook is called in a component
  // We cannot add `params` as part of our dependency array, since this will cause an infinite fetch/rendering
  // Ideally, we need some form of 'deep equality' check to determine if the object's contents has actually changed
  // However, in general, 'deep equality' checking is a bad idea - using a JSON string is sufficient in cases where the object tree is small
  // https://twitter.com/dan_abramov/status/1104414272753487872
  const fetchConfig = JSON.stringify(params);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState();
  const [data, setData] = useState<Response>();

  const fetch = useCallback(async () => {
    try {
      const params = JSON.parse(fetchConfig);
      const json = await fetchRequest(endpoint, params);
      const data = convertToCamelCase(json);
      setData(data);
    } catch (error) {
      console.error("[useFetch] Failed to fetch due to error:", error.message);
      setError(error.message);
    }
  }, [endpoint, fetchConfig]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      fetch().then(() => setLoading(false));
    }, 500);
  }, [fetch]);

  const refresh = useCallback(() => {
    setRefreshing(true);
    setError(undefined);
    setTimeout(() => {
      fetch().then(() => setRefreshing(false));
    }, 500);
  }, [fetch]);

  return {
    isLoading: loading,
    isRefreshing: refreshing,
    error,
    data,
    refresh,
  };
}
