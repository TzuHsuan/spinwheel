import React, { useState } from 'react';

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
	const [force, setForce] = useState(0);
	const [friciton, setFriction] = useState(0);

	const spin = () => {
		setForce(10 + Math.random() * 20)
		setFriction(0.99); // Simulate friction
		requestAnimationFrame(spin);
	}

	const animate = () => {
		setRotation(prev => (prev + force / 10) % 360);
		setForce(prev => prev * friciton);
		if (force < 0.1) {
			setForce(0);
			setFriction(0);
			// Optionally, select a random entry here
			selectRandomEntry();
		} else {
			requestAnimationFrame(animate);
		}
	}

	const start = () => {
		requestAnimationFrame(spin);
	}

	return (
		/*
		<div className="flex flex-col items-center">
			<button onClick={selectRandomEntry} className="bg-blue-500 text-white px-4 py-2 rounded-sm">Spin the Wheel</button>
			{selected && <div className="mt-4 text-lg">Selected: {selected.name || selected.id}</div>}
		</div>
		*/
		<div className="perspective-origin-center perspective-distant">
			<div className="border-2 grid place-items-center h-16 w-64" style={{ transform: `translateZ(100px) rotateX(${rotation - 32}deg)` }}>1</div>
			<div className="border-2 grid place-items-center h-16 w-64" style={{ transform: `rotateX(${rotation - 16}deg)` }}>2</div>
			<div className="border-2 grid place-items-center h-16 w-64" style={{ transform: `rotateX(${rotation}deg)` }}>3</div>
			<div className="border-2 grid place-items-center h-16 w-64" style={{ transform: `rotateX(${rotation + 16}deg)` }}>4</div>
			<div className="border-2 grid place-items-center h-16 w-64" style={{ transform: `rotateX(${rotation + 32}deg)` }}>5</div>
		</div>
	);
}
