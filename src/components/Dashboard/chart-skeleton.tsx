import { Skeleton } from '@/components/ui/skeleton';

export function ChartSkeleton() {
	return (
		<div className="h-[400px] w-full flex flex-col">
			<div className="flex justify-between items-center mb-4">
				<div className="flex gap-2">
					{Array.from({ length: 4 }).map((_, i) => (
						<Skeleton key={i} className="h-4 w-16 rounded-full" />
					))}
				</div>
			</div>
			<div className="flex-1 flex items-center justify-center">
				<Skeleton className="h-[320px] w-[90%] rounded-lg" />
			</div>
		</div>
	);
}
