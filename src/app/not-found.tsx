import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
	return (
		<section>
			<div className="py-8 mx-auto max-w-screen-xl lg:py-16 lg:px-6 h-[80vh] flex items-center">
				<div className="mx-auto max-w-screen-sm text-center">
					<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">404</h1>
					<p className="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
						{"Something's"} missing.
					</p>
					<p className="leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground">
						Sorry, we {"can't"} find that page. {"You'll"} find lots to explore on the home page.
					</p>
					<Link href="/">
						<Button variant="outline" size="lg">
							Back to Homepage
						</Button>
					</Link>
				</div>
			</div>
		</section>
	);
}
