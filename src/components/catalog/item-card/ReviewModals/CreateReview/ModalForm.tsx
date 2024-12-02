import React, { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import createReviewSchema from '@/zod/createReview'
import { useToast } from '@/hooks/use-toast'
import { useReviewStore } from '@/storage/UseReviewsAndQuestionsStore'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

type ReviewFormData = z.infer<typeof createReviewSchema>

interface ModalFormProps {
	onClose: () => void
	productId: number
}

const ModalForm: React.FC<ModalFormProps> = ({ onClose, productId }) => {
	const { toast } = useToast()
	const { addReview } = useReviewStore()
	const [isEditing, setIsEditing] = useState<{ name: boolean; email: boolean }>(
		{
			name: false,
			email: false,
		}
	)

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
		watch,
		setValue,
	} = useForm<ReviewFormData>({
		resolver: zodResolver(createReviewSchema),
		defaultValues: {
			name: 'Алёшка',
			email: 'alyoha@govno.ru',
			dignity: '',
			flaws: '',
			review: '',
			rating: 5, // Начальный рейтинг
		},
	})

	const onSubmit = (data: ReviewFormData) => {
		const newReview = {
			id: Date.now(),
			productId: productId,
			userId: 123,
			username: data.name || 'Аноним',
			rating: data.rating, // Используем рейтинг из формы
			comment: data.review,
			date: new Date().toISOString(),
			dignity: data.dignity,
			flaws: data.flaws,
		}

		addReview(newReview)
		reset()
		onClose()
		toast({
			title: 'Отзыв отправлен!',
			description: 'Ваш отзыв был успешно отправлен. Спасибо!',
		})
	}
	React.useEffect(() => {
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

	const name = watch('name')
	// const email = watch('email')
	const rating = watch('rating') // Следим за изменением рейтинга

	return (
		<form onSubmit={handleSubmit(onSubmit)} className=''>
			<div className='flex items-center justify-between'>
				<div>
					<Label htmlFor='name'>Имя:</Label>
					{isEditing.name ? (
						<Input
							id='name'
							placeholder='Ваше имя (необязательно)'
							{...register('name')}
							autoFocus
							onBlur={() => setIsEditing(prev => ({ ...prev, name: false }))}
						/>
					) : (
						<p className='text-base'>
							{name}{' '}
							<button
								type='button'
								className='text-sm text-primary underline ml-2'
								onClick={() => setIsEditing(prev => ({ ...prev, name: true }))}
							>
								Редактировать
							</button>
						</p>
					)}
				</div>
			</div>

			{/* <div className='flex items-center justify-between'>
				<div>
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
				</div>
			</div> */}

			<div>
				<Label>Оценка:</Label>
				<Rating
					value={rating} // Связываем с полем формы
					onChange={(v: number) => setValue('rating', v)}
					style={{ maxWidth: 150 }}
				/>
			</div>

			<div>
				<Label htmlFor='dignity'>Достоинства:</Label>
				<Textarea
					id='dignity'
					placeholder='Напишите достоинства продукта (необязательно)'
					{...register('dignity')}
					className='w-full flex-1 resize-none border-primary'
				/>
			</div>

			<div>
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

			<div>
				<Label htmlFor='review'>Комментарий:</Label>
				<Textarea
					id='review'
					placeholder='Ваше мнение о продукте'
					{...register('review')}
					className='w-full flex-1 resize-none border-primary'
				/>
			</div>

			<Button type='submit' className='w-full mt-3'>
				Отправить
			</Button>
		</form>
	)
}

export default ModalForm
