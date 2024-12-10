import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import Modal from './Modal'
import ModalForm from './ModalForm'
import { Pencil } from 'lucide-react'

interface MainEditQuestionProps {
	questionId: number
}

const MainEditQuestion: React.FC<MainEditQuestionProps> = ({ questionId }) => {
	const [isOpen, setIsOpen] = useState(false)

	const handleOpen = () => setIsOpen(true)
	const handleClose = () => setIsOpen(false)

	return (
		<>
			<Button onClick={handleOpen} className='btn btn-secondary'>
				<Pencil />
			</Button>
			<Modal isOpen={isOpen} onClose={handleClose}>
				<ModalForm questionId={questionId} onClose={handleClose} />
			</Modal>
		</>
	)
}

export default MainEditQuestion
