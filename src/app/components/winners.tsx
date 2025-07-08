import React from "react";

export type Winner = {
	id: string;
	name?: string;
	prize: string;
};

export const Winners = ({ winners }: { winners: Winner[] }) => {
	return (
		<div className="w-full h-full p-4">
			<h2 className="text-xl font-bold mb-4">Winners</h2>
			<ul className="list-disc pl-5">
				{winners.map((winner, index) => (
					<li key={index} className="mb-2">
						<span className="font-semibold">{winner.name || winner.id}</span> won <span className="italic">{winner.prize}</span>
					</li>
				))}
			</ul>
		</div>
	);
}
