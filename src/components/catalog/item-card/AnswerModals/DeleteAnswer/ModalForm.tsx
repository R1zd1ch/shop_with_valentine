import React from 'react'
import { Button } from '@/components/ui/button'
import { useQuestionStore } from '@/storage/UseReviewsAndQuestionsStore'
import { useToast } from '@/hooks/use-toast'

interface ModalFormProps {
	onClose: () => void
	answerId: number
}

const ModalForm: React.FC<ModalFormProps> = ({ onClose, answerId }) => {
	const { deleteAnswer } = useQuestionStore()
	const { toast } = useToast()
	const handleDelete = () => {
		deleteAnswer(answerId)
		toast({
			title: 'Ответ удален',
			description: 'Ответ успешно удален',
		})
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
