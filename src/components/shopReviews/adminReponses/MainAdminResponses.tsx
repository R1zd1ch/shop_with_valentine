'use client'
import { Card } from '@/components/ui/card'
import { Review, useReviewsStore } from '@/storage/UseStoreReviews'
import { useEffect } from 'react'
import ResponsesHeader from './ResponsesHeader'
import RightBar from './RightBar'
import ResponsesList from './ResponsesList'

const MainAdminResponses = ({ reviewId }: { reviewId: string }) => {
	const { getAdminResponsesByReviewId, fetchReviews, getReviewById } =
		useReviewsStore()

	useEffect(() => {
		fetchReviews()
	}, [fetchReviews])

	const parsedId = parseInt(reviewId)

	const responses = getAdminResponsesByReviewId(parsedId)
	useEffect(() => {
		console.log(responses)
	}, [fetchReviews])
	const review = getReviewById(parsedId)
		? (getReviewById(parsedId) as Review)
		: null

	return (
		<div className='md:mx-[100px] flex flex-col gap-6 items-center'>
			<div className='grid grid-cols-1 lg:grid-cols-5 gap-4 w-full max-w-screen-2xl'>
				<div className='lg:col-span-5 order-none lg:order-none '>
					{review ? (
						<ResponsesHeader review={review}></ResponsesHeader>
					) : (
						<p>Такого отзыва нет</p>
					)}
				</div>

				<div className='lg:col-span-1 order-1 lg:order-1 flex flex-col gap-4'>
					<RightBar responsesCount={responses.length}></RightBar>
				</div>

				{/* Лист ответов */}
				<div className='lg:col-span-4 order-2 lg:order-none '>
					<ResponsesList responses={responses}></ResponsesList>
				</div>
			</div>
		</div>
	)
}

export default MainAdminResponses
