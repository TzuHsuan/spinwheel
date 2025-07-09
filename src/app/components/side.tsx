import React, { JSXElementConstructor, ReactElement } from 'react'

type panelBlock = {
	icon: string, title: string, content: React.FC<any>, props: any
}

export const Side = ({ blocks }: { blocks: panelBlock[] }) => {

	if (blocks.length === 0) return null;

	const [activeChild, setActiveChild] = React.useState<keyof typeof blocks[] | null>(null);
	return (
		<div className="absolute top-[30%] -translate-y-1/2 left-0 ">
			<div className="flex flex-col items-center w-fit items-start ">
				{blocks.map((child, index: number) => (
					<div key={index} className={`flex flex-col items-center w-fit relative cursor-pointer ${activeChild === index ? 'z-2' : 'z-1'} bg-gray-800 hover:bg-gray-600 transition-colors duration-200`}>
						<div onClick={() => activeChild === index ? setActiveChild(null) : setActiveChild(index)} className={`${activeChild === index ? 'w-md' : 'w-fit'} p-4 flex flex-row align-center`}>
							<p className={`text-center ${activeChild === index ? 'w-full' : 'w-0'} h-8 overflow-hidden `} >{child.title}</p>
							<img src={child.icon} alt={`Icon ${child.title}`} className={`w-8 h-8  `} />
						</div>
						<div className={`${(activeChild !== index) ? 'scale-x-0' : 'scale-x-100'} absolute left-0 top-16 w-md overflow-hidden p-2 bg-gray-700 rounded-md text-white origin-left transition-transform`}>
							<child.content {...child.props} />
						</div>

					</div>))}
			</div>
		</div>
	)
}
/*
*/
