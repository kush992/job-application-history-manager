import React from 'react';

type Props = {
	link?: string;
	highlightLink?: boolean;
	text: string;
	isSpecialTextColor?: boolean;
};
const TableDataCell = ({ link, text, highlightLink, isSpecialTextColor }: Props) => {
	return (
		<td className='px-6 py-4'>
			{link ? (
				<a href={link} className={highlightLink ? 'font-medium text-blue-600 dark:text-blue-500 hover:underline' : ''}>
					{text}
				</a>
			) : (
				<span className={isSpecialTextColor ? 'dark:bg-gray-900 bg-gray-200 p-1 rounded-lg text-xs' : ''}>{text}</span>
			)}
		</td>
	);
};

export default TableDataCell;
