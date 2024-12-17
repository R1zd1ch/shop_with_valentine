/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand'
import { ProductFormValues } from '@/zod/createProduct'

interface ProductFormState extends ProductFormValues {
	setField: (field: keyof ProductFormValues, value: any) => void
	setRequirementField: (field: string, value: string) => void
	setOtherField: (index: number, key: string, value: string) => void
	addOtherField: () => void
	removeOtherField: (index: number) => void
	resetForm: () => void
}

const initialState: ProductFormValues = {
	name: '',
	description: '',
	price: 0,
	oldPrice: undefined,
	stockQuantity: 0,
	category: 'all',
	attributes: {
		requirements: {},
		others: [],
	},
	img: [],
}

export const useProductFormStore = create<ProductFormState>((set, get) => ({
	...initialState,
	setField: (field, value) => set(() => ({ [field]: value })),
	setRequirementField: (field, value) =>
		set(state => ({
			attributes: {
				...state.attributes,
				requirements: { ...state.attributes.requirements, [field]: value },
			},
		})),
	setOtherField: (index, key, value) =>
		set(state => {
			const newOthers = [...state.attributes.others]
			newOthers[index] = { ...newOthers[index], key, value }
			return { attributes: { ...state.attributes, others: newOthers } }
		}),
	addOtherField: () =>
		set(state => ({
			attributes: {
				...state.attributes,
				others: [
					...state.attributes.others,
					{ id: `id-${Date.now()}`, key: '', value: '' },
				],
			},
		})),
	removeOtherField: id =>
		set(state => ({
			attributes: {
				...state.attributes,
				others: state.attributes.others.filter(
					field => field.id !== String(id)
				),
			},
		})),
	updateOtherKey: (id: string, newKey: string) => {
		console.log(get().attributes.others)
		set(state => ({
			attributes: {
				...state.attributes,
				others: state.attributes.others.map(field =>
					field.id === id ? { ...field, key: newKey } : field
				),
			},
		}))
	},

	resetForm: () => {
		console.log(get().price, get().attributes)
		set(initialState)
	},
}))
