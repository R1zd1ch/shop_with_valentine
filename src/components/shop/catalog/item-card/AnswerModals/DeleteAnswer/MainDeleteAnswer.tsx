import React, { useState } from 'react'
import Modal from './Modal'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'

const MainDeleteAnswer = ({ answerId }: { answerId: number }) => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div>
			<Button onClick={() => setIsOpen(true)} className='btn btn-outline'>
				<Trash2 />
			</Button>
			<Modal
				isOpen={isOpen}
				answerId={answerId}
				onClose={() => setIsOpen(false)}
			/>
		</div>
	)
}

export default MainDeleteAnswer
