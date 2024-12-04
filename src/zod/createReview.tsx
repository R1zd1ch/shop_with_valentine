import { z } from 'zod'

const createReviewSchema = z.object({
	username: z.string().optional(),
	dignities: z.string().optional(),
	flaws: z.string().optional(),
	rating: z
		.number()
		.min(1, 'Рейтинг должен быть от 1 до 5')
		.max(5, 'Рейтинг должен быть от 1 до 5'),
	review: z.string().min(5, 'Отзыв должен содержать минимум 5 символов'),
})

export default createReviewSchema
