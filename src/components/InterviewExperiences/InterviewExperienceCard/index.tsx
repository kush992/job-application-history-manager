import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { InterviewExperience } from '@/types/schema';

type Props = {
	interviewExperience: Partial<InterviewExperience>;
};

const InterviewExperienceCard = ({ interviewExperience }: Props) => {
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

	const displayCompanyName = interviewExperience?.company_name || 'Unknown Company';
	const displayJobTitle = interviewExperience?.job_title || 'Unknown Position';
	const user = interviewExperience?.user;
	const isAnonymous = user?.id === 'anonymous';

	return (
		<Card className="p-6">
			<CardHeader>
				<div className="flex items-start justify-between mb-2">
					<Badge variant="secondary" className="w-fit">
						{interviewExperience?.category?.replace('_', ' ')}
					</Badge>
					{user && (
						<div className="flex items-center gap-2">
							<Avatar className="h-6 w-6">
								{user.avatar_url && !isAnonymous && <AvatarImage src={user.avatar_url} />}
								<AvatarFallback>
									{isAnonymous ? 'A' : user.full_name?.charAt(0) || 'U'}
								</AvatarFallback>
							</Avatar>
							<span className="text-xs text-muted-foreground">
								{isAnonymous ? 'Anonymous User' : user.full_name || 'User'}
							</span>
						</div>
					)}
				</div>
				<CardTitle>{displayJobTitle}</CardTitle>
				<CardDescription>{displayCompanyName}</CardDescription>
			</CardHeader>
			<CardContent>
				{interviewExperience?.rating !== undefined && (
					<p className="mt-4">
						Experience: <strong>{getRating(interviewExperience?.rating)}</strong>
					</p>
				)}
				<div
					className="whitespace-pre-line"
					dangerouslySetInnerHTML={{ __html: interviewExperience?.content ?? '' }}
				/>
			</CardContent>
		</Card>
	);
};

export default InterviewExperienceCard