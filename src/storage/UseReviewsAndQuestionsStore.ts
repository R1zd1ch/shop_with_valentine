import { create } from 'zustand'

export interface Review {
	id: number
	productId: number
	userId: number
	username: string
	rating: number
	content: string
	date: string
	dignities?: string
	flaws?: string
}

export interface Answer {
	id: number
	userId: number
	username: string
	content: string
	date: string
}

export interface Question {
	id: number
	productId: number
	userId: number
	username: string
	content: string
	date: string
	answers?: Answer[]
}

const mockReviews: Review[] = [
	{
		id: 1,
		productId: 1,
		userId: 1,
		username: 'John Doe',
		rating: 5,
		content:
			'Great Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat exercitationem nam excepturi aliquid. Eveniet cupiditate nostrum, ab ipsa illum harum repellendus impedit tempore, excepturi qui voluptatem alias placeat provident sunt? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat exercitationem nam excepturi aliquid. Eveniet cupiditate nostrum, ab ipsa illum harum repellendus impedit tempore, excepturi qui voluptatem alias placeat provident sunt? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat exercitationem nam excepturi aliquid. Eveniet cupiditate nostrum, ab ipsa illum harum repellendus impedit tempore, excepturi qui voluptatem alias placeat provident sunt?',
		date: '2022-01-01',
		dignities:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat exercitationem nam excepturi aliquid. Eveniet cupiditate nostrum, ab ipsa illum harum repellendus impedit tempore, excepturi qui voluptatem alias placeat provident sunt?',
		flaws:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat exercitationem nam excepturi aliquid. Eveniet cupiditate nostrum, ab ipsa illum harum repellendus impedit tempore, excepturi qui voluptatem alias placeat provident sunt?',
	},
	{
		id: 12,
		productId: 1,
		userId: 1,
		username: 'John Doe',
		rating: 5,
		content:
			'Great Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat exercitationem nam excepturi aliquid. Eveniet cupiditate nostrum, ab ipsa illum harum repellendus impedit tempore, excepturi qui voluptatem alias placeat provident sunt?',
		date: '2022-01-01',
	},
	{
		id: 14,
		productId: 1,
		userId: 1,
		username: 'John Doe',
		rating: 5,
		content:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat exercitationem nam excepturi aliquid. Eveniet cupiditate nostrum, ab ipsa illum harum repellendus impedit tempore, excepturi qui voluptatem alias placeat provident sunt? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat exercitationem nam excepturi aliquid. Eveniet cupiditate nostrum, ab ipsa illum harum repellendus impedit tempore, excepturi qui voluptatem alias placeat provident sunt? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat exercitationem nam excepturi aliquid. Eveniet cupiditate nostrum, ab ipsa illum harum repellendus impedit tempore, excepturi qui voluptatem alias placeat provident sunt? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat exercitationem nam excepturi aliquid. Eveniet cupiditate nostrum, ab ipsa illum harum repellendus impedit tempore, excepturi qui voluptatem alias placeat provident sunt?',
		date: '2022-01-01',
	},
	{
		id: 20,
		productId: 1,
		userId: 1,
		username: 'John Doe',
		rating: 5,
		content:
			'Great product!FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFAAAAAAAAAAAAAAAAfdsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat exercitationem nam excepturi aliquid. Eveniet cupiditate nostrum, ab ipsa illum harum repellendus impedit tempore, excepturi qui voluptatem alias placeat provident sunt?',
		date: '2022-01-01',
	},
	{
		id: 10,
		productId: 1,
		userId: 1,
		username: 'John Doe',
		rating: 5,
		content:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat exercitationem nam excepturi aliquid. Eveniet cupiditate nostrum, ab ipsa illum harum repellendus impedit tempore, excepturi qui voluptatem alias placeat provident sunt?',
		date: '2022-01-01',
	},
	{
		id: 2,
		productId: 1,
		userId: 2,
		username: 'Jane Doe',
		rating: 4,
		content:
			'It works well Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat exercitationem nam excepturi aliquid. Eveniet cupiditate nostrum, ab ipsa illum harum repellendus impedit tempore, excepturi qui voluptatem alias placeat provident sunt?Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat exercitationem nam excepturi aliquid. Eveniet cupiditate nostrum, ab ipsa illum harum repellendus impedit tempore, excepturi qui voluptatem alias placeat provident sunt?Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat exercitationem nam excepturi aliquid. Eveniet cupiditate nostrum, ab ipsa illum harum repellendus impedit tempore, excepturi qui voluptatem alias placeat provident sunt?',
		date: '2022-01-02',
	},
	{
		id: 3,
		productId: 2,
		userId: 3,
		username: 'Bob Smith',
		rating: 3,
		content: 'Could be better.',
		date: '2022-01-03',
	},
	{
		id: 4,
		productId: 2,
		userId: 4,
		username: 'Alice Johnson',
		rating: 4,
		content: 'Decent product.',
		date: '2022-01-04',
	},
]

