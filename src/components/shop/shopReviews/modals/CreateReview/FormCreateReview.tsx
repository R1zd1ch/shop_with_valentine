import React from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { useReviewsStore } from '@/storage/UseStoreReviews'
import reviewSchema from '@/zod/createReviewShop'
import { CardTitle } from '@/components/ui/card'

type ReviewFormData = z.infer<typeof reviewSchema>

const FormCreateReview = ({
	setOpen,
}: {
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
	const { addReview } = useReviewsStore()
	const { toast } = useToast()

	const userName = 'Алёшка'

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ReviewFormData>({
		resolver: zodResolver(reviewSchema),
	})

	const onSubmit = (data: ReviewFormData) => {
		console.log(1, userName, data.content)
		addReview(1, userName, data.content)

		toast({
			title: 'Успех',
			description: 'Ваш отзыв успешно добавлен!',
		})
		setOpen(false)
		reset()
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
			<div className='flex flex-row gap-1 items-end'>
				<p className='text-sm text-muted-foreground'>Имя:</p>
				<CardTitle className='text-xl font-normal'>{userName}</CardTitle>
			</div>
			<div>
				<Label htmlFor='text' className='text-muted-foreground'>
					Отзыв:
				</Label>
				<Textarea
					id='text'
					placeholder='Напишите ваш отзыв'
					{...register('content')}
					className='mt-1 resize-none'
					rows={6}
				/>
				{errors.content && (
					<p className='text-red-500 text-sm mt-1'>{errors.content.message}</p>
				)}
			</div>
			<div className='w-full flex flex-row justify-end'>
				<Button type='submit'>Отправить</Button>
			</div>
		</form>
	)
}

export default FormCreateReview
