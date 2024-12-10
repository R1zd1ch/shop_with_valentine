import React from 'react'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import ModalForm from './ModalForm'

interface ModalProps {
	isOpen: boolean
	onClose: () => void
	questionId: number
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, questionId }) => {
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						Вы действительно хотите удалить свой вопрос?
					</DialogTitle>
				</DialogHeader>
				<ModalForm onClose={onClose} questionId={questionId} />
			</DialogContent>
		</Dialog>
	)
}

export default Modal
