'use client';

import debounce from 'lodash.debounce';
import { Check, ChevronsUpDown, Loader2, Search } from 'lucide-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useApplications } from '@/hooks/useApplications';
import { cn } from '@/lib/utils';

type ApplicationOption = {
	id: string;
	company_name: string;
	job_title: string;
};

type Props = {
	value?: string | null;
	onChange: (applicationId: string | null, application: ApplicationOption | null) => void;
	onSearchChange?: (searchQuery: string) => void;
	placeholder?: string;
	className?: string;
};

const ApplicationSearchSelect: React.FC<Props> = ({
	value,
	onChange,
	onSearchChange,
	placeholder = 'Search for an application...',
	className,
}) => {
	const [open, setOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [applications, setApplications] = useState<ApplicationOption[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [selectedApplication, setSelectedApplication] = useState<ApplicationOption | null>(null);
	const { searchApplications } = useApplications();

	const fetchApplications = useCallback(
		async (query: string) => {
			if (!query || query.trim().length === 0) {
				setApplications([]);
				setIsLoading(false);
				return;
			}

			setIsLoading(true);
			try {
				const results = await searchApplications(query);
				setApplications(results);
			} catch (error) {
				console.error('Error fetching applications:', error);
				setApplications([]);
			} finally {
				setIsLoading(false);
			}
		},
		[searchApplications],
	);

	const debouncedFetch = useMemo(() => debounce(fetchApplications, 300), [fetchApplications]);

	useEffect(() => {
		debouncedFetch(searchQuery);
		if (onSearchChange) {
			onSearchChange(searchQuery);
		}
		return () => {
			debouncedFetch.cancel();
		};
	}, [searchQuery, debouncedFetch, onSearchChange]);

	const handleSelect = (application: ApplicationOption) => {
		setSelectedApplication(application);
		onChange(application.id, application);
		setOpen(false);
		setSearchQuery('');
	};

	const handleClear = () => {
		setSelectedApplication(null);
		onChange(null, null);
		setSearchQuery('');
	};

	const displayValue = selectedApplication
		? `${selectedApplication.company_name} - ${selectedApplication.job_title}`
		: '';

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className={cn('w-full justify-between', className)}
				>
					{displayValue || placeholder}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[400px] p-0" align="start">
				<div className="flex items-center border-b px-3">
					<Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
					<Input
						placeholder="Search by company or position..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
					/>
				</div>
				<div className="max-h-[300px] overflow-y-auto">
					{isLoading && (
						<div className="flex items-center justify-center p-4">
							<Loader2 className="h-4 w-4 animate-spin" />
						</div>
					)}
					{!isLoading && applications.length === 0 && searchQuery && (
						<div className="flex flex-col gap-2 p-4">
							<p className="text-sm text-muted-foreground">No applications found.</p>
							<p className="text-xs text-muted-foreground">
								You can still add an experience for a past interview. The search query will be used as
								company name and/or job title.
							</p>
						</div>
					)}
					{!isLoading && applications.length > 0 && (
						<div className="p-1">
							{applications.map((app) => (
								<div
									key={app.id}
									className={cn(
										'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground',
										selectedApplication?.id === app.id && 'bg-accent text-accent-foreground',
									)}
									onClick={() => handleSelect(app)}
								>
									<Check
										className={cn(
											'mr-2 h-4 w-4',
											selectedApplication?.id === app.id ? 'opacity-100' : 'opacity-0',
										)}
									/>
									<div className="flex flex-col">
										<span className="font-medium">{app.company_name}</span>
										<span className="text-xs text-muted-foreground">{app.job_title}</span>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</PopoverContent>
		</Popover>
	);
};

export default ApplicationSearchSelect;
