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

	const [wheel, setWheel] = useState({ rotation: 0, force: 0 });
	const FRICTION = 0.99; // Friction factor to slow down the wheel
	const requestRef = React.useRef(0);

	const spin = () => {
		if (requestRef.current === 0) {
			setWheel(prev => { return { ...prev, force: 10 + Math.random() * 20 } }); // Simulate friction
			requestRef.current = requestAnimationFrame(spin);
		} else {
			setWheel(prev => {
				console.log(prev)
				console.log(requestRef.current)
				if (prev.force < 0.1) {
					cancelAnimationFrame(requestRef.current);
					requestRef.current = 0;
					return { force: 0, rotation: prev.rotation };
				}
				return {
					force: prev.force * FRICTION, // Apply friction
					rotation: (prev.rotation + prev.force) % 360
				};
			})
			if (requestRef.current !== 0) {
				console.log('requesting animation frame', requestRef.current);
				requestRef.current = requestAnimationFrame(spin);
			}
		}
	}

	const animate = () => {
	}

	useEffect(() => {
		return () => {
			cancelAnimationFrame(requestRef.current);
			requestRef.current = 0;
		};
	}, []);

	const start = () => {
		requestAnimationFrame(spin);
	}

	return (
		<>
			<div className="h-[16rem] w-lg perspective-origin-center perspective-distant grid place-content-center overflow-hidden inset-shadow-sm">
				<div className="border-2 grid place-items-center h-16 w-[24rem] stack" style={{ transform: `rotateX(${wheel.rotation + 32}deg) translateZ(220px) ` }}>1</div>
				<div className="border-2 grid place-items-center h-16 w-[24rem] stack" style={{ transform: `rotatex(${wheel.rotation + 16}deg) translatez(220px) ` }}>2</div>
				<div className="border-2 grid place-items-center h-16 w-[24rem] stack" style={{ transform: `rotateX(${wheel.rotation}deg) translateZ(220px) ` }}>3</div>
				<div className="border-2 grid place-items-center h-16 w-[24rem] stack" style={{ transform: `rotateX(${wheel.rotation - 16}deg) translateZ(220px) ` }}>4</div>
				<div className="border-2 grid place-items-center h-16 w-[24rem] stack" style={{ transform: `rotateX(${wheel.rotation - 32}deg) translateZ(220px) ` }}>5</div>
			</div>
			<button className="mt-4 p-2 bg-blue-500 text-white rounded" onClick={start}> Spin</button>
		</>
	);
}
