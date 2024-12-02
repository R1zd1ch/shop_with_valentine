import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import FormEditReview from './FormEditReview'
import { Pencil } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

const EditReview = ({ id }: { id: number }) => {
	const [open, setOpen] = useState(false)
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button size='sm'>
					<Pencil
						className='cursor-pointer hover:text-primary/80 transition-colors duration-300'
						onClick={() => setOpen(true)}
					></Pencil>
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogTitle className='text-2xl font-bold text-primary'>
					<div className='flex flex-row gap-2 items-center'>
						<Pencil />
						<p>Редактировать отзыв</p>
					</div>
				</DialogTitle>
				<FormEditReview id={id} setOpen={setOpen}></FormEditReview>
			</DialogContent>
		</Dialog>
	)
}

export default EditReview
