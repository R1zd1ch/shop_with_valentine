import React from 'react'
import { Button } from '@/components/ui/button'
import { useReviewStore } from '@/storage/UseReviewsAndQuestionsStore'

interface ModalFormProps {
	onClose: () => void
	reviewId: number
}

const ModalForm: React.FC<ModalFormProps> = ({ onClose, reviewId }) => {
	const { deleteReview } = useReviewStore()
	const handleDelete = () => {
		deleteReview(reviewId)
		onClose()
	}

	return (
		<div className='flex flex-row items-center justify-center gap-2 mt-2'>
			<div>
				<Button onClick={() => handleDelete()} className='btn btn-danger'>
					Удалить
				</Button>
			</div>

			<Button onClick={onClose} className='btn btn-outline'>
				Отмена
			</Button>
		</div>
	)
}

export default ModalForm
