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
	answerId: number
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, answerId }) => {
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Вы действительно хотите удалить свой ответ?</DialogTitle>
				</DialogHeader>
				<ModalForm onClose={onClose} answerId={answerId} />
			</DialogContent>
		</Dialog>
	)
}

export default Modal
