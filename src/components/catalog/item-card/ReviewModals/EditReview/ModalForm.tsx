/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import updateReviewSchema from '@/zod/updateReview'
import { useToast } from '@/hooks/use-toast'
import { useReviewStore } from '@/storage/UseReviewsAndQuestionsStore'
import { CardTitle } from '@/components/ui/card'

type UpdateReviewFormData = z.infer<typeof updateReviewSchema>

interface ModalFormProps {
	reviewId: number
	onClose: () => void
}

const ModalForm: React.FC<ModalFormProps> = ({ reviewId, onClose }) => {
	const { toast } = useToast()
	const { getReviewById, updateReview } = useReviewStore()
	const review = getReviewById(reviewId)

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		watch,
	} = useForm<UpdateReviewFormData>({
		resolver: zodResolver(updateReviewSchema),
		defaultValues: {
			rating: review?.rating || 5,
			dignities: review?.dignities || '',
			flaws: review?.flaws || '',
			review: review?.comment || '',
		},
	})

	const onSubmit = (data: UpdateReviewFormData) => {
		updateReview(reviewId, {
			...review,
			...data,
			id: reviewId,
			productId: review?.productId,
			userId: review?.userId,
			rating: data.rating || review?.rating,
			comment: data.review || review?.comment,
			date: review?.date,
			dignities: data.dignities || review?.dignities,
			flaws: data.flaws || review?.flaws,
		})
		toast({
			title: 'Отзыв обновлён!',
			description: 'Ваш отзыв успешно обновлён.',
		})
		onClose()
	}

	useEffect(() => {
		if (Object.keys(errors).length > 0) {
			Object.entries(errors).forEach(([field, error]) => {
				toast({
					title: 'Ошибка валидации',
					description: error?.message || `Проверьте поле ${field}`,
					variant: 'destructive',
				})
			})
		}
	}, [errors, toast])

	const rating = watch('rating')

	if (!review) return null

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
			<div>
				<CardTitle className='font-extrabold p-0'>{review.username}</CardTitle>
			</div>
			<div>
				<Label>Оценка:</Label>
				<Rating
					value={rating ?? 0}
					onChange={(v: number) => setValue('rating', v)}
					style={{ maxWidth: 150 }}
				/>
				{errors.rating && (
					<p className='text-sm text-red-600'>{errors.rating.message}</p>
				)}
			</div>

			<div className='flex items-center w-full justify-between'>
				<div className='w-full'>
					<Label htmlFor='dignities'>Достоинства:</Label>

					<Textarea
						id='dignities'
						placeholder='Напишите достоинства продукта (необязательно)'
						{...register('dignities')}
						className='w-full flex-1 resize-none border-primary'
					/>

					{errors.dignities && (
						<p className='text-sm text-red-600'>{errors.dignities.message}</p>
					)}
				</div>
			</div>
			<div className='flex items-center w-full justify-between'>
				<div className='w-full'>
					<Label htmlFor='flaws'>Недостатки:</Label>

					<Textarea
						id='flaws'
						placeholder='Напишите недостатки продукта (необязательно)'
						{...register('flaws')}
						className='w-full flex-1 resize-none border-primary'
					/>

					{errors.flaws && (
						<p className='text-sm text-red-600'>{errors.flaws.message}</p>
					)}
				</div>
			</div>

			<div className='flex items-center w-full justify-between'>
				<div className='w-full '>
					<Label htmlFor='review'>Комментарий</Label>

					<Textarea
						id='review'
						placeholder='Ваше мнение о продукте'
						{...register('review')}
						className='w-full flex-1 resize-none border-primary'
					/>

					{errors.review && (
						<p className='text-sm text-red-600'>{errors.review.message}</p>
					)}
				</div>
			</div>

			<Button type='submit' className='w-full'>
				Сохранить
			</Button>
		</form>
	)
}

export default ModalForm
