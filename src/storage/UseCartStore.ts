import { create } from 'zustand'

export interface CartItem {
	id: number
	userId: number
	productId: number
	quantity: number
	price: number
}

export interface PromoCode {
	code: string
	discount: number
	isPercent: boolean
	description: string
}

export interface CartStore {
	cartId: number | null
	userId: number | null
	CartItems: CartItem[]
	total: number
	discountTotal: number
	appliedPromoCode: PromoCode | null
	availablePromoCodes: PromoCode[]

	currentItem: Partial<CartItem>

	setCartId: (cartId: number | null) => void
	setUserId: (userId: number | null) => void
	addItem: () => void
	updateItem: () => void
	removeItem: (id: number) => void
	clearCart: () => void
	loadMockData: () => void
	setDiscountTotal: (total: number) => void
	applyPromoCode: (code: string) => boolean
	removePromoCode: () => void
	setCartItems: (items: CartItem[]) => void

	setCurrentItem: (details: Partial<CartItem>) => void
	updateCurrentItemQuantity: (quantity: number) => void
}

const useCartStore = create<CartStore>((set, get) => ({
	cartId: null,
	userId: null,
	CartItems: [],
	total: 0,
	discountTotal: 0,
	appliedPromoCode: null,
	currentItem: {},

	availablePromoCodes: [
		{
			code: 'DISCOUNT10',
			discount: 10,
			isPercent: true,
			description: '10% скидка',
		},
		{
			code: 'SAVE50',
			discount: 50,
			isPercent: false,
			description: 'Скидка 50 руб.',
		},
	],

	setCartId: cartId => set({ cartId }),
	setUserId: userId => set({ userId }),

	loadMockData: () => {
		const mockCartItems = [
			{ id: 1, userId: 1, productId: 1, quantity: 2, price: 100 },
			{ id: 2, userId: 1, productId: 2, quantity: 1, price: 200 },
		]
		get().setCartItems(mockCartItems)
	},

	setDiscountTotal: total => set({ discountTotal: total }),

	applyPromoCode: code => {
		const { total, availablePromoCodes } = get()
		const promo = availablePromoCodes.find(p => p.code === code)

		if (!promo || total <= 0) return false

		const discount = promo.isPercent
			? Math.min(total * (promo.discount / 100), total)
			: Math.min(promo.discount, total)

		set({
			appliedPromoCode: promo,
			discountTotal: total - discount,
		})
		return true
	},

	removePromoCode: () => {
		set(state => ({
			appliedPromoCode: null,
			discountTotal: state.total,
		}))
	},

	setCartItems: items => {
		const { appliedPromoCode } = get()

		const total = items.reduce(
			(acc, item) => acc + item.price * item.quantity,
			0
		)

		const discount = appliedPromoCode
			? appliedPromoCode.isPercent
				? Math.min(total * (appliedPromoCode.discount / 100), total)
				: Math.min(appliedPromoCode.discount, total)
			: 0

		set({
			CartItems: items,
			total,
			discountTotal: total - discount,
		})
	},

	addItem: () => {
		const { currentItem, CartItems } = get()
		const { id, userId, productId, quantity = 1, price = 0 } = currentItem

		if (!id || !productId) return

		const updatedCartItems = CartItems.map(item =>
			item.id === id ? { ...item, quantity: item.quantity + quantity } : item
		)

		if (!CartItems.some(item => item.id === id)) {
			updatedCartItems.push({
				id,
				userId: userId || 0,
				productId,
				quantity,
				price,
			})
		}

		get().setCartItems(updatedCartItems)
	},

	updateItem: () => {
		const { currentItem, CartItems } = get()
		const { id, quantity = 1, price = 0 } = currentItem

		const updatedCartItems = CartItems.map(item =>
			item.id === id ? { ...item, quantity, price } : item
		)

		get().setCartItems(updatedCartItems)
	},

	removeItem: id => {
		const { CartItems } = get()
		const updatedCartItems = CartItems.filter(item => item.id !== id)
		get().setCartItems(updatedCartItems)
	},

	clearCart: () => {
		set({
			CartItems: [],
			total: 0,
			discountTotal: 0,
			appliedPromoCode: null,
		})
	},

	setCurrentItem: details =>
		set(state => ({ currentItem: { ...state.currentItem, ...details } })),

	updateCurrentItemQuantity: quantity =>
		set(state => {
			const currentPricePerUnit =
				(state.currentItem.price || 0) / (state.currentItem.quantity || 1)
			return {
				currentItem: {
					...state.currentItem,
					quantity,
					price: currentPricePerUnit * quantity,
				},
			}
		}),
}))

export default useCartStore
