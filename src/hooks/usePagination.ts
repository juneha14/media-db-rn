import { useCallback, useEffect, useRef, useState } from "react";
import { Endpoint, EndpointParamList, fetchRequest } from "../api/service";
import { convertToCamelCase } from "../utils";
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

  // Flag used to determine if we are currently resetting the fetched results
  // Due to the batching (and unpredictable) behaviour of `setState`, we check if we are resetting before updating the `allData` state after fetching
  const resetting = useRef(false);

  const reset = useCallback(() => {
    resetting.current = true;
    next_page.current = 1;
    total_pages.current = 0;
    total_results.current = 0;
    setLoading(false);
    setFetching(false);
    setError(undefined);
  }, []);

  const fetch = useCallback(
    async (params: P) => {
      try {
        const json = await fetchRequest(endpoint, params);
        const { page, totalPages, results, totalResults } = convertToCamelCase(
          json
        ) as PaginatedResponse<D[]>;

        setPagedData(results);
        setAllData((allData) =>
          resetting.current ? results : [...allData, ...results]
        );

        next_page.current = page + 1;
        total_pages.current = totalPages;
        total_results.current = totalResults;
      } catch (error) {
        console.error("[usePagination] Failed to fetch due to error:", error);
        setError(error.message);
      }
    },
    [endpoint]
  );

  const paramConfig = JSON.stringify(initialParams);

  useEffect(() => {
    setLoading(true);
    const params = JSON.parse(paramConfig);
    setTimeout(() => {
      fetch(params).then(() => setLoading(false));
    }, 500);
  }, [fetch, paramConfig]);

  const refresh = useCallback(
    (isRetry: boolean) => {
      reset();
      setLoading(isRetry);
      setRefreshing(!isRetry);

      const params = JSON.parse(paramConfig);
      setTimeout(() => {
        fetch(params).then(() => {
          resetting.current = false;
          setLoading(false);
          setRefreshing(false);
        });
      }, 1000);
    },
    [reset, fetch, paramConfig]
  );

  const fetchNextPage = useCallback(
    (params: P) => {
      if (next_page.current > total_pages.current) return;

      setFetching(true);
      setTimeout(() => {
        fetch(params).then(() => setFetching(false));
      }, 1000);
    },
    [fetch]
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
