import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { useReviewsStore } from '@/storage/UseStoreReviews'
import reviewSchema from '@/zod/editReviewShop'

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
			const { name, text } = review
			setInitialData({ name, text })
			reset({ name, text })
		}
	}, [])

	const onSubmit = (data: ReviewFormData) => {
		editReview(id, data.name, data.text)

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
				<div>
					<Label htmlFor='name'>Имя</Label>
					<Input
						id='name'
						placeholder='Имя пользователя'
						{...register('name')}
						className='mt-1'
						defaultValue={initialData?.name}
					/>
					{errors.name && (
						<p className='text-red-500 text-sm mt-1'>{errors.name.message}</p>
					)}
				</div>
				<div>
					<Label htmlFor='text'>Отзыв</Label>
					<Textarea
						id='text'
						placeholder='Отредактируйте отзыв'
						{...register('text')}
						className='mt-1 resize-none'
						defaultValue={initialData?.text}
						rows={6}
					/>
					{errors.text && (
						<p className='text-red-500 text-sm mt-1'>{errors.text.message}</p>
					)}
				</div>
				<Button type='submit'>Сохранить изменения</Button>
			</form>
		</div>
	)
}

export default FormEditReview
