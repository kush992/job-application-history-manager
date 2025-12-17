import { CircleDollarSign, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { AlertDialogCustom } from '@/components/ui/alert-dialog-custom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ApplicationStatus, JobApplication } from '@/types/schema';
import { appRoutes } from '@/utils/constants';
import { transformDate } from '@/utils/date';
import { applicationStatusMapping, getApplicationStatusColor } from '@/utils/utility';

type Props = {
	data: JobApplication;
	onClickDelete: (id: string) => void;
};

const ApplicationListItem: React.FC<Props> = ({ data, onClickDelete }) => {
	return (
		<div className="bg-background p-4 grid grid-cols-[1fr_auto] gap-2 motion-preset-slide-down-lg">
			<Link href={appRoutes.viewApplication(data.id)}>
				<div className="grid lg:grid-cols-3 lg:gap-4 w-full items-start">
					<div>
						<h3 className="text-base font-[500] !pb-0 !my-0 text-secondary-foreground">{data.job_title}</h3>
						<p className="!my-0 text-muted-foreground">{data.company_name}</p>
					</div>
					<p className="text-muted-foreground text-xs lg:hidden">{transformDate(data.created_at)}</p>
					<div className="flex items-center my-2 gap-2 md:my-0">
						{data.application_status && (
							<Badge
								variant={
									getApplicationStatusColor(data?.application_status as ApplicationStatus) ||
									'default'
								}
								title={data.application_status}
								className="!text-xs"
							>
								{applicationStatusMapping[data.application_status as ApplicationStatus]}
							</Badge>
						)}
						{data.salary && <CircleDollarSign className="!text-primary w-4 h-4" />}
					</div>
					<p className="hidden lg:block lg:!my-0 text-muted-foreground text-xs md:text-sm">
						{transformDate(data.created_at)}
					</p>
				</div>
			</Link>

			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" size="icon">
						<MoreHorizontal className="cursor-pointer w-4 h-4" />
					</Button>
				</DropdownMenuTrigger>

				<DropdownMenuContent align="end">
					<Link href={appRoutes.updateApplication(data.id)}>
						<Button variant="ghost" className="flex gap-1 items-center w-full justify-start">
							<Pencil className="w-4 h-4" /> Edit
						</Button>
					</Link>

					<AlertDialogCustom
						buttonName="Delete"
						icon={<Trash2 className="w-4 h-4" />}
						onClickContinue={() => onClickDelete(data.id)}
					/>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

export default ApplicationListItem;
