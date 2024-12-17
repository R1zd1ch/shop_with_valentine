/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect } from 'react'
import { useProductFormStore } from '@/storage/UseProductFormStore'
import {
	productSchema,
	ProductFormValues,
	attributeFields,
} from '@/zod/createProduct'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { BasicInfo } from './BasicInfo'
import { PriceInfo } from './PriceInfo'
import { StockInfo } from './StockInfo'
import { CategorySelect } from './CategorySelect'
import { AttributesFields } from './AttributesFields'
import { AdditionalAttributes } from './AdditionalAttributes'
import { ImageUploadField } from './ImageUploadField'

export function ProductForm() {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const store = useProductFormStore()

	const form = useForm<ProductFormValues>({
		resolver: zodResolver(productSchema),
		defaultValues: store,
		values: store,
	})

	const category = form.watch('category')

	useEffect(() => {
		if (category !== 'all') {
			const requirements = attributeFields[category].reduce(
				(acc: any, field: any) => {
					const value = store.attributes.requirements[field]
					acc[field] = value !== undefined ? String(value) : ''
					return acc
				},
				{} as Record<string, string>
			)

			if (
				JSON.stringify(requirements) !==
				JSON.stringify(store.attributes.requirements)
			) {
				store.setField('attributes', { ...store.attributes, requirements })
			}
		}
	}, [category, store])

	async function onSubmit(data: ProductFormValues) {
		setIsLoading(true)
		console.log(data)
		try {
			const response = await fetch('/api/products/addProduct', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			})

			const text = await response.text()

			if (text) {
				const result = JSON.parse(text)
				console.log('Продукт добавлен успешно:', result)
			} else {
				console.log('Ответ сервера пустой')
			}
		} catch (error) {
			console.error('Ошибка:', error)
		} finally {
			setIsLoading(false)
			store.resetForm()
			form.reset()
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
				<BasicInfo form={form} store={store} />
				<PriceInfo form={form} store={store} />
				<StockInfo form={form} store={store} />
				<CategorySelect form={form} store={store} />
				<AttributesFields form={form} store={store} category={category} />
				<AdditionalAttributes form={form} store={store} />
				<ImageUploadField form={form} store={store} />
				<Button type='submit' disabled={isLoading}>
					{isLoading ? 'Создание...' : 'Создать товар'}
				</Button>
			</form>
		</Form>
	)
}
