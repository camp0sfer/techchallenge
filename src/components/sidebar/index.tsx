import React from 'react';
import Link from 'next/link';

export const Sidebar = () => {
	return (
		<aside className="bg-zinc-900 text-white w-64 h-screen p-6">
			<nav>
				<ul className="space-y-4">
					<li><Link href="/" className="hover:text-gray-300">Início</Link></li>
					<li><Link href="/transactions" className="hover:text-gray-300">Transações</Link></li>
				</ul>
			</nav>
		</aside>
	);
};
