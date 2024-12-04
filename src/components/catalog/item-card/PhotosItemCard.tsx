'use client'

import { FC, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Card } from '@/components/ui/card'

interface ProductGalleryProps {
	images: string[] // Список URL изображений
}

const ProductGallery: FC<ProductGalleryProps> = ({ images }) => {
	const [selectedIndex, setSelectedIndex] = useState(0)

	const handlePrev = () => {
		setSelectedIndex(prev => (prev === 0 ? images.length - 1 : prev - 1))
	}

	const handleNext = () => {
		setSelectedIndex(prev => (prev === images.length - 1 ? 0 : prev + 1))
	}

	return (
		<div className=' flex flex-col lg:flex-row-reverse lg:items-start gap-4 lg:h-full'>
			{/* Main Image Viewer */}
			<Card className='lg:h-full  relative shadow-md shadow-black/20 flex items-center justify-center w-full max-w-[100%]  aspect-square overflow-hidden rounded-md'>
				{images.map((src, index) => (
					<div
						key={index}
						className={`absolute rounded-lg inset-0 transition-opacity duration-300 ${
							index === selectedIndex ? 'opacity-100' : 'opacity-0'
						}`}
					>
						<Image
							draggable={false}
							src={src}
							alt={`Main Image ${index + 1}`}
							fill
							className='object-contain'
						/>
					</div>
				))}

				{/* Navigation Buttons */}
				<Button
					variant='outline'
					size='icon'
					className='absolute left-2 top-1/2 transform -translate-y-1/2 shadow'
					onClick={handlePrev}
				>
					<ChevronLeft />
				</Button>
				<Button
					variant='outline'
					size='icon'
					className='absolute right-2 top-1/2 transform -translate-y-1/2 shadow'
					onClick={handleNext}
				>
					<ChevronRight />
				</Button>
			</Card>

			{/* Thumbnail List */}
			<Card className='flex flex-row items-center justify-center gap-2 overflow-x-auto lg:overflow-y-auto lg:flex-col lg:w-24 h-full max-h-[150px] lg:max-h-full w-full p-2 mt-4 lg:mt-0 shadow-md shadow-black/20'>
				{images.map((src, index) => (
					<div
						onMouseEnter={() => setSelectedIndex(index)}
						key={index}
						onClick={() => setSelectedIndex(index)}
						className={`relative w-16 h-16 cursor-pointer overflow-hidden rounded-md border ${
							selectedIndex === index
								? 'border-primary border-4'
								: 'border-secondary '
						}`}
					>
						<Image
							draggable={false}
							src={src}
							alt={`Thumbnail ${index + 1}`}
							fill
							className='object-cover'
						/>
					</div>
				))}
			</Card>
		</div>
	)
}

export default ProductGallery
