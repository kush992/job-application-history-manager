'use client';

import { Cpu, FileQuestion, Home, LayoutDashboard, Menu, MessageSquare, Plus, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { appRoutes } from '@/utils/constants';

const navigationItems = [
	{ href: appRoutes.home, label: 'Home', icon: Home },
	{ href: appRoutes.journeys, label: 'Journeys', icon: LayoutDashboard },
	{ href: appRoutes.application, label: 'Applications', icon: FileQuestion },
	{ href: appRoutes.interviewExperiences, label: 'Interview Experiences', icon: MessageSquare },
	{ href: appRoutes.interviewQuestions, label: 'Interview Questions', icon: FileQuestion },
	{ href: appRoutes.addApplication, label: 'Add Application', icon: Plus },
	{ href: appRoutes.addWithAiApplication, label: 'Add with AI', icon: Cpu },
	{ href: appRoutes.addInterviewExperiences, label: 'Add Experience', icon: Plus },
];

type SidebarProps = {
	className?: string;
};

export function Sidebar({ className }: SidebarProps) {
	const pathname = usePathname();
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			{/* Mobile Menu Button */}
			<Button
				variant="ghost"
				size="icon"
				className="md:hidden fixed top-4 left-4 z-50"
				onClick={() => setIsOpen(!isOpen)}
			>
				{isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
			</Button>

			{/* Mobile Overlay */}
			{isOpen && (
				<div
					className="fixed inset-0 bg-black/50 z-40 md:hidden"
					onClick={() => setIsOpen(false)}
				/>
			)}

			{/* Sidebar */}
			<aside
				className={cn(
					'fixed left-0 top-0 z-40 h-screen w-64 border-r bg-background transition-transform md:translate-x-0',
					isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
					className,
				)}
			>
				<div className="flex h-full flex-col gap-4 p-4 pt-16 md:pt-4">
					<nav className="flex flex-col gap-1">
						{navigationItems.map((item) => {
							const Icon = item.icon;
							const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
							return (
								<Link
									key={item.href}
									href={item.href}
									onClick={() => setIsOpen(false)}
									className={cn(
										'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
										isActive
											? 'bg-accent text-accent-foreground'
											: 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
									)}
								>
									<Icon className="h-4 w-4" />
									{item.label}
								</Link>
							);
						})}
					</nav>
				</div>
			</aside>
		</>
	);
}

