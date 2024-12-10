import React from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import createReviewSchema from '@/zod/createReview'
import { useToast } from '@/hooks/use-toast'
import { useReviewStore } from '@/storage/UseReviewsAndQuestionsStore'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { CardTitle } from '@/components/ui/card'

type ReviewFormData = z.infer<typeof createReviewSchema>

interface ModalFormProps {
	onClose: () => void
	productId: number
}

const ModalForm: React.FC<ModalFormProps> = ({ onClose, productId }) => {
	const { toast } = useToast()
	const { addReview } = useReviewStore()
	const userName = 'Alyosha'

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
			dignities: '',
			flaws: '',
			review: '',
			rating: 5,
		},
	})

	const onSubmit = (data: ReviewFormData) => {
		const newReview = {
			id: Date.now(),
			productId: productId,
			userId: 123,
			username: data.username || userName,
			rating: data.rating, // Используем рейтинг из формы
			comment: data.review,
			date: new Date().toISOString(),
			dignities: data.dignities,
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

	const rating = watch('rating')

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
			<CardTitle>{userName}</CardTitle>
			<div>
				<Label>Оценка:</Label>
				<Rating
					value={rating} // Связываем с полем формы
					onChange={(v: number) => setValue('rating', v)}
					style={{ maxWidth: 150 }}
				/>
			</div>

			<div>
				<Label htmlFor='dignities'>Достоинства:</Label>
				<Textarea
					id='dignities'
					placeholder='Напишите достоинства продукта (необязательно)'
					{...register('dignities')}
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
