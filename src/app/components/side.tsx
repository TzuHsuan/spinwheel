import React from 'react'
import Image from 'next/image'

type panelBlock<T> = {
	icon: string, title: string, content: React.FC<T>, props: T
}

export const Side = ({ blocks }: { blocks: panelBlock<any>[] }) => {

	const [activeChild, setActiveChild] = React.useState<keyof typeof blocks[] | null>(null);


	const closeSelf = () => {
		setActiveChild(null);
	}

	if (blocks.length === 0) return null;
	return (
		<div className="absolute top-[30%] -translate-y-1/2 left-0 ">
			<div className="flex flex-col items-center w-fit items-start ">
				{blocks.map((child, index: number) => (
					<div key={index} className={`flex flex-col items-center w-fit relative cursor-pointer ${activeChild === index ? 'z-2' : 'z-1'} bg-background-200 hover:bg-background-300 transition-colors duration-200 shadow`}>
						<div onClick={() => activeChild === index ? setActiveChild(null) : setActiveChild(index)} className={`${activeChild === index ? 'w-md' : 'w-fit'} p-4 flex flex-row align-center rounded-tr-md`}>
							<p className={`text-center ${activeChild === index ? 'w-full' : 'w-0'} h-8 overflow-hidden text-black`} >{child.title}</p>
							<Image src={child.icon} alt={`Icon ${child.title}`} width={32} height={32} />
						</div>
						<div className={`${(activeChild !== index) ? 'scale-x-0' : 'scale-x-100'} absolute left-0 top-16 w-md overflow-hidden p-2 bg-background-100 rounded-br-md text-white origin-left transition-transform`}>
							<child.content {...child.props} done={closeSelf} />
						</div>

					</div>))}
			</div>
		</div>
	)
}
/*
*/
