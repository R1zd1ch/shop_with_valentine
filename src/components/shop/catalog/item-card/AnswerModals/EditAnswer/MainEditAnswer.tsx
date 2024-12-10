import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import Modal from './Modal'
import ModalForm from './ModalForm'
import { Pencil } from 'lucide-react'

interface MainEditAnswerProps {
	answerId: number
}

const MainEditAnswer: React.FC<MainEditAnswerProps> = ({ answerId }) => {
	const [isOpen, setIsOpen] = useState(false)

	const handleOpen = () => setIsOpen(true)
	const handleClose = () => setIsOpen(false)

	return (
		<>
			<Button onClick={handleOpen} className='btn btn-secondary'>
				<Pencil />
			</Button>
			<Modal isOpen={isOpen} onClose={handleClose}>
				<ModalForm answerId={answerId} onClose={handleClose} />
			</Modal>
		</>
	)
}

export default MainEditAnswer
