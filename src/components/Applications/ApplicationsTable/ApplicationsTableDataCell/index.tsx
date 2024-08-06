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
		<td onClick={onClick}>
			{link ? (
				<a href={link} className={highlightLink ? `font-medium text-blue-600 hover:underline ${textColor}` : 'text-black'}>
					{text}
				</a>
			) : (
				<span className={isSpecialTextColor ? `${textColor} bg-gray-200 p-1 rounded-lg text-xs` : ''}>{text}</span>
			)}
		</td>
	);
};

export default TableDataCell;
