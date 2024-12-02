/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import updateReviewSchema from '@/zod/updateReview'
import { useToast } from '@/hooks/use-toast'
import { useReviewStore } from '@/storage/UseReviewsAndQuestionsStore'

type UpdateReviewFormData = z.infer<typeof updateReviewSchema>

interface ModalFormProps {
	reviewId: number
	onClose: () => void
}

const ModalForm: React.FC<ModalFormProps> = ({ reviewId, onClose }) => {
	const [isEditing, setIsEditing] = useState<{
		name: boolean
		email: boolean
	}>({
		name: false,
		email: false,
	})
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
			username: review?.username || '',
			rating: review?.rating || 5,
			dignity: review?.dignity || '',
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
			username: data.username || review?.username,
			rating: data.rating || review?.rating,
			comment: data.review || review?.comment,
			date: review?.date,
			dignity: data.dignity || review?.dignity,
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
	const username = watch('username')
	// const email = watch('email')

	if (!review) return null

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
			<div className='flex items-center justify-between'>
				<div className='w-full'>
					<Label htmlFor='name'>Имя:</Label>
					{isEditing.name ? (
						<Input
							id='name'
							placeholder='Ваше имя (необязательно)'
							{...register('username')}
							autoFocus
							onBlur={() => setIsEditing(prev => ({ ...prev, name: false }))}
						/>
					) : (
						<p className='text-base'>
							{username}{' '}
							<button
								type='button'
								className='text-sm text-primary underline ml-2'
								onClick={() => setIsEditing(prev => ({ ...prev, name: true }))}
							>
								Редактировать
							</button>
						</p>
					)}
					{errors.username && (
						<p className='text-sm text-red-600'>{errors.username.message}</p>
					)}
				</div>
			</div>

			{/* <div className='flex items-center justify-between'>
				<div className='w-full'>
					<Label htmlFor='email'>Email:</Label>
					{isEditing.email ? (
						<Input
							id='email'
							placeholder='Ваш email (необязательно)'
							{...register('email')}
							autoFocus
							onBlur={() => setIsEditing(prev => ({ ...prev, email: false }))}
						/>
					) : (
						<p className='text-base'>
							{email}{' '}
							<button
								type='button'
								className='text-sm text-primary underline ml-2'
								onClick={() => setIsEditing(prev => ({ ...prev, email: true }))}
							>
								Редактировать
							</button>
						</p>
					)}
					{errors.email && (
						<p className='text-sm text-red-600'>{errors.email.message}</p>
					)}
				</div>
			</div> */}

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
					<Label htmlFor='dignity'>Достоинства:</Label>

					<Textarea
						id='dignity'
						placeholder='Напишите достоинства продукта (необязательно)'
						{...register('dignity')}
						className='w-full flex-1 resize-none border-primary'
					/>

					{errors.email && (
						<p className='text-sm text-red-600'>{errors.email.message}</p>
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

					{errors.email && (
						<p className='text-sm text-red-600'>{errors.email.message}</p>
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

					{errors.email && (
						<p className='text-sm text-red-600'>{errors.email.message}</p>
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
