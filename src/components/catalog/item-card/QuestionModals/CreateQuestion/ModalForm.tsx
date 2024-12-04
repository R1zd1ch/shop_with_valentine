import React, { useEffect } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { useQuestionStore } from '@/storage/UseReviewsAndQuestionsStore' // Обновлено
import { CardTitle } from '@/components/ui/card'

// Схема валидации вопроса
const createQuestionSchema = z.object({
	question: z.string().min(10, 'Вопрос должен быть минимум 10 символов'),
})

type QuestionFormData = z.infer<typeof createQuestionSchema>

interface QuestionFormProps {
	onClose: () => void
	productId: number
}

const QuestionForm: React.FC<QuestionFormProps> = ({ onClose, productId }) => {
	const { toast } = useToast()
	const { addQuestion } = useQuestionStore()
	const userName = 'Alyosha'

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<QuestionFormData>({
		resolver: zodResolver(createQuestionSchema),
		defaultValues: {
			question: '',
		},
	})

	const onSubmit = (data: QuestionFormData) => {
		const newQuestion = {
			id: Date.now(),
			productId,
			userId: 123,
			username: userName,
			question: data.question,
			date: new Date().toISOString(),
			answers: [],
		}

		addQuestion(newQuestion)
		reset()
		onClose()
		toast({
			title: 'Вопрос отправлен!',
			description: 'Ваш вопрос был успешно отправлен. Спасибо!',
		})
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
			<CardTitle>{userName}</CardTitle>

			<div>
				<Label htmlFor='question'>Ваш вопрос:</Label>
				<Textarea
					id='question'
					placeholder='Введите ваш вопрос'
					{...register('question')}
					className='w-full resize-none'
				/>
			</div>

			<Button type='submit' className='w-full'>
				Задать вопрос
			</Button>
		</form>
	)
}

export default QuestionForm
