import React, { useEffect } from 'react';
import { splitText } from '../utils/parse';

export type entry = {
	id: string;
	entries: number;
};

const combineEntries = (entries: entry[]) => {
	const combinedEntries: entry[] = [];
	entries.forEach((entry) => {
		const existing = combinedEntries.findIndex(e => e.id === entry.id);
		if (existing !== -1) {
			combinedEntries[existing].entries += entry.entries;
		} else {
			combinedEntries.push(entry);
		}
	});
	return combinedEntries;
}

export const Entries = ({ entries, setEntries, done }: { entries: entry[], setEntries: React.Dispatch<React.SetStateAction<entry[]>>, done?: () => void }) => {
	const [raw, setRaw] = React.useState<string>('');

	const parseEntries = (text: string) => {
		const parsedEntries = splitText(text);

		if (parsedEntries[0].length === 1) {
			const newEntries: entry[] = parsedEntries.map((line) => {
				return { id: line[0], entries: 1 };
			});
			const combinedEntries = combineEntries(newEntries);
			done?.();
			return setEntries(combinedEntries);
		}

		if (!isNaN(parseInt(parsedEntries[0][1]))) {
			const newEntries: entry[] = parsedEntries.map((line) => {
				return { id: line[0], entries: Number(line[1]) };
			});
			const combinedEntries = combineEntries(newEntries);
			done?.();
			return setEntries(combinedEntries);
		}

		if (!isNaN(parseInt(parsedEntries[0][0]))) {
			const newEntries: entry[] = parsedEntries.map((line) => {
				return { id: line[1], entries: Number(line[0]) };
			});
			const combinedEntries = combineEntries(newEntries);
			done?.();
			return setEntries(combinedEntries);
		}

		if (!isNaN(parseInt(parsedEntries[0][2]))) {
			const newEntries: entry[] = parsedEntries.map((line) => {
				return { id: line[0], entries: Number(line[2]) };
			});
			const combinedEntries = combineEntries(newEntries);
			done?.();
			return setEntries(combinedEntries);
		}
	}

	useEffect(() => {
		if (!entries || entries.length === 0) return setRaw('');
		const text = entries.map((entry) => { return `${entry.id} ${entry.entries}`.trim() }).join('\n');
		console.log(text)
		setRaw(text);
	}, [entries])

	const placeholderText = `輸入抽獎券資料，每行一個抽獎者，格式為 名稱 數量 。例如：
	大雄 5
	小夫 10
也可以省略數量 例如：
	小夫
	小夫
	胖虎
	胖虎
	大雄`

	return (
		<div>
			<textarea className="w-full h-64 p-2 border border-gray-300 rounded text-black" placeholder={placeholderText} onChange={(e) => { setRaw(e.target.value) }} value={raw}></textarea>
			<button className="mt-2 px-4 py-2 bg-background-200 hover:bg-background-300 text-black rounded" onClick={() => parseEntries(raw)}>匯入</button>
		</div>
	)
}
