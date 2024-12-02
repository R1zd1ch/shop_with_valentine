import { z } from 'zod'

const createAnswerSchema = z.object({
	username: z.string().min(1, 'Имя обязательно'),
	answer: z.string().min(5, 'Ответ должен быть минимум 5 символов'),
})

export default createAnswerSchema
