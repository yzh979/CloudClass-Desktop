import { useMemo, FC } from 'react';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

export const renderRows = (studentList: any, ListRow: FC<{ index: number; style: any }>) => {
  const rows = useMemo(
    () => (
      <AutoSizer>
        {({ height, width }) => (
          <FixedSizeList
            height={height}
            width={width}
            itemCount={studentList?.length || 0}
            itemSize={40}>
            {ListRow}
          </FixedSizeList>
        )}
      </AutoSizer>
    ),
    [JSON.stringify(studentList)],
  );

  return rows;
};
