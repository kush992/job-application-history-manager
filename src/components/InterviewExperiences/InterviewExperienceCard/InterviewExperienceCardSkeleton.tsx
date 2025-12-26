import React from 'react';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const InterviewExperienceCardSkeleton = () => {
	return (
		<Card className="hover:shadow-md transition-shadow">
			<CardHeader className="pb-3">
				<div className="flex items-start justify-between mb-2">
					<Skeleton className="h-5 w-20" />
					<div className="flex items-center gap-2">
						<Skeleton className="h-6 w-6 rounded-full" />
						<Skeleton className="h-4 w-24" />
					</div>
				</div>
				<Skeleton className="h-6 w-3/4 mb-2" />
				<Skeleton className="h-4 w-1/2" />
			</CardHeader>
			<CardContent className="pt-0">
				<div className="space-y-2">
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-2/3" />
				</div>
				<div className="flex items-center gap-2 mt-4">
					<Skeleton className="h-8 w-20" />
				</div>
			</CardContent>
		</Card>
	);
};

export default InterviewExperienceCardSkeleton;

