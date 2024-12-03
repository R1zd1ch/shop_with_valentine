import React from 'react'
import { RiMacbookLine } from 'react-icons/ri'
import { CgAppleWatch } from 'react-icons/cg'
import { TbDeviceAirpods, TbDeviceIpad } from 'react-icons/tb'
import { Gi3dGlasses } from 'react-icons/gi'
import { MdOutlineAllInclusive, MdPhoneIphone } from 'react-icons/md'

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel'
import { Card, CardHeader, CardTitle } from '../ui/card'
import useFilterStore from '@/storage/UseFilterStore'
import Link from 'next/link'

// Функция для получения иконки
const getCategoryIcon = (value: string) => {
	switch (value) {
		case 'macbook':
			return <RiMacbookLine className='text-5xl' />
		case 'iphone':
			return <MdPhoneIphone className='text-5xl' />
		case 'accessories':
			return <Gi3dGlasses className='text-5xl' />
		case 'ipad':
			return <TbDeviceIpad className='text-5xl' />
		case 'watch':
			return <CgAppleWatch className='text-5xl' />
		case 'airpods':
			return <TbDeviceAirpods className='text-5xl' />
		case 'all':
			return <MdOutlineAllInclusive className='text-5xl' />
		default:
			return null
	}
}

const MainCategory = () => {
	const { categoryMain, setCategory } = useFilterStore()

	return (
		<Card className='py-8 bg-muted/10 text-muted-foreground shadow-xl'>
			<div className='container mx-auto px-6'>
				<h2 className='text-3xl font-bold mb-0 text-left text-foreground text-primary'>
					Категории
				</h2>
				<div className='flex items-center w-full justify-center'>
					<Carousel
						opts={{
							align: 'start',
						}}
						className='w-[80%] md:max-w-[70%] lg:max-w-[80%]'
					>
						<CarouselContent className='flex sm:gap-1 py-4'>
							{categoryMain.map(category => (
								<CarouselItem
									onClick={() => setCategory(category.value)}
									key={category.name}
									className='flex-shrink-0 w-full basis-1/2 sm:basis-1/3 md:basis-1/3 lg:basis-1/5 select-none'
								>
									<Link href={'/catalog'}>
										<Card className='h-full w-full flex flex-col justify-between rounded-lg border border-muted shadow-sm hover:shadow-lg transition-shadow dark:shadow-white/10'>
											<CardHeader className='text-center'>
												<CardTitle className='text-sm md:text-lg text-foreground'>
													{category.name}
													<div className='mt-2 flex items-center justify-center'>
														{getCategoryIcon(category.value)}
													</div>
												</CardTitle>
											</CardHeader>
										</Card>
									</Link>
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
