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
	const content = getQuestionById(questionId)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UpdateQuestionFormData>({
		resolver: zodResolver(updateQuestionSchema),
		defaultValues: {
			content: content?.content || '',
		},
	})

	const onSubmit = (data: UpdateQuestionFormData) => {
		if (!content) return

		editQuestion(questionId, {
			...content,
			username: content.username,
			content: data.content || content.content,
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

	if (!content) return null

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
			<CardTitle>{content.username}</CardTitle>

			<div>
				<Label htmlFor='content'>Вопрос:</Label>
				<Textarea
					id='content'
					placeholder='Введите текст вопроса'
					{...register('content')}
					className='w-full flex-1 resize-none border-primary'
				/>
				{errors.content && (
					<p className='text-sm text-red-600'>{errors.content.message}</p>
				)}
			</div>

			<Button type='submit' className='w-full'>
				Сохранить
			</Button>
		</form>
	)
}

export default EditQuestionModal
