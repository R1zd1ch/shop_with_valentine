import { create } from 'zustand'

export interface Product {
	id: number
	name: string
	description: string
	price: number
	oldPrice?: number
	stockQuantity: number
	category: string
	attributes: {
		requirements: {
			[key: string]: string | number
		}
		others: {
			[key: string]: string | number
		}
	}
	img: string[] | string
	orderCount?: number
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
		oldPrice: 139990,
		stockQuantity: 25,
		category: 'iphone',
		attributes: {
			color: 'black',
			memory: '256gb',
			compatibility: 'ios',
		},
		img: [
			'https://via.placeholder.com/600x300',
			'https://via.placeholder.com/600x500',
			'https://via.placeholder.com/600x400',
		],
		orderCount: 5,
	},
	{
		id: 2,
		name: 'MacBook Pro 14" M2',
		description: 'Мощный ноутбук для профессионалов с чипом M2.',
		price: 199990,
		oldPrice: 229990,
		stockQuantity: 10,
		category: 'macbook',
		attributes: {
			color: 'silver',
			memory: '1tb',
			compatibility: 'macos',
		},
		img: 'https://via.placeholder.com/600x400',
	},
	{
		id: 3,
		name: 'Apple Watch Series 9',
		description: 'Продвинутые умные часы с функциями здоровья и фитнеса.',
		price: 45990,
		stockQuantity: 50,
		category: 'watch',
		attributes: {
			color: 'gold',
			memory: '64gb',
			compatibility: 'watchos',
		},
		img: [
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
		oldPrice: 14990,
		stockQuantity: 100,
		category: 'airpods',
		attributes: {
			color: 'white',
			memory: '1gb',
			compatibility: 'ios',
		},
		img: [
			'https://via.placeholder.com/600x400',
			'https://via.placeholder.com/600x400',
		],
	},
	{
		id: 5,
		name: 'iPad Pro 11" M2',
		description: 'Мощный планшет с чипом M2 для профессионалов.',
		price: 99990,
		oldPrice: 119990,
		stockQuantity: 5,
		category: 'ipad',
		attributes: {
			color: 'silver',
			memory: '1tb',
			compatibility: 'macos',
		},
		img: 'https://via.placeholder.com/600x400',
	},
	{
		id: 6,
		name: 'MacBook Air 13" M2',
		description: 'Тонкий и легкий ноутбук для повседневных задач.',
		price: 119990,
		oldPrice: 129990,
		stockQuantity: 15,
		category: 'macbook',
		attributes: {
			color: 'gray',
			memory: '512gb',
			compatibility: 'macos',
		},
		img: 'https://via.placeholder.com/600x400',
	},
]

const useProductStore = create<ProductState>((set, get) => ({
	products: [],
	isLoading: false,
	error: null,

	fetchProducts: async () => {
		// set({ isLoading: true, error: null })
		// setTimeout(() => {
		// 	set({ products: MOCK_PRODUCTS, isLoading: false })
		// }, 1000)
		set({ isLoading: true, error: null })
		try {
			const res = await fetch('/api/products/getAllProducts')
			const data = await res.json()
			setTimeout(() => {
				set({ products: data, isLoading: false })
			}, 1000)
			console.log(data)
		} catch (error) {
			set({ error: (error as Error).message, isLoading: false })
		}
	},

	getProductById: (id: number): Product => {
		return get().products.find(product => product.id === id) ?? ({} as Product)
	},

	getPopularProducts: (count: number) => {
		return MOCK_PRODUCTS.filter(product => product.orderCount !== undefined)
			.sort((a, b) => b.orderCount! - a.orderCount!)
			.slice(0, Math.min(count, MOCK_PRODUCTS.length))
	},
}))

export default useProductStore
