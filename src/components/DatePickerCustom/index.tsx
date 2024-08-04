import React from 'react';
import { DatePicker } from 'antd';

type Props = {
	onChange: (date: any, dateString: string | string[]) => void;
	initialValue: any;
};

const DatePickerCustom = ({ onChange, initialValue }: Props) => {
	return (
		<div className='overflow-scroll md:w-full'>
			<DatePicker size='large' onChange={onChange} showTime popupClassName='md:w-full !w-[300px] overflow-scroll' />
		</div>
	);
};

export default DatePickerCustom;
