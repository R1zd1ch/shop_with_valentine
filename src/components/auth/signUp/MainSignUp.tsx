'use client'

import { signUpSchema } from '@/zod/signUpSchema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'

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
import { Card } from '@/components/ui/card'
import { FaGoogle, FaVk } from 'react-icons/fa'

const MainSignUp = () => {
	const form = useForm<z.infer<typeof signUpSchema>>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			username: '',
			email: '',
			password: '',
			passwordConfirm: '',
		},
	})

	const onSubmit = (data: z.infer<typeof signUpSchema>) => {
		console.log(data)
	}

	return (
		<div className='flex items-center justify-center min-h-screen bg-background dark:bg-background px-4'>
			<Card className='w-full max-w-md p-6 space-y-4 shadow-lg rounded-lg bg-card dark:bg-card'>
				<h2 className='text-xl font-bold text-center'>Регистрация</h2>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='space-y-4 bg-background'
					>
						<FormField
							control={form.control}
							name='username'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Имя</FormLabel>
									<FormControl>
										<Input
											type='text'
											placeholder='Введите ваше имя'
											{...field}
											className='w-full bg-input'
										/>
									</FormControl>
									<div className='h-5'>
										<FormMessage />
									</div>
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
									<div className='h-5'>
										<FormMessage />
									</div>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Пароль</FormLabel>
									<FormControl>
										<Input
											type='password'
											placeholder='Введите ваш пароль'
											{...field}
											className='w-full bg-input'
										/>
									</FormControl>
									<div className='h-5'>
										<FormMessage />
									</div>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='passwordConfirm'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Подтвердите пароль</FormLabel>
									<FormControl>
										<Input
											type='password'
											placeholder='Введите ваш пароль ещё раз'
											{...field}
											className='w-full bg-input'
										/>
									</FormControl>
									<div className='h-5'>
										<FormMessage />
									</div>
								</FormItem>
							)}
						/>
						<Button type='submit' className='w-full'>
							Зарегистрироваться
						</Button>
					</form>
					<div className='flex gap-x-4 justify-evenly mx-auto items-center'>
						<Button size='lg' variant={'outline'}>
							<FaGoogle className='size-8 left-2.5 top-2.5 text-primary' />
						</Button>
						<Button size='lg' variant={'outline'}>
							<FaVk className='size-8 left-2.5 top-2.5 text-primary' />
						</Button>
					</div>
					<div className='text-center text-sm mt-4 text-muted-foreground'>
						<p>
							Есть аккаунт?{' '}
							<Link className='text-primary hover:underline' href='signin'>
								Войти
							</Link>
						</p>
					</div>
				</Form>
			</Card>
		</div>
	)
}

export default MainSignUp
