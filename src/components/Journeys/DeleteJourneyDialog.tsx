'use client';

import { Loader2 } from 'lucide-react';

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Journey } from '@/types/schema';

interface DeleteJourneyDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	journey: Journey | null;
	onConfirm: () => void;
	isDeleting: boolean;
}

export function DeleteJourneyDialog({ open, onOpenChange, journey, onConfirm, isDeleting }: DeleteJourneyDialogProps) {
	if (!journey) return null;

	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Delete Journey</AlertDialogTitle>
					<AlertDialogDescription className="space-y-2">
						<p>
							Are you sure you want to delete the journey <strong>{`"${journey.title}"`}</strong>?
						</p>
						<p className="text-red-600 font-medium">
							This action will permanently delete the journey and all job applications associated with it.
						</p>
						<p>This action cannot be undone.</p>
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
					<AlertDialogAction
						onClick={onConfirm}
						disabled={isDeleting}
						className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
					>
						{isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
						Delete Journey
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
