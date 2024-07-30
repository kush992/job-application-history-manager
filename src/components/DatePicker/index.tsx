import React from 'react';
import { DatePicker } from 'antd';

type Props = {
	onChange: (date: any, dateString: string | string[]) => void;
	initialValue: any;
};

const DatePickerCustom = ({ onChange, initialValue }: Props) => {
	return (
		<>
			<DatePicker onChange={onChange} showTime />
		</>
	);
};

export default DatePickerCustom;
