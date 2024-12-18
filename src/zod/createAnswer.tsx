import { z } from 'zod'

const createAnswerSchema = z.object({
	content: z.string().min(5, 'Ответ должен быть минимум 5 символов'),
})

export default createAnswerSchema
