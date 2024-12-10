'use client'
import BackButton from '@/components/ui/BackButton'
import AnswerHeader from './AnswerHeader'

// import AnswerList from './AnswerList'
import { Card } from '@/components/ui/card'
// import MainCreateQuestion from '../QuestionModals/CreateQuestion/MainCreateQuestion'
import { useQuestionStore } from '@/storage/UseReviewsAndQuestionsStore'
import useProductStore from '@/storage/UseProductStore'
import MainCreateAnswer from '../AnswerModals/CreateAnswer/MainCreateAnswer'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import QuestionOnTop from './QuestionOnTop'
import AnswerList from './AnswerList'

const QuestionsMain = ({
	questionId,
	productId,
}: {
	questionId: string
	productId: string
}) => {
	const { getQuestionById } = useQuestionStore()
	const { getProductById } = useProductStore()
	const parsedId = parseInt(questionId)
	const question = getQuestionById(parsedId)
	const product = getProductById(parseInt(productId))
	const userId = 1
	return (
		<div className='lg:mx-[100px] flex flex-col gap-6 items-center '>
			<div className='w-full max-w-screen-2xl flex flex-col gap-3 relative'>
				<BackButton
					className='absolute -top-5 -left-0 text-foreground '
					variant='link'
					pushUrl={`/catalog/product/${productId}/questions`}
				>
					<p className='font-bold+'>Назад</p>
				</BackButton>
				<div className='w-full flex gap-2 flex-col lg:flex-row'>
					<div className='flex-1'>
						<AnswerHeader question={question} product={product}></AnswerHeader>
					</div>
					<div className='w-full lg:w-1/4'>
						<Card className='flex items-center justify-center h-full gap-2 min-h-[100px]'>
							<MainCreateAnswer questionId={parsedId}></MainCreateAnswer>
							<Link href={`/catalog/product/${productId}`}>
								<Button>Перейти к товару</Button>
							</Link>
						</Card>
					</div>
				</div>

				<div className='grid grid-cols-4  gap-2 lg:gap-1'>
					<div className='col-span-4 lg:col-span-3 order-2 lg:order-1 lg:mr-2'>
						<QuestionOnTop question={question}></QuestionOnTop>
						<AnswerList questionId={questionId} userId={userId}></AnswerList>
					</div>
				</div>
			</div>
		</div>
	)
}

export default QuestionsMain
