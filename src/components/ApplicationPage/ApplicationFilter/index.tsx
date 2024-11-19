import { ApplicationStatus } from '@/components/ApplicationForm/utility';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ContractType, WorkMode } from '@/types/apiResponseTypes';
import { DeleteFilled } from '@ant-design/icons';
import React from 'react';

type Props = {
	onInputChange: (query: string) => void;
	filterByStatus: (value: ApplicationStatus) => void;
	filterByWorkMode: (value: WorkMode) => void;
	filterByContractType: (value: ContractType) => void;
	clearAllFilters: () => void;
};

const ApplicationFilter: React.FC<Props> = ({
	onInputChange,
	filterByStatus,
	clearAllFilters,
	filterByWorkMode,
	filterByContractType,
}) => {
	return (
		<form className="w-full flex sm:flex-row flex-col items-center gap-2" onReset={clearAllFilters}>
			<Input
				placeholder="Search for company name"
				onChange={(e) => onInputChange(e.target.value)}
				className="md:!w-[70%]"
			/>

			<div className="flex items-center flex-wrap md:flex-nowrap w-full gap-2">
				<Select onValueChange={filterByStatus} defaultValue="">
					<SelectTrigger>
						<SelectValue defaultValue="" placeholder="Filter by status" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value={ApplicationStatus.APPLIED}>Applied</SelectItem>
						<SelectItem value={ApplicationStatus.IN_PROGRESS}>In progress</SelectItem>
						<SelectItem value={ApplicationStatus.SUCCESS}>Success</SelectItem>
						<SelectItem value={ApplicationStatus.NO_REPLY}>No reply</SelectItem>
						<SelectItem value={ApplicationStatus.REJECTED_NO_FEEDBACK}>Rejected no feedback</SelectItem>
						<SelectItem value={ApplicationStatus.REJECTED_WITH_FEEDBACK}>Rejected with feedback</SelectItem>
					</SelectContent>
				</Select>

				<Select onValueChange={filterByContractType} defaultValue="">
					<SelectTrigger>
						<SelectValue defaultValue="" placeholder="Contract type" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value={ContractType.FULL_TIME}>Full time</SelectItem>
						<SelectItem value={ContractType.PART_TIME}>Part time</SelectItem>
						<SelectItem value={ContractType.INTERNSHIP}>Internship</SelectItem>
						<SelectItem value={ContractType.FREELANCE}>Freelance</SelectItem>
						<SelectItem value={ContractType.CONTRACT}>Contract</SelectItem>
					</SelectContent>
				</Select>

				<Select onValueChange={filterByWorkMode} defaultValue="">
					<SelectTrigger>
						<SelectValue defaultValue="" placeholder="Work mode" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value={WorkMode.REMOTE}>Remote</SelectItem>
						<SelectItem value={WorkMode.HYBRID}>Hybrid</SelectItem>
						<SelectItem value={WorkMode.ON_SITE}>On site</SelectItem>
					</SelectContent>
				</Select>

				<Button type="reset" onClick={clearAllFilters} variant="outline" className="flex items-center gap-1">
					<DeleteFilled />
					<span>Clear filters</span>
				</Button>
			</div>
		</form>
	);
};

export default ApplicationFilter;
