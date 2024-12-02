import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useState } from 'react'
import Question from './QuestionsCard/Questions'
import Reviews from './ReviewsCard/Reviews'
import { Product } from '@/storage/UseProductStore'

const FooterCard = ({ product }: { product: Product }) => {
	const [selectedFooter, setSelectedFooter] = useState('Reviews')

	const handleSetQuestion = () => {
		setSelectedFooter('Questions')
	}

	const handleSetReviews = () => {
		setSelectedFooter('Reviews')
	}

	return (
		<div className='flex flex-col gap-2 items-center md:items-start'>
			<Card className='colspan-1 flex flex-row gap-4 items-center p-4 px-12 w-fit'>
				<Button
					variant={selectedFooter === 'Reviews' ? 'secondary' : 'default'}
					onClick={handleSetReviews}
				>
					Отзывы
				</Button>
				<Button
					onClick={handleSetQuestion}
					variant={selectedFooter === 'Questions' ? 'secondary' : 'default'}
				>
					Вопросы
				</Button>
			</Card>
			<Card className='w-full'>
				{selectedFooter === 'Questions' ? (
					<Question productId={product.id}></Question>
				) : (
					<Reviews productId={product.id}></Reviews>
				)}
			</Card>
		</div>
	)
}

export default FooterCard
