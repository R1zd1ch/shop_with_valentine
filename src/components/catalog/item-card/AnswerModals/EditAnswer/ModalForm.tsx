import React, { useEffect } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import updateAnswerSchema from '@/zod/updateAnswer'
import { useToast } from '@/hooks/use-toast'
import { useQuestionStore } from '@/storage/UseReviewsAndQuestionsStore'
import { CardTitle } from '@/components/ui/card'

type UpdateAnswerFormData = z.infer<typeof updateAnswerSchema>

interface EditAnswerModalProps {
	answerId: number
	onClose: () => void
}

const EditAnswerModal: React.FC<EditAnswerModalProps> = ({
	answerId,
	onClose,
}) => {
	const { toast } = useToast()
	const { getAnswersByQuestionId, editAnswer } = useQuestionStore()
	const answers = getAnswersByQuestionId(answerId)
	const answer = answers.find(a => a.id === answerId)

	const userName = 'Alyosha'

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UpdateAnswerFormData>({
		resolver: zodResolver(updateAnswerSchema),
		defaultValues: {
			answer: answer?.answer || '',
		},
	})

	const onSubmit = (data: UpdateAnswerFormData) => {
		if (!answer) return

		editAnswer(answerId, {
			...answer,
			username: answer.username || userName,
			answer: data.answer || answer.answer,
		})

		toast({
			title: 'Ответ обновлён!',
			description: 'Ваш ответ был успешно обновлён.',
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

	if (!answer) return null

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
			<CardTitle>{answer.username || userName}</CardTitle>

			<div>
				<Label htmlFor='answer'>Ответ:</Label>
				<Textarea
					id='answer'
					placeholder='Введите текст ответа'
					{...register('answer')}
					className='w-full flex-1 resize-none border-primary'
				/>
				{errors.answer && (
					<p className='text-sm text-red-600'>{errors.answer.message}</p>
				)}
			</div>

			<Button type='submit' className='w-full'>
				Сохранить
			</Button>
		</form>
	)
}

export default EditAnswerModal
