import React, { useState, useEffect } from "react";
import type { entry } from "./entries";

export const Participants = ({ participants }: { participants: entry[] }) => {
	const [totalEntries, setTotalEntries] = useState(0)

	useEffect(() => {
		const total = participants.reduce((acc, participant) => acc + participant.entries, 0);
		setTotalEntries(total);
	}, [participants]);

	return (
		<table className="w-full table-auto text-black border-collapse border border-gray-300">
			<thead>
				<tr className="bg-background-300">
					<th className="border border-gray-300 px-4 py-2">抽獎人</th>
					<th className="border border-gray-300 px-4 py-2">抽獎券數</th>
					<th className="border border-gray-300 px-4 py-2">機率</th>
				</tr>
			</thead>
			<tbody>
				{participants.map((participant, index) => (
					<tr key={index} className="bg-background-200 hover:bg-background-300">
						<td className="border border-gray-300 px-4 py-2">{participant.id}</td>
						<td className="border border-gray-300 px-4 py-2">{participant.entries}</td>
						<td className="border border-gray-300 px-4 py-2">{((participant.entries / totalEntries * 100) || 0).toFixed(2) + '%'}</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}
