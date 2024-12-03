import Link from 'next/link'
import { Card } from '../ui/card'
import { useReviewsStore } from '@/storage/UseStoreReviews'
import ReviewCard from '../shopReviews/ReviewCard'
import { useEffect } from 'react'
import ReviewCardSkeleton from '../shopReviews/ReviewCardSkeleton'

const Testimonials = () => {
	const { reviews, fetchReviews, isLoading } = useReviewsStore()

	useEffect(() => {
		fetchReviews()
	}, [fetchReviews])

	return (
		<Card className='px-4 sm:px-6 py-8 bg-muted/10 rounded-lg shadow-lg'>
			<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6'>
				<h2 className='text-2xl sm:text-3xl font-bold text-card-foreground mb-4 sm:mb-0'>
					Отзывы наших клиентов
				</h2>
				<Link
					href='/reviews'
					className='transition duration-300 hover:text-primary text-muted-foreground font-bold text-sm sm:text-base'
				>
					Все отзывы
				</Link>
			</div>

			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
				{isLoading
					? Array.from({ length: 3 }).map((_, index) => (
							<ReviewCardSkeleton key={index}></ReviewCardSkeleton>
					  ))
					: reviews
							.slice(0, Math.min(3, reviews.length))
							.map(review => <ReviewCard key={review.id} review={review} />)}
			</div>
		</Card>
	)
}

export default Testimonials
