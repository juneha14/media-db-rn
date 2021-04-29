import { useCallback, useEffect, useState } from "react";
import { Endpoint, EndpointParamList, fetchRequest } from "../api/service";
import { convertToCamelCase } from "../utils";

interface FetchResponse<T> {
  isLoading?: boolean;
  data?: T;
  errorMessage?: string;
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

  const [state, setState] = useState<FetchResponse<Response>>({
    isLoading: true,
  });

  const fetch = useCallback(async () => {
    setState({ isLoading: true });

    try {
      const params = JSON.parse(fetchConfig);
      const json = await fetchRequest(endpoint, params);
      const data = convertToCamelCase(json);

      setTimeout(() => {
        setState({ data });
      }, 200);
    } catch (error) {
      console.error("[useFetch] Failed to fetch due to error:", error);
      setState({ errorMessage: error.message });
    }
  }, [endpoint, fetchConfig]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return state;
}
