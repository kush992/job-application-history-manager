import React from 'react';
import {
	CheckCircleOutlined,
	ClockCircleOutlined,
	CloseCircleOutlined,
	ExclamationCircleOutlined,
	MinusCircleOutlined,
	SyncOutlined,
} from '@ant-design/icons';
import { Divider, Flex, Tag } from 'antd';

type Props = {
	type: 'success' | 'processing' | 'error' | 'warning' | 'default';
	text: string;
	iconType:
		| ''
		| 'CheckCircleOutlined'
		| 'SyncOutlined'
		| 'CloseCircleOutlined'
		| 'ExclamationCircleOutlined'
		| 'ClockCircleOutlined'
		| 'MinusCircleOutlined';
};

const Tags: React.FC<Props> = ({ type, text, iconType }) => {
	function getIcon() {
		switch (iconType) {
			case 'CheckCircleOutlined':
				return <CheckCircleOutlined />;
			case 'SyncOutlined':
				return <SyncOutlined spin />;
			case 'CloseCircleOutlined':
				return <CloseCircleOutlined />;
			case 'ExclamationCircleOutlined':
				return <ExclamationCircleOutlined />;
			case 'ClockCircleOutlined':
				return <ClockCircleOutlined />;
			case 'MinusCircleOutlined':
				return <MinusCircleOutlined />;
			default:
				return <></>;
		}
	}

	return (
		<Tag icon={getIcon()} color={type} className='text-xs'>
			{text}
		</Tag>
	);
};

export default Tags;
