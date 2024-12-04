import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import { Review } from '@/storage/UseStoreReviews'
import { pluralize } from 'numeralize-ru'
import { DialogTrigger } from '../ui/dialog'
import ShowAllFeedback from './modals/ShowAllFeedback'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import DeleteReview from './modals/DeleteReview/DeleteReview'
import EditReview from './modals/EditReview/EditReview'
import Link from 'next/link'

const ReviewCard = ({ review }: { review: Review }) => {
	const textLength = review.text.split('').length
	console.log(textLength)
	const userId = 1
	return (
		<Card
			key={review.id}
			className='flex flex-col items-center  text-center bg-card rounded-lg shadow hover:shadow-lg transition-shadow dark:shadow-white/10 min-h-[270px] sm:min-h-[300px] relative'
		>
			<CardHeader>
				<p className='text-right absolute right-4 text-xs text-muted-foreground'>
					{format(new Date(review.createdAt), 'd MMMM yyyy', { locale: ru })}{' '}
				</p>
				<div className='w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden '>
					<Image
						src={'https://via.placeholder.com/150x150'}
						alt={review.username}
						width={96}
						height={96}
						className='object-cover'
					/>
				</div>
			</CardHeader>

			<CardContent className='mb-auto'>
				<h3 className='text-base sm:text-lg font-semibold text-foreground '>
					{review.username}
				</h3>

				<p className='text-xs sm:text-sm text-muted-foreground italic '>
					{textLength > 69 ? review.text.slice(0, 70) + '...' : review.text}
				</p>
				{textLength > 40 ? (
					<div className='flex flex-row justify-center'>
						<ShowAllFeedback name={review.username} text={review.text}>
							<DialogTrigger>
								<p className='text-primary text-xs   hover:text-primary/80 transition-colors duration-300 cursor-pointer'>
									Показать весь отзыв
								</p>
							</DialogTrigger>
						</ShowAllFeedback>
					</div>
				) : (
					<></>
				)}
			</CardContent>
			<CardFooter className='w-full flex flex-row justify-end'>
				<div
					className={`flex flex-row gap-1 text-xs text-primary w-full  items-end ${
						userId !== review.userId ? 'justify-end' : 'justify-between'
					}`}
				>
					{userId === review.userId && (
						<div className='flex flex-row items-center gap-2'>
							<DeleteReview id={review.id}></DeleteReview>
							<EditReview id={review.id}></EditReview>
						</div>
					)}
					{review.adminResponse && review.adminResponse.length > 0 ? (
						<div className='flex flex-row gap-1 text-xs text-primary  justify-end items-center'>
							<p>
								Есть {review.adminResponse.length}{' '}
								{pluralize(
									review.adminResponse.length,
									'ответ',
									'ответа',
									'ответов'
								)}
							</p>
							<p className='text-sm font-bold hover:text-primary/80 cursor-pointer'>
								<Link href={`/reviews/${review.id}/adminResponses`}>
									Посмотреть
								</Link>
							</p>
						</div>
					) : (
						<div className='flex flex-row gap-1 text-xs text-primary  justify-end items-center'>
							<p>Ответов пока нет</p>
						</div>
					)}
				</div>
			</CardFooter>
		</Card>
	)
}

export default ReviewCard
