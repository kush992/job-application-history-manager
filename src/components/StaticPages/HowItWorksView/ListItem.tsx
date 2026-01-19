import React from 'react';
interface ListItemProps {
	children: React.ReactNode;
	checked?: boolean;
}

export function ListItem({ children, checked = false }: ListItemProps) {
	return <ol className="flex gap-3 items-start text-foreground">{children}</ol>;
}
