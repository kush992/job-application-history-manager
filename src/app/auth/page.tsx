import { appRoutes } from '@/utils/constants';
import { redirect } from 'next/navigation';

export default function AuthPage() {
	// Handle the case where users land on /auth directly
	redirect(appRoutes.signUp);
}
