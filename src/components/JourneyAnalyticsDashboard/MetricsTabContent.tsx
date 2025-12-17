import React from 'react';

import type { Statistics } from '@/types/schema';

import ApplicationFunnelDataChart from './ApplicationFunnelDataChart';
import ApplicationResponseBreakdownDataChart from './ApplicationResponseBreakdownDataChart';
import EmploymentTypeDataChart from './EmploymentTypeDataChart';
import KeyMetrics from './KeyMetrics';
import SalaryCurrencyTypeChart from './SalaryCurrencyTypeChart';
import SalaryDistributionChart from './SalaryDistributionChart';
import WorkModeChart from './WorkArrangementDataChart';

type Props = {
    statistics: Statistics;
    replyRate: string;
    successRate: string;
};

const MetricsTabContent: React.FC<Props> = ({ statistics, replyRate, successRate }) => {
    return (
        <div className="space-y-6">
            <KeyMetrics statistics={statistics} replyRate={replyRate} successRate={successRate} />

            <ApplicationFunnelDataChart statistics={statistics} />

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
                <WorkModeChart statistics={statistics} />
                <SalaryDistributionChart statistics={statistics} />
                <SalaryCurrencyTypeChart statistics={statistics} />
                <EmploymentTypeDataChart statistics={statistics} />
            </div>

            <ApplicationResponseBreakdownDataChart statistics={statistics} />
        </div>
    );
};

export default MetricsTabContent;
