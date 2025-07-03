import React, { useState, useEffect } from 'react';

type entry = {
	id: string,
	name?: string,
}

export const Roulette = ({ entries, isSpinning, done, duration, setWinner }: { entries: entry[], isSpinning: boolean, done: Function, duration: number, setWinner: React.Dispatch<React.SetStateAction<string | null>> }) => {
	const [rotation, setRotation] = useState(0);
	const requestRef = React.useRef(0);
	let startTime = 0;
	let maxSpeed = 0;
	const [list, setList] = useState(['1', '2', '3', '4', '5'])

	const newEntry = () => {
		const entry = entries[Math.floor(Math.random() * entries.length)];
		return entry.name || entry.id;
	}


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
				return [newEntry(), ...prev.slice(0, -1)]
			});
		}
	}, [rotation, list])

	useEffect(() => {
		if (!isSpinning && requestRef.current !== 0) {
			if (rotation > -8) setWinner(list[2])
			else setWinner(list[1])
			startTime = 0;
		}
	}, [isSpinning, requestRef.current])

	const spin = (timestamp: number) => {
		if (startTime === 0) {
			startTime = timestamp;
			requestRef.current = requestAnimationFrame(spin);
		} else {
			let elapsed = timestamp - startTime;
			if (elapsed > duration) {
				done();
				return
			}
			setRotation(prev => {
				let newRotation = prev - spinSpeed(elapsed / duration);
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
			startTime = 0;
			maxSpeed = 2 + Math.random() * duration / 10000; // Maximum speed of the wheel
			requestRef.current = requestAnimationFrame(spin);
		} else {
			cancelAnimationFrame(requestRef.current);
		}

	}, [isSpinning])

	const panels = list.map((item, index) => (
		<div key={item + index} className="border-2 bg-gray-700 grid place-items-center h-16 w-[24rem] stack" style={{ transform: `rotateX(${rotation + 32 - (index) * 16}deg) translateZ(220px)` }}>
			{item}
		</div>
	))

	return (
		<>
			<div className="h-[16rem] w-lg bg-black perspective-origin-center perspective-distant grid place-content-center overflow-hidden inset-shadow-sm">
				<div className='size-2 bg-black absolute top-[50%]'></div>
				{panels}
			</div>
		</>
	);
}
