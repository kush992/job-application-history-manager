'use client';

import DOMPurify from 'dompurify';
import { Pencil, ThumbsUp, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ErrorDisplay from '@/components/ui/error-display';
import { useToast } from '@/hooks/use-toast';
import { useInterviewExperiences } from '@/hooks/useInterviewExperiences';
import { ApplicationStatus } from '@/types/schema';
import { appRoutes } from '@/utils/constants';
import { formatDate } from '@/utils/date';
import { applicationStatusMapping } from '@/utils/utility';

import InterviewExperienceDetailSkeleton from './InterviewExperienceDetailSkeleton';

type Props = {
	experienceId: string;
};

const InterviewExperienceDetailView: React.FC<Props> = ({ experienceId }) => {
	const router = useRouter();
	const { toast } = useToast();
	const {
		interviewExperience,
		interviewExperienceLoading,
		interviewExperienceError,
		upvoteExperience,
		deleteExperience,
	} = useInterviewExperiences({ id: experienceId });
	const [likesCount, setLikesCount] = React.useState(interviewExperience?.likes_count || 0);

	React.useEffect(() => {
		if (interviewExperience?.likes_count !== undefined) {
			setLikesCount(interviewExperience.likes_count);
		}
	}, [interviewExperience?.likes_count]);

	const handleUpvote = () => {
		if (experienceId) {
			upvoteExperience(experienceId, {
				onSuccess: (data) => {
					setLikesCount(data.likes_count);
				},
			});
		}
	};

	const handleDelete = () => {
		if (experienceId) {
			deleteExperience(experienceId, {
				onSuccess: () => {
					toast({
						title: 'Success',
						description: 'Interview experience deleted successfully',
					});
					router.push(appRoutes.interviewExperiences);
				},
				onError: () => {
					toast({
						title: 'Error',
						description: 'Failed to delete interview experience',
						variant: 'destructive',
					});
				},
			});
		}
	};

	const getRating = (rating?: number) => {
		if (rating === 0) {
			return 'Good';
		}
		if (rating === 1) {
			return 'Average';
		}
		if (rating === 2) {
			return 'Poor';
		}
		return 'Not rated';
	};

	if (interviewExperienceLoading) {
		return <InterviewExperienceDetailSkeleton />;
	}

	if (interviewExperienceError) {
		return (
			<div className="p-4">
				<ErrorDisplay error={interviewExperienceError} />
			</div>
		);
	}

	if (!interviewExperience) {
		return <div className="p-4">Interview experience not found</div>;
	}

	const displayCompanyName = interviewExperience.company_name || 'Unknown Company';
	const displayJobTitle = interviewExperience.job_title || 'Unknown Position';
	const user = interviewExperience.user;
	const isAnonymous = user?.id === 'anonymous';

	return (
		<div className="flex flex-col gap-6 mb-4 md:container">
			<Breadcrumb className="px-4 md:px-0">
				<BreadcrumbList className="overflow-x-scroll flex-nowrap no-scrollbar">
					<BreadcrumbLink href={appRoutes.home}>Home</BreadcrumbLink>
					<BreadcrumbSeparator />
					<BreadcrumbLink href={appRoutes.interviewExperiences}>Interview Experiences</BreadcrumbLink>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage className="whitespace-nowrap">{displayJobTitle}</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<Card>
				<CardHeader className="space-y-4">
					<div className="flex items-start justify-between">
						<Badge variant="secondary" className="w-fit">
							{interviewExperience.category?.replace('_', ' ')}
						</Badge>
						{user && (
							<div className="flex items-center gap-2">
								<Avatar className="h-8 w-8">
									{user.avatar_url && !isAnonymous && <AvatarImage src={user.avatar_url} />}
									<AvatarFallback>{isAnonymous ? 'A' : user.full_name?.charAt(0) || 'U'}</AvatarFallback>
								</Avatar>
								<span className="text-sm">
									{isAnonymous ? 'Anonymous User' : user.full_name || 'User'}
								</span>
							</div>
						)}
					</div>
					<div className="space-y-2">
						<CardTitle className="text-2xl">{displayJobTitle}</CardTitle>
						<CardDescription className="text-base">{displayCompanyName}</CardDescription>
						{interviewExperience.interview_stage && (
							<Badge variant="outline" className="w-fit">
								{applicationStatusMapping[interviewExperience.interview_stage as ApplicationStatus] ||
									interviewExperience.interview_stage}
							</Badge>
						)}
					</div>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center gap-4 text-sm text-muted-foreground">
						{interviewExperience.rating !== undefined && (
							<div>
								Experience Rating: <strong>{getRating(interviewExperience.rating)}</strong>
							</div>
						)}
						<div>Posted: {formatDate(interviewExperience.created_at)}</div>
					</div>

					<div
						className="prose prose-sm max-w-none"
						dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(interviewExperience.content || '') }}
					/>

					<div className="flex items-center justify-between pt-4 border-t">
						<Button variant="outline" size="sm" onClick={handleUpvote} className="flex items-center gap-2">
							<ThumbsUp className="h-4 w-4" />
							<span>{likesCount}</span>
						</Button>
						<div className="flex items-center gap-2">
							<Link href={appRoutes.editInterviewExperience(experienceId)}>
								<Button variant="outline" size="sm" className="flex items-center gap-2">
									<Pencil className="h-4 w-4" />
									Edit
								</Button>
							</Link>
							<AlertDialog>
								<AlertDialogTrigger asChild>
									<Button variant="destructive" size="sm" className="flex items-center gap-2">
										<Trash2 className="h-4 w-4" />
										Delete
									</Button>
								</AlertDialogTrigger>
								<AlertDialogContent>
									<AlertDialogHeader>
										<AlertDialogTitle>Are you sure?</AlertDialogTitle>
										<AlertDialogDescription>
											This action cannot be undone. This will permanently delete your interview experience.
										</AlertDialogDescription>
									</AlertDialogHeader>
									<AlertDialogFooter>
										<AlertDialogCancel>Cancel</AlertDialogCancel>
										<AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default InterviewExperienceDetailView;

