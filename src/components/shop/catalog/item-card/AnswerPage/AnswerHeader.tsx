import { Card, CardHeader, CardTitle } from '@/components/ui/card'

import {
	Question,
	useQuestionStore,
} from '@/storage/UseReviewsAndQuestionsStore'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Product } from '@/storage/UseProductStore'

const AnswerHeader = ({
	content,
	product,
}: {
	content: Question
	product: Product
}) => {
	const { getAnswersByQuestionId } = useQuestionStore()
	const answers = getAnswersByQuestionId(content.id)

	return (
		<div className='flex flex-col gap-2'>
			<Card className='shadow-lg shadow-black/20  flex flex-col lg:flex-row items-center justify-between p-4 gap-2'>
				<div className='flex flex-row gap-2'>
					<div className='w-24 h-24 aspect-square rounded-md'>
						<Avatar className='w-full h-full'>
							<AvatarImage src='https://github.com/shadcn.png' />
							<AvatarFallback>{content?.username[0]}</AvatarFallback>
						</Avatar>
					</div>
					<CardHeader className='flex flex-col justify-start gap-0 p-2 '>
						<CardTitle>{content.username}</CardTitle>
						<div className='flex flex-row gap-2 text-sm'></div>
						<div className='flex flex-row gap-2 items-center justify-start'>
							<div className='flex flex-row gap-2 items-end'>
								<p className='text-base'>Всего ответов: {answers?.length}</p>
							</div>
						</div>
					</CardHeader>
				</div>
				<CardHeader className='border-t-2 lg:border-t-0 mt-4 lg:mt-0 lg:border-l-2 px-12'>
					<div className=' flex flex-col  items-start '>
						<CardTitle className='text-lg p-0 m-0'>Товар:</CardTitle>
						<p className='text-lg text-primary font-bold'>{product.name}</p>
						<p className='text-xs text-muted-foreground my-1'>
							{product.category} {product.color}
						</p>
					</div>
				</CardHeader>
			</Card>
		</div>
	)
}

export default AnswerHeader
