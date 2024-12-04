import { z } from 'zod'

const updateReviewSchema = z.object({
	id: z.number().optional(), // ID может быть опциональным, так как иногда его можно передавать отдельно
	productId: z.number().optional(),
	userId: z.number().optional(),
	rating: z
		.number()
		.min(1, 'Рейтинг не может быть меньше 1')
		.max(5, 'Рейтинг не может быть больше 5')
		.optional(),
	review: z
		.string()
		.min(5, 'Отзыв должен содержать минимум 5 символов')
		.optional(),
	dignities: z.string().optional(),
	flaws: z.string().optional(),
})

export default updateReviewSchema
