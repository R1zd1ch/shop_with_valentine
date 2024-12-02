import { z } from 'zod'

export const signUpSchema = z
	.object({
		username: z
			.string()
			.min(1, { message: 'Имя не может быть коротким' })
			.max(50, { message: 'Имя не может быть длинным' }),
		email: z
			.string()
			.min(1, { message: 'Почта не может быть короткой' })
			.email({ message: 'Почта не верна' }),
		password: z
			.string()
			.min(1, { message: 'Пароль не может быть коротким' })
			.min(8, { message: 'Пароль должен содержать не менее 8 символов' }),
		passwordConfirm: z
			.string()
			.min(1, { message: 'Пароль не может быть коротким' }),
	})
	.refine(data => data.password === data.passwordConfirm, {
		message: 'Пароли не совпадают',
		path: ['passwordConfirm'],
	})
