import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import FormCreateReview from './FormCreateReview'
import { Star } from 'lucide-react'
import { useState } from 'react'

const CreateReview = ({}) => {
	const [open, setOpen] = useState(false)
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button onClick={() => setOpen(true)}>Написать отзыв</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogTitle className='text-2xl font-bold text-primary'>
					<div className='flex flex-row gap-2 items-center'>
						<Star />
						<p>Оставьте отзыв</p>
					</div>
				</DialogTitle>
				<FormCreateReview setOpen={setOpen}></FormCreateReview>
			</DialogContent>
		</Dialog>
	)
}

export default CreateReview
