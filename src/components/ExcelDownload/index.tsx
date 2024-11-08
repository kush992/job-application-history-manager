'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import * as XLSX from 'xlsx';

type JobApplicationData = {
	jobTitle: string;
	notes: string;
	salary: string;
	salaryType: string;
	applicationStatus: null | string;
	salaryCurrency: string;
	companyName: string;
	companyDomain: string;
	interviewDate: null | Date;
	links: null | string;
	$id: string;
	$createdAt: string;
	$updatedAt: string;
	location?: string;
	jobLink?: string;
	jobPostedOn?: string;
	workMode?: string;
	contractType?: string;
};

interface ExcelDownloadProps {
	data: JobApplicationData[];
	fileName?: string;
}

export default function ExcelDownload({ data, fileName = 'job_applications.xlsx' }: ExcelDownloadProps) {
	const [isLoading, setIsLoading] = useState(false);

	const downloadExcel = async () => {
		setIsLoading(true);
		try {
			// Convert data to worksheet
			const worksheet = XLSX.utils.json_to_sheet(data as JobApplicationData[]);

			// Create workbook and add the worksheet
			const workbook = XLSX.utils.book_new();
			XLSX.utils.book_append_sheet(workbook, worksheet, 'Job Applications');

			// Generate Excel file
			XLSX.writeFile(workbook, fileName);
		} catch (error) {
			console.error('Error generating Excel file:', error);
			// You might want to show an error message to the user here
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Button onClick={downloadExcel} disabled={isLoading}>
			{isLoading ? 'Generating...' : <Download className="h-4 w-4" />}
		</Button>
	);
}
