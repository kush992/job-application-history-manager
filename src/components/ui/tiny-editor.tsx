import { config } from '@/config/config';
import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

type Props = {
	initialData: string;
	textareaName: string;
	onChange: (data: string) => void;
};

const TinyEditor = ({ initialData, onChange, textareaName }: Props) => {
	const editorRef = useRef<any>(null);

	const handleEditorChange = (value: any) => {
		if (editorRef.current) {
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
					skin: 'oxide-dark',
					content_css: 'dark',
					height: 500,
					menubar: 'file edit view insert format tools table help',
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
				}}
			/>
		</>
	);
};

export default TinyEditor;
