import React from 'react';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

const ApplicationListItemSkeleton: React.FC = () => {
	return (
		<div className="bg-background p-4 grid grid-cols-[1fr_auto] gap-2">
			<div className="grid sm:grid-cols-3 sm:gap-4 w-full items-start">
				<div>
					<Skeleton className="h-5 w-3/4 mb-2" />
					<Skeleton className="h-4 w-1/2" />
				</div>
				<Skeleton className="text-muted-foreground text-xs md:hidden h-4 w-1/4 mt-2" />
				<div className="flex items-center my-2 gap-2 md:my-0">
					<Skeleton className="h-6 w-16 rounded-md" />
					<Skeleton className="h-4 w-4 rounded-full" />
				</div>
				<Skeleton className="hidden md:block md:!my-0 text-muted-foreground text-xs md:text-sm h-4 w-1/4" />
			</div>

			<div className="flex items-center">
				<Button variant="outline" size="icon" disabled>
					<Skeleton className="w-4 h-4 rounded-full" />
				</Button>
			</div>
		</div>
	);
};

export default ApplicationListItemSkeleton;
