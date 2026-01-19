import { ArrowDown, ArrowUp, Trophy } from 'lucide-react';
import React, { useMemo } from 'react';

import type { StatisticsTimeEntry, StatisticsWithTime } from '@/types/schema';

import ApplicationFunnelDataChart from './ApplicationFunnelDataChart';
import ApplicationResponseBreakdownDataChart from './ApplicationResponseBreakdownDataChart';
import ApplicationsOverTimeChart from './ApplicationsOverTimeChart';
import EmploymentTypeDataChart from './EmploymentTypeDataChart';
import KeyMetrics from './KeyMetrics';
import SalaryCurrencyTypeChart from './SalaryCurrencyTypeChart';
import SalaryDistributionChart from './SalaryDistributionChart';
import WorkModeChart from './WorkArrangementDataChart';

type Props = {
	statistics: StatisticsWithTime;
	replyRate: string;
	successRate: string;
};

const MetricsTabContent: React.FC<Props> = ({ statistics, replyRate, successRate }) => {
	const { chartData, summary } = useMemo(() => {
		const rowsRaw: (StatisticsTimeEntry | null | undefined)[] = statistics.applications_time ?? [];
		const rows = rowsRaw.filter((r): r is StatisticsTimeEntry => Boolean(r && r.month != null));

		// build chart data
		const chartData = rows.map((r) => ({
			label: new Date(Date.UTC(r.year, Math.max(0, r.month - 1), 1)).toLocaleString(undefined, {
				month: 'short',
				year: 'numeric',
			}),
			applications: r.applications_count,
			_year: r.year,
			_month: r.month,
		}));

		const years = Array.from(new Set(rows.map((r) => r.year))).sort((a, b) => a - b);
		const latestYear = years.length ? years[years.length - 1] : new Date().getFullYear();
		const prevYear = latestYear - 1;

		const totalsByYear = rows.reduce<Record<number, number>>((acc, r) => {
			acc[r.year] = (acc[r.year] || 0) + (r.applications_count || 0);
			return acc;
		}, {});

		const currentYearTotal = totalsByYear[latestYear] ?? 0;
		const previousYearTotal = totalsByYear[prevYear] ?? 0;

		let mostProductive: { label: string; count: number } | null = null;
		let leastProductive: { label: string; count: number } | null = null;
		if (rows.length) {
			const maxRow = rows.reduce((a, b) => (a.applications_count >= b.applications_count ? a : b));
			const minRow = rows.reduce((a, b) => (a.applications_count <= b.applications_count ? a : b));
			mostProductive = {
				label: new Date(Date.UTC(maxRow.year, Math.max(0, maxRow.month - 1), 1)).toLocaleString(undefined, {
					month: 'short',
					year: 'numeric',
				}),
				count: maxRow.applications_count,
			};
			leastProductive = {
				label: new Date(Date.UTC(minRow.year, Math.max(0, minRow.month - 1), 1)).toLocaleString(undefined, {
					month: 'short',
					year: 'numeric',
				}),
				count: minRow.applications_count,
			};
		}

		return {
			chartData,
			summary: { latestYear, prevYear, currentYearTotal, previousYearTotal, mostProductive, leastProductive },
		};
	}, [statistics]);

	return (
		<div className="space-y-6">
			<KeyMetrics statistics={statistics} replyRate={replyRate} successRate={successRate} />

			{/* Summary box rendered outside of chart, below quick analysis (KeyMetrics) */}
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
				{/* Previous year card */}
				<div>
					<div className="p-4 border rounded-md bg-card">
						<div className="flex items-center justify-between">
							<div>
								<div className="text-xs text-muted-foreground">{summary.prevYear} total</div>
								<div className="text-2xl font-bold">{summary.previousYearTotal}</div>
							</div>
							<div className="text-muted-foreground text-sm">Prev</div>
						</div>
						<div className="mt-2 text-xs text-secondary-foreground">
							Total applications in previous year
						</div>
					</div>
				</div>

				{/* Current year card with delta */}
				<div>
					<div className="p-4 border rounded-md bg-card">
						<div className="flex items-center justify-between">
							<div>
								<div className="text-xs text-muted-foreground">{summary.latestYear} total</div>
								<div className="text-2xl font-bold">{summary.currentYearTotal}</div>
							</div>
							<div>
								{/* percent change */}
								{summary.previousYearTotal ? (
									(() => {
										const diff = summary.currentYearTotal - summary.previousYearTotal;
										const pct = Math.round((diff / summary.previousYearTotal) * 100);
										const isUp = pct >= 0;
										return (
											<div
												className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm ${isUp ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}
											>
												{isUp ? (
													<ArrowUp className="w-4 h-4" />
												) : (
													<ArrowDown className="w-4 h-4" />
												)}
												<span className="font-medium">{Math.abs(pct)}%</span>
											</div>
										);
									})()
								) : (
									<div className="text-sm text-muted-foreground">—</div>
								)}
							</div>
						</div>
						<div className="mt-2 text-xs text-secondary-foreground">Change vs previous year</div>
					</div>
				</div>

				{/* Most vs least productive */}
				<div>
					<div className="p-4 border rounded-md bg-card flex items-center gap-3">
						<div className="flex-1">
							<div className="text-xs text-muted-foreground">Most productive month</div>
							<div className="flex items-center gap-3 mt-1">
								<div className="p-2 bg-emerald-50 rounded-md">
									<Trophy className="w-6 h-6 text-emerald-600" />
								</div>
								<div>
									<div className="text-sm font-medium">
										{summary.mostProductive ? summary.mostProductive.label : 'N/A'}
									</div>
									<div className="text-xl font-bold text-emerald-600">
										{summary.mostProductive ? summary.mostProductive.count : '-'}
									</div>
								</div>
							</div>
						</div>
						<div className="w-px h-12 bg-border" />
						<div className="flex-1">
							<div className="text-xs text-muted-foreground">Least productive</div>
							<div className="flex items-center gap-3 mt-1">
								<div className="p-2 bg-red-50 rounded-md">
									<ArrowDown className="w-6 h-6 text-red-600" />
								</div>
								<div>
									<div className="text-sm font-medium">
										{summary.leastProductive ? summary.leastProductive.label : 'N/A'}
									</div>
									<div className="text-xl font-bold text-red-600">
										{summary.leastProductive ? summary.leastProductive.count : '-'}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Time-series chart: monthly applications */}
			<ApplicationsOverTimeChart data={chartData} />

			<ApplicationFunnelDataChart statistics={statistics} />

			<div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
				<WorkModeChart statistics={statistics} />
				<SalaryDistributionChart statistics={statistics} />
				<SalaryCurrencyTypeChart statistics={statistics} />
				<EmploymentTypeDataChart statistics={statistics} />
			</div>

			<ApplicationResponseBreakdownDataChart statistics={statistics} />
		</div>
	);
};

export default MetricsTabContent;
