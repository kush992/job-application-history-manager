import { X } from 'lucide-react';
import React from 'react';
import type { UseFormReturn } from 'react-hook-form';

import { Badge, BadgeProps } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer';
import { ApplicationStatus, WorkMode } from '@/types/schema';

import ActiveFilters from './ActiveFilters';
import FilterList from './FilterList';
import { FilterFormValues } from './utility';

type Props = {
	filterForm: UseFormReturn<FilterFormValues>;
	onFilterChange: () => void;
	onClearFilter: (type: 'status' | 'contractType' | 'workMode', value: string) => void;
	onClearAll: () => void;
	status: string[];
	contractType: string[];
	workMode: string[];
	applicationStatusMapping: Record<string, string>;
	contractTypeMapping: Record<string, string>;
	workModeMapping: Record<string, string>;
	getApplicationStatusColor: (applicationStatus: ApplicationStatus) => BadgeProps['variant'];
	getWorkModeColor: (workMode: WorkMode) => BadgeProps['variant'];
};

const MobileFiltersDrawer: React.FC<Props> = ({
	filterForm,
	onFilterChange,
	onClearFilter,
	onClearAll,
	status,
	contractType,
	workMode,
	applicationStatusMapping,
	contractTypeMapping,
	workModeMapping,
	getApplicationStatusColor,
	getWorkModeColor,
}) => {
	const total = status.length + contractType.length + workMode.length;

	return (
		<Drawer>
			<DrawerTrigger asChild>
				<Button variant={total > 0 ? 'default' : 'outline'} className="w-full">
					Filters
					{total > 0 && (
						<Badge variant="secondary" className="ml-2 h-5 min-w-5 px-1.5 text-xs">
							{total}
						</Badge>
					)}
				</Button>
			</DrawerTrigger>

			<DrawerContent>
				<DrawerHeader>
					<div className="flex items-center justify-between w-full">
						<div>
							<DrawerTitle>Filters</DrawerTitle>
						</div>
						<div>
							<DrawerClose asChild>
								<Button variant="ghost">
									<X className="h-4 w-4" />
								</Button>
							</DrawerClose>
						</div>
					</div>
				</DrawerHeader>

				<DrawerDescription>
					<div className="mt-2 px-4">
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
				</DrawerDescription>

				<div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
					<FilterList
						title="Status"
						entries={Object.entries(applicationStatusMapping)}
						name="status"
						filterForm={filterForm}
						onFilterChange={onFilterChange}
					/>
					<FilterList
						title="Contract Type"
						entries={Object.entries(contractTypeMapping)}
						name="contractType"
						filterForm={filterForm}
						onFilterChange={onFilterChange}
					/>
					<FilterList
						title="Work Mode"
						entries={Object.entries(workModeMapping)}
						name="workMode"
						filterForm={filterForm}
						onFilterChange={onFilterChange}
					/>
				</div>

				<DrawerFooter>
					<div className="w-full">
						<Button variant="ghost" className="w-full" onClick={onClearAll}>
							Clear all
						</Button>
					</div>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
};

export default MobileFiltersDrawer;
