import * as z from 'zod'

export const categorySchema = z.enum([
	'macbook',
	'iphone',
	'accessories',
	'ipad',
	'watch',
	'airpods',
	'all',
])

const baseProductSchema = z.object({
	name: z.string().min(1, 'Название товара обязательно'),
	description: z.string().min(10, 'Описание должно быть не менее 10 символов'),
	price: z
		.number()
		.positive('Цена должна быть положительным числом')
		.min(0, { message: 'Цена не может быть отрицательной' })
		.max(1000000, { message: 'Цена не может быть больше 1000000' }),
	oldPrice: z
		.number()
		.positive('Старая цена должна быть положительным числом')
		.max(1000000, { message: 'Старая цена не может быть больше 1000000' })
		.optional(),
	stockQuantity: z
		.number()
		.int('Количество должно быть целым числом')
		.min(0, 'Количество не может быть отрицательным'),
	category: categorySchema,
	attributes: z.object({
		requirements: z.record(z.union([z.string(), z.number()])),
		others: z.array(
			z.object({
				id: z.string(), // Уникальный идентификатор
				key: z.string().min(1, 'Ключ обязателен'), // Ключ атрибута
				value: z.union([z.string(), z.number()]).optional(), // Значение атрибута
			})
		),
	}),
	img: z.array(z.string()).min(1, 'Хотя бы одно изображение обязательно'),
})

export const productSchema = baseProductSchema

export type ProductFormValues = z.infer<typeof productSchema>

export type Category = z.infer<typeof categorySchema>

export const dataCategoryMain = [
	{ id: 1, name: 'Macbooks', value: 'macbook' as const },
	{ id: 2, name: 'Iphones', value: 'iphone' as const },
	{ id: 3, name: 'Accessories', value: 'accessories' as const },
	{ id: 5, name: 'Ipads', value: 'ipad' as const },
	{ id: 6, name: 'AppleWatch', value: 'watch' as const },
	{ id: 7, name: 'AirPods', value: 'airpods' as const },
	{ id: 8, name: 'All', value: 'all' as const },
]

export const attributeFields: Record<Category, string[]> = {
	macbook: ['model', 'year', 'processor', 'ram', 'storage', 'color'],
	iphone: ['model', 'year', 'proccessor', 'ram', 'storage', 'color'],
	ipad: [
		'model',
		'year',
		'proccessor',
		'ram',
		'storage',
		'color',
		'connectivity',
	],
	watch: ['model', 'size', 'color', 'connectivity'],
	airpods: ['model', 'color'],
	accessories: ['type', 'compatibility', 'color'],
	all: [],
}
