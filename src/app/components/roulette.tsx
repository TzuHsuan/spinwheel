import React, { useState, useEffect } from 'react';

type entry = {
	id: string,
	name?: string,
}

export const Roulette = ({ entries }: { entries: entry[] }) => {
	const [selected, setSelected] = useState<entry | null>(null);

	const selectRandomEntry = () => {
		if (entries.length === 0) return;
		const randomIndex = Math.floor(Math.random() * entries.length);
		setSelected(entries[randomIndex]);
	};

	const [rotation, setRotation] = useState(0);
	const FRICTION = 0.99; // Friction factor to slow down the wheel
	const requestRef = React.useRef(0);
	let startTime = 0;
	let duration = 0;
	let maxSpeed = 0;

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

	const spin = (timestamp: number) => {
		if (startTime === 0) {
			startTime = timestamp;
			requestRef.current = requestAnimationFrame(spin);
		} else {
			let elapsed = timestamp - startTime;
			if (elapsed > duration) {
				startTime = 0;
				// pick winner
				return;
			}
			setRotation(prev => { return (prev + spinSpeed(elapsed / duration)) % 360 });
			requestRef.current = requestAnimationFrame(spin);
		}
	}

	useEffect(() => {
		return () => {
			cancelAnimationFrame(requestRef.current);
		};
	}, []);

	const start = () => {
		duration = 5000
		maxSpeed = 10 + Math.random() * duration / 1000; // Maximum speed of the wheel
		requestAnimationFrame(spin);
	}

	return (
		<>
			<div className="h-[16rem] w-lg perspective-origin-center perspective-distant grid place-content-center overflow-hidden inset-shadow-sm">
				<div className="border-2 grid place-items-center h-16 w-[24rem] stack" style={{ transform: `rotateX(${rotation + 32}deg) translateZ(220px) ` }}>1</div>
				<div className="border-2 grid place-items-center h-16 w-[24rem] stack" style={{ transform: `rotatex(${rotation + 16}deg) translatez(220px) ` }}>2</div>
				<div className="border-2 grid place-items-center h-16 w-[24rem] stack" style={{ transform: `rotateX(${rotation}deg) translateZ(220px) ` }}>3</div>
				<div className="border-2 grid place-items-center h-16 w-[24rem] stack" style={{ transform: `rotateX(${rotation - 16}deg) translateZ(220px) ` }}>4</div>
				<div className="border-2 grid place-items-center h-16 w-[24rem] stack" style={{ transform: `rotateX(${rotation - 32}deg) translateZ(220px) ` }}>5</div>
			</div>
			<button className="mt-4 p-2 bg-blue-500 text-white rounded" onClick={start}> Spin</button>
		</>
	);
}
