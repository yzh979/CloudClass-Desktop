import {BaseProps} from "~components/interface/base-props";
import React, {FC} from "react";

import "./index.css"
import closeImage from './assets/icon-close.png'

import levelClass from './assets/icon-level-class.png'

import outClass from './assets/icon-out-class.png'

export interface ExitProps extends BaseProps {
    closeDialog? : (e: any) => void | Promise<void>
    levelClassClick?: (e:any) => void | Promise<void>;
    outClassClick?: (e: React.MouseEvent<HTMLElement>) => void | Promise<void>;

}


export const TeacherExit: FC<ExitProps> = ({
                                               closeDialog ,
                                               levelClassClick ,
                                               outClassClick,
                                               ...restProps
                                           }) => {


    return <div className={"exit-body"} {...restProps} >
                <div className={'exit-header'}>
                    <span>退出直播</span>
                    <img src={closeImage}  onClick={()=>console.log('tag' , 'img on close dialog ')} />
                </div>

                <div className={'exit-select'}>
                    <div className={'level-class'} {...restProps} onClick={()=>levelClassClick}> <img src={levelClass} /> <span>暂时离开</span> </div>
                    <div className={'out-class'} {...restProps} onClick={()=>outClassClick}> <img src={outClass}/> <span>下课啦</span> </div>
                </div>

            </div>

}