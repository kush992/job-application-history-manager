'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { AIInsightsSection } from './Sections/AIInsightsSection';
import { AnalyticsSection } from './Sections/AnalyticsSection';
import { ApplicationTrackingSection } from './Sections/ApplicationTrackingSection';
import { CommunitySection } from './Sections/CommunitySection';
import { DocumentManagementSection } from './Sections/DocumentManagementSection';
import { InterviewPrepSection } from './Sections/InterviewPrepSection';
import { OrganizeJourneySection } from './Sections/OrganiseJourneySection';

const tabItems = [
	{ id: 'tracking', label: 'Track Applications', component: ApplicationTrackingSection },
	{ id: 'journeys', label: 'Organize Journeys', component: OrganizeJourneySection },
	{ id: 'analytics', label: 'Analytics', component: AnalyticsSection },
	{ id: 'interviews', label: 'Interview Prep', component: InterviewPrepSection },
	{ id: 'documents', label: 'Manage Documents', component: DocumentManagementSection },
	{ id: 'community', label: 'Community', component: CommunitySection },
	{ id: 'ai-insights', label: 'AI Insights', component: AIInsightsSection },
];

export function DocumentationTabs() {
	const [activeTab, setActiveTab] = useState('tracking');

	return (
		<div className="max-w-4xl mx-auto">
			<Tabs value={activeTab} onValueChange={setActiveTab} className="">
				<TabsList className="sticky top-20 w-full overflow-x-scroll justify-start h-full py-2 mx-auto mb-4 max-w-fit shadow-lg">
					{tabItems.map((item, index) => (
						<TabsTrigger
							key={item.id}
							value={item.id}
							className="!justify-start !items-start md:text-sm rounded-lg transition-all duration-200 data-[state=active]:shadow-md py-2 w-fit"
						>
							{item.label}
						</TabsTrigger>
					))}
				</TabsList>

				{tabItems.map((item) => {
					const Component = item.component;
					return (
						<motion.div
							key={item.id}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							transition={{ duration: 0.3 }}
						>
							<TabsContent value={item.id} className="outline-none">
								<Component />
							</TabsContent>
						</motion.div>
					);
				})}
			</Tabs>
		</div>
	);
}
