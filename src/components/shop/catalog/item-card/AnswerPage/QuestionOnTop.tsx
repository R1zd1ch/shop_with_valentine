import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Question } from '@/storage/UseReviewsAndQuestionsStore'
import { CircleHelp } from 'lucide-react'

const QuestionOnTop = ({ content }: { content: Question }) => {
	return (
		<Card className='p-4'>
			<CardHeader className='p-0'>
				<CardTitle className='flex flex-row items-center gap-2'>
					<CircleHelp />
					<CardTitle>Вопрос</CardTitle>
				</CardTitle>
			</CardHeader>
			<CardContent className='p-0 mt-2 pl-8'>
				<div>
					<p>{content.content}</p>
				</div>
			</CardContent>
		</Card>
	)
}

export default QuestionOnTop
