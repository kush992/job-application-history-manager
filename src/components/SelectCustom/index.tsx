import React from 'react';
import { Select } from 'antd';

type Props = {
	options: { value: string; label: string }[];
	labelName: string;
	onChange: (value: { value: string; label: string }) => void;
	isError: boolean;
	errorText: string;
	className?: string;
	initialValue?: { value: string; label: string };
};

const SelectWithLabel = ({ options, labelName, isError, errorText, onChange, className, initialValue }: Props) => {
	return (
		<div className='flex flex-col gap-1'>
			<label className='text-xs my-0 py-0'>{labelName}</label>
			<Select options={options} onChange={onChange} className={className} size='large' defaultValue={initialValue} />
			{isError && <p className='text-[10px] py-2 text-red-400'>{errorText}</p>}
		</div>
	);
};

export default SelectWithLabel;
