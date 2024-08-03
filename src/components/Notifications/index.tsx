import React, { useEffect } from 'react';
import { Button, message, Space } from 'antd';

type Props = {
	type: 'success' | 'error' | 'warning';
	content: string;
};

const Notifications: React.FC<Props> = ({ type, content }) => {
	const [messageApi, contextHolder] = message.useMessage();

	useEffect(() => {
		const success = () => {
			messageApi.open({
				type: 'success',
				content: 'This is a success message',
			});
		};

		const error = () => {
			messageApi.open({
				type: 'error',
				content: 'This is an error message',
			});
		};

		const warning = () => {
			messageApi.open({
				type: 'warning',
				content: 'This is a warning message',
			});
		};
		if (type === 'success') {
			success();
		} else if (type === 'error') {
			error();
		} else if (type === 'warning') {
			warning();
		}
	}, [type, content, messageApi]);

	return <>{contextHolder}</>;
};

export default Notifications;
