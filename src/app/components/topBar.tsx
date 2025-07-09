import Link from "next/link";
import React from "react";

export const TopBar = () => {


	return (<div className="flex items-center justify-between p-4 bg-brand text-white">
		<div className="flex items-center">
			<span className="text-lg font-bold">抽獎轉盤</span>
		</div>
		<nav className="space-x-4">
			<Link href="/" className="hover:text-brand-300">Home</Link>
			<Link href="/about" className="hover:text-brand-300">About</Link>
		</nav>
	</div>)
}
