import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Review } from '@/storage/UseReviewsAndQuestionsStore'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import MainDeleteReview from '../ReviewModals/DeleteReview/MainDeleteReview'
import MainEditReview from '../ReviewModals/EditReview/MainEditReview'

const ReviewsCard = ({ review }: { review: Review }) => {
	const parsedDate = format(new Date(review.date), 'd MMMM yyyy', {
		locale: ru,
	})
	const userId = 1
	return (
		<Card className='max-w-full '>
			<CardHeader className='flex flex-row items-start justify-between pb-2'>
				<div className='flex flex-row items-center gap-2'>
					<Avatar>
						<AvatarImage src='https://github.com/shadcn.png' />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
					<CardTitle>{review.username}</CardTitle>
				</div>
				<div className='flex flex-col items-center gap-2'>
					<Rating
						value={review.rating}
						readOnly
						style={{ maxWidth: '100px' }}
					></Rating>
					<p className='text-sm text-muted-foreground'>{parsedDate}</p>
				</div>
			</CardHeader>
			<CardContent className='max-w-full'>
				<div className='lg:pl-12 lg:pr-36 '>
					{review.dignity || review.flaws ? (
						<div className='flex flex-col gap-2'>
							{review.dignity && (
								<div className='text-sm flex flex-col gap-1 break-words max-w-full'>
									<p className='font-bold'>Достоинства:</p>
									<p className='text-card-foreground break-words max-w-full'>
										{review.dignity}
									</p>
								</div>
							)}
							{review.flaws && (
								<div className='text-sm flex flex-col gap-1 break-words max-w-full'>
									<p className='font-bold'>Недостатки:</p>
									<p className='text-card-foreground break-words max-w-full'>
										{review.flaws}
									</p>
								</div>
							)}
							<div className='text-sm flex flex-col gap-1 break-words max-w-full'>
								<p className='font-bold'>Комментарий:</p>
								<p className='text-card-foreground break-words max-w-full'>
									{review.comment}
								</p>
							</div>
						</div>
					) : (
						<p className='text-sm text-card-foreground break-words'>
							{review.comment}
						</p>
					)}
				</div>
				{userId === review.userId && (
					<div className='flex flex-row justify-end gap-2'>
						<MainEditReview reviewId={review.id}></MainEditReview>
						<MainDeleteReview reviewId={review.id}></MainDeleteReview>
					</div>
				)}
			</CardContent>
		</Card>
	)
}

export default ReviewsCard
