import React, { useEffect } from 'react';
import { splitText } from '../utils/parse';

type entry = {
	id: string;
	entries: number;
	name?: string;
};
export const Entries = ({ entries, setEntries, done }: { entries: entry[], setEntries: React.Dispatch<React.SetStateAction<entry[]>>, done?: () => void }) => {
	const [raw, setRaw] = React.useState<string>('');

	const parseEntries = (text: string) => {
		const parsedEntries = splitText(text);

		if (!isNaN(parseInt(parsedEntries[0][1]))) {
			const newEntries: entry[] = parsedEntries.map((line) => {
				return { id: line[0], entries: Number(line[1]), name: line[2] || '' };
			});
			done?.();
			return setEntries(newEntries);
		}

		if (!isNaN(parseInt(parsedEntries[0][0]))) {
			const newEntries: entry[] = parsedEntries.map((line) => {
				return { id: line[1], entries: Number(line[0]), name: line[2] || '' };
			});
			done?.();
			return setEntries(newEntries);
		}

		if (!isNaN(parseInt(parsedEntries[0][2]))) {
			const newEntries: entry[] = parsedEntries.map((line) => {
				return { id: line[0], entries: Number(line[2]), name: line[1] || '' };
			});
			done?.();
			return setEntries(newEntries);
		}
	}

	useEffect(() => {
		if (!entries || entries.length === 0) return setRaw('');
		const text = entries.map((entry) => { return `${entry.id} ${entry.entries} ${entry.name || ''}`.trim() }).join('\n');
		console.log(text)
		setRaw(text);
	}, [entries])


	return (
		<div>
			<textarea className="w-full h-64 p-2 border border-gray-300 rounded text-black" placeholder="Enter entries here, one per line" onChange={(e) => { setRaw(e.target.value) }} value={raw}></textarea>
			<button className="mt-2 px-4 py-2 bg-background-200 hover:bg-background-300 text-black rounded" onClick={() => parseEntries(raw)}>Parse Entries</button>
		</div>
	)
}
