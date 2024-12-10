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
	reviewId: number
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, reviewId }) => {
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Вы действительно хотите удалить отзыв?</DialogTitle>
				</DialogHeader>
				<ModalForm onClose={onClose} reviewId={reviewId} />
			</DialogContent>
		</Dialog>
	)
}

export default Modal
