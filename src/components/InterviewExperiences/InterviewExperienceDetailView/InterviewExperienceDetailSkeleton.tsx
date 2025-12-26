import React from 'react';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const InterviewExperienceDetailSkeleton = () => {
	return (
		<div className="flex flex-col gap-6 mb-4 md:container">
			<div className="px-4 md:px-0">
				<Skeleton className="h-4 w-64 mb-2" />
			</div>

			<Card>
				<CardHeader>
					<div className="flex items-start justify-between mb-2">
						<Skeleton className="h-5 w-20" />
						<div className="flex items-center gap-2">
							<Skeleton className="h-8 w-8 rounded-full" />
							<Skeleton className="h-4 w-32" />
						</div>
					</div>
					<Skeleton className="h-8 w-3/4 mb-2" />
					<Skeleton className="h-5 w-1/2 mb-2" />
					<Skeleton className="h-6 w-24" />
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center gap-4">
						<Skeleton className="h-4 w-32" />
						<Skeleton className="h-4 w-24" />
					</div>
					<div className="space-y-3">
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-5/6" />
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-4/5" />
					</div>
					<div className="flex items-center justify-between pt-4 border-t">
						<Skeleton className="h-9 w-24" />
						<div className="flex items-center gap-2">
							<Skeleton className="h-9 w-20" />
							<Skeleton className="h-9 w-20" />
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default InterviewExperienceDetailSkeleton;

