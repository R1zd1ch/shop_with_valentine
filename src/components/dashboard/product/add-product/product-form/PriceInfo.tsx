/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

export function PriceInfo({ form, store }: { form: any; store: any }) {
	return (
		<div className='flex space-x-4'>
			<FormField
				control={form.control}
				name='price'
				render={({ field }) => (
					<FormItem className='flex-1'>
						<FormLabel>Цена</FormLabel>
						<FormControl>
							<Input
								type='number'
								placeholder='0.00'
								{...(field ?? '')}
								onChange={e => {
									const value = parseFloat(e.target.value)
									field.onChange(value)
									store.setField('price', value)
								}}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name='oldPrice'
				render={({ field }) => (
					<FormItem className='flex-1'>
						<FormLabel>Старая цена (необязательно)</FormLabel>
						<FormControl>
							<Input
								type='number'
								placeholder='0.00'
								value={field.value ?? ''}
								onChange={e => {
									const value = e.target.value
										? parseFloat(e.target.value)
										: undefined
									field.onChange(value)
									store.setField('oldPrice', value)
								}}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</div>
	)
}
