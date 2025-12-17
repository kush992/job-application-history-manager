import { X } from 'lucide-react';
import React from 'react';

import { Badge, BadgeProps } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ApplicationStatus, WorkMode } from '@/types/schema';

type Props = {
	status: string[];
	contractType: string[];
	workMode: string[];
	applicationStatusMapping: Record<string, string>;
	contractTypeMapping: Record<string, string>;
	workModeMapping: Record<string, string>;
	getApplicationStatusColor: (applicationStatus: ApplicationStatus) => BadgeProps['variant'];
	getWorkModeColor: (workMode: WorkMode) => BadgeProps['variant'];
	onClearFilter: (type: 'status' | 'contractType' | 'workMode', value: string) => void;
	onClearAll: () => void;
};

const ActiveFilters: React.FC<Props> = ({
	status,
	contractType,
	workMode,
	applicationStatusMapping,
	contractTypeMapping,
	workModeMapping,
	getApplicationStatusColor,
	getWorkModeColor,
	onClearFilter,
	onClearAll,
}) => {
	const hasActive = status.length > 0 || contractType.length > 0 || workMode.length > 0;
	if (!hasActive) return null;

	return (
		<div className="flex flex-wrap items-center gap-2">
			{status.map((s) => (
				<Badge
					key={s}
					variant={getApplicationStatusColor(s as ApplicationStatus)}
					className="flex items-center gap-1.5 px-2.5 py-1 text-xs"
				>
					<span>{applicationStatusMapping[s]}</span>
					<button
						type="button"
						onClick={() => onClearFilter('status', s)}
						className="ml-1 rounded-full hover:bg-black/20 p-0.5"
						aria-label={`Remove ${applicationStatusMapping[s]} filter`}
					>
						<X className="h-3 w-3" />
					</button>
				</Badge>
			))}

			{contractType.map((ct) => (
				<Badge key={ct} variant="outline" className="flex items-center gap-1.5 px-2.5 py-1 text-xs">
					<span>{contractTypeMapping[ct]}</span>
					<button
						type="button"
						onClick={() => onClearFilter('contractType', ct)}
						className="ml-1 rounded-full hover:bg-black/20 p-0.5"
						aria-label={`Remove ${contractTypeMapping[ct]} filter`}
					>
						<X className="h-3 w-3" />
					</button>
				</Badge>
			))}

			{workMode.map((wm) => (
				<Badge
					key={wm}
					variant={getWorkModeColor(wm as WorkMode)}
					className="flex items-center gap-1.5 px-2.5 py-1 text-xs"
				>
					<span>{workModeMapping[wm]}</span>
					<button
						type="button"
						onClick={() => onClearFilter('workMode', wm)}
						className="ml-1 rounded-full hover:bg-black/20 p-0.5"
						aria-label={`Remove ${workModeMapping[wm]} filter`}
					>
						<X className="h-3 w-3" />
					</button>
				</Badge>
			))}

			<Button
				type="button"
				variant="ghost"
				size="sm"
				onClick={onClearAll}
				className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
			>
				Clear all
			</Button>
		</div>
	);
};

export default ActiveFilters;
