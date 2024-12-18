import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardFooter } from '@/components/ui/card'
import { Answer } from '@/storage/UseReviewsAndQuestionsStore'
import { format } from 'date-fns/format'
import { ru } from 'date-fns/locale/ru'
import MainDeleteAnswer from '../AnswerModals/DeleteAnswer/MainDeleteAnswer'
import MainEditAnswer from '../AnswerModals/EditAnswer/MainEditAnswer'

const AnswerCard = ({
	content,
	userId,
}: {
	content: Answer
	userId: number
}) => {
	console.log(content.userId)

	return (
		<Card className='flex flex-col items-end gap-2 p-4'>
			<div className='flex flex-row items-start gap-2 w-full'>
				<Avatar>
					<AvatarImage src='https://github.com/shadcn.png' />
					<AvatarFallback>{content.username}</AvatarFallback>
				</Avatar>
				<div>
					<p className='text-sm font-medium'>{content.username}</p>
					<p className='text-sm text-muted-foreground'>
						{format(new Date(content.date), 'd MMMM yyyy', {
							locale: ru,
						})}
					</p>
					<p className='mt-1 '>{content.content}</p>
				</div>
			</div>
			{userId === content.userId && (
				<CardFooter className='flex flex-row items-center gap-2 pb-0 pt-2'>
					<MainEditAnswer answerId={content.id}></MainEditAnswer>
					<MainDeleteAnswer answerId={content.id}></MainDeleteAnswer>
				</CardFooter>
			)}
		</Card>
	)
}

export default AnswerCard
