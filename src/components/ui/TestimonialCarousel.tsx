'use client';

import Autoplay from 'embla-carousel-autoplay';
import { Star } from 'lucide-react';
import * as React from 'react';
import { useRef } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Testimonial } from '@/data/testimonials';

type Props = {
	items: Testimonial[];
	autoplay?: boolean;
	interval?: number;
};

export function TestimonialCarousel({ items, autoplay, interval }: Props) {
	const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

	return (
		<Carousel
			opts={{ loop: autoplay ?? true, align: 'start', skipSnaps: false }}
			plugins={[plugin.current]}
			className="w-full mx-auto"
			onMouseEnter={plugin.current.stop}
			onMouseLeave={plugin.current.reset}
		>
			<CarouselContent>
				{items.map((item, index) => (
					<CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
						<div className="p-1">
							<Card className="bg-background">
								<CardContent>
									<div className="flex flex-col gap-4 sm:flex-row sm:items-center pt-6">
										<div className="flex-1">
											<p className="text-lg text-foreground">“{item.content}”</p>
											<div className="mt-4 flex items-center justify-between">
												<div>
													<p className="font-medium">{item.name}</p>
													{item.role && (
														<p className="text-sm text-muted-foreground">{item.role}</p>
													)}
												</div>
												<div className="flex items-center gap-1">
													{[...Array(5)].map((_, i) => (
														<Star
															key={i}
															className={`w-4 h-4 ${i < (item.rating ?? 0) ? 'fill-primary text-primary' : 'fill-muted text-muted-foreground'}`}
														/>
													))}
												</div>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
			{/* <CarouselPrevious className="hidden md:flex" /> */}
			{/* <CarouselNext className="hidden md:flex" /> */}
		</Carousel>
	);
}