const mockQuestions: Question[] = [
	{
		id: 1,
		productId: 1,
		userId: 1,
		username: 'John Doe',
		content: 'Is this product good?',
		date: '2022-01-01',
		answers: [
			{
				id: 1,
				userId: 1,
				username: 'Jane Doe',
				content:
					'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora nihil inventore ratione et dicta ab, minima, quod, rerum deserunt corporis molestias. Libero necessitatibus cum aut velit qui saepe minima temporibus!',
				date: '2022-01-02',
			},
			{
				id: 2,
				userId: 2,
				username: 'Jane Doe',
				content:
					'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora nihil inventore ratione et dicta ab, minima, quod, rerum deserunt corporis molestias. Libero necessitatibus cum aut velit qui saepe minima temporibus!',
				date: '2022-01-02',
			},
		],
	},
	{
		id: 2,
		productId: 1,
		userId: 2,
		username: 'Jane Doe',
		content: 'Is this product bad?',
		date: '2022-01-02',
		answers: [
			{
				id: 3,
				userId: 3,
				username: 'Bob Smith',
				content: 'Yes, this product is bad.',
				date: '2022-01-03',
			},
			{
				id: 4,
				userId: 4,
				username: 'Alice Johnson',
				content: 'No, this product is good.',
				date: '2022-01-04',
			},
		],
	},
	{
		id: 3,
		productId: 2,
		userId: 3,
		username: 'Bob Smith',
		content: 'Is this product good?',
		date: '2022-01-03',
	},
	{
		id: 4,
		productId: 2,
		userId: 4,
		username: 'Alice Johnson',
		content: 'Is this product bad?',
		date: '2022-01-04',
	},
]

interface ReviewState {
	reviews: Review[]
	addReview: (review: Review) => void
	getReviewsByProductId: (productId: number) => Review[]
	deleteReview: (id: number) => void
	updateReview: (id: number, review: Review) => void
	getReviewById: (id: number) => Review
}

interface QuestionState {
	questions: Question[]
	addQuestion: (content: Question) => void
	answerQuestion: (
		id: number,
		content: {
			id: number
			userId: number
			username: string
			content: string
			date: string
		}
	) => void
	getQuestionsByProductId: (productId: number) => Question[]
	deleteQuestion: (id: number) => void
	deleteAnswer: (id: number) => void
	editQuestion: (id: number, content: Question) => void
	getQuestionById: (id: number) => Question
	getAnswersByQuestionId: (id: number) => Answer[]
	editAnswer: (id: number, content: Answer) => void
}

// Хранилище отзывов
const useReviewStore = create<ReviewState>((set, get) => ({
	reviews: mockReviews,

	addReview: (review: Review) =>
		set(state => ({ reviews: [...state.reviews, review] })),

	getReviewsByProductId: (productId: number) =>
		get().reviews.filter(review => review.productId === productId),

	deleteReview: (id: number) =>
		set(state => ({
			reviews: state.reviews.filter(review => review.id !== id),
		})),
	updateReview: (id: number, review: Review) =>
		set(state => ({
			reviews: state.reviews.map(r => (r.id === id ? review : r)),
		})),
	getReviewById: (id: number) => {
		const review = get().reviews.find(review => review.id === id)
		if (!review) {
			throw new Error(`Review with id ${id} not found`)
		}
		return review
	},
}))

// Хранилище вопросов
const useQuestionStore = create<QuestionState>((set, get) => ({
	questions: mockQuestions,

	addQuestion: (content: Question) =>
		set(state => ({ questions: [...state.questions, content] })),

	answerQuestion: (id: number, content: Answer) =>
		set(state => ({
			questions: state.questions.map(q =>
				q.id === id ? { ...q, answers: [...(q.answers || []), content] } : q
			),
		})),

	getQuestionsByProductId: (productId: number) =>
		get().questions.filter(content => content.productId === productId),

	editQuestion: (id: number, content: Question) =>
		set(state => ({
			questions: state.questions.map(q => (q.id === id ? content : q)),
		})),
	deleteQuestion: (id: number) =>
		set(state => ({
			questions: state.questions.filter(content => content.id !== id),
		})),
	getQuestionById: (id: number) => {
		const content = get().questions.find(content => content.id === id)
		if (!content) {
			throw new Error(`Question with id ${id} not found`)
		}
		return content
	},
	getAnswersByQuestionId: (id: number) => {
		const content = get().questions.find(content => content.id === id)
		if (!content) {
			throw new Error(`Question with id ${id} not found`)
		}

		if (!content.answers) {
			return []
		}
		return content.answers
	},
	deleteAnswer(id) {
		set(state => ({
			questions: state.questions.map(q =>
				q.answers
					? {
							...q,
							answers: q.answers.filter(content => content.id !== id),
					  }
					: q
			),
		}))
	},
	editAnswer(id, content) {
		set(state => ({
			questions: state.questions.map(q =>
				q.answers
					? {
							...q,
							answers: q.answers.map(a => (a.id === id ? content : a)),
					  }
					: q
			),
		}))
	},
}))

export { useReviewStore, useQuestionStore }
