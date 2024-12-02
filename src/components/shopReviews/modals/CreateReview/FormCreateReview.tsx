import React from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { useReviewsStore } from '@/storage/UseStoreReviews'
import reviewSchema from '@/zod/createReviewShop'

type ReviewFormData = z.infer<typeof reviewSchema>

const FormCreateReview = ({
	setOpen,
}: {
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
	const {
		addReview,
		//  fetchReviews
	} = useReviewsStore()
	const { toast } = useToast()

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ReviewFormData>({
		resolver: zodResolver(reviewSchema),
	})

	const onSubmit = (data: ReviewFormData) => {
		addReview(1, data.name, data.text)

		toast({
			title: 'Успех',
			description: 'Ваш отзыв успешно добавлен!',
		})
		setOpen(false)
		reset()
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
			<div>
				<Label htmlFor='name'>Имя</Label>
				<Input
					id='name'
					placeholder='Ваше имя'
					{...register('name')}
					className='mt-1'
				/>
				{errors.name && (
					<p className='text-red-500 text-sm mt-1'>{errors.name.message}</p>
				)}
			</div>
			<div>
				<Label htmlFor='text'>Отзыв</Label>
				<Textarea
					id='text'
					placeholder='Напишите ваш отзыв'
					{...register('text')}
					className='mt-1 resize-none'
					rows={6}
				/>
				{errors.text && (
					<p className='text-red-500 text-sm mt-1'>{errors.text.message}</p>
				)}
			</div>
			<div className='w-full flex flex-row justify-end'>
				<Button type='submit'>Отправить</Button>
			</div>
		</form>
	)
}

export default FormCreateReview
