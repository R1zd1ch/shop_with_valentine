'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'

const contactSchema = z.object({
	name: z.string().min(1, 'Введите ваше имя'),
	email: z.string().email('Введите корректный email'),
	message: z.string().min(1, 'Сообщение не может быть пустым'),
})

type ContactFormData = z.infer<typeof contactSchema>

const FormContact = () => {
	const form = useForm<ContactFormData>({
		resolver: zodResolver(contactSchema),
		defaultValues: {
			name: '',
			email: '',
			message: '',
		},
	})

	const onSubmit = (data: ContactFormData) => {
		// Здесь можно обработать отправку формы (например, через API)
		console.log(data)
	}

	return (
		<Card className='w-full max-w-xl  space-y-6 shadow-md rounded-lg '>
			<CardHeader className='bg-secondary text-center rounded-t-lg'>
				<CardTitle className=' '>Обратная связь</CardTitle>
			</CardHeader>
			<div className='p-8 pt-0'>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='space-y-6 bg-background'
					>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Ваше имя</FormLabel>
									<FormControl>
										<Input
											type='text'
											placeholder='Введите ваше имя'
											{...field}
											className='w-full bg-input'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											type='email'
											placeholder='Введите ваш email'
											{...field}
											className='w-full bg-input'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='message'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Сообщение</FormLabel>
									<FormControl>
										<Textarea
											placeholder='Напишите ваше сообщение'
											{...field}
											className='w-full bg-input'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type='submit' className='w-full'>
							Отправить сообщение
						</Button>
					</form>
				</Form>
			</div>
		</Card>
	)
}

export default FormContact
