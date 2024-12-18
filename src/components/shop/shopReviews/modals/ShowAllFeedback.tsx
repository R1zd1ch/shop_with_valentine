import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { Star } from 'lucide-react'

const ShowAllFeedback = ({
	children,
	name,
	content,
}: {
	children: React.ReactNode
	name: string
	content: string
}) => {
	return (
		<Dialog>
			{children}
			<DialogContent>
				<DialogHeader>
					<DialogTitle className='flex flex-row gap-2 text-2xl items-center'>
						<Star className='text-primary' />
						<p>Отзыв от</p> <p className='font-bold text-primary'>{name}</p>
					</DialogTitle>
				</DialogHeader>
				<div className='flex flex-col gap-2'>
					<p className='font-bold text-xl '>Мнение о магазине:</p>
					<p className='italic'>{content}</p>
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default ShowAllFeedback
