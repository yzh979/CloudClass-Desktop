import IconPreClass from './assets/pre-class.png'
import IconEndClass from './assets/end-class.png'
import React, { FC } from 'react';
import './index.css'

export interface ClassStatusProps{
	className?:string
	onExit?:() => void
}

export const PreClass: React.FC<ClassStatusProps>  = ({className}) => {
	return (
		<div className={`pre-class ${className}`}>
			<img src={IconPreClass}/>
			<span>还未上课，先休息一会吧</span>
		</div>
	)
}

export const EndClass: React.FC<ClassStatusProps> = ({className, onExit}) => {
	return (
		<div className={`end-class ${className}`}>
			<img src={IconEndClass}/>
			<span className="end-class-title">下课啦</span>
			<span className="end-class-detail">本节课已经结束，记得好好复习哟～</span>
			<button onClick={onExit}>知道了</button>
		</div>
	)
}