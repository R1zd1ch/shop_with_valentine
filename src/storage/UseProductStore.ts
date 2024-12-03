import { create } from 'zustand'

export interface Product {
	id: number
	name: string
	description: string
	price: number
	discountPrice?: number
	stock: number
	category: string
	color: string
	memory: string
	compatibility: string
	img: string[] | string
	orderCount?: number // Добавлено поле orderCount
}

interface ProductState {
	products: Product[]
	isLoading: boolean
	error: string | null
	fetchProducts: () => void
	getProductById: (id: number) => Product
	getPopularProducts: (count: number) => Product[]
}

const MOCK_PRODUCTS: Product[] = [
	{
		id: 1,
		name: 'iPhone 15 Pro Max',
		description: 'Флагманский смартфон Apple с чипом A17 Bionic.',
		price: 129990,
		stock: 25,
		category: 'iphone',
		color: 'black',
		memory: '256gb',
		compatibility: 'ios',
		img: [
			'https://via.placeholder.com/600x300',
			'https://via.placeholder.com/600x500',
			'https://via.placeholder.com/600x400',
		],
		orderCount: 5, // Пример значения
	},
	{
		id: 2,
		name: 'MacBook Pro 14" M2',
		description: 'Мощный ноутбук для профессионалов с чипом M2.',
		price: 199990,
		stock: 10,
		category: 'macbook',
		color: 'silver',
		memory: '1tb',
		compatibility: 'macos',
		img: 'https://via.placeholder.com/600x400',
	},
	{
		id: 3,
		name: 'Apple Watch Series 9',
		description: 'Продвинутые умные часы с функциями здоровья и фитнеса.',
		price: 45990,
		stock: 50,
		category: 'watch',
		color: 'gold',
		memory: '64gb',
		compatibility: 'watchos',
		img: [
			'https://via.placeholder.com/600x400',
			'https://via.placeholder.com/600x400',
			'https://via.placeholder.com/600x400',
			'https://via.placeholder.com/600x400',
			'https://via.placeholder.com/600x400',
			'https://via.placeholder.com/600x400',
			'https://via.placeholder.com/600x400',
			'https://via.placeholder.com/600x400',
			'https://via.placeholder.com/600x400',
			'https://via.placeholder.com/600x400',
		],
		orderCount: 10,
	},
	{
		id: 4,
		name: 'AirPods Pro',
		description: 'Беспроводные наушники с высоким качеством звука.',
		price: 12990,
		discountPrice: 9990,
		stock: 100,
		category: 'airpods',
		color: 'white',
		memory: '1gb',
		img: [
			'https://via.placeholder.com/600x400',
			'https://via.placeholder.com/600x400',
		],
		compatibility: 'ios',
	},
	{
		id: 5,
		name: 'iPad Pro 11" M2',
		description: 'Мощный ноутбук для профессионалов с чипом M2.',
		price: 99990,
		discountPrice: 89990,
		stock: 5,
		category: 'ipad',
		color: 'silver',
		memory: '1tb',
		compatibility: 'macos',
		img: 'https://via.placeholder.com/600x400',
	},
	{
		id: 6,
		name: 'iPhone 15 Pro Max',
		description: 'Флагманский смартфон Apple с чипом A17 Bionic.',
		price: 129990,
		discountPrice: 119990,
		stock: 25,
		category: 'iphone',
		color: 'black',
		memory: '256gb',
		compatibility: 'ios',
		img: [
			'https://via.placeholder.com/600x300',
			'https://via.placeholder.com/600x500',
			'https://via.placeholder.com/600x400',
		],
	},
	{
		id: 7,
		name: 'MacBook Pro 14" M2',
		description: 'Мощный ноутбук для профессионалов с чипом M2.',
		price: 199990,
		discountPrice: 169990,
		stock: 10,
		category: 'macbook',
		color: 'silver',
		memory: '1tb',
		compatibility: 'macos',
		img: 'https://via.placeholder.com/600x400',
	},
]

const useProductStore = create<ProductState>(set => ({
	products: [],
	isLoading: false,
	error: null,

	fetchProducts: () => {
		set({ isLoading: true, error: null })
		setTimeout(() => {
			// Заглушка данных
			set({ products: MOCK_PRODUCTS, isLoading: false })
		}, 1000) // Эмуляция задержки
	},

	getProductById: (id: number): Product => {
		return MOCK_PRODUCTS.find(product => product.id === id) ?? ({} as Product)
	},

	getPopularProducts: (count: number) => {
		return MOCK_PRODUCTS.filter(product => product.orderCount !== undefined)
			.sort((a, b) => b.orderCount! - a.orderCount!)
			.slice(0, Math.min(count, MOCK_PRODUCTS.length))
	},
}))

export default useProductStore
