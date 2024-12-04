import { z } from 'zod'

const createAnswerSchema = z.object({
	answer: z.string().min(5, 'Ответ должен быть минимум 5 символов'),
})

export default createAnswerSchema
