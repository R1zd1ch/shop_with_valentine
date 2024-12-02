import { create } from 'zustand'

export interface Product {
	id: number
	name: string
	description: string
	price: number
	stock: number
	category: string
	color: string
	memory: string
	compatibility: string
	img: string[] | string
}

interface ProductState {
	products: Product[]
	isLoading: boolean
	error: string | null
	fetchProducts: () => void
	getProductById: (id: number) => Product
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
		],
	},
	// Добавьте остальные товары по аналогии
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
}))

export default useProductStore
