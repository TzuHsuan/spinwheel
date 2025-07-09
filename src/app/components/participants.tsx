import React, { useState, useEffect } from "react";

type entry = {
	id: string, entries: number, name?: string
}
export const Participants = ({ participants }: { participants: entry[] }) => {
	const [totalEntries, setTotalEntries] = useState(0)

	useEffect(() => {
		const total = participants.reduce((acc, participant) => acc + participant.entries, 0);
		setTotalEntries(total);
	}, [participants]);

	return (
		<table className="w-full table-auto border-collapse border border-gray-300">
			<thead>
				<tr className="bg-gray-100">
					<th className="border border-gray-300 px-4 py-2">ID</th>
					<th className="border border-gray-300 px-4 py-2">Entries</th>
					<th className="border border-gray-300 px-4 py-2">Chance</th>
				</tr>
			</thead>
			<tbody>
				{participants.map((participant, index) => (
					<tr key={index} className="hover:bg-gray-50">
						<td className="border border-gray-300 px-4 py-2">{participant.id}</td>
						<td className="border border-gray-300 px-4 py-2">{participant.entries}</td>
						<td className="border border-gray-300 px-4 py-2">{((participant.entries / totalEntries * 100) || 0).toFixed(2) + '%'}</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}
