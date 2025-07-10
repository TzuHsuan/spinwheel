import React from "react";

export type Winner = {
	id: string;
	name?: string;
	prize: string;
};

export const Winners = ({ winners }: { winners: Winner[] }) => {
	return (
		<div className="w-full h-full">
			<table className="w-full table-auto border-collapse border border-gray-300 text-black">
				<thead>
					<tr className="bg-background-300">
						<th className="border border-gray-300 px-4 py-2">得獎人</th>
						<th className="border border-gray-300 px-4 py-2">獎項</th>
					</tr>
				</thead>
				<tbody>
					{winners.map((winner, index) => (
						<tr key={index} className="bg-background-200 hover:bg-background-300">
							<td className="border border-gray-300 px-4 py-2">{winner.id}</td>
							<td className="border border-gray-300 px-4 py-2">{winner.prize}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
