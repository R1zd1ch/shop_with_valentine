import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardFooter } from '@/components/ui/card'
import { Answer } from '@/storage/UseReviewsAndQuestionsStore'
import { format } from 'date-fns/format'
import { ru } from 'date-fns/locale/ru'
import MainDeleteAnswer from '../AnswerModals/DeleteAnswer/MainDeleteAnswer'
import MainEditAnswer from '../AnswerModals/EditAnswer/MainEditAnswer'

const AnswerCard = ({ answer, userId }: { answer: Answer; userId: number }) => {
	console.log(answer.userId)

	return (
		<Card className='flex flex-col items-end gap-2 p-4'>
			<div className='flex flex-row items-start gap-2 w-full'>
				<Avatar>
					<AvatarImage src='https://github.com/shadcn.png' />
					<AvatarFallback>{answer.username}</AvatarFallback>
				</Avatar>
				<div>
					<p className='text-sm font-medium'>{answer.username}</p>
					<p className='text-sm text-muted-foreground'>
						{format(new Date(answer.date), 'd MMMM yyyy', {
							locale: ru,
						})}
					</p>
					<p className='mt-1 '>{answer.answer}</p>
				</div>
			</div>
			{userId === answer.userId && (
				<CardFooter className='flex flex-row items-center gap-2 pb-0 pt-2'>
					<MainEditAnswer answerId={answer.id}></MainEditAnswer>
					<MainDeleteAnswer answerId={answer.id}></MainDeleteAnswer>
				</CardFooter>
			)}
		</Card>
	)
}

export default AnswerCard
