import { config } from '@/config/config';
import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

type Props = {
	initialData: string;
	textareaName: string;
	onChange: (data: any) => void;
};

const TinyEditor = ({ initialData, onChange, textareaName }: Props) => {
	const editorRef = useRef<any>(null);
	const log = () => {
		if (editorRef.current) {
			console.log(editorRef.current.getContent());
		}
	};

	const handleEditorChange = (value: any) => {
		if (editorRef.current) {
			console.log(editorRef.current.getContent());
			onChange(editorRef.current.getContent());
		}
	};

	return (
		<>
			<Editor
				apiKey={config.tinymceApiKey}
				onInit={(_evt: any, editor: any) => (editorRef.current = editor)}
				initialValue={initialData}
				onEditorChange={(newValue) => handleEditorChange(newValue)}
				textareaName={textareaName}
				init={{
					height: 500,
					menubar: false,
					plugins: [
						'advlist',
						'autolink',
						'lists',
						'link',
						'image',
						'charmap',
						'preview',
						'anchor',
						'searchreplace',
						'visualblocks',
						'code',
						'fullscreen',
						'insertdatetime',
						'media',
						'table',
						'code',
						'help',
						'wordcount',
					],
					toolbar:
						'undo redo | blocks | ' +
						'bold italic backcolor | alignleft aligncenter ' +
						'alignright alignjustify | bullist numlist outdent indent | ' +
						'removeformat | help',
					content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
				}}
			/>
		</>
	);
};

export default TinyEditor;
