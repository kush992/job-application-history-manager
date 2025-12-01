import { Briefcase, Calendar, Edit, Eye, Trash2 } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { Journey } from '@/types/schema';
import { appRoutes } from '@/utils/constants';

import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent,CardDescription, CardHeader, CardTitle } from '../ui/card';

type Props = {
	journey: Journey;
	handleDeleteClick: (journey: Journey) => void;
};

const JourneyCard = ({ journey, handleDeleteClick }: Props) => {
	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString();
	};
	return (
		<Card className="hover:shadow-lg transition-shadow">
			<CardHeader>
				<div className="flex items-start justify-between">
					<div className="flex-1">
						<CardTitle className="text-lg">{journey.title}</CardTitle>
						<CardDescription className="mt-1">
							{journey.description || 'No description provided'}
						</CardDescription>
					</div>
					<Badge variant={journey.is_active ? 'default' : 'secondary'}>
						{journey.is_active ? 'Active' : 'Inactive'}
					</Badge>
				</div>
			</CardHeader>
			<CardContent>
				<div className="space-y-3">
					<div className="flex items-center gap-2 text-sm text-secondary-foreground">
						<Calendar className="h-4 w-4" />
						<span>Started {formatDate(journey.start_date)}</span>
					</div>
					{journey.end_date && (
						<div className="flex items-center gap-2 text-sm text-secondary-foreground">
							<Calendar className="h-4 w-4" />
							<span>Ends {formatDate(journey.end_date)}</span>
						</div>
					)}
					<div className="flex items-center gap-2 text-sm text-secondary-foreground">
						<Briefcase className="h-4 w-4" />
						<span>{journey.applications_count || 0} applications</span>
					</div>
				</div>

				<div className="flex gap-2 mt-6">
					<Link href={appRoutes.viewJourney(journey.id)} className="flex-1">
						<Button variant="outline" size="sm" className="w-full bg-transparent">
							<Eye className="h-4 w-4 mr-2" />
							View
						</Button>
					</Link>
					<Link href={appRoutes.editJourney(journey.id)}>
						<Button variant="outline" size="sm">
							<Edit className="h-4 w-4" />
						</Button>
					</Link>
					<Button variant="outline" size="sm" onClick={() => handleDeleteClick(journey)}>
						<Trash2 className="h-4 w-4" />
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};

export default JourneyCard;
