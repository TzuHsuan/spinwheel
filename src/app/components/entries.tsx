import React from 'react';

type entry = {
	id: string;
	entries: number;
	name?: string;
};
export const Entries = ({ setEntries }: { setEntries: React.Dispatch<React.SetStateAction<{ id: string, entries: number, name?: string }[]>> }) => {
	const [entriesList, setEntriesList] = React.useState<string[]>([]);
	const [raw, setRaw] = React.useState<string>('');

	const parseEntries = (text: string) => {
		const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
		let seperator = ' ';
		let order: (keyof entry & string)[] = [];
		let testChunk = lines[0].split(' ')
		if (testChunk.length < 2) {
			testChunk = lines[0].split(',')
			if (testChunk.length > 1) {
				seperator = ',';
			} else {
				return console.error(`Invalid entry format: ${lines[0]}. Expected format: "name entries" or "name, entries".`);
			}
		}

		if (testChunk.length === 2) {
			const firstIsNumber = !isNaN(Number(testChunk[0]));
			const secondIsNumber = !isNaN(Number(testChunk[1]));
			if (firstIsNumber && !secondIsNumber) {
				order = ['entries', 'id'];
			} else if (!firstIsNumber && secondIsNumber) {
				order = ['id', 'entries'];
			} else {
				order = []
			}
		}

		if (testChunk.length === 3) {
			const firstIsNumber = !isNaN(Number(testChunk[0]));
			const secondIsNumber = !isNaN(Number(testChunk[1]));
			const thridIsNumber = !isNaN(Number(testChunk[2]));
			if (firstIsNumber && !secondIsNumber && !thridIsNumber) {
				order = ['entries', 'id', 'name'];
			} else if (!firstIsNumber && secondIsNumber && !thridIsNumber) {
				order = ['id', 'entries', 'name'];
			} else if (!firstIsNumber && !secondIsNumber && thridIsNumber) {
				order = ['id', 'name', 'entries'];
			} else {
				order = [];
			}
		}

		if (order.length === 0) {
			return console.error(`Invalid entry format: ${lines[0]}. Expected format: "name entries" or "name, entries".`);
		}

		const newEntries: entry[] = lines.map(line => {
			const parts = line.split(seperator).map(part => part.trim());
			let entryObj: any = {};
			entryObj[order[0]] = parts[0];
			entryObj[order[1]] = parts[1];
			if (order.length === 3) {
				entryObj[order[2]] = parts[2];
			}
			return entryObj as entry;
		})

		setEntries(newEntries);
	}


	return (
		<div>
			<textarea className="w-full h-64 p-2 border border-gray-300 rounded" placeholder="Enter entries here, one per line" onChange={(e) => { setRaw(e.target.value) }} value={raw}></textarea>
			<button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => parseEntries(raw)}>Parse Entries</button>
		</div>
	)
}
