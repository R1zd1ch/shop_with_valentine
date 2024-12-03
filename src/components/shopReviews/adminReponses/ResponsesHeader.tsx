import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { Review } from '@/storage/UseStoreReviews'
import { AvatarFallback, AvatarImage, Avatar } from '@/components/ui/avatar'
import BackButton from '@/components/ui/BackButton'

const ResponsesHeader = ({ review }: { review: Review }) => {
	return (
		<Card className='mb-4 relative'>
			<BackButton
				className='absolute -top-5 -left-4 w-20'
				variant='ghost'
				pushUrl={'/reviews'}
			></BackButton>
			<CardHeader className='flex lg:flex-row flex-col justify-between items-start relative'>
				<div className='flex flex-row gap-2 justify-start'>
					<Avatar className='w-20 h-20'>
						<AvatarImage src='https://github.com/shadcn.png' />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
					<CardTitle className='mt-4 text-lg font-bold'>
						<p className='text-sm text-muted-foreground'>Отзыв от</p>
						<p className='text-2xl'>{review.name}</p>
					</CardTitle>
				</div>
				<div className='absolute top-4 right-4 lg:hidden flex justify-between items-center'>
					<p className='text-xs text-muted-foreground'>
						{format(new Date(review.createdAt), 'd MMMM yyyy', { locale: ru })}
					</p>
				</div>

				<CardDescription className='w-full lg:mt-0 lg:max-w-[70%]'>
					<p className='text-sm text-muted-foreground mt-4 lg:mt-0'>
						Текст отзыва:
					</p>
					<p className='text-base text-foreground'>{review.text}</p>
				</CardDescription>
				<div className='hidden lg:block flex justify-between items-center'>
					<p className='text-xs text-muted-foreground'>
						{format(new Date(review.createdAt), 'd MMMM yyyy', { locale: ru })}
					</p>
				</div>
			</CardHeader>
		</Card>
	)
}

export default ResponsesHeader
