/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { useQuestionStore } from '@/storage/UseReviewsAndQuestionsStore'
import createAnswerSchema from '@/zod/createAnswer'

type AnswerFormData = z.infer<typeof createAnswerSchema>

interface AnswerFormProps {
	onClose: () => void
	questionId: number
}

const AnswerForm: React.FC<AnswerFormProps> = ({ onClose, questionId }) => {
	const { toast } = useToast()
	const { answerQuestion } = useQuestionStore()

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<AnswerFormData>({
		resolver: zodResolver(createAnswerSchema),
		defaultValues: {
			username: 'Аноним',
			answer: '',
		},
	})

	const onSubmit = (data: AnswerFormData) => {
		const newAnswer = {
			id: Date.now(),
			userId: Date.now(),
			username: data.username || 'Аноним',
			answer: data.answer,
			date: new Date().toISOString(),
		}

		try {
			answerQuestion(questionId, newAnswer)
			reset()
			onClose()
			toast({
				title: 'Ответ отправлен!',
				description: 'Ваш ответ был успешно добавлен.',
			})
		} catch (error: any) {
			toast({
				title: 'Ошибка',
				description: `Не удалось добавить ответ. Попробуйте снова. ${error.message}`,
				variant: 'destructive',
			})
		}
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

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
			<div>
				<Label htmlFor='username'>Имя:</Label>
				<Input
					id='username'
					placeholder='Ваше имя'
					{...register('username')}
					className='w-full'
				/>
			</div>

			<div>
				<Label htmlFor='answer'>Ваш ответ:</Label>
				<Textarea
					id='answer'
					placeholder='Введите ваш ответ'
					{...register('answer')}
					className='w-full resize-none'
				/>
			</div>

			<Button type='submit' className='w-full'>
				Отправить ответ
			</Button>
		</form>
	)
}

export default AnswerForm
