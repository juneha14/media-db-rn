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
}

export function usePagination<
  D,
  E extends Endpoint = Endpoint,
  P extends EndpointParamList[E] = EndpointParamList[E]
>(endpoint: E, initialParams: P): State<D[], P> {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  const [pagedData, setPagedData] = useState<D[]>([]);
  const [allData, setAllData] = useState<D[]>([]);
  const [error, setError] = useState<string>();

  const next_page = useRef(1);
  const total_pages = useRef(0);
  const total_results = useRef(0);

  const fetch = useCallback(
    async (params: P) => {
      try {
        const json = await fetchRequest(endpoint, params);
        const { page, totalPages, results, totalResults } = convertToCamelCase(
          json
        ) as PaginatedResponse<D[]>;

        setPagedData(results);
        setAllData((allData) => [...allData, ...results]);

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
    fetch(params).then(() => setLoading(false));
  }, [fetch, paramConfig]);

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
  };
}
