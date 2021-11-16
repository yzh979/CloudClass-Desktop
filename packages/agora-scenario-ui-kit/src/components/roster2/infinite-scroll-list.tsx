import { useMemo, useCallback, useState } from 'react';
import loadingSrc from './loading';

const config = {
  thresholdDistance: 50,
};

const useLoadMore = (onLoadMore: () => Promise<any>, hasMore: boolean) => {
  const [loading, setLoading] = useState(false);
  // handle scroll to bottom
  const onScroll = useCallback(
    async (event) => {
      const { clientHeight, scrollHeight, scrollTop } = event.target;

      const distanceToBottom = scrollHeight - clientHeight - scrollTop;

      // const thresholdToHit = (1 - config.threshold) * scrollHeight;
      const thresholdToHit = config.thresholdDistance;

      const hitThreshold = distanceToBottom <= thresholdToHit;
      if (hitThreshold) {
        if (loading || !hasMore) return;
        setLoading(true);
        try {
          await onLoadMore();
        } finally {
          setLoading(false);
        }
      }
    },
    [loading, hasMore],
  );

  return {
    onScroll,
    loading,
  };
};

export const renderRows = <T extends unknown>(
  studentList: T[],
  renderFn: (data: T) => JSX.Element,
  onLoadMore: () => Promise<void>,
  hasMore: boolean,
) => {
  const listItems = useMemo(
    () => studentList.map((item) => renderFn(item)),
    [JSON.stringify(studentList)],
  );

  const { onScroll, loading } = useLoadMore(onLoadMore, hasMore);

  const loader = (
    <img
      className="mx-auto"
      src={loadingSrc}
      style={{ width: 32, marginLeft: 'auto', marginRight: 'auto' }}
    />
  );

  const noMore = (
    <p
      className="py-3"
      style={{ textAlign: 'center', fontSize: 13, color: '#7B88A0', padding: '10px 0' }}>
      没有更多数据了
    </p>
  );

  return (
    <div
      className="h-full overflow-auto"
      onScroll={onScroll}
      style={{ height: '100%', overflow: 'auto' }}>
      {listItems}
      {loading && loader}
      {!hasMore && noMore}
    </div>
  );
};
