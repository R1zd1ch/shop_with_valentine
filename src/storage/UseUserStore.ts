import { create } from 'zustand'

interface User {
	userId: number
	username: string
	email: string
	address: string
	city: string
	phone: string
	role: string
	image: string
}

interface UserState {
	user: User | null

	setUser: (user: User) => void
	clearUser: () => void
}

const mockUser = {
	userId: 1,
	username: 'Алёшка',
	email: 'a@b.ru',
	address: 'ул. Пушкина, д. 1',
	city: 'Москва',
	phone: '+7 (123) 456-78-90',
	role: 'admin',
	image: 'https://via.placeholder.com/150',
}

const useUserStore = create<UserState>(set => ({
	user: mockUser,

	setUser: user => set({ user }),
	clearUser: () => set({ user: null }),
}))

export default useUserStore
