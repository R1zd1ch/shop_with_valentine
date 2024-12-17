/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from 'react'
import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { attributeFields, Category } from '@/zod/createProduct'

export function AttributesFields({
	form,
	store,
	category,
}: {
	form: any
	store: any
	category: Category
}) {
	const fields = useMemo(() => {
		if (category === 'all') return []
		return attributeFields[category as Category].map(field => (
			<FormField
				key={field}
				control={form.control}
				name={`attributes.requirements.${field}` as any}
				render={({ field: { onChange, onBlur, value = '', ref } }) => (
					<FormItem>
						<FormLabel>
							{field.charAt(0).toUpperCase() + field.slice(1)}
						</FormLabel>
						<FormControl>
							{field === 'connectivity' ? (
								<Select
									onValueChange={value => {
										onChange(value)
										store.setRequirementField(field, value)
									}}
									value={value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder={`Выберите ${field}`} />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{category === 'ipad' ? (
											<>
												<SelectItem value='Wi-Fi'>Wi-Fi</SelectItem>
												<SelectItem value='Wi-Fi + Cellular'>
													Wi-Fi + Cellular
												</SelectItem>
											</>
										) : (
											<>
												<SelectItem value='GPS'>GPS</SelectItem>
												<SelectItem value='GPS + Cellular'>
													GPS + Cellular
												</SelectItem>
											</>
										)}
									</SelectContent>
								</Select>
							) : (
								<Input
									onChange={e => {
										onChange(e.target.value)
										store.setRequirementField(field, e.target.value)
									}}
									onBlur={onBlur}
									value={value}
									ref={ref}
								/>
							)}
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		))
	}, [category, form, store])

	return <>{fields}</>
}
