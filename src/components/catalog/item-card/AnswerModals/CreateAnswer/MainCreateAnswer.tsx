import React, { useState } from 'react'
import Modal from './Modal'
import { Button } from '@/components/ui/button'

const MainCreateAnswer = ({ questionId }: { questionId: number }) => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div>
			<Button onClick={() => setIsOpen(true)} className='btn btn-outline'>
				Ответить
			</Button>
			<Modal
				isOpen={isOpen}
				questionId={questionId}
				onClose={() => setIsOpen(false)}
			/>
		</div>
	)
}

export default MainCreateAnswer
