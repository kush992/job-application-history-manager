"use client";

import React from "react";
import type { UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
	applicationStatusMapping,
	contractTypeMapping,
	getApplicationStatusColor,
	getWorkModeColor,
	workModeMapping,
} from "@/utils/utility";

import ActiveFilters from "./ActiveFilters";
import FilterList from "./FilterList";
import MobileFiltersDrawer from "./MobileFiltersDrawer";
import SearchBar from "./SearchBar";
import { FilterFormValues } from "./utility";

type Props = {
	filterForm: UseFormReturn<FilterFormValues>;
	onFilterChange: () => void;
	onClearFilter: (type: "status" | "contractType" | "workMode", value: string) => void;
	onClearAll: () => void;
};

const ApplicationFilters: React.FC<Props> = ({ filterForm, onFilterChange, onClearFilter, onClearAll }) => {
	const status = filterForm.watch("status") || [];
	const contractType = filterForm.watch("contractType") || [];
	const workMode = filterForm.watch("workMode") || [];

	const hasActiveFilters = status.length > 0 || contractType.length > 0 || workMode.length > 0;

	return (
		<div className="w-full">
			{/* Mobile block (search visible, drawer trigger for filters) */}
			<div className="md:hidden w-full space-y-3">
				<div className="w-full bg-background py-2 px-4 rounded-md shadow">
					<SearchBar filterForm={filterForm} />
				</div>

				<div className="px-0">
					{hasActiveFilters && (
						<div className="px-4">
							<ActiveFilters
								status={status}
								contractType={contractType}
								workMode={workMode}
								applicationStatusMapping={applicationStatusMapping}
								contractTypeMapping={contractTypeMapping}
								workModeMapping={workModeMapping}
								getApplicationStatusColor={getApplicationStatusColor}
								getWorkModeColor={getWorkModeColor}
								onClearFilter={onClearFilter}
								onClearAll={onClearAll}
							/>
						</div>
					)}

					<div className="px-4">
						<MobileFiltersDrawer
							filterForm={filterForm}
							onFilterChange={onFilterChange}
							onClearFilter={onClearFilter}
							onClearAll={onClearAll}
							status={status}
							contractType={contractType}
							workMode={workMode}
							applicationStatusMapping={applicationStatusMapping}
							contractTypeMapping={contractTypeMapping}
							workModeMapping={workModeMapping}
							getApplicationStatusColor={getApplicationStatusColor}
							getWorkModeColor={getWorkModeColor}
						/>
					</div>
				</div>
			</div>

			{/* Desktop sidebar */}
			<div className="hidden md:block">
				<div className="space-y-4 p-4 border rounded-md bg-background">
					<div className="mb-2">
						<SearchBar filterForm={filterForm} />
					</div>

					<div className="flex items-center justify-between">
						<h3 className="font-semibold">Filters</h3>
						{hasActiveFilters && (
							<Button variant="ghost" size="sm" onClick={onClearAll}>
								Clear all
							</Button>
						)}
					</div>

					{hasActiveFilters && (
						<div>
							<ActiveFilters
								status={status}
								contractType={contractType}
								workMode={workMode}
								applicationStatusMapping={applicationStatusMapping}
								contractTypeMapping={contractTypeMapping}
								workModeMapping={workModeMapping}
								getApplicationStatusColor={getApplicationStatusColor}
								getWorkModeColor={getWorkModeColor}
								onClearFilter={onClearFilter}
								onClearAll={onClearAll}
							/>
						</div>
					)}

					<div className="space-y-4">
						<FilterList title="Status" entries={Object.entries(applicationStatusMapping)} name="status" filterForm={filterForm} onFilterChange={onFilterChange} />
						<Separator />
						<FilterList title="Contract Type" entries={Object.entries(contractTypeMapping)} name="contractType" filterForm={filterForm} onFilterChange={onFilterChange} />
						<Separator />
						<FilterList title="Work Mode" entries={Object.entries(workModeMapping)} name="workMode" filterForm={filterForm} onFilterChange={onFilterChange} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default ApplicationFilters;

