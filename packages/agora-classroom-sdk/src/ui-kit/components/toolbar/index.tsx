import React, { FC, useState, useRef, useEffect } from 'react';
import { BaseProps } from '~components/interface/base-props';
import { Tool, ToolItem } from './tool';
import './index.css';

export { Colors } from './colors';

export { Pens } from './pens'

export { CloudDisk } from './cloud-disk'

export { ToolCabinet } from './tool-cabinet'

export type { ToolItem } from './tool';

export interface ToolbarProps extends BaseProps {
  tools: ToolItem[];
  active?: string;
  activeMap?: Record<string, boolean>;
  defaultOpened?: boolean;
  onClick?: (value: string) => unknown;
  onOpenedChange?: (opened: boolean) => void;
}

export const Toolbar: FC<ToolbarProps> = ({
  className,
  style,
  tools,
  active,
  activeMap = {},
  onClick,
}) => {
  
  return (
    <div className='toolbar-position'>
      <div className={className} style={style}>
        <div className="tools">
          {tools.map(({ value, ...restProps }) => (
            <Tool
              key={value}
              value={value}
              {...restProps}
              onClick={onClick}
              isActive={active === value || activeMap[value]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
