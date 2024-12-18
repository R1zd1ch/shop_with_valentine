import { z } from 'zod'

const createQuestionSchema = z.object({
	name: z.string().optional(),
	email: z.string().optional(),
	content: z.string().min(5, 'Вопрос должен содержать минимум 5 символов'),
})

export default createQuestionSchema
