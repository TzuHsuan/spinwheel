import React from 'react'

export const Side = ({ children }: { children: React.ReactNode | React.ReactNode[] }) => {

	if (!children) return null;
	if (!Array.isArray(children)) children = [children]

	const [activeChild, setActiveChild] = React.useState<keyof typeof children[] | null>(null);
	return (
		<div className="absolute top-[50%] -translate-y-1/2 left-0 bg-gray-800 p-2">
			<div className="flex flex-row items-center gap-2">
				<ul>
					{(children as React.ReactNode[]).map((child, index: number) => (
						<li
							key={index}
							className={`size-5 ${activeChild == index ? 'text-blue-500' : 'text-white'} text-center cursor-pointer`}
							onClick={() => activeChild === index ? setActiveChild(null) : setActiveChild(index)}>{index}</li>))}
				</ul>
				{(activeChild != null) && (children as React.ReactNode[])[activeChild] as React.ReactElement}
			</div>
		</div>
	)
}
/*
*/
