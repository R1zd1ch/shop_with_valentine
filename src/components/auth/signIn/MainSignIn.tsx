'use client'

import { signInSchema } from '@/zod/signInShema'
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

const MainSignIn = () => {
	const form = useForm<z.infer<typeof signInSchema>>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const onSubmit = (data: z.infer<typeof signInSchema>) => {
		console.log(data)
	}

	return (
		<div className='flex items-center justify-center min-h-screen bg-background dark:bg-background'>
			<Card className='w-full max-w-md p-8 space-y-6 shadow-lg rounded-lg bg-card dark:bg-card'>
				<h2 className='text-2xl font-bold text-center'>Вход</h2>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='space-y-6 bg-background'
					>
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
									<div className='h-[10px]'>
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
									<div className='h-[10px]'>
										<FormMessage />
									</div>
								</FormItem>
							)}
						/>
						<Button type='submit' className='w-full'>
							Войти
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
					<div className='flex flex-col items-center'>
						<p className='text-center text-sm mt-3 text-muted-foreground'>
							Создать новый аккаунт
						</p>
						<Link
							className='hover:text-primary text-sm ml-1 hover:underline cursor-pointer text-muted-foreground'
							href='signup'
						>
							<p>Зарегистрироваться</p>
						</Link>
					</div>
				</Form>
			</Card>
		</div>
	)
}

export default MainSignIn
