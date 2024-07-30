import { Input } from 'antd';
import React from 'react';

interface Props extends HTMLInputElement {
	labelName: string;
	onChange: (data: React.FormEvent<HTMLInputElement>) => void;
	isError: boolean;
	errorText: string;
	value: string;
}

const InputWithLabel = (props: Props) => {
	const { labelName, placeholder, name, className, isError, errorText, onChange, readOnly, value } = props;

	return (
		<div>
			<label className='text-xs my-0 py-0'>{labelName}</label>
			<Input
				placeholder={placeholder}
				name={name}
				className={className}
				onChange={onChange}
				size='large'
				width={'50%'}
				readOnly={readOnly}
				defaultValue={value}
			/>
			{isError && <p className='text-[10px] py-2 text-red-400'>{errorText}</p>}
		</div>
	);
};

export default InputWithLabel;
