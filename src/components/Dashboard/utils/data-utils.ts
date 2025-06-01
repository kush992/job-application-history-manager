'use client';

import { ApplicationStatus } from '@/components/ApplicationForm/utility';
import type { JobApplicationData } from '@/types/apiResponseTypes';
import { applicationStatusMapping } from '@/utils/utility';
import { useMemo } from 'react';

// Memoized data transformation utility for status counts
export function useStatusCounts(data: JobApplicationData[]) {
	return useMemo(() => {
		const statusCounts = data.reduce(
			(acc, application) => {
				const status =
					applicationStatusMapping[application.applicationStatus as ApplicationStatus] ||
					applicationStatusMapping.APPLIED;
				acc[status] = (acc[status] || 0) + 1;
				return acc;
			},
			{} as Record<string, number>,
		);

		// Convert to array for chart
		return Object.entries(statusCounts).map(([name, value]) => ({
			name,
			value,
		}));
	}, [data]);
}

// Memoized data transformation utility for salary ranges
export function useSalaryRangeData(data: JobApplicationData[]) {
	return useMemo(() => {
		// Process salary data
		const salaryData = data
			.filter((app) => app.salary && !isNaN(Number(app.salary)))
			.map((app) => ({
				salary: Number(app.salary),
				currency: app.salaryCurrency || 'USD',
				jobTitle: app.jobTitle,
				companyName: app.companyName,
			}));

		// Group salaries into ranges
		const salaryRanges = [
			{ range: '0-50K', min: 0, max: 50000 },
			{ range: '50K-75K', min: 50000, max: 75000 },
			{ range: '75K-100K', min: 75000, max: 100000 },
			{ range: '100K-125K', min: 100000, max: 125000 },
			{ range: '125K-150K', min: 125000, max: 150000 },
			{ range: '150K+', min: 150000, max: Number.POSITIVE_INFINITY },
		];

		return salaryRanges.map((range) => {
			const count = salaryData.filter((item) => item.salary >= range.min && item.salary < range.max).length;

			return {
				range: range.range,
				count: count,
			};
		});
	}, [data]);
}

// Memoized data transformation utility for timeline data
export function useTimelineData(data: JobApplicationData[]) {
	return useMemo(() => {
		// Process date data
		const dateData = data.reduce(
			(acc, app) => {
				const date = new Date(app.$createdAt).toISOString().split('T')[0];
				acc[date] = (acc[date] || 0) + 1;
				return acc;
			},
			{} as Record<string, number>,
		);

		// Convert to array and sort by date
		const timelineData = Object.entries(dateData)
			.map(([date, count]) => ({ date, count }))
			.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

		// Calculate cumulative applications
		let cumulative = 0;
		return timelineData.map((item) => {
			cumulative += item.count;
			return {
				date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
				daily: item.count,
				cumulative,
			};
		});
	}, [data]);
}

// Memoized data transformation utility for company data
export function useCompanyData(data: JobApplicationData[], limit = 10000) {
	return useMemo(() => {
		// Count applications by company
		const companyData = data.reduce(
			(acc, app) => {
				const company = app.companyName;
				acc[company] = (acc[company] || 0) + 1;
				return acc;
			},
			{} as Record<string, number>,
		);

		// Convert to array, sort by count, and take top N
		return Object.entries(companyData)
			.map(([company, count]) => ({ company, count }))
			.sort((a, b) => b.count - a.count);
		// .slice(0, limit);
	}, [data, limit]);
}

// Get distribution data for pie charts (work mode, contract type, job source)
export function useDistributionData(data: JobApplicationData[], field: keyof JobApplicationData) {
	return useMemo(() => {
		const counts = data.reduce(
			(acc, app) => {
				const value = (app[field] as string) || 'Not Specified';
				acc[value] = (acc[value] || 0) + 1;
				return acc;
			},
			{} as Record<string, number>,
		);

		return Object.entries(counts).map(([name, value]) => ({
			name,
			value,
		}));
	}, [data, field]);
}

// Batch process large datasets for efficient rendering
export function batchProcessData<T, R>(items: T[], processFn: (item: T) => R, batchSize = 50): R[] {
	const result: R[] = [];

	// Process in smaller batches to avoid UI freezing
	for (let i = 0; i < items.length; i += batchSize) {
		const batch = items.slice(i, i + batchSize).map(processFn);
		result.push(...batch);
	}

	return result;
}
