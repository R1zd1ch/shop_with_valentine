/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

export function StockInfo({ form, store }: { form: any; store: any }) {
	return (
		<FormField
			control={form.control}
			name='stockQuantity'
			render={({ field }) => (
				<FormItem>
					<FormLabel>Количество на складе</FormLabel>
					<FormControl>
						<Input
							type='number'
							{...field}
							onChange={e => {
								const value = parseInt(e.target.value)
								field.onChange(value)
								store.setField('stockQuantity', value)
							}}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
