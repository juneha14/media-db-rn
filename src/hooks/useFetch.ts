import { useCallback, useEffect, useState } from "react";
import { fetchRequest, TRequest } from "../api/service";
import { convertToCamelCase } from "../utils";

interface FetchResponse<T> {
  isLoading: boolean;
  data?: T;
  errorMessage?: string;
}

export function useFetch<Response>(request: TRequest): FetchResponse<Response> {
  // Since `TRequest` is an object, it will create a new reference every time this hook is called in a component
  // We cannot add `TRequest` as part of our dependency array, since this will cause an infinite fetch/rendering
  // Ideally, we need some form of 'deep equality' check to determine if the object's contents has actually changed
  // However, in general, 'deep equality' checking is a bad idea - using a JSON string is sufficient in cases where the object tree is small
  // https://twitter.com/dan_abramov/status/1104414272753487872
  const fetchConfig = JSON.stringify(request);

  const [state, setState] = useState<FetchResponse<Response>>({
    isLoading: true,
  });

  const fetch = useCallback(async () => {
    setState({ isLoading: true });

    try {
      const request = JSON.parse(fetchConfig);
      const json = await fetchRequest(request);
      const data = convertToCamelCase(json);
      setState({ isLoading: false, data });
    } catch (error) {
      console.error("[useFetch] Failed to fetch due to error:", error);
      setState({ isLoading: false, errorMessage: error.message });
    }
  }, [fetchConfig]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return state;
}
