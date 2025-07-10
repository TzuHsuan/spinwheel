import type { Dispatch, SetStateAction } from "react"
import Image from "next/image";

type track = {
	title: string
}


export const Tracks = ({ trackList, index, setIndex }: { trackList: track[], index: number, setIndex: Dispatch<SetStateAction<number>> }) => {

	const trackNames = trackList.map((track, i) => {
		return (<div className={`m-auto transition-opacity ${index === i ? '' : 'opacity-50'} min-w-full text-center`} key={track.title}>{track.title}</div>)
	})

	const dec = () => {
		setIndex(i => {
			i -= 1
			return i < 0 ? trackList.length - 1 : i
		})
	}

	const inc = () => {
		setIndex(i => (i + 1) % trackList.length)
	}


	return (
		<div className="w-full pt-4">
			<h2 className="text-2xl font-bold text-center ">選擇曲目</h2>
			<div className="flex flex-row h-16 w-1/4 mx-auto">
				<button className="h-full cursor-pointer" onClick={dec}><Image src='/spinwheel/chevron-left.svg' alt="previous Track" height={32} width={32}></Image></button>
				<div className={` overflow-x-hidden w-full `}>
					<div className={`w-full flex flex-row transition-transform carousel-items`} style={{ '--index': -index * 100 + '%' } as React.CSSProperties}>
						{trackNames}
					</div>
				</div>
				<button onClick={inc} className="cursor-pointer"><Image src='/spinwheel/chevron-right.svg' alt="next Track" height={32} width={32}></Image></button>
			</div>
		</div>
	)
}
