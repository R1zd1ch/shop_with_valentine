import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { useReviewStore } from '@/storage/UseReviewsAndQuestionsStore'
import calculateAverageRating from '@/lib/calculateAverageRating'
import ReviewCard from './Review'
import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import MainCreateReview from '../ReviewModals/CreateReview/MainCreateReview'

const Reviews = ({ productId }: { productId: number }) => {
	const { getReviewsByProductId } = useReviewStore()
	const reviews = getReviewsByProductId(productId)
	const averageRating = calculateAverageRating(reviews)

	const sliderRef = useRef<HTMLDivElement | null>(null)
	const [isDragging, setIsDragging] = useState(false)
	const [startX, setStartX] = useState(0)
	const [scrollStart, setScrollStart] = useState(0)

	const scrollLeftButton = () => {
		if (sliderRef.current) {
			sliderRef.current.scrollBy({
				left: -300,
				behavior: 'smooth',
			})
		}
	}

	const scrollRightButton = () => {
		if (sliderRef.current) {
			sliderRef.current.scrollBy({
				left: 300,
				behavior: 'smooth',
			})
		}
	}

	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!sliderRef.current) return
		setIsDragging(true)
		setStartX(e.pageX)
		setScrollStart(sliderRef.current.scrollLeft)
	}

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!isDragging || !sliderRef.current) return
		const deltaX = e.pageX - startX
		sliderRef.current.scrollLeft = scrollStart - deltaX * 2
	}

	const handleMouseUpOrLeave = () => {
		setIsDragging(false)
	}

	return (
		<Card>
			<CardHeader className='flex flex-col'>
				<div className='flex flex-row justify-between'>
					<CardTitle>Последние отзывы</CardTitle>
					<div className='flex flex-row items-center gap-3'>
						<p className='hidden lg:block text-primary cursor-pointer hover:underline hover:text-primary/70 transition duration-300'>
							<Link href={`/catalog/product/${productId}/reviews`}>
								Все отзывы
							</Link>
						</p>
						<MainCreateReview productId={productId}></MainCreateReview>
					</div>
				</div>
				<div className='flex flex-row items-end w-fit gap-3'>
					<div className='flex flex-row items-center w-full gap-2 relative'>
						<p className='text-2xl font-semibold'>{averageRating.toFixed(1)}</p>
						<Rating
							value={averageRating}
							style={{ width: '100%', maxWidth: '150px' }}
							orientation='horizontal'
							readOnly
						/>
					</div>
					<div className='flex flex-row gap-1 text-muted-foreground text-base'>
						<p className='text-muted-foreground'>{reviews.length} </p> оценок
					</div>
				</div>
			</CardHeader>
			<CardContent className='relative'>
				{reviews.length > 0 && (
					<div className='hidden sm:block'>
						<Button
							className='absolute left-2 z-10 py-16 top-1/3 -translate-y-1/2 bg-transparent border-none hover:bg-secondary/80 transition-colors duration-300'
							onClick={scrollLeftButton}
							variant='outline'
						>
							<ChevronLeft />
						</Button>
						<Button
							className='absolute right-2 z-10 py-16 top-1/3 -translate-y-1/2 bg-transparent border-none hover:bg-secondary/80 transition-colors duration-300'
							onClick={scrollRightButton}
							variant='outline'
						>
							<ChevronRight />
						</Button>
					</div>
				)}
				<div
					className='flex items-center gap-3 overflow-x-auto scroll-smooth no-scrollbar no-select min-h-[175px] sm:min-h-0 overflow-y-hidden'
					ref={sliderRef}
					onMouseDown={handleMouseDown}
					onMouseMove={handleMouseMove}
					onMouseUp={handleMouseUpOrLeave}
					onMouseLeave={handleMouseUpOrLeave}
				>
					{reviews.length > 0 ? (
						reviews

							.sort(
								(a, b) =>
									new Date(b.date).getTime() - new Date(a.date).getTime()
							)
							.slice(0, Math.min(reviews.length, 6))
							.map(review => (
								<div key={review.id} className='p-0'>
									<ReviewCard reviewId={review.id} />
								</div>
							))
					) : (
						<p className='text-muted-foreground'>Отзывов пока нет</p>
					)}
				</div>
			</CardContent>
			<CardFooter className='flex flex-row justify-center sm:hidden'>
				<p className='text-primary '>
					<Link href={`/catalog/product/${productId}/reviews`}>Все отзывы</Link>
				</p>
			</CardFooter>
		</Card>
	)
}

export default Reviews
