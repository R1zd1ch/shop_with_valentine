import React from 'react'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'

interface ModalProps {
	isOpen: boolean
	onClose: () => void
	children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className='max-h-screen overflow-y-auto'>
				<DialogHeader>
					<DialogTitle>Редактирование вопроса</DialogTitle>
				</DialogHeader>
				{children}
			</DialogContent>
		</Dialog>
	)
}

export default Modal
