import React from 'react';

type Props = {
	link?: string;
	highlightLink?: boolean;
	text: string;
	isSpecialTextColor?: boolean;
	textColor?: string;
	onClick?: () => void;
};
const TableDataCell = ({ link, text, highlightLink, isSpecialTextColor, onClick, textColor }: Props) => {
	return (
		<td className='px-6 py-4' onClick={onClick}>
			{link ? (
				<a href={link} className={highlightLink ? 'font-medium text-blue-600 dark:text-blue-500 hover:underline' : ''}>
					{text}
				</a>
			) : (
				<span className={isSpecialTextColor ? `${textColor} dark:bg-gray-900 bg-gray-200 p-1 rounded-lg text-xs` : ''}>{text}</span>
			)}
		</td>
	);
};

export default TableDataCell;
