import { z } from 'zod'

const updateQuestionSchema = z.object({
	username: z
		.string()
		.max(50, 'Имя не должно превышать 50 символов')
		.transform(value => value.trim())
		.optional(),
	question: z
		.string()
		.min(1, 'Текст вопроса обязателен')
		.max(500, 'Текст вопроса не должен превышать 500 символов')
		.transform(value => value.trim()),
})

export default updateQuestionSchema
