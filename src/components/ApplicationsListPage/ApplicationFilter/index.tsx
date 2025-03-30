import { ApplicationStatus } from '@/components/ApplicationForm/utility';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { ContractType, WorkMode } from '@/types/apiResponseTypes';
import { applicationStatusMapping, contractTypeMapping, workModeMapping } from '@/utils/utility';
import { Filter, Trash2 } from 'lucide-react';
import type { UseFormReturn } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { FilterFormValues } from './utility';
import { DialogClose } from '@radix-ui/react-dialog';
import { Separator } from '@/components/ui/separator';

type Props = {
	onSubmit: (data: FilterFormValues) => void;
	filterForm: UseFormReturn<FilterFormValues>;
	clearAllFilters: () => void;
};

const ApplicationFilter: React.FC<Props> = ({ filterForm, onSubmit, clearAllFilters }) => {
	const handleSubmit = (data: FilterFormValues) => {
		onSubmit(data);
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="flex items-center gap-2">
					<Filter className="w-4 h-4" /> Filter
				</Button>
			</DialogTrigger>
			<DialogContent onOpenAutoFocus={(e) => e.preventDefault()} className="overflow-scroll h-[90%]">
				<DialogHeader>
					<DialogTitle>Filter Options</DialogTitle>
				</DialogHeader>
				<Form {...filterForm}>
					<form
						className="p-4 flex flex-col gap-4 justify-between h-full w-full bg-background rounded-md"
						onReset={clearAllFilters}
						onSubmit={filterForm.handleSubmit(handleSubmit)}
					>
						<div className="flex flex-col gap-4">
							<FormField
								control={filterForm.control}
								name="companyName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Company Name</FormLabel>
										<FormControl autoFocus={false}>
											<Input placeholder="Search for company name" {...field} />
										</FormControl>
									</FormItem>
								)}
							/>

							<div className="flex flex-col gap-2">
								<h3 className="text-lg font-semibold">Status</h3>
								{Object.entries(applicationStatusMapping).map(([key, label]) => (
									<FormField
										key={key}
										control={filterForm.control}
										name="status"
										render={({ field }) => (
											<FormItem className="flex flex-row items-start space-x-3 space-y-0">
												<FormControl>
													<Checkbox
														checked={field?.value?.includes(key as ApplicationStatus)}
														onCheckedChange={(checked) => {
															if (checked) {
																field.onChange([
																	...(field?.value ?? []),
																	key as ApplicationStatus,
																]);
															} else {
																field.onChange(
																	(field?.value ?? []).filter((v) => v !== key),
																);
															}
														}}
													/>
												</FormControl>
												<FormLabel>{label}</FormLabel>
											</FormItem>
										)}
									/>
								))}
							</div>

							<Separator />

							<div className="flex flex-col gap-2">
								<h3 className="text-lg font-semibold">Contract Type</h3>
								{Object.entries(contractTypeMapping).map(([key, label]) => (
									<FormField
										key={key}
										control={filterForm.control}
										name="contractType"
										render={({ field }) => (
											<FormItem className="flex flex-row items-start space-x-3 space-y-0">
												<FormControl>
													<Checkbox
														checked={field?.value?.includes(key as ContractType)}
														onCheckedChange={(checked) => {
															if (checked) {
																field.onChange([
																	...(field?.value ?? []),
																	key as ContractType,
																]);
															} else {
																field.onChange(field?.value?.filter((v) => v !== key));
															}
														}}
													/>
												</FormControl>
												<FormLabel>{label}</FormLabel>
											</FormItem>
										)}
									/>
								))}
							</div>

							<Separator />

							<div className="flex flex-col gap-2">
								<h3 className="text-lg font-semibold">Work Mode</h3>
								{Object.entries(workModeMapping).map(([key, label]) => (
									<FormField
										key={key}
										control={filterForm.control}
										name="workMode"
										render={({ field }) => (
											<FormItem className="flex flex-row items-start space-x-3 space-y-0">
												<FormControl>
													<Checkbox
														checked={field?.value?.includes(key as WorkMode)}
														onCheckedChange={(checked) => {
															if (checked) {
																field.onChange([
																	...(field?.value ?? []),
																	key as WorkMode,
																]);
															} else {
																field.onChange(field?.value?.filter((v) => v !== key));
															}
														}}
													/>
												</FormControl>
												<FormLabel>{label}</FormLabel>
											</FormItem>
										)}
									/>
								))}
							</div>
						</div>

						<DialogFooter className="gap-2">
							<DialogClose asChild>
								<Button
									type="reset"
									onClick={clearAllFilters}
									variant="outline"
									className="flex items-center gap-1"
								>
									<Trash2 className="w-4 h-4" />
									<span>Clear filters</span>
								</Button>
							</DialogClose>
							<DialogClose asChild>
								<Button type="submit">Apply Filters</Button>
							</DialogClose>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default ApplicationFilter;

// Drawer style filter:
{
	/* <Drawer>
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
					<Input placeholder="Search for company name" onChange={(e) => onInputChange(e.target.value)} />

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
							<SelectItem value={ContractType.CONTRACT}>{contractTypeMapping.CONTRACT}</SelectItem>
							<SelectItem value={ContractType.FULL_TIME}>{contractTypeMapping.FULL_TIME}</SelectItem>
							<SelectItem value={ContractType.INTERNSHIP}>{contractTypeMapping.INTERNSHIP}</SelectItem>
							<SelectItem value={ContractType.PART_TIME}>{contractTypeMapping.PART_TIME}</SelectItem>
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
</Drawer>; */
}
