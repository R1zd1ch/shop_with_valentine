import { create } from 'zustand'

export interface OrderItem {
	id: number
	productId: number
	quantity: number
	price: number
}

export interface OrderState {
	orderId: number | null
	items: OrderItem[]
	total: number
	status: 'pending' | 'paid' | 'delivered' | 'shipped' | 'cancelled'

	setOrderId: (orderId: number) => void
	setStatus: (
		status: 'pending' | 'paid' | 'delivered' | 'shipped' | 'cancelled'
	) => void
	addOrderItem: (item: OrderItem) => void
	clearOrder: () => void
	cancelOrder: () => void
}

const useOrderStore = create<OrderState>(set => ({
	orderId: null,
	items: [],
	total: 0,
	status: 'pending',

	setOrderId: id => set({ orderId: id }),
	setStatus: status => set({ status }),

	addOrderItem: (item: OrderItem) =>
		set(state => ({
			items: [...state.items, item],
			total: state.total + item.price * item.quantity,
		})),

	clearOrder: () =>
		set({ orderId: null, items: [], total: 0, status: 'pending' }),

	cancelOrder: () => set({ status: 'cancelled' }),
}))

export default useOrderStore
