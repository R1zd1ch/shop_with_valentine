import React, { useState } from 'react'
import Modal from './Modal'
import { Button } from '@/components/ui/button'

const MainCreateReview = ({ productId }: { productId: number }) => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div>
			<Button onClick={() => setIsOpen(true)} className='btn btn-outline'>
				Оставить отзыв
			</Button>
			<Modal
				isOpen={isOpen}
				productId={productId}
				onClose={() => setIsOpen(false)}
			/>
		</div>
	)
}

export default MainCreateReview
