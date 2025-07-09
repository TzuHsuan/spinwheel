import type { Dispatch, SetStateAction } from "react"
import Image from "next/image";

import { prize } from "./prizes";

export const PrizePicker = ({ prizeList, index, setIndex }: { prizeList: prize[], index: number, setIndex: Dispatch<SetStateAction<number>> }) => {

	const prizeNames = prizeList.map((prize, i) => {
		return (<div className={`m-auto ${index === i ? '' : 'opacity-50'} min-w-full text-center`} key={prize.id}>{prize.id} x {prize.entries}</div>)
	})


	const emptyList = () => { return (<div className={`m-auto transition-opacity  min-w-full text-center`} >No Items Available</div>) }

	const dec = () => {
		setIndex(i => {
			i -= 1
			return i < 0 ? prizeList.length - 1 : i
		})
	}

	const inc = () => {
		setIndex(i => (i + 1) % prizeList.length)
	}


	return (
		<div className="w-full p-4">
			<h2 className="text-2xl font-bold text-center mt-4">當前獎項</h2>
			<div className="flex flex-row h-16 w-1/4 mx-auto">
				<button className={`h-full ${prizeList.length === 0 && 'disabled'}`} onClick={dec}><Image src='/chevron-left.svg' alt="previous prize" height={32} width={32}></Image></button>
				<div className={` overflow-x-hidden w-full `}>
					<div className={`w-full flex flex-row transition-transform carousel-items`} style={{ '--index': -index * 100 + '%' } as React.CSSProperties}>
						{prizeList.length ? prizeNames : emptyList()}
					</div>
				</div>
				<button className={`${prizeList.length === 0 && 'disabled'}`} onClick={inc}><Image src='/chevron-right.svg' alt="next prize" height={32} width={32}></Image></button>
			</div>
		</div>
	)
}
