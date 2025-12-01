import React from 'react';

import { Card, CardContent,CardHeader } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

const JourneyViewSkeleton = () => {
	return (
		<div className="min-h-screen bg-appBackground bg-gradient-to-r from-transparent to-primary-foreground py-8 px-4 sm:px-6 lg:px-8 ">
			<div className="max-w-6xl mx-auto">
				<div className="flex justify-between items-center mb-8">
					<div>
						<Skeleton className="h-8 w-64 mb-2" />
						<Skeleton className="h-4 w-48" />
					</div>
					<Skeleton className="h-10 w-32" />
				</div>
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{Array.from({ length: 6 }).map((_, i) => (
						<Card key={i}>
							<CardHeader>
								<Skeleton className="h-6 w-3/4 mb-2" />
								<Skeleton className="h-4 w-full" />
							</CardHeader>
							<CardContent>
								<div className="space-y-3">
									<Skeleton className="h-4 w-2/3" />
									<Skeleton className="h-4 w-1/2" />
									<Skeleton className="h-4 w-3/4" />
								</div>
								<div className="flex gap-2 mt-6">
									<Skeleton className="h-8 flex-1" />
									<Skeleton className="h-8 w-8" />
									<Skeleton className="h-8 w-8" />
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
};

export default JourneyViewSkeleton;
