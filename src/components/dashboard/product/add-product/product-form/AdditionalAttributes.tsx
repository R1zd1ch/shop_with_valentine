/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from 'react'
import { FormField, FormItem, FormControl } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { X, Plus } from 'lucide-react'

export function AdditionalAttributes({
	form,
	store,
}: {
	form: any
	store: any
}) {
	const otherFields = useMemo(() => {
		return store.attributes.others.map(
			(
				{ id, key, value }: { id: string; key: string; value: string | number },
				index: number
			) => (
				<div key={id} className='flex items-center space-x-2 mb-2'>
					<FormField
						control={form.control}
						name={`attributes.others.${id}.key`}
						// eslint-disable-next-line @typescript-eslint/no-unused-vars
						render={({ field }) => (
							<FormItem className='flex-1'>
								<FormControl>
									<Input
										placeholder='Ключ'
										value={key}
										onChange={e => {
											const newKey = e.target.value
											field.onChange(newKey)
											store.updateOtherKey(id, newKey)
										}}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name={`attributes.others.${id}.value`}
						// eslint-disable-next-line @typescript-eslint/no-unused-vars
						render={({ field }) => (
							<FormItem className='flex-1'>
								<FormControl>
									<Input
										placeholder='Значение'
										value={value}
										onChange={e => {
											const newValue = e.target.value
											field.onChange(newValue)
											store.setOtherField(index, key, newValue)
										}}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<Button
						type='button'
						variant='outline'
						size='icon'
						onClick={() => {
							store.removeOtherField(id) // Удаляем поле из Zustand
							// form.unregister(`attributes.others.${id}`) // Удаляем поле из формы
						}}
					>
						<X className='h-4 w-4' />
					</Button>
				</div>
			)
		)
	}, [store, form])

	return (
		<div>
			<h3 className='text-lg font-medium mb-2'>Дополнительные атрибуты</h3>
			{otherFields}
			<Button
				type='button'
				variant='outline'
				size='sm'
				onClick={() => {
					store.addOtherField() // Добавляем новый атрибут в Zustand
				}}
				className='mt-2'
			>
				<Plus className='h-4 w-4 mr-2' /> Добавить атрибут
			</Button>
		</div>
	)
}
