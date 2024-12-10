import { Separator } from '@/components/ui/separator'

import { Review } from '@/storage/UseReviewsAndQuestionsStore'
import { Review as ReviewStore } from '@/storage/UseStoreReviews'
import { useState } from 'react'
import ReviewsHeader from './ReviewsHeader'
import QAndAEmptyState from '../EmptyState'

const ReviewsMain = ({
	reviews,
	reviewsStore,
}: {
	reviews: Review[]
	reviewsStore: ReviewStore[]
}) => {
	const [toggledType, setToggledType] = useState<string>('reviews')
	const isReviewsStore = reviewsStore.length > 0
	const isReviews = reviews.length > 0
	return (
		<div className=' '>
			<ReviewsHeader
				toggledType={toggledType}
				setToggledType={setToggledType}
			></ReviewsHeader>
			<Separator className='my-4'></Separator>
			<div>
				{toggledType === 'reviews' ? (
					isReviews ? (
						<>{reviews.map(review => review)}</>
					) : (
						<QAndAEmptyState
							text={'Отзывов нет. Вы пока не оставляли отзывов о товаре.'}
						></QAndAEmptyState>
					)
				) : isReviewsStore ? (
					<>{reviewsStore.map(review => review)}</>
				) : (
					<QAndAEmptyState
						text={'Отзывов нет. Вы пока не оставляли отзывов о магазине.'}
					></QAndAEmptyState>
				)}
			</div>
		</div>
	)
}

export default ReviewsMain
