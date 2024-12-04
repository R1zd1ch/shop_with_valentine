import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardFooter,
} from '@/components/ui/card'
import { Question } from '@/storage/UseReviewsAndQuestionsStore'

import '@smastrom/react-rating/style.css'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

import { pluralize } from 'numeralize-ru'
import MainDeleteQuestion from '../QuestionModals/DeleteQuestion/MainDeleteQuestion'
import MainEditQuestion from '../QuestionModals/EditQuestion/MainEditQuestion'
import MainCreateAnswer from '../AnswerModals/CreateAnswer/MainCreateAnswer'
import Link from 'next/link'
import MainEditAnswer from '../AnswerModals/EditAnswer/MainEditAnswer'
import MainDeleteAnswer from '../AnswerModals/DeleteAnswer/MainDeleteAnswer'

const QuestionsCard = ({ question }: { question: Question }) => {
	const parsedDate = format(new Date(question.date), 'd MMMM yyyy', {
		locale: ru,
	})
	const userId = 1

	// Первый ответ, если он есть
	const LastAnswer = question.answers?.[question.answers?.length - 1]

	return (
		<Card className='max-w-full'>
			<CardHeader className='flex flex-row items-start justify-between pb-2'>
				<div className='flex flex-row items-center gap-2'>
					<Avatar>
						<AvatarImage src='https://github.com/shadcn.png' />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
					<CardTitle>{question.username}</CardTitle>
				</div>
				<div className='flex flex-col items-center gap-2'>
					<p className='text-sm text-muted-foreground'>{parsedDate}</p>
				</div>
			</CardHeader>

			<CardContent className='max-w-full'>
				<p className='text-base '>{question.question}</p>
				{LastAnswer && (
					<div className='mt-4'>
						<p className='text-sm text-muted-foreground'>Недавний ответ:</p>
						<Card className='flex flex-col items-end gap-2 mt-2 lg:ml-8 p-4'>
							<div className='flex flex-row items-start gap-2 w-full'>
								<Avatar>
									<AvatarImage src='https://github.com/shadcn.png' />
									<AvatarFallback>{LastAnswer.username[0]}</AvatarFallback>
								</Avatar>
								<div>
									<p className='text-sm font-medium'>{LastAnswer.username}</p>
									<p className='text-sm text-muted-foreground'>
										{format(new Date(LastAnswer.date), 'd MMMM yyyy', {
											locale: ru,
										})}
									</p>
									<p className='mt-1 text-base'>{LastAnswer.answer}</p>
								</div>
							</div>
							{userId === LastAnswer.userId && (
								<CardFooter className='flex flex-row items-center gap-2 p-0'>
									<MainEditAnswer answerId={LastAnswer.id}></MainEditAnswer>
									<MainDeleteAnswer answerId={LastAnswer.id}></MainDeleteAnswer>
								</CardFooter>
							)}
						</Card>
					</div>
				)}
			</CardContent>

			{/* {(userId === question.userId ||
				(question.answers && question.answers.length > 1)) && ( */}
			<CardFooter
				className={`flex flex-row  gap-2 ${
					question.answers && question.answers.length > 1
						? 'justify-between'
						: 'justify-between'
				}`}
			>
				<div
					className={`flex flex-row items-end w-full gap-4 ${
						userId !== question.userId ? 'justify-between' : 'justify-between'
					}`}
				>
					<MainCreateAnswer questionId={question.id}></MainCreateAnswer>
					<div className='flex flex-row items-end gap-4'>
						{userId === question.userId && (
							<div className='flex flex-row gap-2'>
								<MainEditQuestion questionId={question.id}></MainEditQuestion>
								<MainDeleteQuestion
									questionId={question.id}
								></MainDeleteQuestion>
							</div>
						)}
						{question.answers && question.answers.length > 1 && (
							<>
								<div
									className={`flex flex-col gap-2 ${
										userId !== question.userId ? 'justify-start' : ''
									}`}
								>
									<p className='text-sm'>
										Ещё {question.answers.length - 1}{' '}
										{pluralize(
											question.answers.length - 1,
											'ответ',
											'ответа',
											'ответов'
										)}
										.
									</p>
									<Link
										href={`/catalog/product/${question.productId}/questions/answers/${question.id}`}
									>
										<p className='text-sm text-primary cursor-pointer hover:text-primary/80  transition-colors duration-300'>
											Посмотреть
										</p>
									</Link>
								</div>
							</>
						)}
					</div>
				</div>
				{/* <div className='flex flex-row items-center  gap-2'>
					{userId === question.userId && (
						<>
							<MainEditQuestion questionId={question.id}></MainEditQuestion>
							<MainDeleteQuestion questionId={question.id}></MainDeleteQuestion>
						</>
					)}
				</div> */}
			</CardFooter>
			{/* )} */}
		</Card>
	)
}

export default QuestionsCard
