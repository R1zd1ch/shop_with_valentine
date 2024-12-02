import { z } from 'zod'

export const signInSchema = z.object({
	email: z
		.string()
		.email({ message: 'Неверный формат почты' })
		.min(5, {
			message: 'Почта не может быть такой короткой',
		})
		.trim(),
	password: z
		.string()
		.min(5, { message: 'Пароль слишком короткий' })
		.max(20, { message: 'Пароль слишком длинный' })
		.trim(),
})
