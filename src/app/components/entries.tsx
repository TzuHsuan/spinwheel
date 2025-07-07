import React from 'react';
import { splitText } from '../utils/parse';

type entry = {
	id: string;
	entries: number;
	name?: string;
};
export const Entries = ({ setEntries }: { setEntries: React.Dispatch<React.SetStateAction<{ id: string, entries: number, name?: string }[]>> }) => {
	const [entriesList, setEntriesList] = React.useState<string[]>([]);
	const [raw, setRaw] = React.useState<string>('');

	const parseEntries = (text: string) => {
		const parsedEntries = splitText(text);

		if (!isNaN(parseInt(parsedEntries[0][1]))) {
			const newEntries: entry[] = parsedEntries.map((line) => {
				return { id: line[0], entries: Number(line[1]), name: line[2] || '' };
			});
			return setEntries(newEntries);
		}

		if (!isNaN(parseInt(parsedEntries[0][0]))) {
			const newEntries: entry[] = parsedEntries.map((line) => {
				return { id: line[1], entries: Number(line[0]), name: line[2] || '' };
			});
			return setEntries(newEntries);
		}

		if (!isNaN(parseInt(parsedEntries[0][2]))) {
			const newEntries: entry[] = parsedEntries.map((line) => {
				return { id: line[0], entries: Number(line[2]), name: line[1] || '' };
			});
			return setEntries(newEntries);
		}
	}


	return (
		<div>
			<textarea className="w-full h-64 p-2 border border-gray-300 rounded" placeholder="Enter entries here, one per line" onChange={(e) => { setRaw(e.target.value) }} value={raw}></textarea>
			<button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => parseEntries(raw)}>Parse Entries</button>
		</div>
	)
}
