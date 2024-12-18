import { FC } from 'react'
import { useQuestionStore } from '@/storage/UseReviewsAndQuestionsStore'
import { Card, CardHeader, CardContent } from '@/components/ui/card'

import { ru } from 'date-fns/locale'
import { format } from 'date-fns'

interface ReviewCardProps {
	questionId: number
}

const QuestionCard: FC<ReviewCardProps> = ({ questionId }) => {
	const content = useQuestionStore(state =>
		state.questions.find(r => r.id === questionId)
	)

	if (!content) {
		return <p>Вопрос не найден</p>
	}

	return (
		<Card className='shadow-lg p-0 bg-card w-[290px] md:w-[400px] h-36 sm:h-40 no-select'>
			<CardHeader className='flex justify-between flex-row sm:items-center pb-1 sm:pb-4 items-start'>
				<div className='flex flex-col md:flex-row md:items-end gap-0 sm:gap-3'>
					<h3 className='text-lg font-semibold'>{content.username}</h3>
					<p className='text-xs text-muted-foreground'>
						{format(new Date(content.date), 'd MMMM yyyy', { locale: ru })}
					</p>
				</div>
			</CardHeader>
			<CardContent>
				<div className='text-sm text-card-foreground break-words line-clamp-3'>
					{content.content}
				</div>
			</CardContent>
		</Card>
	)
}

export default QuestionCard
