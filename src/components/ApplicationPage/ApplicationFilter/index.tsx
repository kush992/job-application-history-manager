import { ApplicationStatus } from '@/components/ApplicationForm/utility';
import { Button } from '@/components/ui/button';
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ContractType, WorkMode } from '@/types/apiResponseTypes';
import { applicationStatusMapping, contractTypeMapping, workModeMapping } from '@/utils/utility';
import { Filter, Trash2 } from 'lucide-react';
import React from 'react';

type Props = {
	onInputChange: (query: string) => void;
	filterByStatus: (value: ApplicationStatus) => void;
	filterByWorkMode: (value: WorkMode) => void;
	filterByContractType: (value: ContractType) => void;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	clearAllFilters: () => void;
};

const ApplicationFilter: React.FC<Props> = ({
	onInputChange,
	filterByStatus,
	filterByContractType,
	filterByWorkMode,
	onSubmit,
	clearAllFilters,
}) => {
	return (
		<Drawer>
			<DrawerTrigger>
				<Button className="flex items-center gap-2">
					<Filter className="w-4 h-4" /> Filter
				</Button>
			</DrawerTrigger>

			<DrawerContent className="">
				<div className="max-w-xl mx-auto w-full h-full">
					<DrawerHeader>
						<DrawerTitle>Filter Options</DrawerTitle>
					</DrawerHeader>
					<form
						className="p-4 flex flex-col gap-2 justify-between h-full"
						onReset={clearAllFilters}
						onSubmit={onSubmit}
					>
						<div className="flex flex-col gap-2">
							<Input
								placeholder="Search for company name"
								onChange={(e) => onInputChange(e.target.value)}
							/>

							<Select onValueChange={filterByStatus} defaultValue="">
								<SelectTrigger>
									<SelectValue defaultValue="" placeholder="Filter by status" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value={ApplicationStatus.APPLIED}>
										{applicationStatusMapping.APPLIED}
									</SelectItem>
									<SelectItem value={ApplicationStatus.IN_PROGRESS}>
										{applicationStatusMapping.IN_PROGRESS}
									</SelectItem>
									<SelectItem value={ApplicationStatus.SUCCESS}>
										{applicationStatusMapping.SUCCESS}
									</SelectItem>
									<SelectItem value={ApplicationStatus.REJECTED_NO_FEEDBACK}>
										{applicationStatusMapping.REJECTED_NO_FEEDBACK}
									</SelectItem>
									<SelectItem value={ApplicationStatus.REJECTED_WITH_FEEDBACK}>
										{applicationStatusMapping.REJECTED_WITH_FEEDBACK}
									</SelectItem>
									<SelectItem value={ApplicationStatus.NO_REPLY}>
										{applicationStatusMapping.NO_REPLY}
									</SelectItem>
								</SelectContent>
							</Select>

							<Select onValueChange={filterByContractType} defaultValue="">
								<SelectTrigger>
									<SelectValue defaultValue="" placeholder="Filter by contract type" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value={ContractType.CONTRACT}>
										{contractTypeMapping.CONTRACT}
									</SelectItem>
									<SelectItem value={ContractType.FULL_TIME}>
										{contractTypeMapping.FULL_TIME}
									</SelectItem>
									<SelectItem value={ContractType.INTERNSHIP}>
										{contractTypeMapping.INTERNSHIP}
									</SelectItem>
									<SelectItem value={ContractType.PART_TIME}>
										{contractTypeMapping.PART_TIME}
									</SelectItem>
								</SelectContent>
							</Select>

							<Select onValueChange={filterByWorkMode} defaultValue="">
								<SelectTrigger>
									<SelectValue defaultValue="" placeholder="Filter by work mode" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value={WorkMode.HYBRID}>{workModeMapping.HYBRID}</SelectItem>
									<SelectItem value={WorkMode.REMOTE}>{workModeMapping.REMOTE}</SelectItem>
									<SelectItem value={WorkMode.ON_SITE}>{workModeMapping.ON_SITE}</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<DrawerFooter>
							<DrawerClose asChild>
								<Button type="submit">Submit</Button>
							</DrawerClose>
							<DrawerClose asChild>
								<Button
									type="reset"
									onClick={clearAllFilters}
									variant="outline"
									className="flex items-center gap-1"
								>
									<Trash2 className="w-4 h-4" />
									<span>Clear filters</span>
								</Button>
							</DrawerClose>
						</DrawerFooter>
					</form>
				</div>
			</DrawerContent>
		</Drawer>
	);
};

export default ApplicationFilter;
