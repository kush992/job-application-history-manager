// 'use client';

// import { ArrowLeft, ArrowRight, Star } from 'lucide-react';
// import React, { useEffect, useRef, useState } from 'react';

// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import type { Testimonial } from '@/data/testimonials';

// type Props = {
//   items: Testimonial[];
//   autoplay?: boolean;
//   interval?: number;
// };

// export default function TestimonialCarousel({ items, autoplay = true, interval = 5000 }: Props) {
//   const [index, setIndex] = useState(0);
//   const timerRef = useRef<number | null>(null);

//   const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);
//   const next = () => setIndex((i) => (i + 1) % items.length);

//   useEffect(() => {
//     if (!autoplay) return;
//     timerRef.current = window.setInterval(() => setIndex((i) => (i + 1) % items.length), interval);
//     return () => {
//       if (timerRef.current) window.clearInterval(timerRef.current);
//     };
//   }, [autoplay, interval, items.length]);

//   if (!items || items.length === 0) return null;

//   const item = items[index];

//   return (
//     <div className="w-full">
//       <div className="relative">
//         <Card className="bg-background">
//           <CardHeader>
//             <CardTitle className="text-center">What our users say</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
//               <div className="flex-1">
//                 <p className="text-lg text-foreground">“{item.content}”</p>
//                 <div className="mt-4 flex items-center justify-between">
//                   <div>
//                     <p className="font-medium">{item.name}</p>
//                     {item.role ? <p className="text-sm text-muted-foreground">{item.role}</p> : null}
//                   </div>
//                   <div className="flex items-center gap-1">
//                     {[...Array(5)].map((_, i) => (
//                       <Star
//                         key={i}
//                         className={`w-4 h-4 ${i < (item.rating ?? 0) ? 'fill-primary text-primary' : 'fill-muted text-muted-foreground'}`}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-4 flex items-center gap-2 sm:mt-0">
//                 <Button variant="ghost" onClick={prev} aria-label="Previous testimonial" className="p-2">
//                   <ArrowLeft className="w-4 h-4" />
//                 </Button>
//                 <div className="hidden sm:flex items-center gap-2">
//                   {items.map((_, i) => (
//                     <button
//                       key={i}
//                       aria-label={`Go to testimonial ${i + 1}`}
//                       onClick={() => setIndex(i)}
//                       className={`h-2 w-8 rounded-full ${i === index ? 'bg-primary' : 'bg-muted'}`}
//                     />
//                   ))}
//                 </div>
//                 <Button variant="ghost" onClick={next} aria-label="Next testimonial" className="p-2">
//                   <ArrowRight className="w-4 h-4" />
//                 </Button>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }

'use client';

import Autoplay from 'embla-carousel-autoplay';
import { Star } from 'lucide-react';
import * as React from 'react';
import { useRef } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
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
			opts={{ loop: true, align: 'start', skipSnaps: false }}
			plugins={[plugin.current]}
			className="w-full mx-auto"
			onMouseEnter={plugin.current.stop}
			onMouseLeave={plugin.current.reset}
		>
			<CarouselContent>
				{items.map((item, index) => (
					<CarouselItem key={index} className='md:basis-2/3 lg:basis-1/3'>
						<div className="p-1">
							<Card className="bg-background">
								<CardContent>
									<div className="flex flex-col gap-4 sm:flex-row sm:items-center pt-6">
										<div className="flex-1">
											<p className="text-lg text-foreground">“{item.content}”</p>
											<div className="mt-4 flex items-center justify-between">
												<div>
													<p className="font-medium">{item.name}</p>
													{item.role ? (
														<p className="text-sm text-muted-foreground">{item.role}</p>
													) : null}
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
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	);
}
