import React from 'react'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

const categories = [
	{
		id: 1,
		name: 'Laptops',
		description: 'High-performance laptops',
		icon: '💻',
	},
	{ id: 2, name: 'Smartphones', description: 'Latest smartphones', icon: '📱' },
	{
		id: 3,
		name: 'Accessories',
		description: 'Top-notch accessories',
		icon: '🎧',
	},
	{
		id: 4,
		name: 'Gaming',
		description: 'Gaming gear and consoles',
		icon: '🎮',
	},
	{ id: 5, name: 'Cameras', description: 'Professional cameras', icon: '📷' },
]

const MainCategory = () => {
	return (
		<Card className=' py-8 bg-muted/10 text-muted-foreground shadow-xl'>
			<div className='container mx-auto px-6'>
				<h2 className='text-3xl font-bold mb-0 text-left text-foreground'>
					Категории
				</h2>
				<div className='flex items-center w-full justify-center'>
					<Carousel
						opts={{
							align: 'start',
						}}
						className='w-[80%] md:max-w-[70%] lg:max-w-[80%]'
					>
						<CarouselContent className='flex  sm:gap-1 py-4'>
							{categories.map(category => (
								<CarouselItem
									key={category.name}
									className='flex-shrink-0 w-full basis-1/2 sm:basis-1/3 md:basis-1/3 lg:basis-1/5'
								>
									<Card className='h-full w-full flex flex-col justify-between  rounded-lg border border-muted shadow-sm hover:shadow-lg transition-shadow dark:shadow-white/10'>
										<CardHeader className='text-center'>
											<CardTitle className='text-sm md:text-lg text-foreground'>
												{category.name}
												<div className='text-5xl mt-2'>{category.icon}</div>
											</CardTitle>
										</CardHeader>
										<CardContent className='flex flex-col items-center justify-center p-0 pb-2 '>
											<p className='text-sm text-muted-foreground text-center'>
												{category.description}
											</p>
										</CardContent>
									</Card>
								</CarouselItem>
							))}
						</CarouselContent>
						<div className='flex justify-between items-center mt-4'>
							<CarouselPrevious className='rounded-full bg-primary text-primary-foreground p-3 hover:bg-primary/90 transition' />
							<CarouselNext className='rounded-full bg-primary text-primary-foreground p-3 hover:bg-primary/90 transition' />
						</div>
					</Carousel>
				</div>
			</div>
		</Card>
	)
}

export default MainCategory
