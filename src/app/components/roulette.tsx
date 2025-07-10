import React, { useState, useEffect, useRef } from 'react';
import { Chevron } from "@/app/components/chevron"

import type { entry } from "./entries";


export const Roulette = ({ entries, isSpinning, done, duration, setWinner }: { entries: entry[], isSpinning: boolean, done: () => void, duration: number, setWinner: React.Dispatch<React.SetStateAction<string | null>> }) => {
	const [rotation, setRotation] = useState(0);
	const requestRef = React.useRef(0);
	const startTime = useRef(0);
	let maxSpeed = 0;
	const [list, setList] = useState(['', '', '', '', ''])

	const newEntry = () => {
		console.log(totalEntries)
		let target = Math.ceil(Math.random() * totalEntries);
		console.log(target)
		let index = 0
		while (target > 0) {
			target -= entries[index].entries;
			if (target <= 0) return entries[index].id;
			index++;
		}
	}

	const [totalEntries, setTotalEntries] = useState(0);

	useEffect(() => {
		setTotalEntries(entries.reduce((acc, entry) => acc + entry.entries, 0));
	}, [entries]);


	//progress should be between 0 and 1
	const spinSpeed = (progress: number) => {
		if (progress < 0 || progress > 1) {
			throw new Error("Progress must be between 0 and 1");
		}
		if (progress < .2) {
			return maxSpeed * Math.sin((progress / .2) * Math.PI / 2);
		}
		if (progress > .7) {
			return maxSpeed * (Math.sin(((progress - .7) / .15) * Math.PI / 2 + Math.PI / 2) / 2 + .5);
		}
		return maxSpeed;
	}

	useEffect(() => {
		if (rotation < -16) {
			setRotation(prev => prev + 16);
			setList(prev => {
				const newEnt = newEntry() as string;
				return [newEnt, ...prev.slice(0, -1)]
			});
		}
	}, [rotation, list, setList, newEntry])

	useEffect(() => {
		if (!isSpinning && requestRef.current !== 0) {
			if (rotation > -8) setWinner(list[2])
			else setWinner(list[1])
			startTime.current = 0;
		}
	}, [isSpinning, requestRef.current])

	const spin = (timestamp: number) => {
		if (startTime.current === 0) {
			startTime.current = timestamp;
			requestRef.current = requestAnimationFrame(spin);
		} else {
			const elapsed = timestamp - startTime.current;
			if (elapsed > duration) {
				done();
				return
			}
			setRotation(prev => {
				const newRotation = prev - spinSpeed(elapsed / duration);
				return newRotation
			});
			requestRef.current = requestAnimationFrame(spin);
		}
	}

	useEffect(() => {
		return () => {
			cancelAnimationFrame(requestRef.current);
		};
	}, []);

	useEffect(() => {
		if (isSpinning) {
			startTime.current = 0;
			maxSpeed = 2 + Math.random() * duration / 10000; // Maximum speed of the wheel
			requestRef.current = requestAnimationFrame(spin);
		} else {
			cancelAnimationFrame(requestRef.current);
		}

	}, [isSpinning])

	const panels = list.map((item, index) => (
		<div key={item + index} className="border-2 border-black bg-background-300 text-black grid place-items-center h-16 w-[24rem] stack" style={{ transform: `rotateX(${rotation + 32 - (index) * 16}deg) translateZ(220px)` }}>
			{item}
		</div>
	))

	return (
		<>
			<div className="h-[16rem] w-lg bg-black perspective-origin-center perspective-distant grid place-content-center overflow-hidden inset-shadow-sm">
				<div className='size-2 bg-black absolute top-[50%]'></div>
				{panels}
				<Chevron color="white" direction='right' className='absolute top-[50%] -translate-y-1/2 -translate-x-1/2 w-8 h-8' />
				<Chevron color="white" className='absolute top-[50%] right-0 -translate-y-1/2 translate-x-1/2 w-8 h-8' />
			</div>
		</>
	);
}
