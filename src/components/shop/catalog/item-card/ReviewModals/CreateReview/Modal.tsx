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
	productId: number
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, productId }) => {
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className='overflow-y-auto max-h-screen'>
				<DialogHeader>
					<DialogTitle>Оставьте отзыв</DialogTitle>
				</DialogHeader>
				<ModalForm onClose={onClose} productId={productId} />
			</DialogContent>
		</Dialog>
	)
}

export default Modal
