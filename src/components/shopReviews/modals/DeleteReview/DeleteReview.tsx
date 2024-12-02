import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import FormDeleteReview from './FormDeleteReview'
import { Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

const DeleteReview = ({ id }: { id: number }) => {
	const [open, setOpen] = useState(false)
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button size='sm'>
					<Trash2
						className='cursor-pointer hover:text-primary/80 transition-colors duration-300'
						onClick={() => setOpen(true)}
					>
						Написать отзыв
					</Trash2>
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogTitle className='text-2xl font-bold text-primary'>
					<div className='flex flex-row gap-2 items-center'>
						<Trash2 />
						<p>Удалить отзыв?</p>
					</div>
				</DialogTitle>
				<FormDeleteReview id={id}></FormDeleteReview>
			</DialogContent>
		</Dialog>
	)
}

export default DeleteReview
