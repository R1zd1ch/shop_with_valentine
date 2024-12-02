import { z } from 'zod'

const reviewSchema = z.object({
	name: z.string().min(2, 'Имя должно содержать не менее 2 символов'),
	text: z
		.string()
		.min(10, 'Отзыв должен содержать не менее 10 символов')
		.max(200, 'Отзыв не должен превышать 200 символов'),
})

export default reviewSchema
