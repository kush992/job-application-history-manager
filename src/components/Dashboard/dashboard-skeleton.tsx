import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function DashboardSkeleton() {
	return (
		<div className="flex flex-col gap-4 p-4 md:p-8">
			{/* Stats cards skeleton */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				{Array.from({ length: 4 }).map((_, i) => (
					<Card key={i} className="bg-card">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								<Skeleton className="h-4 w-24" />
							</CardTitle>
							<Skeleton className="h-4 w-4 rounded-full" />
						</CardHeader>
						<CardContent>
							<Skeleton className="h-8 w-16 mb-1" />
							<Skeleton className="h-4 w-32" />
						</CardContent>
					</Card>
				))}
			</div>

			{/* Tabs skeleton */}
			<div className="w-full">
				<Skeleton className="h-10 w-full mb-4" />

				<Card className="bg-card">
					<CardHeader>
						<Skeleton className="h-6 w-48 mb-2" />
						<Skeleton className="h-4 w-64" />
					</CardHeader>
					<CardContent>
						<div className="h-[400px] w-full flex items-center justify-center">
							<Skeleton className="h-[350px] w-[90%] rounded-lg" />
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
