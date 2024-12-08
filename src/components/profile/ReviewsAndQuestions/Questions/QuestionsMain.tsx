import { Separator } from '@/components/ui/separator'
import QuestionHeader from './QuestionHeader'
import { Question } from '@/storage/UseReviewsAndQuestionsStore'
import QAndAEmptyState from '../EmptyState'

const QuestionsMain = ({ questions }: { questions: Question[] }) => {
	const isQuestions = questions.length > 0
	return (
		<div className=' '>
			<QuestionHeader></QuestionHeader>
			<Separator className='my-4'></Separator>
			<div>
				{isQuestions ? (
					<>{questions.map(question => question)}</>
				) : (
					<QAndAEmptyState
						text={'Вопросов нет. Вы пока не задавали вопросов о товаре.'}
					></QAndAEmptyState>
				)}
			</div>
		</div>
	)
}

export default QuestionsMain
