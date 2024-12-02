import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import Modal from './Modal'
import ModalForm from './ModalForm'
import { Pencil } from 'lucide-react'

interface MainEditReviewProps {
	reviewId: number
}

const MainEditReview: React.FC<MainEditReviewProps> = ({ reviewId }) => {
	const [isOpen, setIsOpen] = useState(false)

	const handleOpen = () => setIsOpen(true)
	const handleClose = () => setIsOpen(false)

	return (
		<>
			<Button onClick={handleOpen} className='btn btn-secondary'>
				<Pencil />
			</Button>
			<Modal isOpen={isOpen} onClose={handleClose}>
				<ModalForm reviewId={reviewId} onClose={handleClose} />
			</Modal>
		</>
	)
}

export default MainEditReview
