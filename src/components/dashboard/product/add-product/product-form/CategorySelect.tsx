/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from '@/components/ui/form'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { dataCategoryMain } from '@/zod/createProduct'

export function CategorySelect({ form, store }: { form: any; store: any }) {
	return (
		<FormField
			control={form.control}
			name='category'
			render={({ field }) => (
				<FormItem>
					<FormLabel>Категория</FormLabel>
					<Select
						value={field.value ?? ''}
						onValueChange={value => {
							field.onChange(value)
							store.setField('category', value)
						}}
						defaultValue={field.value}
					>
						<FormControl>
							<SelectTrigger>
								<SelectValue placeholder='Выберите категорию' />
							</SelectTrigger>
						</FormControl>
						<SelectContent>
							{dataCategoryMain.map(category => (
								<SelectItem key={category.id} value={category.value}>
									{category.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
