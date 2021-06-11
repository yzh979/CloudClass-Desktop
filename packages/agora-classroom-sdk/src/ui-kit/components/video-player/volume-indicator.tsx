import React, { FC } from 'react';
import { list } from '~utilities';

export interface VolumeIndicatorProps {
  /**
   * 0 - 1
   */
  volume?: number;
}

export const VolumeIndicator: FC<VolumeIndicatorProps> = ({ volume = 0 }) => {
  
  return (
    <div className="volume-indicators">{
      list(4).map((key: number) => (
        <div className="v-indicator" key={key} style={{height: `${10 + key * 5}px`, background: volume * 100 > key * 25 ? '#38AE48':'white'}}></div>
      ))
    }</div>
  )
};
