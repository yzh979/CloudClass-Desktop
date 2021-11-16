import { useRef, useCallback } from 'react';
import { useState } from 'react';

type FetchParams = {
  nextId: number | null;
  count: number;
};

type FetchOptions = {
  onError: (message: string) => void;
};

type FetchResult<T> = {
  total: number;
  nextId: number | null;
  count: number;
  list: T[];
};

export const useScrollFetch = <T, P>(
  fetchFn: (params: P & FetchParams) => Promise<FetchResult<T>>,
  options?: FetchOptions,
) => {
  const paramsCache = useRef<FetchParams>({ nextId: 0, count: 10 });

  const [data, setData] = useState<{ list: T[]; hasMore: boolean }>({
    list: [],
    hasMore: false,
  });

  const fetchNext = useCallback(
    async (override?: Partial<P & FetchParams>, reset?: boolean) => {
      if (override) {
        paramsCache.current = {
          ...paramsCache.current,
          ...override,
        };
      }

      await fetchFn(paramsCache.current as P & FetchParams)
        .then((dataRsl) => {
          paramsCache.current.nextId = dataRsl.nextId;

          const list = (reset ? [] : data.list).concat(dataRsl.list);

          const hasMore = !!dataRsl.nextId;

          setData({
            list,
            hasMore,
          });
        })
        .catch((e) => {
          console.error(e);
          options?.onError(`${e.message}`);
        });
    },
    [fetchFn, options, data.list],
  );

  const setList = useCallback(
    (list) => {
      setData({
        list,
        hasMore: data.hasMore,
      });
    },
    [data.hasMore],
  );

  return {
    setList,
    fetchNext,
    ...data,
  };
};
