import React from 'react'
import { useReviewsStore } from '@/storage/UseStoreReviews'
import { Button } from '@/components/ui/button'

import { useToast } from '@/hooks/use-toast'

const FormDeleteReview = ({ id }: { id: number }) => {
	const {
		deleteReview,
		//  fetchReviews
	} = useReviewsStore()
	const { toast } = useToast()

	// useEffect(() => {
	// 	// Fetch reviews on component mount
	// 	fetchReviews()
	// }, [fetchReviews])

	const handleDelete = () => {
		if (id !== null) {
			deleteReview(id)

			toast({
				title: 'Успех',
				description: `Отзыв с ID ${id} был удалён.`,
			})
		}
	}

	return (
		<div className='flex flex-row items-center justify-center gap-2'>
			<Button onClick={handleDelete}>Удалить отзыв</Button>
		</div>
	)
}

export default FormDeleteReview
