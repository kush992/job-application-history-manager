import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';
import { useFileUpload } from '@/hooks/useFileUpload';
import { UseFormSetValue } from 'react-hook-form';
import { FormData } from '@/components/ApplicationForm/utility';
import { appwriteDatabaseConfig, database } from '@/appwrite/config';
import { ID } from 'appwrite';
import { nanoid } from 'nanoid';
import { config } from '@/config/config';

type Props = {
	setValue: UseFormSetValue<FormData>;
};

const { Dragger } = Upload;

const UploaderCustom: React.FC<Props> = ({ setValue }) => {
	const uploadFile = useFileUpload();

	if (config.uiShowUploader === '0') {
		return <></>;
	}

	const props: UploadProps = {
		name: 'file',
		multiple: true,
		supportServerRender: true,
		async onChange(info) {
			const uploadOk = await uploadFile(info.file.originFileObj as File);
			if (uploadOk) {
				message.success(`${info.file.name} file uploaded successfully`);

				database.createDocument(
					appwriteDatabaseConfig.applicationDatabase,
					appwriteDatabaseConfig.applicationDatabaseDocumentCollectionId,
					ID.unique(),
					{
						link: uploadOk,
						userId: nanoid(12),
					},
				);
			} else {
				message.error(`${info.file.name} file upload failed.`);
			}
		},
		onDrop(e) {
			// console.log('Dropped files', e.dataTransfer.files);
		},
		async onRemove(file) {
			// console.log(file);
		},
	};
	return (
		<Dragger {...props}>
			<p className='ant-upload-drag-icon'>
				<InboxOutlined />
			</p>
			<p className='ant-upload-text'>Click or drag files to this area to upload</p>
		</Dragger>
	);
};

export default UploaderCustom;
