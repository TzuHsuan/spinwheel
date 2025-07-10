import React, { useEffect } from 'react';
import { splitText } from '../utils/parse';

export type prize = {
	id: string, entries: number
}

export const Prizes = ({ prizes, setPrizes, done }: { prizes: prize[], setPrizes: React.Dispatch<React.SetStateAction<prize[]>>, done?: () => void }) => {
	const [raw, setRaw] = React.useState<string>('');

	const parsePrizes = (text: string) => {
		const parsedPrizes = splitText(text);
		if (!isNaN(parseInt(parsedPrizes[0][1]))) {
			const newPrizes: prize[] = parsedPrizes.map((line) => {
				return { id: line[0], entries: Number(line[1]), name: line[2] || '' };
			});
			done?.();
			return setPrizes(newPrizes);
		}

		if (!isNaN(parseInt(parsedPrizes[0][0]))) {
			const newPrizes: prize[] = parsedPrizes.map((line) => {
				return { id: line[1], entries: Number(line[0]), name: line[2] || '' };
			});
			done?.();
			return setPrizes(newPrizes);
		}

		if (!isNaN(parseInt(parsedPrizes[0][2]))) {
			const newPrizes: prize[] = parsedPrizes.map((line) => {
				return { id: line[0], entries: Number(line[2]), name: line[1] || '' };
			});
			done?.();
			return setPrizes(newPrizes);
		}
	}

	useEffect(() => {
		if (!prizes || prizes.length === 0) return setRaw('');
		const text = prizes.map((prize) => { return `${prize.id} ${prize.entries}`.trim() }).join('\n');
		console.log(text)
		setRaw(text);
	}, [prizes])

	const placeholderText = `輸入獎品資料，每行一個獎品，格式為 名稱 數量 。例如：
	鑰匙圈 5
	杯墊 10`

	return (
		<div>
			<textarea className="w-full h-64 p-2 border border-gray-300 rounded text-black" placeholder={placeholderText} onChange={(e) => { setRaw(e.target.value) }} value={raw}></textarea>
			<button className="mt-2 px-4 py-2 bg-background-200 hover:bg-background-300 text-black rounded" onClick={() => parsePrizes(raw)}>匯入</button>
		</div>
	)
}
