import { Search } from 'lucide-react';
import React from 'react';
import type { UseFormReturn } from 'react-hook-form';

import { Input } from '@/components/ui/input';

import { FilterFormValues } from './utility';

type Props = {
	filterForm: UseFormReturn<FilterFormValues>;
};

const SearchBar: React.FC<Props> = ({ filterForm }) => {
	return (
		<form className="relative flex items-center w-full" onReset={() => filterForm.reset()}>
			<Search className="w-4 h-4 absolute left-3 text-muted-foreground" />
			<Input
				type="text"
				placeholder="Search by company name or job title"
				className="pl-10"
				{...filterForm.register('searchQuery')}
			/>
		</form>
	);
};

export default SearchBar;
