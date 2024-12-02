import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Image from 'next/image'
import { Product } from '@/storage/UseProductStore'
import { useState, useMemo } from 'react'

const SimpleCarousel = ({ product }: { product: Product }) => {
	const [currentSlide, setCurrentSlide] = useState(0)

	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		beforeChange: (_: number, next: number) => setCurrentSlide(next),
	}

	const visibleDots = useMemo(() => {
		if (!product.img) return []
		const totalImages = product.img.length

		if (totalImages <= 5)
			return Array.from({ length: totalImages }, (_, i) => i)

		if (currentSlide <= 2) return [0, 1, 2, 3, 4]
		if (currentSlide >= totalImages - 3)
			return Array.from({ length: 5 }, (_, i) => totalImages - 5 + i)

		return [
			currentSlide - 2,
			currentSlide - 1,
			currentSlide,
			currentSlide + 1,
			currentSlide + 2,
		]
	}, [currentSlide, product.img])

	return (
		<div className='relative'>
			{/* Основная карусель */}
			<Slider {...settings} className='focus:outline-none'>
				{Array.isArray(product.img) &&
					product.img.map((image, index) => (
						<Image
							draggable={false}
							key={index}
							src={image}
							alt={product.name}
							width={400}
							height={300}
							className='w-full h-40 object-cover'
						/>
					))}
			</Slider>

			{/* Кастомные точки */}
			{Array.isArray(product.img) && (
				<div className='absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2 items-center'>
					{visibleDots.map(dotIndex => {
						const isActive = dotIndex === currentSlide
						const isNeighbor = Math.abs(dotIndex - currentSlide) === 1
						const isFarNeighbor = Math.abs(dotIndex - currentSlide) === 2

						// let size = 'w-2 h-2'
						// if (isNeighbor) size = 'w-2.5 h-2.5'
						// if (isFarNeighbor) size = 'w-2 h-2'
						// if (isActive) size = 'w-2.5 h-2.5'
						let size = 'w-1 h-1'
						if (isNeighbor) size = 'w-1.5 h-1.5'
						if (isFarNeighbor) size = 'w-1 h-1'
						if (isActive) size = 'w-1.5 h-1.5'

						return (
							<div
								key={dotIndex}
								className={`${size} rounded-full transition-all duration-300 ${
									isActive ? 'bg-primary' : 'bg-muted-foreground'
								}`}
							></div>
						)
					})}
				</div>
			)}
		</div>
	)
}

export default SimpleCarousel
