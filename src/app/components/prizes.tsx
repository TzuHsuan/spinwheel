import React from 'react';
import { splitText } from '../utils/parse';

export type prize = {
	id: string, entries: number
}

export const Prizes = ({ setPrizes }: { setPrizes: React.Dispatch<React.SetStateAction<prize[]>> }) => {
	const [raw, setRaw] = React.useState<string>('');

	const parsePrizes = (text: string) => {
		const parsedPrizes = splitText(text);

		if (!isNaN(parseInt(parsedPrizes[0][1]))) {
			const newPrizes: prize[] = parsedPrizes.map((line) => {
				return { id: line[0], entries: Number(line[1]), name: line[2] || '' };
			});
			return setPrizes(newPrizes);
		}

		if (!isNaN(parseInt(parsedPrizes[0][0]))) {
			const newPrizes: prize[] = parsedPrizes.map((line) => {
				return { id: line[1], entries: Number(line[0]), name: line[2] || '' };
			});
			return setPrizes(newPrizes);
		}

		if (!isNaN(parseInt(parsedPrizes[0][2]))) {
			const newPrizes: prize[] = parsedPrizes.map((line) => {
				return { id: line[0], entries: Number(line[2]), name: line[1] || '' };
			});
			return setPrizes(newPrizes);
		}
	}


	return (
		<div>
			<textarea className="w-full h-64 p-2 border border-gray-300 rounded" placeholder="Enter entries here, one per line" onChange={(e) => { setRaw(e.target.value) }} value={raw}></textarea>
			<button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => parsePrizes(raw)}>Parse Prizes</button>
		</div>
	)
}
