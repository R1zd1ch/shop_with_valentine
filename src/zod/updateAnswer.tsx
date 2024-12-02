import { z } from 'zod'

const updateAnswerSchema = z.object({
	id: z.number().optional(), // ID может быть опциональным, так как иногда его можно передавать отдельно
	productId: z.number().optional(),
	userId: z.number().optional(),
	username: z.string().optional(),
	email: z.string().optional(),
	answer: z.string().min(5, 'Ответ должен быть минимум 5 символов').optional(),
})

export default updateAnswerSchema
