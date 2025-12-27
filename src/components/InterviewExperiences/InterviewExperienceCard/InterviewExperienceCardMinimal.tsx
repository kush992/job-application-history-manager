'use client';

import { ThumbsUp } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useInterviewExperiences } from '@/hooks/useInterviewExperiences';
import { InterviewExperience } from '@/types/schema';
import { appRoutes } from '@/utils/constants';

type Props = {
	interviewExperience: Partial<InterviewExperience>;
	showUpvote?: boolean;
};

const InterviewExperienceCardMinimal = ({ interviewExperience, showUpvote = false }: Props) => {
	const { upvoteExperience } = useInterviewExperiences();
	const [likesCount, setLikesCount] = React.useState(interviewExperience?.likes_count || 0);

	const handleUpvote = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		if (interviewExperience?.id) {
			upvoteExperience(interviewExperience.id, {
				onSuccess: (data) => {
					setLikesCount(data.likes_count);
				},
			});
		}
	};

	const displayCompanyName = interviewExperience?.company_name || 'Unknown Company';
	const displayJobTitle = interviewExperience?.job_title || 'Unknown Position';
	const user = interviewExperience?.user;
	const isAnonymous = user?.id === 'anonymous';

	// Truncate content for minimal view
	const content = interviewExperience?.content || '';
	const truncatedContent = content.length > 150 ? content.substring(0, 150) + '...' : content;

	return (
		<Link href={appRoutes.viewInterviewExperience(interviewExperience.id || '')}>
			<Card className="hover:shadow-md transition-shadow cursor-pointer h-full flex flex-col">
				<CardHeader className="pb-3 space-y-3">
					<div className="flex items-start justify-between">
						<Badge variant="secondary" className="w-fit text-xs">
							{interviewExperience?.category?.replace('_', ' ')}
						</Badge>
						{user && (
							<div className="flex items-center gap-1.5">
								<Avatar className="h-5 w-5">
									{user.avatar_url && !isAnonymous && <AvatarImage src={user.avatar_url} />}
									<AvatarFallback className="text-xs">
										{isAnonymous ? 'A' : user.full_name?.charAt(0) || 'U'}
									</AvatarFallback>
								</Avatar>
								<span className="text-xs text-muted-foreground">
									{isAnonymous ? 'Anonymous' : user.full_name || 'User'}
								</span>
							</div>
						)}
					</div>
					<div className="space-y-1">
						<CardTitle className="text-lg leading-tight">{displayJobTitle}</CardTitle>
						<CardDescription className="text-sm">{displayCompanyName}</CardDescription>
					</div>
				</CardHeader>
				<CardContent className="pt-0 flex-1 flex flex-col">
					<div
						className="text-sm text-muted-foreground line-clamp-3 flex-1"
						dangerouslySetInnerHTML={{ __html: truncatedContent }}
					/>
					{showUpvote && (
						<div className="flex items-center gap-2 mt-4 pt-3 border-t">
							<Button
								variant="ghost"
								size="sm"
								onClick={handleUpvote}
								className="flex items-center gap-1.5 h-8"
							>
								<ThumbsUp className="h-3.5 w-3.5" />
								<span className="text-xs">{likesCount}</span>
							</Button>
						</div>
					)}
				</CardContent>
			</Card>
		</Link>
	);
};

export default InterviewExperienceCardMinimal;
