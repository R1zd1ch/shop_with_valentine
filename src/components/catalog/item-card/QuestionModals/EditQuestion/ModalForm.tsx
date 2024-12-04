import React, { useEffect } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import updateQuestionSchema from '@/zod/updateQuestion'
import { useToast } from '@/hooks/use-toast'
import { useQuestionStore } from '@/storage/UseReviewsAndQuestionsStore'
import { CardTitle } from '@/components/ui/card'

type UpdateQuestionFormData = z.infer<typeof updateQuestionSchema>

interface EditQuestionModalProps {
	questionId: number
	onClose: () => void
}

const EditQuestionModal: React.FC<EditQuestionModalProps> = ({
	questionId,
	onClose,
}) => {
	const { toast } = useToast()
	const { getQuestionById, editQuestion } = useQuestionStore()
	const question = getQuestionById(questionId)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UpdateQuestionFormData>({
		resolver: zodResolver(updateQuestionSchema),
		defaultValues: {
			question: question?.question || '',
		},
	})

	const onSubmit = (data: UpdateQuestionFormData) => {
		if (!question) return

		editQuestion(questionId, {
			...question,
			username: question.username,
			question: data.question || question.question,
		})

		toast({
			title: 'Вопрос обновлён!',
			description: 'Ваш вопрос был успешно обновлён.',
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

	if (!question) return null

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
			<CardTitle>{question.username}</CardTitle>

			<div>
				<Label htmlFor='question'>Вопрос:</Label>
				<Textarea
					id='question'
					placeholder='Введите текст вопроса'
					{...register('question')}
					className='w-full flex-1 resize-none border-primary'
				/>
				{errors.question && (
					<p className='text-sm text-red-600'>{errors.question.message}</p>
				)}
			</div>

			<Button type='submit' className='w-full'>
				Сохранить
			</Button>
		</form>
	)
}

export default EditQuestionModal
