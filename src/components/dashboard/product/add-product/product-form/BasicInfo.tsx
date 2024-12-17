/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export function BasicInfo({ form, store }: { form: any; store: any }) {
	return (
		<>
			<FormField
				control={form.control}
				name='name'
				render={({ field }) => (
					<FormItem>
						<FormLabel>Название товара</FormLabel>
						<FormControl>
							<Input
								placeholder='Введите название товара'
								{...field}
								onChange={e => {
									field.onChange(e)
									store.setField('name', e.target.value)
								}}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name='description'
				render={({ field }) => (
					<FormItem>
						<FormLabel>Описание</FormLabel>
						<FormControl>
							<Textarea
								placeholder='Введите описание товара'
								{...field}
								onChange={e => {
									field.onChange(e)
									store.setField('description', e.target.value)
								}}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</>
	)
}
