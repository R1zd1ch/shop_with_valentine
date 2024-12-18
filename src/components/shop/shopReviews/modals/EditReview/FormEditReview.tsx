import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { useReviewsStore } from '@/storage/UseStoreReviews'
import reviewSchema from '@/zod/editReviewShop'
import { CardTitle } from '@/components/ui/card'

type ReviewFormData = z.infer<typeof reviewSchema>

const FormEditReview = ({
	id,
	setOpen,
}: {
	id: number
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
	const { editReview, getReviewById } = useReviewsStore()
	const { toast } = useToast()
	const [initialData, setInitialData] = useState<ReviewFormData | null>(null)

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ReviewFormData>({
		resolver: zodResolver(reviewSchema),
	})

	// useEffect(() => {
	// 	// Fetch reviews on component mount
	// 	fetchReviews()
	// }, [fetchReviews])
	const review = getReviewById(id)
	useEffect(() => {
		if (review) {
			const { username, content } = review
			setInitialData({ username, content })
			reset({ username, content })
		}
	}, [])

	const onSubmit = (data: ReviewFormData) => {
		editReview(id, data.username, data.content)

		toast({
			title: 'Успех',
			description: `Отзыв с ID ${id} был успешно обновлён.`,
		})

		setOpen(false)
		reset()
	}

	return (
		<div className='space-y-6'>
			<h2 className='text-lg font-bold'>Редактировать отзыв</h2>

			<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
				<div className='flex flex-row gap-2 items-center'>
					<p className='text-sm text-muted-foreground'>Имя: </p>
					<CardTitle className='text-lg font-normal'>
						{initialData?.username}
					</CardTitle>
				</div>
				<div>
					<Label htmlFor='text' className='text-muted-foreground'>
						Отзыв:
					</Label>
					<Textarea
						id='content'
						placeholder='Отредактируйте отзыв'
						{...register('content')}
						className='mt-1 resize-none'
						defaultValue={initialData?.content}
						rows={6}
					/>
					{errors.content && (
						<p className='text-red-500 text-sm mt-1'>
							{errors.content.message}
						</p>
					)}
				</div>
				<Button type='submit'>Сохранить изменения</Button>
			</form>
		</div>
	)
}

export default FormEditReview
