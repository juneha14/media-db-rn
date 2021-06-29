import { useCallback, useEffect, useRef, useState } from "react";
import { Endpoint, EndpointParamList, fetchRequest, Request } from "../api";
import { convertToCamelCase, MutableCollection } from "../utils";
import { PaginatedResponse } from "../models";

interface State<Data, Param> {
  isLoading: boolean;
  isFetching: boolean;
  nextPage: number;
  fetchNextPage: (updatedParams: Param) => void;
  pagedData?: Data;
  allData?: Data;
  errorMessage?: string;
  isRefreshing: boolean;
  refresh: (isRetry: boolean) => void;
}

export function usePagination<
  D,
  E extends Endpoint = Endpoint,
  P extends EndpointParamList[E] = EndpointParamList[E]
>(endpoint: E, initialParams: P): State<D[], P> {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [pagedData, setPagedData] = useState<D[]>([]);
  const [allData, setAllData] = useState<D[]>([]);
  const [error, setError] = useState<string>();

  const next_page = useRef(1);
  const total_pages = useRef(0);
  const total_results = useRef(0);

  const requests = useRef(new MutableCollection<Request>([]));

  const reset = useCallback(() => {
    next_page.current = 1;
    total_pages.current = 0;
    total_results.current = 0;
    setLoading(false);
    setFetching(false);
    setError(undefined);
  }, []);

  const fetch = useCallback(
    async (params: P, reset = false) => {
      const inFlightRequests = await requests.current.getItems();
      if (inFlightRequests.length > 0) {
        inFlightRequests.forEach((r) => r.cancel());
      }

      const request = fetchRequest(endpoint, params);
      await requests.current.setItems([request]);

      try {
        const json = await request.fetch();
        if (request.getState() !== "finished") return;

        const pendingRequests = await requests.current.remove(request);
        if (pendingRequests.length > 0) return;

        const { page, totalPages, results, totalResults } = convertToCamelCase(
          json
        ) as PaginatedResponse<D[]>;

        setPagedData(results);
        setAllData((allData) => (reset ? results : [...allData, ...results]));

        next_page.current = page + 1;
        total_pages.current = totalPages;
        total_results.current = totalResults;
      } catch (error) {
        console.error(
          "[usePagination] Failed to fetch due to error:",
          error.message
        );
        setError(error.message);
      }
    },
    [endpoint]
  );

  const paramConfig = JSON.stringify(initialParams);

  useEffect(() => {
    reset();
    setLoading(true);

    const params = JSON.parse(paramConfig);
    setTimeout(() => {
      fetch(params, true).then(() => {
        setLoading(false);
      });
    }, 500);
  }, [reset, fetch, paramConfig]);

  const refresh = useCallback(
    (isRetry: boolean) => {
      reset();
      setLoading(isRetry);
      setRefreshing(!isRetry);

      const params = JSON.parse(paramConfig);
      setTimeout(() => {
        fetch(params, true).then(() => {
          setLoading(false);
          setRefreshing(false);
        });
      }, 1000);
    },
    [reset, fetch, paramConfig]
  );

  const fetchNextPage = useCallback(
    (params: P) => {
      if (next_page.current >= total_pages.current) return;

      const oldParams = JSON.parse(paramConfig) as P;
      const newParams = { ...oldParams, ...params };

      setFetching(true);
      setTimeout(() => {
        fetch(newParams).then(() => setFetching(false));
      }, 1000);
    },
    [fetch, paramConfig]
  );

  return {
    isLoading: loading,
    isFetching: fetching,
    nextPage: next_page.current,
    fetchNextPage,
    pagedData,
    allData,
    errorMessage: error,
    isRefreshing: refreshing,
    refresh,
  };
}
