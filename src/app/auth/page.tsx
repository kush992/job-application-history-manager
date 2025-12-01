import { redirect } from 'next/navigation';

import { appRoutes } from '@/utils/constants';

export default function AuthPage() {
	// Handle the case where users land on /auth directly
	redirect(appRoutes.signUp);
}
