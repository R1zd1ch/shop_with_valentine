import { create } from 'zustand'

// Тип данных для ответа администратора
type AdminResponse = {
	id: number
	userId: number
	name: string
	response: string
	createdAt: string
}

// Тип данных для отзыва
export type Review = {
	id: number
	userId: number
	name: string
	text: string
	createdAt: string
	adminResponse: AdminResponse[] | null
}

const MockReviews: Review[] = [
	{
		id: 1,
		userId: 1,
		name: 'John Doe',
		text: 'This is another sample review. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus ratione repellendus neque fugit esse deleniti! Assumenda, laborum inventore nesciunt deleniti, perspiciatis et architecto minus amet pariatur, a ullam autem illo!',
		createdAt: '2022-01-01T00:00:00.000Z',
		adminResponse: [
			{
				id: 1,
				userId: 1,
				name: 'John Doe',
				response: 'This is a sample response.',
				createdAt: '2022-01-01T00:00:00.000Z',
			},
			{
				id: 2,
				userId: 1,
				name: 'John Doe',
				response: 'This is another sample response.',
				createdAt: '2022-01-01T00:00:00.000Z',
			},
		],
	},
	{
		id: 2,
		userId: 2,
		name: 'Jane Doe',
		text: 'This is another sample review. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus ratione repellendus neque fugit esse deleniti! Assumenda, laborum inventore nesciunt deleniti, perspiciatis et architecto minus amet pariatur, a ullam autem illo!',
		createdAt: '2022-01-02T00:00:00.000Z',
		adminResponse: null,
	},
	{
		id: 3,
		userId: 3,
		name: 'Bob Smith',
		text: 'This is yet another sample review.',
		createdAt: '2022-01-03T00:00:00.000Z',
		adminResponse: null,
	},
	{
		id: 4,
		userId: 4,
		name: 'Alice Johnson',
		text: 'This is the final sample review.',
		createdAt: '2022-01-05T00:00:00.000Z',
		adminResponse: [
			{
				id: 1,
				userId: 1,
				name: 'John Doe',
				response: 'This is a sample response.',
				createdAt: '2022-01-01T00:00:00.000Z',
			},
		],
	},
	{
		id: 5,
		userId: 5,
		name: 'Charlie Brown',
		text: 'This is the last sample review.',
		createdAt: '2022-01-05T00:00:00.000Z',
		adminResponse: null,
	},
]

// Тип состояния Store
type ReviewsState = {
	reviews: Review[]
	isLoading: boolean
	error: string | null
	addReview: (userId: number, name: string, text: string) => void
	deleteReview: (id: number) => void
	editReview: (id: number, name: string, text: string) => void
	getReviewById: (id: number) => Review | undefined
	getReviews: () => Review[]
	addAdminResponse: (id: number, response: AdminResponse) => void
	deleteAdminResponse: (id: number, responseId: number) => void
	editAdminResponse: (id: number, responseId: number, response: string) => void
	getAdminResponseById: (
		id: number,
		responseId: number
	) => AdminResponse | undefined
	getAdminResponsesByReviewId: (id: number) => AdminResponse[]
	fetchReviews: () => void
}

// Создание Store
const useReviewsStore = create<ReviewsState>((set, get) => ({
	reviews: [],
	isLoading: false,
	error: null,

	addReview: (userId, name, text) =>
		set(state => ({
			reviews: [
				...state.reviews,
				{
					id: state.reviews.length + 1,
					userId,
					name,
					text,
					createdAt: new Date().toISOString(),
					adminResponse: null,
				},
			],
		})),

	fetchReviews: () => {
		set({ isLoading: true, error: null })
		setTimeout(() => {
			// Заглушка данных
			set({ reviews: MockReviews, isLoading: false })
		})
	},

	deleteReview: id =>
		set(state => ({
			reviews: state.reviews.filter(review => review.id !== id),
		})),

	editReview: (id, name, text) =>
		set(state => ({
			reviews: state.reviews.map(review =>
				review.id === id ? { ...review, name, text } : review
			),
		})),

	getReviewById: id => {
		return get().reviews.find(review => review.id === id)
	},

	getReviews: () => get().reviews,

	addAdminResponse: (id, response) =>
		set(state => ({
			reviews: state.reviews.map(review =>
				review.id === id
					? {
							...review,
							adminResponse: [...(review.adminResponse || []), response],
					  }
					: review
			),
		})),

	editAdminResponse: (id, responseId, response) =>
		set(state => ({
			reviews: state.reviews.map(review =>
				review.id === id
					? {
							...review,
							adminResponse: review.adminResponse
								? review.adminResponse.map(res =>
										res.id === responseId ? { ...res, response } : res
								  )
								: [],
					  }
					: review
			),
		})),

	deleteAdminResponse: (id, responseId) =>
		set(state => ({
			reviews: state.reviews.map(review =>
				review.id === id
					? {
							...review,
							adminResponse: review.adminResponse
								? review.adminResponse.filter(res => res.id !== responseId)
								: [],
					  }
					: review
			),
		})),

	getAdminResponseById: (id, responseId) => {
		const review = get().reviews.find(review => review.id === id)
		return review?.adminResponse?.find(res => res.id === responseId)
	},

	getAdminResponsesByReviewId: id => {
		const review = get().reviews.find(review => review.id === id)
		return review?.adminResponse || []
	},
}))

type SortOption = {
	date: 'asc' | 'desc' | 'none'
	withResponse: 'asc' | 'desc' | 'none'
}

type SortReviewsState = {
	sortOption: SortOption
	setSortOption: (option: SortOption) => void
}

// Состояние для сортировки
const useSortReviewsStore = create<SortReviewsState>(set => ({
	sortOption: {
		date: 'none',
		withResponse: 'none',
	},
	setSortOption: option => set({ sortOption: option }),
}))

export { useReviewsStore, useSortReviewsStore }
