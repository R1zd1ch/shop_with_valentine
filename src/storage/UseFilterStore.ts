import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface CategoryForMain {
	id: number
	name: string
	value: string
}

const dataCategoryMain: CategoryForMain[] = [
	{
		id: 1,
		name: 'Macbooks',
		value: 'macbook',
	},
	{
		id: 2,
		name: 'Iphones',
		value: 'iphone',
	},
	{
		id: 3,
		name: 'Accessories',
		value: 'accessories',
	},
	{
		id: 5,
		name: 'Ipads',
		value: 'ipad',
	},
	{
		id: 6,
		name: 'AppleWatch',
		value: 'watch',
	},
	{
		id: 7,
		name: 'AirPods',
		value: 'airpods',
	},
	{
		id: 8,
		name: 'All',
		value: 'all',
	},
]

interface FilterState {
	searchTerm: string
	category: string
	priceRange: [number, number]
	color: string
	memory: string
	availability: 'all' | 'inStock' | 'preOrder'
	compatibility: string
	isDiscount: boolean | null
	categoryMain: CategoryForMain[]

	setCategory: (category: string) => void
	setPriceRange: (priceRange: [number, number]) => void
	setColor: (color: string) => void
	setMemory: (memory: string) => void
	setAvailability: (availability: 'all' | 'inStock' | 'preOrder') => void
	setCompatibility: (compatibility: string) => void
	setSearchTerm: (searchTerm: string) => void
	setIsDiscount: (isDiscount: boolean | null) => void
	resetAll: () => void
}

const initialState: Omit<
	FilterState,
	| 'setCategory'
	| 'setPriceRange'
	| 'setColor'
	| 'setMemory'
	| 'setAvailability'
	| 'setCompatibility'
	| 'setSearchTerm'
	| 'setIsDiscount'
	| 'resetAll'
> = {
	searchTerm: '',
	category: 'all',
	priceRange: [0, 500000],
	color: 'all',
	memory: 'all',
	availability: 'all',
	compatibility: 'all',
	categoryMain: dataCategoryMain,
	isDiscount: null,
}

const useFilterStore = create<FilterState>()(
	devtools(
		set => ({
			...initialState,

			setCategory: category => set(() => ({ category })),
			setPriceRange: priceRange => set(() => ({ priceRange })),
			setColor: color => set(() => ({ color })),
			setMemory: memory => set(() => ({ memory })),
			setAvailability: availability => set(() => ({ availability })),
			setCompatibility: compatibility => set(() => ({ compatibility })),
			setSearchTerm: searchTerm => set(() => ({ searchTerm })),
			setIsDiscount: isDiscount => set(() => ({ isDiscount })),
			resetAll: () => set(() => ({ ...initialState })),
		}),
		{ name: 'FilterStore' } // имя для отображения в devtools
	)
)

export default useFilterStore
