import { useRef, useCallback } from 'react';
import { useEffectOnce } from '@/infra/hooks/utils';

type ScrollParams = {
  nextId: number;
  count: number;
};

export const useScrollHook = (fetchFn: (params: ScrollParams) => any[]) => {
  const paramsCache = useRef({ nextId: 0, count: 10 });

  const fetchNext = useCallback((override?: Partial<typeof paramsCache.current>) => {
    if (override) {
      paramsCache.current = {
        ...paramsCache.current,
        ...override,
      };
    }
    fetchFn(paramsCache.current);
  }, []);

  useEffectOnce(() => {
    fetchNext();
  });

  return {
    fetchNext,
    list: [],
  };
};
