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

const QuestionsCard = ({ content }: { content: Question }) => {
	const parsedDate = format(new Date(content.date), 'd MMMM yyyy', {
		locale: ru,
	})
	const userId = 1

	// Первый ответ, если он есть
	const LastAnswer = content.answers?.[content.answers?.length - 1]

	return (
		<Card className='max-w-full'>
			<CardHeader className='flex flex-row items-start justify-between pb-2'>
				<div className='flex flex-row items-center gap-2'>
					<Avatar>
						<AvatarImage src='https://github.com/shadcn.png' />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
					<CardTitle>{content.username}</CardTitle>
				</div>
				<div className='flex flex-col items-center gap-2'>
					<p className='text-sm text-muted-foreground'>{parsedDate}</p>
				</div>
			</CardHeader>

			<CardContent className='max-w-full'>
				<p className='text-base '>{content.content}</p>
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
									<p className='mt-1 text-base'>{LastAnswer.content}</p>
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

			{/* {(userId === content.userId ||
				(content.answers && content.answers.length > 1)) && ( */}
			<CardFooter
				className={`flex flex-row  gap-2 ${
					content.answers && content.answers.length > 1
						? 'justify-between'
						: 'justify-between'
				}`}
			>
				<div
					className={`flex flex-row items-end w-full gap-4 ${
						userId !== content.userId ? 'justify-between' : 'justify-between'
					}`}
				>
					<MainCreateAnswer questionId={content.id}></MainCreateAnswer>
					<div className='flex flex-row items-end gap-4'>
						{userId === content.userId && (
							<div className='flex flex-row gap-2'>
								<MainEditQuestion questionId={content.id}></MainEditQuestion>
								<MainDeleteQuestion
									questionId={content.id}
								></MainDeleteQuestion>
							</div>
						)}
						{content.answers && content.answers.length > 1 && (
							<>
								<div
									className={`flex flex-col gap-2 ${
										userId !== content.userId ? 'justify-start' : ''
									}`}
								>
									<p className='text-sm'>
										Ещё {content.answers.length - 1}{' '}
										{pluralize(
											content.answers.length - 1,
											'ответ',
											'ответа',
											'ответов'
										)}
										.
									</p>
									<Link
										href={`/catalog/product/${content.productId}/questions/answers/${content.id}`}
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
					{userId === content.userId && (
						<>
							<MainEditQuestion questionId={content.id}></MainEditQuestion>
							<MainDeleteQuestion questionId={content.id}></MainDeleteQuestion>
						</>
					)}
				</div> */}
			</CardFooter>
			{/* )} */}
		</Card>
	)
}

export default QuestionsCard
