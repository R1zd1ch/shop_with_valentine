'use client'
import { FC, useEffect } from 'react'

import HeaderShopReviews from './HeaderShopReviews'
import SortReviews from './SortReviews'
import { useReviewsStore } from '@/storage/UseStoreReviews'
import ReviewsList from './ReviewsList'
import CreateReview from './modals/CreateReview/CreateReview'

const MainShopReviews: FC = ({}) => {
	const { reviews, fetchReviews, isLoading } = useReviewsStore()

	useEffect(() => {
		fetchReviews()
	}, [fetchReviews])

	return (
		<div className='lg:mx-[100px] flex flex-col gap-6 items-center'>
			<div className='grid grid-cols-1 lg:grid-cols-5 gap-4 w-full max-w-screen-2xl'>
				<div className='lg:col-span-5 order-none lg:order-none '>
					<HeaderShopReviews></HeaderShopReviews>
				</div>
				{/* Фильтр */}
				<div className='lg:col-span-1 order-1 lg:order-1 flex flex-col gap-4'>
					<SortReviews></SortReviews>
					<CreateReview></CreateReview>
				</div>

				{/* Лист каталога */}
				<div className='lg:col-span-4 order-2 lg:order-none '>
					<ReviewsList isLoading={isLoading} reviews={reviews}></ReviewsList>
				</div>
			</div>
		</div>
	)
}

export default MainShopReviews
