import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface FilterState {
	searchTerm: string
	category: string
	priceRange: [number, number]
	color: string
	memory: string
	availability: 'all' | 'inStock' | 'preOrder'
	compatibility: string

	setCategory: (category: string) => void
	setPriceRange: (priceRange: [number, number]) => void
	setColor: (color: string) => void
	setMemory: (memory: string) => void
	setAvailability: (availability: 'all' | 'inStock' | 'preOrder') => void
	setCompatibility: (compatibility: string) => void
	setSearchTerm: (searchTerm: string) => void
}

const useFilterStore = create<FilterState>()(
	devtools(
		set => ({
			searchTerm: '',
			category: 'all',
			priceRange: [0, 500000],
			color: 'all',
			memory: 'all',
			availability: 'all',
			compatibility: 'all',

			setCategory: category => set({ category }),
			setPriceRange: priceRange => set({ priceRange }),
			setColor: color => set({ color }),
			setMemory: memory => set({ memory }),
			setAvailability: availability => set({ availability }),
			setCompatibility: compatibility => set({ compatibility }),
			setSearchTerm: searchTerm => set({ searchTerm }),
		}),
		{ name: 'FilterStore' } // имя для отображения в devtools
	)
)

export default useFilterStore
