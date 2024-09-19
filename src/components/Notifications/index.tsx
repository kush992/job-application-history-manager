import React, { useEffect } from 'react';
import { message } from 'antd';

type Props = {
	type: '' | 'success' | 'error' | 'warning';
	content: string;
};

const Notifications: React.FC<Props> = ({ type, content }) => {
	const [messageApi, contextHolder] = message.useMessage();

	useEffect(() => {
		if (content) {
			messageApi.open({
				type: type === '' ? undefined : type,
				content,
			});
		}
	}, [type, content, messageApi]);

	return <>{contextHolder}</>;
};

export default Notifications;
