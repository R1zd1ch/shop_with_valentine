import { FC } from 'react'
import { useReviewStore } from '@/storage/UseReviewsAndQuestionsStore'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { ru } from 'date-fns/locale'
import { format } from 'date-fns'

interface ReviewCardProps {
	reviewId: number
}

const ReviewCard: FC<ReviewCardProps> = ({ reviewId }) => {
	const review = useReviewStore(state =>
		state.reviews.find(r => r.id === reviewId)
	)

	if (!review) {
		return <p>Отзыв не найден</p>
	}

	return (
		<Card className='shadow-lg p-0 bg-card w-[290px] md:w-[400px] h-36 sm:h-40 no-select'>
			<CardHeader className='flex justify-between flex-row sm:items-center pb-1 sm:pb-4 items-start'>
				<div className='flex flex-col md:flex-row md:items-end gap-0 sm:gap-3'>
					<h3 className='text-lg font-semibold'>{review.username}</h3>
					<p className='text-xs text-muted-foreground'>
						{format(new Date(review.date), 'd MMMM yyyy', { locale: ru })}
					</p>
				</div>
				<Badge variant='outline' className='flex items-center gap-1'>
					<Rating
						readOnly
						className=''
						value={review.rating}
						style={{ width: '100%', maxWidth: '120px' }}
					></Rating>
					{/* <Star className='w-4 h-4 text-yellow-500' />
					{review.rating} */}
				</Badge>
			</CardHeader>
			<CardContent>
				<div className='text-sm text-card-foreground break-words line-clamp-3'>
					{review.content}
				</div>
			</CardContent>
		</Card>
	)
}

export default ReviewCard
