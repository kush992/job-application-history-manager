import { Loader } from 'lucide-react';
import React from 'react';

import { Card, CardContent, CardHeader } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

const JourneyAnaluticsDashboardLoader = () => {
	return (
		<div className="mx-auto w-full max-w-5xl space-y-6">
			{/* Header */}
			<div className="text-center space-y-2">
				<Skeleton className="h-8 w-64 mx-auto" />
				<Skeleton className="h-4 w-96 mx-auto" />
			</div>

			{/* Metrics Cards */}
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
				{Array.from({ length: 4 }).map((_, i) => (
					<Card key={i} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
						<CardHeader className="pb-2">
							<Skeleton className="h-4 w-20" />
						</CardHeader>
						<CardContent>
							<Skeleton className="h-8 w-16 mb-1" />
							<Skeleton className="h-3 w-24" />
						</CardContent>
					</Card>
				))}
			</div>

			{/* Insights Section */}
			<Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
				<CardHeader>
					<Skeleton className="h-6 w-32" />
				</CardHeader>
				<CardContent className="space-y-3">
					{Array.from({ length: 4 }).map((_, i) => (
						<div key={i} className="flex items-start space-x-3">
							<Skeleton className="h-5 w-5 rounded-full mt-0.5" />
							<Skeleton className="h-4 w-full" />
						</div>
					))}
				</CardContent>
			</Card>

			{/* Charts Grid */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{Array.from({ length: 6 }).map((_, i) => (
					<Card key={i} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
						<CardHeader>
							<Skeleton className="h-6 w-48" />
							<Skeleton className="h-4 w-64" />
						</CardHeader>
						<CardContent>
							<div className="h-64 flex items-center justify-center">
								<Loader className="animate-spin h-8 w-8 text-muted-foreground" />
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
};

export default JourneyAnaluticsDashboardLoader;
