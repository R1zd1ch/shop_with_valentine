import { create } from 'zustand'

export interface Favorite {
	id: number
	userId: number
	productId: number
}

interface FavouritesState {
	favourites: Favorite[]
	addFavourite: (favourite: Favorite) => void
	removeFavourite: (favouriteId: number) => void
	setFavourites: (favourites: Favorite[]) => void
	isFavourite: (favouriteId: number) => boolean
	removeFavouriteByUserAndProduct: (userId: number, productId: number) => void
	isFavouriteByUserAndProduct: (userId: number, productId: number) => boolean
}

const useFavouritesStore = create<FavouritesState>((set, get) => ({
	favourites: [],

	addFavourite: (favourite: Favorite) => {
		set(state => ({
			favourites: [...state.favourites, favourite],
		}))
	},

	removeFavourite: (favouriteId: number) => {
		set(state => ({
			favourites: state.favourites.filter(
				favourite => favourite.id !== favouriteId
			),
		}))
	},

	setFavourites: (favourites: Favorite[]) => {
		set({ favourites })
	},

	isFavourite: (favouriteId: number) => {
		return !!get().favourites.find(favourite => favourite.id === favouriteId)
	},

	isFavouriteByUserAndProduct: (userId: number, productId: number) => {
		return !!get().favourites.find(
			favourite =>
				favourite.userId === userId && favourite.productId === productId
		)
	},
	removeFavouriteByUserAndProduct: (userId: number, productId: number) => {
		set(state => ({
			favourites: state.favourites.filter(
				favourite =>
					!(favourite.userId === userId && favourite.productId === productId)
			),
		}))
	},
}))

export default useFavouritesStore
