'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useState } from 'react'
import Header from './Header'
import ReviewsMain from './Reviews/ReviewsMain'
import QuestionsMain from './Questions/QuestionsMain'

const ReviewsAndQuestionsUser = ({}) => {
	const [toggledTab, setToggledTab] = useState<string>('reviews')
	return (
		<Card className='flex flex-col min-h-[75vh] w-full p-6 px-0 lg:px-6'>
			<Header toggledTab={toggledTab} setToggledTab={setToggledTab}></Header>
			<Separator className='my-4'></Separator>
			<CardContent className='flex flex-col gap-6 px-0'>
				{toggledTab === 'reviews' ? (
					<ReviewsMain reviews={[]} reviewsStore={[]}></ReviewsMain>
				) : (
					<QuestionsMain questions={[]}></QuestionsMain>
				)}
			</CardContent>
		</Card>
	)
}

export default ReviewsAndQuestionsUser
